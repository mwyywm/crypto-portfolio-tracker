import React from "react";
import ReactDOM from "react-dom";
import "./modal.css";

const Modal = React.forwardRef(({ isShowing, children }, modalRef) => {
  return (
    <>
      {isShowing
        ? ReactDOM.createPortal(
            <div className="modal" ref={modalRef}>
              {children}
            </div>,
            document.getElementById("modal")
          )
        : null}
    </>
  );
});
export default Modal;
