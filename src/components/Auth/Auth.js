import classes from "./Auth.module.css";
import { useState, useContext } from "react";
import AuthContext from "../../store/auth-context";
import { useHistory } from "react-router-dom";

const Auth = () => {
  const [mailInput, setMailInput] = useState("");
  const [passInput, setPassInput] = useState("");
  const [accountCreate, setAccountCreate] = useState(false);
  const [mailIsTouched, setMailIsTouched] = useState(false);
  const [passIsTouched, setPassisTouched] = useState(false);

  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const mailChangeHandler = (event) => {
    setMailInput(event.target.value);
    setMailIsTouched(false);
  };
  const passChangeHandler = (event) => {
    setPassInput(event.target.value);
    setPassisTouched(false);
  };
  const mailBlurHandler = () => {
    setMailIsTouched(true);
  };
  const passBlurHandler = () => {
    setPassisTouched(true);
  };
  const mailValidation = (input) => {
    const re = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return re.test(input);
  };
  const submitDataHandler = (event) => {
    event.preventDefault();
    let url;
    if (accountCreate) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDI36BeH14ajIFHrNrsVZ_3PylBdKZfoxw";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDI36BeH14ajIFHrNrsVZ_3PylBdKZfoxw";
    }

    if (mailValidation(mailInput) && passInput.trim().length > 6) {
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: mailInput,
          password: passInput,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            res.json().then((data) => {
              let errorMessage = "Authentication failed!";
              if (data.error.message) {
                errorMessage = data.error.message;
              }
              alert(errorMessage);
              throw new Error(errorMessage);
            });
          }
        })
        .then((data) => {
          authCtx.login(data.idToken);
          history.replace("/crudtwo");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("invalid credentials");
      return;
    }
  };
  const signUpHandler = () => {
    setAccountCreate(!accountCreate);
  };

  return (
    <div className={classes.container}>
      <h1>{accountCreate ? "Sign Up" : "Login"}</h1>
      <form onSubmit={submitDataHandler}>
        <div
          className={`${classes.form} ${
            mailIsTouched && !mailValidation(mailInput) ? classes.invalid : ""
          }`}
        >
          <label htmlFor="mail">E-mail</label>
          <span> Please enter a correct e-mail!</span>
          <input
            type="email"
            id="mail"
            onChange={mailChangeHandler}
            onBlur={mailBlurHandler}
          />
        </div>
        <div
          className={`${classes.form} ${
            passIsTouched && passInput.trim().length < 6 ? classes.invalid : ""
          }`}
        >
          <label htmlFor="pass">Password</label>
          <span> Please enter a correct password!</span>
          <input
            type="password"
            id="pass"
            onChange={passChangeHandler}
            onBlur={passBlurHandler}
          />
        </div>
        <div className={classes.form}>
          <button type="submit">{accountCreate ? "Sign Up" : "Sign In"}</button>
          <button type="button" onClick={signUpHandler}>
            {accountCreate ? "Back" : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Auth;
