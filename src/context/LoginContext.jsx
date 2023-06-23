import { createContext, useEffect, useState } from "react";

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

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("profile"));
    profile && setProfileObj(profile);
    profile && setIsLoggedIn(true);
  }, []);

  function login(obj) {
    setIsLoggedIn(true);
    setProfileObj(obj);
    localStorage.setItem("profile", JSON.stringify(obj));
  }
  function logout() {
    setIsLoggedIn(false);
    setProfileObj({});
  }
  function validate(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
  function handleChange(e, input, setInput, text) {
    setInput(e.target.value);
    // validate(email) && setError(null);
    validate(input) ? setInputError(null) : setInputError(text);
  }
  function submit(input, text) {
    validate(input) ? setInputError(null) : setInputError(text);
  }

  const value = {
    isLoggedIn,
    profileObj,
    login,
    logout,
    inputError,
    submit,
    handleChange,
  };
  return (
    <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
  );
}
