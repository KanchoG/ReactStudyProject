import classes from "./MenuBar.module.css";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";

const MenuBar = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  return (
    <div className={classes.menu}>
      <NavLink activeClassName={classes.active} to="/crudmain">
        Users
      </NavLink>
      {isLoggedIn && <NavLink activeClassName={classes.active} to="/crudtwo">
        Jobs
      </NavLink>}
    </div>
  );
};

export default MenuBar;
