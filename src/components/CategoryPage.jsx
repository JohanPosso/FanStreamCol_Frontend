import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CategoryGallery = () => {
  const { id } = useParams(); // Obtiene el ID de la categoría de la URL
  const [photos, setPhotos] = useState([]); // Estado para almacenar las fotos
  const [categoryName, setCategoryName] = useState(""); // Estado para el nombre de la categoría (puedes obtenerlo de otra API si es necesario)

  useEffect(() => {
    const fetchCategoryPhotos = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/photos-categories/${id}`
        );
        setPhotos(response.data); // Asumiendo que la respuesta es un array de fotos
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
        {photos.map((photo) => (
          <div className="media-item" key={photo.id_photo}>
            <img
              src={photo.ph_reference}
              alt={`Photo ${photo.id_photo}`}
              className="media-content"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryGallery;
