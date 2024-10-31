import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import axios from "axios"; // Importa Axios
import "./VideoEmbebido.css"; // Asegúrate de tener un archivo CSS para los estilos

const VideoView = () => {
  const { videoId } = useParams(); // Obtener el parámetro de la URL
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(true); // Para manejar el estado de carga
  const [error, setError] = useState(""); // Para manejar errores
  const apiUrl = process.env.REACT_APP_API_URL;
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        setLoading(true); // Inicia el estado de carga
        const response = await axios.get(`${apiUrl}/video/${videoId}`); // Realiza la llamada a la API

        if (response.data.message === "Video encontrado.") {
          setVideoUrl(response.data.video.ph_reference); // Establece la URL del video
        } else {
          setError("Video no encontrado.");
        }
      } catch (err) {
        setError("Error al cargar el video.");
        console.error(err);
      } finally {
        setLoading(false); // Finaliza el estado de carga
      }
    };

    if (videoId) {
      fetchVideo(); // Llama a la función para obtener el video
    }
  }, [videoId]);

  // Renderiza un mensaje de carga o de error si corresponde
  if (loading) return <p>Cargando video...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div
      style={{
        backgroundImage: 'url("/images/37265.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        width: "100%",
        position: "absolute",
        zIndex: -1,
      }}
    >
      <div className="video-container">
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

export default VideoView;
