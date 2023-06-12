import { useState } from "react";
import AuthContainer from "../../components/Auth";
import Input from "../../components/Input";
import Button from "../../components/Button";
import styles from "./Signup.module.css";

export default function Signup() {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <AuthContainer type="signup">
      <form>
        <Input placeholder="Username" />
        <Input placeholder="Email" />
        <Input placeholder="Password" />
        <Input placeholder="Password" />
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
          style={{ backgroundColor: "#fff", color: "#aaa" }}
        />
      </form>
    </AuthContainer>
  );
}
