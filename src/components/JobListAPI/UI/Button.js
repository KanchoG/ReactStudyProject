import classes from "./Button.module.css"

const Button = (props) => {
  return <button className={classes.button}>{props.action}</button>;
};

export default Button;
