import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";

export const LoginContext = createContext({
  isLoggedIn: false,
  inputError: null,
  profileObj: {},
  login: () => {},
  logout: () => {},
  valiedate: () => {},
  handleChange: (e, input, setInput, text) => {},
  submit: (input, text) => {},
});

export default function LoginContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileObj, setProfileObj] = useState({});
  const [inputError, setInputError] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("profile"));
    profile && setProfileObj(profile);
    profile && setIsLoggedIn(true);
  }, []);

  async function login(obj) {
    setIsLoggedIn(true);
    setProfileObj({
      name: obj.name ? obj.name : obj.displayName,
      picture:
        obj.picture && obj.picture.data ? obj.picture.data.url : obj.picture,
    });
    localStorage.setItem(
      "profile",
      JSON.stringify({
        name: obj.name,
        picture:
          obj.picture && obj.picture.data ? obj.picture.data.url : obj.picture,
      })
    );
  }
  function logout() {
    setIsLoggedIn(false);
    setProfileObj({});
    auth
      .signOut()
      .then(() => {
        console.log("User logged out successfully");
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
    localStorage.removeItem("profile");
  }
  function validate(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  function handleChange(e, setInput, text) {
    const inputValue = e.target.value;
    setInput(inputValue);
    validate(inputValue) ? setInputError(null) : setInputError(text);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setProfileObj({ name: authUser.displayName });
      } else {
        setProfileObj({});
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const value = {
    isLoggedIn,
    profileObj,
    login,
    logout,
    inputError,
    handleChange,
  };
  return (
    <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
  );
}
