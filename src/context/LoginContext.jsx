import axios from "axios";
import { createContext, useEffect, useState } from "react";
const API_KEY = "AIzaSyD6awMYmMp6c0QVfJR-A0sNEX0Pbl_Ehnk";

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
      name: obj.name,
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
    localStorage.removeItem("profile");
  }
  function validate(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
  function handleChange(e, input, setInput, text) {
    setInput(e.target.value);
    validate(input) ? setInputError(null) : setInputError(text);
  }
  async function authenticate(mode, email, password, name = "") {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
    try {
      const response = await axios.post(url, {
        email,
        password,
        displayName: name,
        returnSecureToken: true,
      });
      return response.data;
    } catch (err) {
      setError(err.message);
      console.log(error);
    }
  }

  async function createUser(email, password, name) {
    await authenticate("signUp", email, password, name);
  }

  async function signup(email, password, name) {
    login({ email, password, name });
    await createUser(email, password, name);
  }
  async function signIn(email, password) {
    try {
      const response = await authenticate(
        "signInWithPassword",
        email,
        password
      );
      login({ email: response.email, name: response.displayName });
    } catch (err) {
      console.error(err);
    }
  }

  const value = {
    isLoggedIn,
    profileObj,
    login,
    logout,
    inputError,
    handleChange,
    signup,
    signIn,
  };
  return (
    <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
  );
}
