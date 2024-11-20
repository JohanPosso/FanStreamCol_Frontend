import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ReactPlayer from "react-player";
import { ProgressSpinner } from "primereact/progressspinner"; // Importamos ProgressSpinner de PrimeReact
import { Button } from "primereact/button";
import axios from "axios";
import "./ProfileComponent.css";

// Función para cargar los datos del perfil
const fetchProfileData = async (apiUrl) => {
  const response = await axios.get(`${apiUrl}/modelo`);
  return response.data;
};

// Función para cargar los archivos multimedia
const fetchMediaFiles = async (apiUrl, id) => {
  const response = await axios.get(`${apiUrl}/${id}/photos`);
  return response.data.reverse();
};

const ProfileComponent = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const { id } = useParams();

  const [filter, setFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Cargar datos del perfil usando React Query
  const {
    data: profileData,
    isLoading: profileLoading,
    error: profileError,
  } = useQuery({
    queryKey: ["profileData"],
    queryFn: () => fetchProfileData(apiUrl),
  });

  // Cargar archivos multimedia
  const {
    data: mediaFiles,
    isLoading: mediaLoading,
    error: mediaError,
  } = useQuery({
    queryKey: ["mediaFiles", id],
    queryFn: () => fetchMediaFiles(apiUrl, id),
    enabled: !!id,
  });

  const user = profileData?.find((e) => e.id === Number(id));

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

  const closeModal = () => setIsModalOpen(false);

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

  const filteredMediaFiles = mediaFiles?.filter((media) => {
    if (filter === "photos") return !isVideoFile(media);
    if (filter === "videos") return isVideoFile(media);
    return true;
  });

  if (profileError || mediaError) {
    return <p>Error: {profileError?.message || mediaError?.message}</p>;
  }

  return (
    <div className="container-profile">
      {profileLoading || mediaLoading ? (
        <div className="loading-container">
          <ProgressSpinner
            style={{ width: "50px", height: "50px" }}
            strokeWidth="4"
            fill="transparent"
          />
        </div>
      ) : (
        profileData &&
        user && (
          <>
            <div className="profile-header">
              <div className="profile-picture">
                <img
                  className="profile-picture"
                  src={`${user.avatar}`}
                  alt="Perfil"
                />
              </div>
              <div className="profile-info">
                <h2>
                  {user.name} {user.lastname}
                </h2>
                <div className="profile-stats">
                  <span>{mediaFiles.length} posts</span>
                  <span>25.3M followers</span>
                  <span>3,757 Likes</span>
                </div>
                <div className="profile-bio">
                  <button className="btn btn-primary">Likes</button>
                  <p>{user.instagram}</p>
                  <div className="profile-links">
                    <a
                      href={user.otraredsocial}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {user.otraredsocial}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="tabs">
              <Button
                style={{ border: "none", background: "none" }}
                label="All"
                className={`filter-button ${
                  filter === "all" ? "active" : ""
                } btn`}
                onClick={() => setFilter("all")}
              />
              <Button
                style={{ border: "none", background: "none" }}
                label="Photos"
                className={`filter-button ${
                  filter === "photos" ? "active" : ""
                } btn`}
                onClick={() => setFilter("photos")}
              />
              <Button
                style={{ border: "none", background: "none" }}
                label="Videos"
                className={`filter-button ${
                  filter === "videos" ? "active" : ""
                } btn`}
                onClick={() => setFilter("videos")}
              />
            </div>
            <div className="post-grid">
              {filteredMediaFiles?.length === 0 ? (
                <p>No media files available.</p>
              ) : (
                filteredMediaFiles.map((media, index) => (
                  <div className="media-container" key={index}>
                    {isVideoFile(media) ? (
                      <div className="video-wrapper">
                        <ReactPlayer
                          url={media.ph_reference}
                          className="post-video"
                          width="100%"
                          height="100%"
                          controls
                          config={{
                            file: {
                              attributes: {
                                preload: "metadata",
                              },
                            },
                          }}
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
          </>
        )
      )}
    </div>
  );
};

export default ProfileComponent;
