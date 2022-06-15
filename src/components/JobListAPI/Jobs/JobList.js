import Button from "../UI/Button";
import classes from "./JobList.module.css";
import { db } from "../../../firebese-config";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import LoadingSpinner from "../../UsersAPI/UI/LoadingSpinner"
const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const userCollectionRef = collection(db, "jobs");
  const history = useHistory();
  const getUsers = async () => {
    setIsLoading(true);
    const data = await getDocs(userCollectionRef);
    setJobs(data.docs.map((job) => ({ ...job.data(), id: job.id })));
    setIsLoading(false);
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
  if (!isLoading) {
    return (
      <div className={classes.body}>
        {jobs.length !== 0 && (
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
                    <Button
                      onManage={() => editUserHandler(job)}
                      action="Edit"
                    />
                    <Button
                      onManage={() => deleteUserHandler(job.id)}
                      action="Delete"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {jobs.length === 0 && <p>No users found</p>}
        <NavLink to="/crudetwo/addjob" className={classes.link}>
          +
        </NavLink>
      </div>
    );
  } else {
    <LoadingSpinner/>
  }
};

export default JobList;
