import React from "react";
import ReactDOM from "react-dom";
import "./modal.css";

const Modal = ({ isShowing, children }) =>
  isShowing &&
  ReactDOM.createPortal(
    <React.Fragment>
      <div className="modal">{children}</div>
    </React.Fragment>,
    document.getElementById("modal")
  );
export default Modal;
