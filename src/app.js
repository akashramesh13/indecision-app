import React from "react";
import { createRoot } from "react-dom/client";
import IndecisionApp from "./components/IndecisionApp";
import "normalize.css/normalize.css";
import "./styles/styles.scss";

const container = document.getElementById("app");
const root = createRoot(container);

root.render(<IndecisionApp />);
