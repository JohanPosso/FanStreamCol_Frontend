import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

const AdminRoute = () => {
  const { isLoggedIn, isAdmin, loading } = useUser();

  if (loading) {
    // Mostrar un indicador de carga mientras los datos del usuario están siendo cargados
    return <div>Loading...</div>;
  }

  if (!isLoggedIn()) {
    // Si el usuario no está logueado, redirigir a la página de login
    return <Navigate to="/" />;
  }

  if (!isAdmin()) {
    // Si el usuario no tiene el rol de admin, redirigir a una página de acceso denegado
    return <Navigate to="/not-authorized" />;
  }

  // Si el usuario está logueado y es admin, mostrar la ruta solicitada
  return <Outlet />;
};

export default AdminRoute;
