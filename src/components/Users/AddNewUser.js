import { useState } from "react";

import classes from "./AddNewUser.module.css";
import Modal from "../UI/Modal";

const AddNewUser = (props) => {
  const [nameIsTouched, setNameIsTouched] = useState(false);
  const [inputName, setInputName] = useState(props.personData.name);
  const [lastNameIsTouched, setlastNameIsTouched] = useState(false);
  const [inputLastName, setInputLastName] = useState(props.personData.lastName);
  const [mailIsTouched, setMailIsTouched] = useState(false);
  const [inputMail, setInputMail] = useState(props.personData.mail);
  const [phoneIsTouched, setPhoneIsTouched] = useState(false);
  const [inputPhone, setInputPhone] = useState(props.personData.number);
  const [inputDescription, setInputDescription] = useState(
    props.personData.description
  );

  const nameValidateHandler = () => {
    setNameIsTouched(true);
  };
  const nameChangeHandler = (event) => {
    setInputName(event.target.value);
  };
  // useEffect(()=>{
  //   const timeoutTry = setTimeout(()=> {
  //     console.log(inputName);
  //   },[300])
  //   return clearTimeout(timeoutTry)
  // }, [inputName])

  const lastNameValidateHandler = () => {
    setlastNameIsTouched(true);
  };
  const lastNameChangeHandler = (event) => {
    setInputLastName(event.target.value);
  };
  const mailValidateHandler = () => {
    setMailIsTouched(true);
  };
  const mailChangeHandler = (event) => {
    setInputMail(event.target.value);
  };
  const phoneValidateHandler = () => {
    setPhoneIsTouched(true);
  };
  const phoneChangeHandler = (event) => {
    setInputPhone(event.target.value);
  };

  const descriptionChangeHandler = (event) => {
    setInputDescription(event.target.value);
  };

  const phoneValidation = (input) => {
    const re = /08[7-9][0-9]{7}/;
    return re.test(input);
  };
  const mailValidation = (input) => {
    const re = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return re.test(input);
  };
  let description = "No description";
  if (inputDescription.trim().length > 1) {
    description = inputDescription;
  }
  const data = {
    name: inputName,
    lastName: inputLastName,
    mail: inputMail,
    number: inputPhone,
    description: description,
  };
  const closeModal = props.onClose;

  const formIsValid =
    inputName.trim().length > 1 &&
    inputLastName.trim().length > 1 &&
    mailValidation(inputMail) &&
    phoneValidation(inputPhone);
  const userHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      props.onManageUser(data);
      closeModal();
    }

    return;
  };

  return (
    <Modal onClose={closeModal}>
      <form className={classes.form} onSubmit={userHandler}>
        <div
          className={`${classes.input} ${
            nameIsTouched === true && inputName.trim().length < 1
              ? classes.invalid
              : ""
          }`}
        >
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            onBlur={nameValidateHandler}
            onChange={nameChangeHandler}
            value={inputName}
          />
        </div>
        <div
          className={`${classes.input} ${
            lastNameIsTouched === true && inputLastName.trim().length < 1
              ? classes.invalid
              : ""
          }`}
        >
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            onBlur={lastNameValidateHandler}
            onChange={lastNameChangeHandler}
            value={inputLastName}
          />
        </div>
        <div
          className={`${classes.input} ${
            mailIsTouched === true && !mailValidation(inputMail)
              ? classes.invalid
              : ""
          }`}
        >
          <label htmlFor="email">E-mail</label>
          <input
            type="text"
            id="email"
            onBlur={mailValidateHandler}
            onChange={mailChangeHandler}
            value={inputMail}
          />
        </div>
        <div
          className={`${classes.input} ${
            phoneIsTouched === true && !phoneValidation(inputPhone)
              ? classes.invalid
              : ""
          }`}
        >
          <label htmlFor="phone">Phone Number</label>
          <input
            type="text"
            id="phone"
            onBlur={phoneValidateHandler}
            onChange={phoneChangeHandler}
            value={inputPhone}
          />
        </div>
        <div className={classes.input}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            rows="5"
            onChange={descriptionChangeHandler}
            value={inputDescription}
          />
        </div>
        <button type="submit">{props.button}</button>
        <button onClick={closeModal}>Close</button>
      </form>
    </Modal>
  );
};

export default AddNewUser;
