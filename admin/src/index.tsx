import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
// import { ContextProvider } from "./Context.tsx";

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
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
