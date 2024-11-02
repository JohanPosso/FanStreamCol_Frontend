import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "primereact/card";
import { Button } from "primereact/button";

const AdminEndpoints = () => {
  const navigate = useNavigate();

  // Lista de endpoints con título, descripción y la ruta a la que deben navegar
  const endpoints = [
    {
      title: "Gestionar modelos",
      description: "Sube y administra las fotos del sistema.",
      route: "/view-model",
    },
    {
      title: "Subir foto a modelos",
      description: "Administra los usuarios de la plataforma.",
      route: "/upload-photos",
    },
    {
      title: "Gestionar usuarios",
      description: "Listado de todos los usuarios almacenados en el sistema.",
      route: "/users",
    },
    {
      title: "Gestionar categorías",
      description: "Visualiza los reportes generados por el sistema.",
      route: "/categories",
    },
    {
      title: "Subir Video",
      description: "Permite subir un video para ser almacenado",
      route: "/upload-video",
    },
    {
      title: "Subir archivo a una categoria",
      description:
        "Permite subir fotos y/o videos a una categoria en especifico",
      route: "/uploadcatg-files",
    },
    {
      title: "Historial",
      description: "Revisa el historial de acciones realizadas.",
      route: "/history",
    },
    {
      title: "Soporte",
      description: "Contacta al soporte técnico.",
      route: "/support",
    },
  ];

  // Manejador de la navegación
  const handleNavigate = (route) => {
    navigate(route);
  };

  return (
    <div className="admin-endpoints">
      <h2 className="title">Administración de Endpoints</h2>
      <div className="grid-container">
        {endpoints.map((endpoint, index) => (
          <div key={index} className="grid-item">
            <Card className="p-shadow-3 endpoint-card">
              <div className="card-content">
                <h3>{endpoint.title}</h3>
                <p>{endpoint.description}</p>
                <Button
                  label="Ir"
                  icon="pi pi-arrow-right"
                  className="p-button-primary p-button-rounded"
                  onClick={() => handleNavigate(endpoint.route)}
                />
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminEndpoints;
