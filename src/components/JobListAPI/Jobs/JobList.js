import Button from "../UI/Button";
import classes from "./JobList.module.css";
import { db } from "../../../firebese-config";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const userCollectionRef = collection(db, "jobs");
  const history = useHistory();
  const getUsers = async () => {
    const data = await getDocs(userCollectionRef);
    setJobs(data.docs.map((job) => ({ ...job.data(), id: job.id })));
  };
  useEffect(() => {
    getUsers();
  }, []);
  const deleteUserHandler = async (id) => {
    const userDoc = doc(db, "jobs", id);
    await deleteDoc(userDoc);
    getUsers();
  };
  const editUserHandler = (data) => {
    history.push({ pathname: "/crudetwo/addjob", state: data });
  };
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
                <Button onManage={() => editUserHandler(job)} action="Edit" />
                <Button
                  onManage={() => deleteUserHandler(job.id)}
                  action="Delete"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <NavLink to="/crudetwo/addjob" className={classes.link}>+</NavLink>
    </div>
  );
};

export default JobList;
