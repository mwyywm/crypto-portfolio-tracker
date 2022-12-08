import React from "react";
import ReactDOM from "react-dom";
import "./modal.css";
import { useOnClickOutside } from "../hooks/useOnClickOutside";

const Modal = React.forwardRef(
  ({ isShowing, children, setShowModal }, modalRef) => {
    useOnClickOutside(modalRef, () => setShowModal(false)); // click outside of modal hook

    return (
      <>
        {isShowing
          ? ReactDOM.createPortal(
              <div
                className="outside-modal"
                onKeyDown={(e) => {
                  if (e.key === "Escape" || e.key === "Esc") {
                    setShowModal(false);
                  }
                }}
              >
                <div className="modal" ref={modalRef}>
                  {children}
                </div>
              </div>,
              document.getElementById("modal")
            )
          : null}
      </>
    );
  }
);
export default Modal;
