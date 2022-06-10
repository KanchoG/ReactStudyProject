import { NavLink } from "react-router-dom";
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
