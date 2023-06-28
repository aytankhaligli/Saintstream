import { useContext, useEffect, useState } from "react";
import { MovieContext } from "../../context/MovieContext";
import styles from "./Filter.module.css";
import SelectBox from "../SelectBox";

export default function Filter() {
  const { allGenres, filter } = useContext(MovieContext);
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const genres = allGenres.map((genre) => genre.name);
  const currentYear = new Date().getFullYear();
  const startYear = 1990;
  const years = Array.from(
    { length: currentYear - startYear + 1 },
    (_, index) => startYear + index
  );

  useEffect(() => {
    filter(genre, year);
  }, [genre, year, filter]);

  return (
    <div className={styles.filter}>
      <SelectBox
        data={genres}
        name="Select Genres"
        onChange={(e) => setGenre(e.target.value)}
      />
      <SelectBox
        data={years}
        name="Select Year"
        onChange={(e) => setYear(e.target.value)}
      />
    </div>
  );
}
