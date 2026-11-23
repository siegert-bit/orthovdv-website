import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "@/index.css";
import App from "@/App";

const container = document.getElementById("root");
const app = (
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Staat de pagina al als HTML klaar (vooraf gebouwd), dan nemen we die over.
if (container.hasChildNodes()) {
  ReactDOM.hydrateRoot(container, app);
} else {
  ReactDOM.createRoot(container).render(app);
}
