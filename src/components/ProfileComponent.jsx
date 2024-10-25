import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactPlayer from "react-player";
import "./ProfileComponent.css";

const ProfileComponent = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const { id } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [mediaFiles, setMediaFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiUrl}/modelo`)
      .then((response) => {
        setProfileData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar el perfil:", error);
        setError("Failed to load profile data.");
        setLoading(false);
      });
  }, [apiUrl]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiUrl}/${id}/photos`)
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

  const isVideoFile = (file) => {
    const videoExtensions = [".mp4", ".mov", ".avi", ".mkv"];
    return videoExtensions.some((ext) =>
      file.ph_reference.toLowerCase().endsWith(ext)
    );
  };

  const openModal = (index) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex < mediaFiles.length - 1 ? prevIndex + 1 : 0
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : mediaFiles.length - 1
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
              <img
                className="profile-picture"
                src={`${apiUrl}${user.avatar}`}
                alt="Perfil"
              />
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
                <button className="btn btn-primary">Seguir</button>
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
                    <div className="video-wrapper">
                      <ReactPlayer
                        url={media.ph_reference}
                        className="post-video"
                        width="100%"
                        height="100%"
                        controls
                      />
                    </div>
                  ) : (
                    <img
                      src={media.ph_reference}
                      alt={`Post ${index + 1}`}
                      className="post-image"
                      onClick={() => openModal(index)}
                    />
                  )}
                </div>
              ))
            )}
          </div>
          {isModalOpen && (
            <div className="modal" onClick={closeModal}>
              <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={mediaFiles[currentImageIndex].ph_reference}
                  alt={`Post ${currentImageIndex + 1}`}
                  className="modal-image"
                />
                <div className="modal-controls">
                  <button onClick={prevImage} className="modal-button">
                    Prev
                  </button>
                  <button onClick={nextImage} className="modal-button">
                    Next
                  </button>
                  <button onClick={closeModal} className="close-button">
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProfileComponent;
