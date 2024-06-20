import React from "react";
import { hydrateRoot, ReactDOM } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

hydrateRoot(document.getElementById("root"), <App />);
