import Button from "../UI/Button";
import classes from "./JobList.module.css";
import { db } from "../../../firebese-config";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const userCollectionRef = collection(db, "jobs");
  const getUsers = async () => {
    const data = await getDocs(userCollectionRef);
    setJobs(data.docs.map((job) => ({ ...job.data(), id: job.id })));
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className={classes.body}>
      <table className={classes.table}>
        <thead>
          <tr className={classes.header}>
            <th className={classes.th1}>Department</th>
            <th>Position</th>
            <th>Salary</th>
            <th>Employed on</th>
            <th>Employed to</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr className={classes.rows} key={job.id}>
              <td>{job.department}</td>
              <td>{job.position}</td>
              <td>{job.salary}</td>
              <td>{job.validFrom}</td>
              <td>{job.validTo}</td>
              <td className={classes.buttons}>
                <Button action="Edit" />
                <Button action="Delete" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobList;
