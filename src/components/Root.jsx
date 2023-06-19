import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import MovieContextProvider from "../context/MovieContext";

export default function Root() {
  return (
    <MovieContextProvider>
      <div className="app">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </MovieContextProvider>
  );
}
