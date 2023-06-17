import { createContext, useState } from "react";

export const LoginContext = createContext({
  isLoggedIn: false,
  profileObj: {},
  login: () => {},
  logout: () => {},
});

export default function LoginContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileObj, setProfileObj] = useState({});
  function login(obj) {
    setIsLoggedIn(true);
    setProfileObj(obj);
  }
  function logout() {
    setIsLoggedIn(false);
    setProfileObj({});
  }
  const value = { isLoggedIn, profileObj, login, logout };
  return (
    <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
  );
}
