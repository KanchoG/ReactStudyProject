import GridCard from "./components/Layout/GridCard";
import MenuBar from "./components/Layout/MenuBar";
import Header from "./components/Layout/Header";
import JobList from "./components/JobListAPI/Jobs/JobList";
import { Fragment } from "react";

const CrudTwo = () => {
  const DUMMY_DATA = [
    {
      id: 1,
      department: "Finance",
      position: "Accountant",
      salary: 1500,
      validFrom: "10.08.2021",
      validTo: "10.08.2022",
    },
    {
        id: 2,
        department: "IT",
        position: "IT-Support",
        salary: 1500,
        validFrom: "10.08.2021",
        validTo: "10.08.2022",
      },
      {
        id: 3,
        department: "DEV",
        position: "Web Developer",
        salary: 1500,
        validFrom: "10.08.2021",
        validTo: "10.08.2022",
      },
  ];
  console.log(DUMMY_DATA);

  return (
    <Fragment>
      <JobList data={DUMMY_DATA} />
    </Fragment>
  );
};
export default CrudTwo;
