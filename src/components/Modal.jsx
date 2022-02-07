import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ isShowing, children }) =>
  isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div>{children}</div>
        </React.Fragment>,
        document.getElementById("modal")
      )
    : null;

export default Modal;
