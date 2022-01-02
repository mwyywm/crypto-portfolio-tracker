import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Coin from "./pages/Coin";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <div className="header">
        <h1>Crypto Tracker</h1>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path=":coin" element={<Coin />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
