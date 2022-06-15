import classes from "./Header.module.css";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import rdmImg from "../../pngkey.com-united-nations-logo-png-1391666.png";
import { Link } from "react-router-dom";

const Header = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const logoutHandler = () => {
    authCtx.logout();
  };
  return (
    <header className={classes.header}>
      <img src={rdmImg} alt="Radnom Logo" />
      <h1>This is the header text</h1>
      <ul>
        {isLoggedIn && (
          <li>
            <Link to="/manage">
              <button>Manage</button>
            </Link>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <button onClick={logoutHandler}>
              Logout 
            </button>
            <p className={classes.user}>{authCtx.userName}</p>
            
          </li>
        )}

        {!isLoggedIn && (
          <li>
            <Link to="/login">
              <button>Login</button>
            </Link>
          </li>
        )}
      </ul>
    </header>
  );
};

export default Header;
