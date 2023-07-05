import styles from "./Pagination.module.css";
import { useContext, useEffect, useState } from "react";
import { MovieContext } from "../../context/MovieContext";
import ReactPaginate from "react-paginate";
export default function Pagination() {
  const { totalPages, changePage } = useContext(MovieContext);
  function handlePageClick(data) {
    changePage(data.selected);
  }
  return (
    <div className={styles.pagination}>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={totalPages}
        previousLabel="< previous"
        containerClassName={styles.list}
        pageClassName={styles.page}
        activeClassName={styles.current}
      />
    </div>
  );
}
