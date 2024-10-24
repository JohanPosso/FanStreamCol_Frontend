import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "primereact/card";
import { Button } from "primereact/button";

const AdminEndpoints = () => {
  const navigate = useNavigate();

  // Lista de endpoints con título, descripción y la ruta a la que deben navegar
  const endpoints = [
    {
      title: "Crear Modelo",
      description: "Sube y administra las fotos del sistema.",
      route: "/upload-modelo",
    },
    {
      title: "Subir informacion de modelos",
      description: "Administra los usuarios de la plataforma.",
      route: "/upload-photos",
    },
    {
      title: "Settings",
      description: "Configura las opciones avanzadas del sistema.",
      route: "/settings",
    },
    {
      title: "View Reports",
      description: "Visualiza los reportes generados por el sistema.",
      route: "/reports",
    },
  ];

  // Manejador de la navegación
  const handleNavigate = (route) => {
    navigate(route);
  };

  return (
    <div className="p-grid p-justify-center p-align-center">
      {endpoints.map((endpoint, index) => (
        <div key={index} className="p-col-12 p-md-4 p-lg-3">
          <Card
            title={endpoint.title}
            className="p-shadow-3"
            subTitle={endpoint.description}
            style={{ borderRadius: "15px", padding: "1rem" }}
          >
            <Button
              label="Go"
              icon="pi pi-arrow-right"
              className="p-button-primary p-button-rounded"
              onClick={() => handleNavigate(endpoint.route)}
            />
          </Card>
        </div>
      ))}
    </div>
  );
};

export default AdminEndpoints;
