import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ProfileComponent.css"; // Asegúrate de importar tus estilos

const ProfileComponent = () => {
  const { id } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [mediaFiles, setMediaFiles] = useState([]);
  // const [modalOpen, setModalOpen] = useState(false);
  // const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:4000/modelo")
      .then((response) => {
        setProfileData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar el perfil:", error);
        setError("Failed to load profile data.");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:4000/${id}/photos`)
      .then((response) => {
        setMediaFiles(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar las fotos:", error);
        setError("Failed to load media files.");
        setLoading(false);
      });
  }, [id]);

  const user = profileData
    ? profileData.find((e) => e.id === Number(id))
    : null;

  // const openModal = (index) => {
  //   setCurrentMediaIndex(index);
  //   setModalOpen(true);
  // };

  // const closeModal = () => {
  //   setModalOpen(false);
  // };

  // const goToNextMedia = () => {
  //   setCurrentMediaIndex((prevIndex) =>
  //     prevIndex === mediaFiles.length - 1 ? 0 : prevIndex + 1
  //   );
  // };

  // const goToPrevMedia = () => {
  //   setCurrentMediaIndex((prevIndex) =>
  //     prevIndex === 0 ? mediaFiles.length - 1 : prevIndex - 1
  //   );
  // };

  const isVideoFile = (file) => {
    const videoExtensions = [".mp4", ".mov", ".avi", ".mkv"];
    return videoExtensions.some((ext) =>
      file.ph_reference.toLowerCase().endsWith(ext)
    );
  };

  return (
    <div className="container-profile">
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {profileData && user && (
        <>
          <div className="profile-header">
            <div className="profile-picture">
              <img src={`http://localhost:4000${user.avatar}`} alt="Perfil" />
            </div>
            <div className="profile-info">
              <h2>
                {user.name} {user.lastname}
              </h2>
              <div className="profile-stats">
                <span>5,498 posts</span>
                <span>25.3M followers</span>
                <span>3,757 Likes</span>
              </div>
              <div className="profile-bio">
                <p>Entrepreneur</p>
                <p>{user.instagram}</p>
                <div className="profile-links">
                  <a
                    href="https://linktr.ee/bellathornedab"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    linktr.ee/bellathornedab
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="tabs">
            <div>ALL</div>
            <div>PHOTOS</div>
            <div>VIDEOS</div>
          </div>
          <div className="post-grid">
            {mediaFiles.length === 0 ? (
              <p>No media files available.</p>
            ) : (
              mediaFiles.map((media, index) => (
                <div className="media-container" key={index}>
                  {isVideoFile(media) ? (
                    <video
                      src={media.ph_reference}
                      controls
                      className="post-video"
                      preload="metadata"
                      // onClick={() => openModal(index)}
                    />
                  ) : (
                    <img
                      src={media.ph_reference}
                      alt={`Post ${index + 1}`}
                      className="post-image"
                      // onClick={() => openModal(index)}
                    />
                  )}
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileComponent;
