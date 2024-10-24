import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { UserProvider } from "./contexts/UserContext"; // Asegúrate de que la ruta es correcta

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      {" "}
      {/* Envuelve tu aplicación con UserProvider */}
      <App />
    </UserProvider>
  </React.StrictMode>
);

reportWebVitals();
