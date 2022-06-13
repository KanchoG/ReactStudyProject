import CrudMain from "./CrudMain";
import CrudTwo from "./CrudTwo";
import { Route, Redirect } from "react-router-dom";
import NewJob from "./components/JobListAPI/Jobs/NewJob";
import Header from "./components/Layout/Header";
import MenuBar from "./components/Layout/MenuBar";
import GridCard from "./components/Layout/GridCard";
import Auth from "./components/Auth/Auth";
import AuthContext from "./store/auth-context";
import Manage from "./components/Auth/Manage";
import { useContext } from "react";

const App = () => {
  const authCtx = useContext(AuthContext);
  return (
    <GridCard>
      <Header />
      <MenuBar />
      {!authCtx.isLoggedIn && (
        <Route path="/" exact>
          <Redirect to="/login" />
        </Route>
      )}
      {authCtx.isLoggedIn && (
        <Route path="/" exact>
          <Redirect to="/crudtwo" />
        </Route>
      )}

      {!authCtx.isLoggedIn && (
        <Route path="/login">
          <Auth />
        </Route>
      )}

      <Route path="/crudmain">
        <CrudMain />
      </Route>

      {authCtx.isLoggedIn && (
        <Route path="/crudtwo">
          <CrudTwo />
        </Route>
      )}

      {authCtx.isLoggedIn && (
        <Route path="/crudetwo/addjob">
          <NewJob />
        </Route>
      )}

      {authCtx.isLoggedIn && (
        <Route path="/manage">
          <Manage />
        </Route>
      )}
      {!authCtx.isLoggedIn && (
        <Route path="*">
          <Redirect to="/login" />
        </Route>
      )}
      {authCtx.isLoggedIn && (
        <Route path="*">
          <Redirect to="/crudtwo" />
        </Route>
      )}
    </GridCard>
  );
};

export default App;
