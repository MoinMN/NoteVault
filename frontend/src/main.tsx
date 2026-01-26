import { createHead, UnheadProvider } from '@unhead/react/client'
import ScrollToTop from "./components/ScrollToTop";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App";
import "./index.css";

const head = createHead();

ReactDOM.hydrateRoot(
  document.getElementById("root")!,
  <React.StrictMode>
    <BrowserRouter>
      <UnheadProvider head={head}>
        <ScrollToTop />
        <App />
      </UnheadProvider>
    </BrowserRouter>
  </React.StrictMode>
);
