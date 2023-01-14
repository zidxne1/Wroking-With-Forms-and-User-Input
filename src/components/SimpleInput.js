import { useState } from "react";
import userInput from "../hooks/use-input";

const SimpleInput = (props) => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameinputHasError,
    valueChangeHandler: nameChangedHanlder,
    inputBlurHandler: nameblurHandler,
    reset: resetNameInput,
  } = userInput((value) => value.trim() !== "");

  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredNameIsTouched, setEnteredNameTouched] = useState(false);
  const [enteredEmailIsTouched, setEnteredEmailTouched] = useState(false);

  const emailIsValid = enteredEmail.includes("@");
  const emailIsInvalid = enteredEmailIsTouched && !emailIsValid;

  let formIsDisabled = false;

  if (enteredNameIsValid && emailIsValid) {
    formIsDisabled = true;
  }

  const emailInputChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const emailInputBlurHandler = (event) => {
    setEnteredEmailTouched(true);
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    setEnteredNameTouched(true);
    setEnteredEmail(true);

    if (!enteredNameIsValid) {
      return;
    }

    console.log(enteredName);

    resetNameInput();

    setEnteredNameTouched(false);
    setEnteredEmailTouched(false);
  };

  const nameInputClasses = nameinputHasError
    ? "form-control invalid"
    : "form-control ";

  const emailInputClasses = emailIsInvalid
    ? "form-control invalid"
    : "form-control ";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameChangedHanlder}
          onBlur={nameblurHandler}
          value={enteredName}
        />
        {nameinputHasError && (
          <p className="error-text">Name must not be empty.</p>
        )}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="email">Your Email</label>
        <input
          type="text"
          id="email"
          onChange={emailInputChangeHandler}
          onBlur={emailInputBlurHandler}
          value={enteredEmail}
        />
        {emailIsInvalid && (
          <p className="error-text">Please enter a vaild email.</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsDisabled}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
