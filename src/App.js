import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProfileComponent from "./components/ProfileComponent";
import HomeComponent from "./components/HomeComponent";
import TemplateDemo from "./components/UploadComponent";
import UploadAvatar from "./components/UploadAvatar";

import "primereact/resources/themes/lara-light-indigo/theme.css"; // Tema de PrimeReact
import "primereact/resources/primereact.min.css"; // Estilos base
import "primeicons/primeicons.css"; // Íconos de PrimeReact

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomeComponent />} />
          <Route path="/profile/:id" element={<ProfileComponent />} />
          <Route path="/upload-photos" element={<TemplateDemo />} />
          <Route path="/upload-modelo" element={<UploadAvatar />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
