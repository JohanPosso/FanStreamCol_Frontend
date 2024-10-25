import React from "react";
import ReactPlayer from "react-player";

const VideoEmbebido = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <h1>Disfruta del Video</h1>
      <ReactPlayer
        url="http://localhost:4000/uploads/1729387676885-RPReplay_Final1618105022.MP4"
        controls
        width="100%"
        height="500px"
      />
      <p>Comparte este video con tus amigos y síguenos para más contenido.</p>
    </div>
  );
};

export default VideoEmbebido;
