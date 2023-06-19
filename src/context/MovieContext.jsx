import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const MovieContext = createContext({
  popularMovies: [],
  popularSeries: [],
  trendingAll: [],
  genres: [],
  getMovieGenres: (movie) => {},
  getPosterImg: (path) => {},
});

const baseUrl = "https://api.themoviedb.org/3";
const api_key = "59555ce48f74aaa22fe85d4160505521";

export default function MovieContextProvider({ children }) {
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularSeries, setPopularSeries] = useState([]);
  const [trendingAll, setTrendingAll] = useState([]);
  const [allGenres, setAllGenres] = useState([]);

  function fetchData(url, setData, type = "all") {
    axios
      .get(`${baseUrl}/${url}?api_key=${api_key}&language=en-US&page=1`)
      .then((res) => {
        if (type === "all") {
          setData(res.data.results);
        } else if (type === "genre") {
          setData(res.data.genres);
        } else if (type === "movie") {
          setData(res.data);
        }
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    fetchData("movie/popular", setPopularMovies);
    fetchData("trending/all/day", setTrendingAll);
    fetchData("genre/movie/list", setAllGenres, "genre");
  }, []);

  const getMovieGenres = (movie) => {
    const commonItems = [];

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
    return commonItems;
  };

  const getPosterImg = (path) => {
    return `https://image.tmdb.org/t/p/original/${path}`;
  };

  const value = {
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
