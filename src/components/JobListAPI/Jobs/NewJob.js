import classes from "./NewJob.module.css";
import Input from "./Input";
import { useState } from "react";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebese-config";
import { useHistory, useLocation } from "react-router-dom";

const NewJob = () => {
  let valueData = {
    department: "",
    position: "",
    salary: "",
    employedOn: "",
    employedTo: "",
  };
  const location = useLocation();
  if (location.state) {
    valueData = {
      department: location.state.department,
      position: location.state.position,
      salary: location.state.salary,
      employedOn: location.state.employedOn,
      employedTo: location.state.employedTo,
    };
  }
  const [department, setDepartment] = useState(valueData.department);
  const [position, setPosition] = useState(valueData.position);
  const [salary, setSalary] = useState(valueData.salary);
  const [employedOn, setEmployedOn] = useState(valueData.employedOn);
  const [employedTo, setEmployedTo] = useState(valueData.employedTo);
  const jobCollectionRef = collection(db, "jobs");
  const history = useHistory();

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
      alert("Some of the data is not correct");
      return;
    }
    newDataHandler();
    history.push("/crudtwo");
  };
  const editUserHandler = async (event) => {
    event.preventDefault();
    const userDoc = doc(db, "jobs", location.state.id);
    const updatedJob = {
      department,
      position,
      salary,
      employedOn,
      employedTo,
    };
    if (
      department.trim().length < 1 ||
      position.trim().length < 1 ||
      salary.trim().length < 1 ||
      startDate.getTime() > endDate.getTime()
    ) {
      alert("Some of the data is not correct");
      return;
    }
    await updateDoc(userDoc, updatedJob);
    history.push("/crudtwo");
  };

  return (
    <form
      className={classes.form}
      onSubmit={location.state ? editUserHandler : submitDataHandler}
    >
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
      <button type="submit">{location.state ? "Edit" : "Submit"}</button>
    </form>
  );
};

export default NewJob;
