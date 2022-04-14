import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Coin from "./pages/Coin";
import Navbar from "./components/Navbar";
import Tracker from "./pages/Tracker";
import NotFound from "./components/NotFound.jsx";

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tracker" element={<Tracker />} />
        <Route path="/coin">
          <Route path=":coin" element={<Coin />} />
        </Route>
        <Route path="*" element={<NotFound />} /> // 404 page
      </Routes>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
