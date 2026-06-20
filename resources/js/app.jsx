import './bootstrap';
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
// import Router from "./Router";


createRoot(document.getElementById("app"))
.render(
    <BrowserRouter>
        <App />
        {/* <Router /> */}
    </BrowserRouter>
);
