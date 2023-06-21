import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const MovieContext = createContext({
  movies: [],
  series: [],
  popularMovies: [],
  popularSeries: [],
  trendingAll: [],
  allGenres: [],
  getMovieGenres: (movie) => {},
  getPosterImg: (path) => {},
});

const baseUrl = "https://api.themoviedb.org/3";
const apiKey = "59555ce48f74aaa22fe85d4160505521";

export default function MovieContextProvider({ children }) {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularSeries, setPopularSeries] = useState([]);
  const [trendingAll, setTrendingAll] = useState([]);
  const [allGenres, setAllGenres] = useState([]);

  function fetchData(url, setData, type = "all") {
    axios
      .get(`${baseUrl}/${url}?api_key=${apiKey}&language=en-US&page=1`)
      .then((res) => {
        if (type === "all") {
          setData(res.data.results);
        } else if (type === "genre") {
          setData(res.data.genres);
        } else if (type === "movie") {
          setData(res.data);
        } else if (type === "cast") {
          setData(res.data.cast);
        }
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    fetchData("discover/movie", setMovies);
    fetchData("discover/tv", setSeries);
    fetchData("movie/popular", setPopularMovies);
    fetchData("tv/popular", setPopularSeries);
    fetchData("trending/all/day", setTrendingAll);
    fetchData("genre/movie/list", setAllGenres, "genre");
  }, []);

  const getMovieGenres = (movie) => {
    const commonItems = [];
    if(movie){
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

  const getPosterImg = (path) => {
    return `https://image.tmdb.org/t/p/original/${path}`;
  };

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
  };
  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
}
