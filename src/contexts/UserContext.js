import React, { createContext, useContext, useState, useEffect } from "react";

// Crear el contexto del usuario
const UserContext = createContext();

// Hook para usar el contexto de usuario
export const useUser = () => useContext(UserContext);

// Proveedor del contexto que envuelve la aplicación
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Estado del usuario
  const [loading, setLoading] = useState(true); // Indicador de carga

  // Efecto para cargar el usuario desde localStorage al montar el componente
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false); // Finaliza la carga
  }, []);

  // Función para verificar si el usuario está logueado
  const isLoggedIn = () => !!user;

  // Función para verificar si el usuario es administrador
  const isAdmin = () => user?.role === "admin";

  // Función para iniciar sesión
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // Guardar usuario en localStorage
  };

  // Función para cerrar sesión
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); // Remover usuario de localStorage
  };

  return (
    <UserContext.Provider
      value={{ user, isLoggedIn, isAdmin, login, logout, loading }}
    >
      {children}
    </UserContext.Provider>
  );
};
