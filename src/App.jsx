import { createHashRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import About from "./pages/About";
import Root from "./components/Root";
import ErrorPage from "./components/ErrorPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AuthLayout from "./pages/AuthLayout";
import ForgetPassword from "./pages/ForgetPassword";
import { GoogleOAuthProvider } from "@react-oauth/google";
import LoginContextProvider from "./context/LoginContext";
import Discover from "./pages/Discover";
import Genres from "./pages/Genres";
import PopularPeople from "./pages/PopularPeople";
import Profile from "./pages/Profile";
import Video from "./pages/Video";

const clientId =
  "805826379803-pgig8dpn1a8aeedvf63vnlmcv7sf6pbf.apps.googleusercontent.com";

const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/:movieId",
        element: <Movie />,
      },
      {
        path: "home/genres/:genreId",
        element: <Genres />,
      },
      {
        path: "genres/:genreId",
        element: <Genres />,
      },
      {
        path: "/discover",
        element: <Discover />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/popular-people",
        element: <PopularPeople />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/video",
        element: <Video />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/forget",
        element: <ForgetPassword />,
      },
    ],
  },
]);

function App() {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <LoginContextProvider>
        <RouterProvider router={router} />
      </LoginContextProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
