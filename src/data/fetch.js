import tmdb from "./tmdb";

export const fetchData = async (url, setData) => {
  try {
    const res = await tmdb.get(url);
    // console.log(res);
    if (res.data.runtime) {
      setData(res.data);
    } else if (res.data.results) {
      setData(res.data.results);
    } else {
      setData(res.data.genres);
    }
  } catch (err) {
    console.error(err.message);
  }
};

export const getPosterImg = (path) => {
  return `https://image.tmdb.org/t/p/original/${path}`;
};

export const getGenres = (genres, movie) => {
  const commonItems = [];

  for (let i = 0; i < genres.length; i++) {
    const item1 = genres[i];

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
  // console.log(commonItems);
  return commonItems;
};
