import CrudMain from "./CrudMain";
import CrudTwo from "./CrudTwo";
import { Route } from "react-router-dom";
import NewJob from "./components/JobListAPI/Jobs/NewJob";
import Header from "./components/Layout/Header";
import MenuBar from "./components/Layout/MenuBar";
import GridCard from "./components/Layout/GridCard";
import Auth from "./components/Auth/Auth";
import { Redirect } from "react-router-dom";

const App = () => {
  return (
    <GridCard>
      <Header />
      <MenuBar />
      <Route path="/" exact >
        <Redirect to="/login"/>
      </Route>
      <Route path="/login" >
        <Auth />
      </Route>
      <Route path="/crudmain">
        <CrudMain />
      </Route>
      <Route path="/crudtwo">
        <CrudTwo />
      </Route>
      <Route path="/crudetwo/addjob">
        <NewJob />
      </Route>
    </GridCard>
  );
};

export default App;
