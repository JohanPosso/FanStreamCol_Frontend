import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import HeaderComponent from "./components/HeaderComponent";
import LoginComponent from "./components/LoginComponent";
import HomeComponent from "./components/HomeComponent";
import ProfileComponent from "./components/ProfileComponent";
import TemplateDemo from "./components/UploadComponent";
import UploadAvatar from "./components/UploadAvatar";
import { UserProvider } from "./contexts/UserContext";
import AdminRoute from "./components/AdminRoute";
import UserRoute from "./components/UserRoute";
import AdminEndpoints from "./components/AdminView";
import ProductsDemo from "./components/ModeloList";
import UserTlabe from "./components/UsersList";
import VideoView from "./components/VideoView";
import CategoryPage from "./components/CategoryPage";
import CategoriesDemo from "./components/CategoryList";
import VideoUpload from "./components/UploadVideo";
import UploadCatePhotoVideo from "./components/UploadCategoPhotos";
// Importaciones de PrimeReact
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

function AppContent() {
  const location = useLocation(); // Hook para obtener la ruta actual

  return (
    <div>
      {/* {location.pathname !== "/" && <HeaderComponent />} Normalmente es asi */}
      {/* Se agrego como este cambio mientras esta en prueba */}
      {<HeaderComponent />}
      <Routes>
        {/* Ruta de login */}
        <Route path="/login" element={<LoginComponent />} />
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminEndpoints />} />
          <Route path="/view-model" element={<ProductsDemo />} />
          <Route path="/upload-photos" element={<TemplateDemo />} />
          <Route path="/upload-modelo" element={<UploadAvatar />} />
          <Route path="/users" element={<UserTlabe />} />
          <Route path="/categories" element={<CategoriesDemo />} />
          <Route path="/upload-video" element={<VideoUpload />} />
          <Route
            path="/uploadcatg-files"
            element={<UploadCatePhotoVideo />}
          />{" "}
        </Route>
        {/* Ruta de home, accesible para usuarios */}
        <Route element={<UserRoute />}></Route>
        {/* Ruta de home, accesible para todos */}
        <Route path="/category/:id" element={<CategoryPage />} />
        <Route path="/profile/:id" element={<ProfileComponent />} />
        <Route path="/video/:videoId" element={<VideoView />} />
        {/* <Route path="/home" element={<HomeComponent />} />    Normalmente es asi */}
        {/* Se agrego como ruta principal mientras esta en prueba */}
        <Route path="/" element={<HomeComponent />} />{" "}
        <Route path="/home" element={<HomeComponent />} />{" "}
      </Routes>
    </div>
  );
}

function App() {
  return (
    <UserProvider>
      <Router>
        <AppContent />
      </Router>
    </UserProvider>
  );
}

export default App;
