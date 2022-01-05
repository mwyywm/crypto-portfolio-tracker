import React from "react";
import "./tracker.css";

function Tracker() {
  return (
    <section className="tracker">
      <h1>Portfolio tracker</h1>
      <p>we should be able to add/remove coins</p>
      <p>we should be able to Change value of holdings</p>
      <p>the information should be saved in localstorage</p>
      <div>
        <p>Add coin:</p>
        <input placeholder="Search..." />
      </div>
    </section>
  );
}

export default Tracker;
