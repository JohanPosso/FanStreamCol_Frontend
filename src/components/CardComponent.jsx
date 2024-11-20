import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query"; // Importar useQuery desde react-query
import axios from "axios";
import { Skeleton } from "primereact/skeleton"; // Importar Skeleton desde primereact

// Función para obtener los modelos
const fetchModels = async () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const response = await axios.get(`${apiUrl}/modelo`);
  return response.data; // Retornar los datos obtenidos
};

const CardComponent = () => {
  const navigate = useNavigate();

  // Usar useQuery para obtener los modelos desde la API
  const { data, isLoading, error } = useQuery({
    queryKey: ["models"],
    queryFn: fetchModels, // Función para obtener los datos
    retry: false, // Evitar reintentos automáticos en caso de error
  });

  if (isLoading) {
    return (
      <section className="py-5">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="bootstrap-tabs product-tabs">
                <div className="tabs-header d-flex justify-content-between border-bottom my-5">
                  <h3>Destacados</h3>
                </div>
                <div className="tab-content" id="nav-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="nav-all"
                    role="tabpanel"
                    aria-labelledby="nav-all-tab"
                  >
                    <div className="product-grid">
                      {[...Array(6)].map((_, index) => (
                        <div key={index} className="product-item">
                          <Skeleton
                            width="100%"
                            height="200px"
                            className="tab-image"
                          />
                          <Skeleton
                            width="60%"
                            height="20px"
                            className="product-name"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-5">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <h3>Error al cargar los modelos</h3>
              <div>{error.message}</div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-5">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="bootstrap-tabs product-tabs">
              <div className="tabs-header d-flex justify-content-between border-bottom my-5">
                <h3>Destacados</h3>
              </div>
              <div className="tab-content" id="nav-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="nav-all"
                  role="tabpanel"
                  aria-labelledby="nav-all-tab"
                >
                  <div className="product-grid">
                    {data.map((item) => (
                      <div
                        key={item.id}
                        className="product-item"
                        onClick={() => navigate(`/profile/${item.id}`)}
                      >
                        <img
                          src={item.avatar}
                          className="tab-image"
                          alt={item.name}
                        />
                        <h3 className="product-name">
                          {item.name} {item.lastname}
                        </h3>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .product-grid {
          display: grid;
          grid-template-columns: repeat(
            auto-fill,
            minmax(200px, 1fr)
          ); /* Ajusta el tamaño mínimo según lo necesario */
          gap: 15px; /* Espaciado entre las tarjetas */
          padding: 0; /* Elimina el padding alrededor de la grilla */
        }

        .product-item {
          text-align: center;
          cursor: pointer;
          border-radius: 8px; /* Bordes redondeados */
          overflow: hidden; /* Evita que las imágenes salgan del contenedor */
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Sombra sutil para las tarjetas */
          transition: transform 0.2s; /* Suaviza el efecto de escalado */
        }

        .product-item:hover {
          transform: scale(1.03); /* Efecto de escalado al pasar el ratón */
        }

        .tab-image {
          width: 100%; /* Mantiene la imagen dentro del ancho del contenedor */
          height: 200px; /* Mantiene la relación de aspecto de la imagen */
          object-fit: cover; /* Ajusta la imagen manteniendo su proporción */
          transition: transform 0.2s; /* Suaviza el efecto de escalado */
        }

        .product-name {
          margin: 10px 0 0; /* Espaciado entre el nombre y la imagen */
          font-size: 1.1rem; /* Tamaño de fuente más grande para los nombres */
          color: #333; /* Color del texto */
        }
      `}</style>
    </section>
  );
};

export default CardComponent;
