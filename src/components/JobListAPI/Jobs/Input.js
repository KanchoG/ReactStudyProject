import { useState } from "react";
import classes from "./Input.module.css";
const Input = (props) => {
  const [fieldIsTouched, setFieldIsTouched] = useState(false);
  const changeHandler = (event) => {
      props.onInput(event.target.value);
  };
  const touchHandler = () => {
    setFieldIsTouched(true);
  };
  return (
    <div
      className={`${classes.input} ${
        fieldIsTouched && (props.value.trim().length === 0) ? classes.invalid : ""
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <div className={`${classes.error} ${
        fieldIsTouched && (props.value.trim().length === 0) ? classes.invalid : ""
      }`}>{props.message}</div>
      <input
        onBlur={touchHandler}
        placeholder={props.placeholder}
        type={props.type}
        id={props.id}
        onChange={changeHandler}
        value={props.value}
      />
    </div>
  );
};

export default Input;
