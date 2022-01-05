import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Coin from "./pages/Coin";
import Navbar from "./components/Navbar";
import Tracker from "./pages/Tracker";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="tracker" element={<Tracker />} />
        <Route path="coin">
          <Route path=":coin" element={<Coin />} />
        </Route>
        <Route path="*" element={<Home />} /> // TODO:404 page "home for now"
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
