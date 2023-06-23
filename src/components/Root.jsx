import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import MovieContextProvider from "../context/MovieContext";
import ModalContextProvider from "../context/ModalContext";

export default function Root() {
  return (
    <ModalContextProvider>
      <MovieContextProvider>
        <div className="app">
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
        </div>
      </MovieContextProvider>
    </ModalContextProvider>
  );
}
