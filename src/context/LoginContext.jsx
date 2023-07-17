import { createContext, useEffect, useState } from "react";
import db, { auth, storage } from "../firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

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
  const [watchlist, setWatchlist] = useState([]);
  const [userWatchlist, setUserWatchlist] = useState([]);
  const [likes, setLikes] = useState([]);
  const [userLikes, setUserLikes] = useState([]);
  const [userData, setUserData] = useState({});

  async function login(obj) {
    setIsLoggedIn(true);
    setProfileObj({
      name: obj.displayName,
      id: obj.uid,
      picture: obj.photoURL,
    });
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
        setProfileObj({
          name: authUser.displayName,
          id: authUser.uid,
          picture: authUser.photoURL,
        });
        setIsLoggedIn(true);
      } else {
        setProfileObj({});
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Watchlist and Likes

  const fetchList = async (listName, setList) => {
    try {
      const querySnapshot = await getDocs(collection(db, listName));
      const fetchedList = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        data.movie && fetchedList.push(data);
      });
      setList(fetchedList);
    } catch (error) {
      console.error("Error fetching list:", error);
    }
  };

  const setListwithId = (list, setUserList) => {
    const userList = list
      .filter((item) => item.userId === profileObj.id)
      .map((item) => item.movie);
    setUserList(userList);
  };

  useEffect(() => {
    async function getUserData() {
      try {
        const docRef = doc(db, "users", profileObj.id);
        const docSnap = await getDoc(docRef);
        setUserData(docSnap.data());
        console.log(userData);
      } catch (error) {
        console.error("Error fetching userData:", error);
      }
    }
    if (profileObj.id) {
      getUserData();
    }
  }, [profileObj]);

  async function updateUserdata(userData) {
    const storageRef = ref(storage, "images/" + userData.imagePath.name);
    await uploadBytes(storageRef, userData.imagePath);
    const downloadURL = await getDownloadURL(storageRef);

    await updateDoc(doc(db, "users", profileObj.id), {
      name: userData.name,
      surname: userData.surname,
      username: userData.username,
      imagePath: downloadURL,
    });
    await updateProfile(auth.currentUser, {
      displayName: userData.username,
      photoURL: downloadURL,
    }).catch((err) => console.log(err));

    setProfileObj({
      name: auth.currentUser.displayName,
      id: auth.currentUser.uid,
      picture: auth.currentUser.photoURL,
    });
  }
  useEffect(() => {
    fetchList("watchlist", setWatchlist);
    setListwithId(watchlist, setUserWatchlist);
  }, [watchlist, isLoggedIn, profileObj]);

  useEffect(() => {
    fetchList("likes", setLikes);
    setListwithId(likes, setUserLikes);
  }, [likes, isLoggedIn, profileObj]);

  //Firebase add and delete

  const addList = async (movie, list, setList) => {
    try {
      await addDoc(collection(db, list), {
        movie: movie,
        userId: profileObj.id,
      });
      fetchList(list, setList);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const removeList = async (movie, list, setList) => {
    try {
      const querySnapshot = await getDocs(collection(db, list));
      querySnapshot.forEach(async (document) => {
        if (document.data().movie.id === movie.id) {
          await deleteDoc(doc(db, list, document.id));
          fetchList(list, setList);
        }
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const value = {
    isLoggedIn,
    profileObj,
    login,
    logout,
    inputError,
    handleChange,
    setWatchlist,
    setLikes,
    userWatchlist,
    addList,
    removeList,
    userLikes,
    userData,
    updateUserdata,
  };
  return (
    <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
  );
}
