import React, { useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { FileUpload } from "primereact/fileupload";
import { ProgressBar } from "primereact/progressbar";
import { Button } from "primereact/button";
import axios from "axios";

export default function TemplateDemo() {
  const toast = useRef(null);
  const [totalSize, setTotalSize] = useState(0);
  const fileUploadRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    instagram: "",
    otraredsocial: "",
    avatar: null,
  });
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    if (e.files && e.files.length > 0) {
      setFormData((prevData) => ({
        ...prevData,
        avatar: e.files[0],
      }));
    }
  };

  const handleUpload = async () => {
    if (!formData.avatar) {
      toast.current.show({
        severity: "warn",
        summary: "Advertencia",
        detail: "Por favor selecciona una imagen para subir",
        life: 3000,
      });
      return;
    }

    const uploadData = new FormData();
    uploadData.append("name", formData.name);
    uploadData.append("lastname", formData.lastname);
    uploadData.append("instagram", formData.instagram);
    uploadData.append("otraredsocial", formData.otraredsocial);
    uploadData.append("avatar", formData.avatar);

    try {
      const response = await axios.post(`${apiUrl}/crearmodelo`, uploadData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.current.show({
        severity: "success",
        summary: "Éxito",
        detail: "Archivo subido exitosamente",
        life: 3000,
      });

      // Limpiar el formulario después del éxito
      setFormData({
        name: "",
        lastname: "",
        instagram: "",
        otraredsocial: "",
        avatar: null,
      });
      setTotalSize(0);
      fileUploadRef.current.clear(); // Limpia el archivo subido
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Error al subir el archivo",
        life: 3000,
      });
    }
  };

  const headerTemplate = (options) => {
    const { className, chooseButton, uploadButton, cancelButton } = options;
    const value = totalSize / 10000;
    const formattedValue = fileUploadRef.current
      ? fileUploadRef.current.formatSize(totalSize)
      : "0 B";

    return (
      <div
        className={className}
        style={{
          backgroundColor: "transparent",
          display: "flex",
          alignItems: "center",
        }}
      >
        {chooseButton}
        {uploadButton}
        {cancelButton}
        <div className="flex align-items-center gap-3 ml-auto">
          <span>{formattedValue} / 1 MB</span>
          <ProgressBar
            value={value}
            showValue={false}
            style={{ width: "10rem", height: "12px" }}
          ></ProgressBar>
        </div>
      </div>
    );
  };

  return (
    <div
      className="container"
      style={{ maxWidth: "80%", margin: "0 auto", padding: "2rem" }}
    >
      <Toast ref={toast}></Toast>

      <h3>Formulario de Modelo</h3>
      <div className="p-fluid">
        <div className="p-field">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            className="p-inputtext p-component"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Ingresa el nombre"
          />
        </div>

        <div className="p-field">
          <label htmlFor="lastname">Apellido</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            className="p-inputtext p-component"
            value={formData.lastname}
            onChange={handleInputChange}
            placeholder="Ingresa el apellido"
          />
        </div>

        <div className="p-field">
          <label htmlFor="instagram">Instagram</label>
          <input
            type="text"
            id="instagram"
            name="instagram"
            className="p-inputtext p-component"
            value={formData.instagram}
            onChange={handleInputChange}
            placeholder="Ingresa el perfil de Instagram"
          />
        </div>

        <div className="p-field">
          <label htmlFor="otraredsocial">Otra Red Social</label>
          <input
            type="text"
            id="otraredsocial"
            name="otraredsocial"
            className="p-inputtext p-component"
            value={formData.otraredsocial}
            onChange={handleInputChange}
            placeholder="Ingresa otra red social"
          />
        </div>

        <div className="p-field">
          <label htmlFor="avatar">Foto (Avatar)</label>
          <FileUpload
            ref={fileUploadRef}
            name="avatar"
            customUpload
            uploadHandler={handleUpload}
            accept="image/*"
            maxFileSize={5000000}
            onSelect={handleFileChange}
            headerTemplate={headerTemplate}
          />
        </div>

        <Button label="Subir" icon="pi pi-upload" onClick={handleUpload} />
      </div>
    </div>
  );
}
