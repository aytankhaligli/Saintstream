import { useContext } from "react";
import Watchlist from "../../components/cards/WatchlistCard";
import styles from "./PopularPeople.module.css";
import { MovieContext } from "../../context/MovieContext";
import SearchModal from "../../components/SearchModal";
import Pagination from "../../components/Pagination";

import db from "../../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function PopularPeople() {
  const { popularPeople, searchingPeople } = useContext(MovieContext);
  const people = searchingPeople.length > 0 ? searchingPeople : popularPeople;

  const addSmth = async () => {
    try {
      const docRef = await addDoc(collection(db, "test"), {
        first: "Nijat",
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

  }

  return (
    <div className={styles.container}>
      <div>
        Test
        <button onClick={addSmth}>Add</button>
      </div>
      <div className={styles.search}>
        <SearchModal />
      </div>
      <div className={styles.grid}>
        {people.map((pers, index) => (
          <Watchlist item={pers} key={pers.id} type="people" />
        ))}
      </div>
      <Pagination />
    </div>
  );
}
