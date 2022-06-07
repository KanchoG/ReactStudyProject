import classes from "./DeleteButton.module.css";
const DeleteButton = (props) => {
  return (
    <button className={classes.button} onClick={props.onDelete}>
      Delete
    </button>
  );
};

export default DeleteButton;
