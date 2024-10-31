import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactPlayer from "react-player"; // Importa ReactPlayer

const CategoryGallery = () => {
  const { id } = useParams(); // Obtiene el ID de la categoría de la URL
  const [mediaItems, setMediaItems] = useState([]); // Estado para almacenar fotos y videos
  const [categoryName, setCategoryName] = useState(""); // Estado para el nombre de la categoría

  useEffect(() => {
    const fetchCategoryPhotos = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/photos-categories/${id}`
        );
        setMediaItems(response.data); // Asumiendo que la respuesta es un array de fotos y videos
        // Aquí podrías agregar una llamada para obtener el nombre de la categoría si lo deseas
      } catch (error) {
        console.error("Error fetching category photos:", error);
      }
    };
    fetchCategoryPhotos();
  }, [id]);

  return (
    <div className="category-gallery">
      <h2 className="category-title">{categoryName}</h2>
      <div className="media-grid">
        {mediaItems.map((item) => (
          <div className="media-item" key={item.id_photo}>
            {item.ph_reference.toLowerCase().endsWith(".mp4") ? ( // Convierte a minúsculas para la comparación
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
