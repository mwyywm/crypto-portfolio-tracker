import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SWRConfig } from "swr";
import Home from "./pages/Home";
import Coin from "./pages/Coin";
import Navbar from "./components/Navbar";
import Tracker from "./pages/Tracker";
import NotFound from "./components/NotFound.jsx";

ReactDOM.render(
  <React.StrictMode>
    <SWRConfig
      value={{
        fetcher: (url) => fetch(url).then((r) => r.json()),
        provider: () => new Map(),
      }}
    >
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tracker" element={<Tracker />} />
            <Route path="/coin">
              <Route path=":coin" element={<Coin />} />
            </Route>
            <Route path="*" element={<NotFound />} /> // 404 page
          </Routes>
        </main>
      </BrowserRouter>
    </SWRConfig>
  </React.StrictMode>,
  document.getElementById("root")
);
