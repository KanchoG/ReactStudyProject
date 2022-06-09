import classes from "./NewJob.module.css";
import Input from "./Input";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../firebese-config";

const NewJob = () => {
  const [department, setDepartment] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState("");
  const [employedOn, setEmployedOn] = useState("");
  const [employedTo, setEmployedTo] = useState("");
  const jobCollectionRef = collection(db, "jobs");

  const depInputHandeler = (data) => {
    setDepartment(data);
  };
  const posInputHandeler = (data) => {
    setPosition(data);
  };
  const salInputHandeler = (data) => {
    setSalary(data);
  };
  const emOnInputHandeler = (data) => {
    setEmployedOn(data);
  };
  const emToInputHandeler = (data) => {
    setEmployedTo(data);
  };
  const newDataHandler = async () => {
    await addDoc(jobCollectionRef, {
      department,
      position,
      salary,
      validFrom: employedOn,
      validTo: employedTo,
    });
  };

  const startDate = new Date(employedOn);
  const endDate = new Date(employedTo);
  const submitDataHandler = (event) => {
    event.preventDefault();
    if (
      department.trim().length < 1 ||
      position.trim().length < 1 ||
      salary.trim().length < 1 ||
      startDate.getTime() > endDate.getTime()
    ) {
      console.log(startDate.getTime() < endDate.getTime());
      alert("Some of the data is not correct");
      return;
    }
    newDataHandler();
  };
  return (
    <form className={classes.form} onSubmit={submitDataHandler}>
      <Input
        type="text"
        id="department"
        label="Department"
        onInput={depInputHandeler}
        placeholder="Department"
        message="Please add correct department"
        value={department}
      />
      <Input
        type="text"
        id="position"
        label="Position"
        onInput={posInputHandeler}
        placeholder="Position"
        message="Please add correct position"
        value={position}
      />
      <Input
        type="number"
        id="salary"
        label="Salary"
        onInput={salInputHandeler}
        placeholder="00.00"
        message="Please add correct salary"
        value={salary}
      />
      <Input
        type="date"
        id="employedOn"
        label="Employed On"
        onInput={emOnInputHandeler}
        message="Please add correct date"
        value={employedOn}
      />
      <Input
        type="date"
        id="employedTo"
        label="Employed To"
        onInput={emToInputHandeler}
        message="Please add correct date"
        value={employedTo}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default NewJob;
