// VideoEmbebido.jsx
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import "./VideoEmbebido.css"; // Asegúrate de tener un archivo CSS para los estilos

const VideoEmbebido = () => {
  const { videoId } = useParams(); // Obtener el parámetro de la URL
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    // Cambiar la URL del video según el ID recibido
    if (videoId) {
      setVideoUrl(`http://localhost:4000/uploads/${videoId}`); // Cambia esto por tu URL real
    }
  }, [videoId]);

  // Función para compartir el video en Facebook

  return (
    <div
      style={{
        backgroundImage: 'url("/images/37265.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh", // Ocupa toda la altura del contenedor
        width: "100%", // Ocupa todo el ancho del contenedor
        position: "absolute", // Posición absoluta para cubrir todo el contenedor
        zIndex: -1, // Asegúrate de que esté detrás del contenido
      }}
    >
      <div className="video-container ">
        <div className="video-header">
          <h1 style={{ color: "wheat" }}>Bienvenido a FanStream</h1>
          <p>Disfruta de nuestro contenido exclusivo cada día.</p>
        </div>

        <div className="video-player">
          <ReactPlayer url={videoUrl} controls width="100%" height="100%" />
        </div>

        <div className="video-footer">
          <p>
            ¿Te ha gustado el video? ¡Compártelo con tus amigos y síguenos para
            más contenido exclusivo!
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoEmbebido;
