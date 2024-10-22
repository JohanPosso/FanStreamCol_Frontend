import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CardComponent = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${apiUrl}/modelo`)
      .then((response) => setData(response.data))
      .catch((error) => console.error("Error al cargar usuarios:", error));
  }, [apiUrl]);

  return (
    <section className="py-5">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="bootstrap-tabs product-tabs">
              <div className="tabs-header d-flex justify-content-between border-bottom my-5">
                <h3>Trending Products</h3>
              </div>
              <div className="tab-content" id="nav-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="nav-all"
                  role="tabpanel"
                  aria-labelledby="nav-all-tab"
                >
                  <div className="product-grid row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-4">
                    {data.map((item) => (
                      <div
                        key={item.id}
                        className="col"
                        onClick={() => navigate(`/profile/${item.id}`)}
                      >
                        <div className="product-item">
                          <figure className="image-container">
                            <a href="#" title={item.name}>
                              <img
                                src={`${apiUrl}${item.avatar}`}
                                className="tab-image"
                                alt={item.name}
                              />
                            </a>
                          </figure>
                          <h3>
                            {item.name} {item.lastname}
                          </h3>
                        </div>
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
        .product-item {
          text-align: center;
          cursor: pointer;
          margin-bottom: 20px;
        }

        .image-container {
          width: 100%; /* Para que el contenedor ocupe todo el ancho disponible */
          height: 300px; /* Altura fija */
          overflow: hidden; /* Esconde las partes de la imagen que exceden el contenedor */
          border-radius: 8px; /* Bordes redondeados */
          display: flex; /* Usar flexbox para centrar la imagen */
          justify-content: center; /* Centra horizontalmente */
          align-items: center; /* Centra verticalmente */
          background-color: #f0f0f0; /* Color de fondo para el contenedor */
        }

        .tab-image {
          max-width: 100%; /* Mantiene la imagen dentro del ancho del contenedor */
          max-height: 100%; /* Asegura que la imagen no sobrepase la altura del contenedor */
          object-fit: contain; /* Mantiene la proporción de la imagen */
          transition: transform 0.2s; /* Suaviza el efecto de escalado */
        }

        .tab-image:hover {
          transform: scale(1.05); /* Efecto de escalado al pasar el ratón */
        }
      `}</style>
    </section>
  );
};

export default CardComponent;
