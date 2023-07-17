/* eslint-disable react/display-name */
import { forwardRef } from "react";
import styles from "./Input.module.css";

const Input = forwardRef(
  (
    {
      placeholder,
      onChange,
      type,
      defaultValue,
      readonly = false,
      disabled = false,
      value
    },
    ref
  ) => {
    return (
      <div className={styles.inputBox}>
        <label>{placeholder}</label>
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          className={styles.input}
          defaultValue={defaultValue}
          readOnly={readonly}
          disabled={disabled}
          value={value}
        />
      </div>
    );
  }
);

export default Input;
