import React from "react";
import ReactDOM from "react-dom";
import "./modal.css";

const Modal = React.forwardRef(
  ({ isShowing, children, setShowModal }, modalRef) => {
    return (
      <>
        {isShowing
          ? ReactDOM.createPortal(
              <div
                className="modal"
                ref={modalRef}
                onKeyDown={(e) => {
                  if (e.key === "Escape" || e.key === "Esc") {
                    setShowModal(false);
                  }
                }}
              >
                {children}
              </div>,
              document.getElementById("modal")
            )
          : null}
      </>
    );
  }
);
export default Modal;
