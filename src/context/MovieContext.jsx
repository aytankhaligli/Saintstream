import axios from "axios";
import { createContext, useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import db from "../firebase";

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
  getMovieGenres: (movie) => { },
  getPosterImg: (path) => { },
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
  const [watchlist, setWatchlist] = useState([]);

  const fetchWatchlist = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "watchlist"));
      const fetchedWatchlist = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        data.movie && fetchedWatchlist.push(data.movie);
      });

      setWatchlist(fetchedWatchlist);
      console.log(fetchedWatchlist);
    } catch (error) {
      console.error("Error fetching watchlist:", error);
    }
  };
  useEffect(() => {
    fetchWatchlist();
  }, []);
  //Firebase add and delete
  const addWatchlist = async (movie) => {
    try {
      const docRef = await addDoc(collection(db, "watchlist"), {
        movie: movie,
      });
      fetchWatchlist();
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const removeWatchlist = async (movie) => {
    try {
      const querySnapshot = await getDocs(collection(db, "watchlist"));
      querySnapshot.forEach(async (document) => {
        if (document.data().movie.id === movie.id) {
          await deleteDoc(doc(db, "watchlist", document.id));
          fetchWatchlist();
        }
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  function fetchData(url, setData, type = "all") {
    if (type === "search") {
      axios
        .get(
          `${baseUrl}/${url}&api_key=${apiKey}&language=en-US&page=${currentPage ? currentPage : 1
          }`
        )
        .then((res) => {
          // console.log(res.data.results);
          setData(res.data.results);
        })
        .catch((err) => console.error(err));
    } else {
      axios
        .get(
          `${baseUrl}/${url}?api_key=${apiKey}&language=en-US&page=${currentPage ? currentPage : 1
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
  }, []);

  useEffect(() => {
    fetchData("person/popular", setPopularPeople);
  }, [currentPage]);

  function changePage(page) {
    setCurrentPage(page);
  }

  useEffect(() => {
    // console.log(searchingQuery);
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
    watchlist,
    addWatchlist,
    removeWatchlist,
  };

  return value;
};
