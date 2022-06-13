import classes from "./Manage.module.css";
import { useRef, useContext } from "react";
import AuthContext from "../../store/auth-context";
import { useHistory } from "react-router-dom";

const Manage = () => {
  const inputRef = useRef();
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const formSubmitHandler = (event) => {
    event.preventDefault();
    const enteredPassword = inputRef.current.value;
    if (enteredPassword.trim().length < 6) {
      console.log("Authentication Failed!");
      return;
    } else {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDI36BeH14ajIFHrNrsVZ_3PylBdKZfoxw",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: authCtx.token,
            password: enteredPassword,
            returnSecureToken: false,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        if (res.ok) {
        history.replace("/crudtwo")
        } else {
          res.json().then((data) => {
            let errorMessage = "Authentication failed!";
            // if (data.error.message) {
            //   errorMessage = data.error.message;
            // }
            throw new Error(errorMessage);
          });
        }
      });
    }
  };
  return (
    <div className={classes.container}>
      <h1>New Password</h1>
      <form className={classes.form} onSubmit={formSubmitHandler}>
        <input type="password" id="pass" ref={inputRef} />
        <button type="submit">Change</button>
      </form>
    </div>
  );
};

export default Manage;
