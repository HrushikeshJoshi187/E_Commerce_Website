import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import Router from "./Router.tsx";

import "./index.css";

const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error(
    "Root element not found. Ensure there is an element with id 'root' in your HTML."
  );
  throw new Error("Application cannot be rendered without root element.");
}

createRoot(rootElement).render(
  <StrictMode>
    <Router />
  </StrictMode>
);
