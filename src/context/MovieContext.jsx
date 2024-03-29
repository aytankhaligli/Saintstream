import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const MovieContext = createContext({
  movies: [],
  series: [],
  popularMovies: [],
  popularSeries: [],
  trendingAll: [],
  allGenres: [],
  moviesbyGenres: [],
  searchingMovies: [],
  popularPeople: [],
  searchingQuery: "",
  searchingGenre: "",
  filteringGenre: "",
  getMovieGenres: (movie) => {},
  getPosterImg: (path) => {},
});

const baseUrl = "https://api.themoviedb.org/3";
const apiKey = "59555ce48f74aaa22fe85d4160505521";

export default function MovieContextProvider({ children }) {
  const data = useProvideData();
  return <MovieContext.Provider value={data}>{children}</MovieContext.Provider>;
}

const useProvideData = () => {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularSeries, setPopularSeries] = useState([]);
  const [trendingAll, setTrendingAll] = useState([]);
  const [allGenres, setAllGenres] = useState([]);
  const [searchingMovies, setSearchingMovie] = useState([]);
  const [moviesbyGenres, setMoviesbyGenres] = useState([]);
  const [popularPeople, setPopularPeople] = useState([]);
  const [searchingPeople, setSearchingPeople] = useState([]);
  const [searchingQuery, setSearchingQuery] = useState("");
  const [searchingYear, setSearchingYear] = useState("");
  const [searchingGenre, setSearchingGenre] = useState("");
  const [filteringGenre, setFilteringGenre] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [video, setVideo] = useState(null);

  function fetchData(url, setData, type = "all") {
    if (type === "search") {
      axios
        .get(
          `${baseUrl}/${url}&api_key=${apiKey}&language=en-US&page=${
            currentPage ? currentPage : 1
          }`
        )
        .then((res) => {
          setData(res.data.results);
        })
        .catch((err) => console.error(err));
    } else {
      axios
        .get(
          `${baseUrl}/${url}?api_key=${apiKey}&language=en-US&page=${
            currentPage ? currentPage : 1
          }`
        )
        .then((res) => {
          if (type === "all") {
            setData(res.data.results);
          } else if (type === "genre") {
            setData(res.data.genres);
          } else if (type === "movie") {
            setData(res.data);
          } else if (type === "cast") {
            setData(res.data.cast);
          } else if (type === "page") {
            setData(res.data.total_pages);
          }
        })
        .catch((err) => console.error(err));
    }
  }

  useEffect(() => {
    fetchData("discover/movie", setMovies);
    fetchData("discover/tv", setSeries);
    fetchData("movie/popular", setPopularMovies);
    fetchData("tv/popular", setPopularSeries);
    fetchData("trending/all/day", setTrendingAll);
    fetchData("genre/movie/list", setAllGenres, "genre");
    fetchData("person/popular", setTotalPages, "page");
    const savedVideo = JSON.parse(localStorage.getItem("video"));
    savedVideo && setVideo(savedVideo);
  }, []);

  useEffect(() => {
    fetchData("person/popular", setPopularPeople);
  }, [currentPage]);

  function changePage(page) {
    setCurrentPage(page);
  }

  function getVideos(id) {
    localStorage.removeItem("video");
    fetchData(`movie/${id}/videos`, setVideo);
  }

  function getCast(id, setCast) {
    fetchData(`movie/${id}/credits`, setCast, "cast");
  }

  useEffect(() => {
    localStorage.setItem("video", JSON.stringify(video));
  }, [video]);

  useEffect(() => {
    fetchData(
      `search/movie?query=${searchingQuery}&primary_release_year=${searchingYear}&with_genres
      =${filteringGenre}`,
      setSearchingMovie,
      "search"
    );
    fetchData(
      `search/person?query=${searchingQuery}&include_adult=false`,
      setSearchingPeople,
      "search"
    );
  }, [searchingQuery, filteringGenre, searchingYear, currentPage]);

  useEffect(() => {
    fetchData(
      `discover/movie?with_genres=${searchingGenre}`,
      setMoviesbyGenres,
      "search"
    );
  }, [searchingGenre]);

  const getMovieGenres = (movie) => {
    const commonItems = [];
    if (movie) {
      for (let i = 0; i < allGenres.length; i++) {
        const item1 = allGenres[i];

        for (let j = 0; j < movie.genre_ids.length; j++) {
          const item2 = movie.genre_ids[j];

          if (item1.id === item2) {
            commonItems.push({
              id: item1.id,
              name: item1.name === "Science Fiction" ? "Sci-Fi" : item1.name,
            });
          }
        }
      }
    }
    return commonItems;
  };

  function search(searchingData) {
    setSearchingQuery(searchingData.replace(/\s+/g, "+"));
  }
  function filter(genre, year) {
    const id =
      genre && allGenres.filter((genr) => genr.name === genre)[0].id.toString();
    setFilteringGenre(id);
    setSearchingYear(year);
  }

  const getPosterImg = (path) => {
    return `https://image.tmdb.org/t/p/original/${path}`;
  };
  function sortbyGenre(id) {
    id && setSearchingGenre(id);
  }

  const value = {
    movies,
    series,
    popularMovies,
    popularSeries,
    trendingAll,
    allGenres,
    getMovieGenres,
    getPosterImg,
    fetchData,
    search,
    searchingMovies,
    sortbyGenre,
    moviesbyGenres,
    filter,
    popularPeople,
    searchingPeople,
    totalPages,
    changePage,
    getVideos,
    video,
    getCast,
  };

  return value;
};
