import Button from "../UI/Button";
import classes from "./JobList.module.css";

const JobList = (props) => {
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
          {props.data.map((job) => (
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
