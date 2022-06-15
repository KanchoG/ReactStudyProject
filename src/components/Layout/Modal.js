import { Fragment } from "react";
import classes from "./Modal.module.css";
import ReactDOM from "react-dom";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

const ModalOverlay = (props) => {
  return <div className={classes.overlay}>{props.children}</div>;
};

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        document.getElementById("overlay")
      )}
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        document.getElementById("backdrop")
      )}
    </Fragment>
  );
};

export default Modal;
