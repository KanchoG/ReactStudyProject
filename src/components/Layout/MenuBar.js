import classes from "./MenuBar.module.css";
import { NavLink } from "react-router-dom";

const MenuBar = () => {
  return (
    <div className={classes.menu}>
      <NavLink activeClassName={classes.active} to="/crudmain">
        Users
      </NavLink>
      <NavLink activeClassName={classes.active} to="/crudtwo">
        Jobs
      </NavLink>
      <NavLink activeClassName={classes.active} to="/addjob">
        New Job
      </NavLink>
    </div>
  );
};

export default MenuBar;
