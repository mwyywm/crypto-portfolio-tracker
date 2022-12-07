import React from "react";
import "./notfound.css";
export default function NotFound() {
  document.title = "cpt - 404 page not found";
  return (
    <div className="not-found-div">
      <h1>404</h1>
      <p>This page does not exist</p>
    </div>
  );
}
