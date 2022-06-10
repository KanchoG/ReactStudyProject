import classes from "./Header.module.css";
import rdmImg from "../../pngkey.com-united-nations-logo-png-1391666.png";

const Header = (props) => {
  return (
    <header className={classes.header}>
      <img src={rdmImg} alt="Radnom Logo" />
      <h1>This is the header text</h1>
      <button onClick={props.onShowUsers}>Logout</button>
    </header>
  );
};

export default Header;
