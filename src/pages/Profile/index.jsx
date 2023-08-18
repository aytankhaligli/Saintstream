import Input from "../../components/Input";
import styles from "./Profile.module.css";
import editIcon from "../../assets/icons/pen-solid.svg";
import cameraIcon from "../../assets/icons/camera-solid.svg";
import { createRef, useContext, useEffect, useState } from "react";
import Button from "../../components/Button";
import { LoginContext } from "../../context/LoginContext";
export default function Profile() {
  const { userData, updateUserdata } = useContext(LoginContext);
  const nameRef = createRef();
  const surnameRef = createRef();
  const usernameRef = createRef();
  const [previewImage, setPreviewImage] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser({
      name: userData.name,
      surname: userData.surname,
      username: userData.username,
      imagePath: userData.imagePath,
    });
  }, []);

  // console.log(user);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setUser((pre) => ({ ...pre, imagePath: file }));
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  function editInput(ref) {
    ref.current.readOnly = false;
    ref.current.focus();
    ref.current.selectionStart = ref.current.value.length;
    ref.current.selectionEnd = ref.current.value.length;
  }

  if (user !== null && user.name) {
    return (
      <div className={styles.container}>
        <h1>Your Profile</h1>

        <div className={styles.imageBox}>
          <img
            src={previewImage ? previewImage : user.imagePath}
            alt=""
            className={styles.profileImg}
          />
          <label className={styles.imageInput}>
            <div className={styles.iconBox}>
              <img
                src={cameraIcon}
                alt="camera icon"
                className={styles.cameraIcon}
              />
            </div>

            <input
              type="file"
              onChange={handleFileInputChange}
              className={styles.input}
              hidden
            />
          </label>
        </div>

        <div className={styles.inputBox}>
          <Input
            placeholder="Name"
            value={user.name}
            ref={nameRef}
            readonly={true}
            onChange={(e) =>
              setUser((pre) => ({ ...pre, name: e.target.value }))
            }
          />
          <img
            src={editIcon}
            alt="icon"
            className={styles.icon}
            onClick={() => editInput(nameRef)}
          />
        </div>
        <div className={styles.inputBox}>
          <Input
            placeholder="Surname"
            value={user.surname}
            ref={surnameRef}
            readonly={true}
            onChange={(e) =>
              setUser((pre) => ({ ...pre, surname: e.target.value }))
            }
          />
          <img
            src={editIcon}
            alt="icon"
            className={styles.icon}
            onClick={() => editInput(surnameRef)}
          />
        </div>
        <div className={styles.inputBox}>
          <Input
            placeholder="Username"
            value={user.username}
            ref={usernameRef}
            readonly={true}
            onChange={(e) =>
              setUser((pre) => ({ ...pre, username: e.target.value }))
            }
          />
          <img
            src={editIcon}
            alt="icon"
            className={styles.icon}
            onClick={() => editInput(usernameRef)}
          />
        </div>
        <div className={styles.inputBox}>
          <Input placeholder="Email" value={userData.email} readonly={true} />
        </div>
        <Button
          text="Save Changes"
          style={{
            backgroundColor: "#fff",
            color: "#000",
          }}
          onClick={() => updateUserdata(user)}
        />
      </div>
    );
  }
}
