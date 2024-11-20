import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query"; // Importamos useQuery de React Query
import axios from "axios";
import ReactPlayer from "react-player";
import { ProgressSpinner } from "primereact/progressspinner"; // Importamos ProgressSpinner de PrimeReact

// Función para obtener las fotos de la categoría
const fetchCategoryPhotos = async (id) => {
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}/photos-categories/${id}`
  );
  return response.data.reverse(); // Devuelve los datos
};

const CategoryGallery = () => {
  const { id } = useParams(); // Obtiene el ID de la categoría de la URL

  // Usamos useQuery de React Query para obtener las fotos y videos
  const {
    data: mediaItems,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categoryPhotos", id], // Usamos queryKey para identificar la consulta
    queryFn: () => fetchCategoryPhotos(id), // Función que obtiene los datos
  });

  if (isLoading) {
    return (
      <div className="category-gallery">
        <h2 className="category-title">Cargando...</h2>
        <div className="media-grid">
          {/* ProgressSpinner cargando */}
          {[...Array(6)].map((_, index) => (
            <div className="media-item" key={index}>
              <ProgressSpinner
                style={{ width: "50px", height: "50px" }}
                strokeWidth="4"
                fill="transparent"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="category-gallery">
        <h2 className="category-title">Error cargando los medios</h2>
        <div>{error.message}</div>
      </div>
    );
  }

  return (
    <div className="category-gallery">
      <div className="media-grid">
        {mediaItems.map((item) => (
          <div className="media-item" key={item.id_photo}>
            {item.ph_reference.toLowerCase().endsWith(".mp4") ? (
              <ReactPlayer
                url={item.ph_reference}
                controls
                width="100%"
                height="100%"
                className="media-content"
                config={{
                  file: {
                    attributes: {
                      preload: "metadata",
                    },
                  },
                }}
              />
            ) : (
              <img
                src={item.ph_reference}
                alt={`Photo ${item.id_photo}`}
                className="media-content"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryGallery;
