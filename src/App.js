import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeaderComponent from "./components/HeaderComponent";
import LoginComponent from "./components/LoginComponent";
import HomeComponent from "./components/HomeComponent";
import ProfileComponent from "./components/ProfileComponent";
import TemplateDemo from "./components/UploadComponent";
import UploadAvatar from "./components/UploadAvatar";
import { UserProvider } from "./contexts/UserContext";
// Importaciones de PrimeReact
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import AdminRoute from "./components/AdminRoute";
import AdminEndpoints from "./components/AdminView";

function App() {
  return (
    <UserProvider>
      <Router>
        <div>
          <HeaderComponent />
          <Routes>
            {/* Ruta de login */}
            <Route path="/" element={<LoginComponent />} />
            <Route path="/admin" element={<AdminEndpoints />} />

            {/* Ruta de home, accesible para todos */}
            <Route path="/home" element={<HomeComponent />} />

            {/* Ruta para el perfil del usuario */}
            <Route path="/profile/:id" element={<ProfileComponent />} />

            {/* Rutas accesibles solo para administradores */}
            <Route element={<AdminRoute />}>
              <Route path="/upload-photos" element={<TemplateDemo />} />
            </Route>

            {/* Ruta para cargar avatares */}
            <Route path="/upload-modelo" element={<UploadAvatar />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
