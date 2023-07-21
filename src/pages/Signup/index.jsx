import { useContext, useEffect, useState } from "react";
import AuthContainer from "../../components/Auth";
import Input from "../../components/Input";
import Button from "../../components/Button";
import styles from "./Signup.module.css";
import { LoginContext } from "../../context/LoginContext";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import db, { auth, storage } from "../../firebase";
import { setDoc, doc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
export default function Signup() {
  const [isChecked, setIsChecked] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [user, setUser] = useState({
    name: "",
    surname: "",
    username: "",
    imagePath: "",
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [error, setError] = useState(null);
  const { inputError, handleChange, isLoggedIn, login, handleError, errorMsg } =
    useContext(LoginContext);
  const navigate = useNavigate();
  useEffect(() => {
    secondPassword !== password
      ? setError("Please repeat your password")
      : setError(null);
  }, [password, secondPassword]);

  function passwordOnChange(e) {
    setSecondPassword(e.target.value);
  }
  // console.log(user.imagePath);
  useEffect(() => {
    email !== "" &&
      password !== "" &&
      secondPassword !== "" &&
      user.username !== "" &&
      isChecked &&
      !error &&
      setDisabled(false);
    (email === "" ||
      password === "" ||
      secondPassword === "" ||
      user.username === "" ||
      !isChecked ||
      error) &&
      setDisabled(true);
    inputError && setDisabled(true);
  }, [email, password, secondPassword, inputError, user, error, isChecked]);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/home");
    }
  }, [isLoggedIn, navigate]);

  const register = async (userData, email, password) => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      const storageRef = ref(storage, "images/" + userData.imagePath.name);
      await uploadBytes(storageRef, userData.imagePath);
      const downloadURL = await getDownloadURL(storageRef);
      await setDoc(doc(db, "users", user.user.uid), {
        name: userData.name,
        surname: userData.surname,
        username: userData.username,
        imagePath: downloadURL,
        email: email,
        id: user.user.uid,
      });

      await updateProfile(auth.currentUser, {
        displayName: userData.username,
        photoURL: downloadURL,
      }).catch((err) => console.log(err));
      login(auth.currentUser);
    } catch (err) {
      console.log(err);
      handleError(err.message);
    }
  };

  function signup(e) {
    e.preventDefault();
    register(user, email, password);
  }

  return (
    <AuthContainer type="signup">
      <form>
        <Input
          type="text"
          placeholder="Name"
          onChange={(e) => setUser((pre) => ({ ...pre, name: e.target.value }))}
        />
        <Input
          type="text"
          placeholder="Surname"
          onChange={(e) =>
            setUser((pre) => ({ ...pre, surname: e.target.value }))
          }
        />
        <Input
          type="text"
          placeholder="Username"
          onChange={(e) =>
            setUser((pre) => ({ ...pre, username: e.target.value }))
          }
        />
        <Input
          type="email"
          placeholder="Email"
          onChange={(e) =>
            handleChange(e, setEmail, "Please type correct email")
          }
        />
        {inputError && <p className={styles.errorText}>{inputError}</p>}
        <Input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          onChange={passwordOnChange}
        />
        {error && <p className={styles.errorText}>{error}</p>}
        <Input
          type="file"
          name="ImageStyle"
          placeholder="Upload your image"
          onChange={(e) =>
            setUser((pre) => ({ ...pre, imagePath: e.target.files[0] }))
          }
        />
        <div className={styles.checkbox_wrapper}>
          <input
            type="checkbox"
            className={isChecked ? styles.checked : ""}
            onChange={() => setIsChecked((pre) => !pre)}
          />
          <label>I agree to our Privacy Policy and Term & Conditions</label>
        </div>

        <Button
          text="Continue"
          type="submit"
          style={{
            backgroundColor: "#fff",
            color: disabled ? "#aaa" : "#000",
            cursor: disabled && "not-allowed",
          }}
          onClick={signup}
        />
      </form>
      {errorMsg && (
        <div className={styles.error}>
          <p className={styles.errorText}>{errorMsg}</p>
        </div>
      )}
    </AuthContainer>
  );
}
