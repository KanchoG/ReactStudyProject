import CrudMain from "./CrudMain";
import CrudTwo from "./CrudTwo";
import { Route } from "react-router-dom";
import NewJob from "./components/JobListAPI/Jobs/NewJob";
import Header from "./components/Layout/Header";
import MenuBar from "./components/Layout/MenuBar";
import GridCard from "./components/Layout/GridCard";

const App = () => {
  return (
    <GridCard>
      <Header />
      <MenuBar />
      <Route path="/crudmain">
        <CrudMain />
      </Route>
      <Route path="/crudtwo">
        <CrudTwo />
      </Route>
      <Route path="/addjob">
        <NewJob />
      </Route>
    </GridCard>
  );
};

export default App;
