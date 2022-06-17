import classes from "./MenuBarMobile.module.css";
import "./MenuBarMobile.css"
import { useState, useRef, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import { CSSTransition } from "react-transition-group";

const MenuBarMobile = () => {
  const [click, setClick] = useState(false);
  const clickRef = useRef();
  const authCtx = useContext(AuthContext);
  const openMenuHandler = () => {
    setClick(!click);
  };

  const clickOutside = (event) => {
    if (clickRef.current.contains(event.target)) {
      return;
    } else {
      setClick(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", clickOutside);
    return () => document.removeEventListener("mousedown", clickOutside);
  }, [click]);

  return (
    <div className={classes.menu}>
      <div
        className={click ? classes.active : classes.icon}
        onClick={openMenuHandler}
      >
        <div></div>
        <div></div>
        <div></div>
      </div>
        <CSSTransition in={click} timeout={300} classNames="dropdown" mountOnEnter unmountOnExit>
          <ul ref={clickRef}>
            <li className={classes.link}>
              <NavLink onClick={openMenuHandler} to="/">
                {authCtx.isLoggedIn ? "Jobs" : "Home"}
              </NavLink>
            </li>
            <li className={classes.link}>
              <NavLink onClick={openMenuHandler} to="/crudmain">
                Users
              </NavLink>
            </li>
          </ul>
        </CSSTransition>
    </div>
  );
};

export default MenuBarMobile;
