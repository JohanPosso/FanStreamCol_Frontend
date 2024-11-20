import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query"; // Importamos useQuery de React Query
import axios from "axios";
import ReactPlayer from "react-player";
import { Skeleton } from "primereact/skeleton"; // Importamos Skeleton de PrimeReact

// Función para obtener las fotos de la categoría
const fetchCategoryPhotos = async (id) => {
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}/photos-categories/${id}`
  );
  return response.data; // Devuelve los datos
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
          {/* Skeleton Loading para cada item de la galería */}
          {[...Array(6)].map((_, index) => (
            <div className="media-item" key={index}>
              <Skeleton width="100%" height="200px" className="media-content" />
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
      <h2 className="category-title">Galería de Categoría</h2>
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
