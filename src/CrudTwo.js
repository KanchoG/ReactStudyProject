import GridCard from "./components/Layout/GridCard";
import MenuBar from "./components/Layout/MenuBar";
import Header from "./components/Layout/Header";
import JobList from "./components/JobListAPI/Jobs/JobList";
import { Fragment } from "react";

const CrudTwo = () => {
  return (
    <Fragment>
      <JobList/>
    </Fragment>
  );
};
export default CrudTwo;
