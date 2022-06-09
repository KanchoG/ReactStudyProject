import classes from "./GridCard.module.css";

const GridCard = (props) => {
  return <div className={classes.mainBody}>{props.children}</div>;
};

export default GridCard;
