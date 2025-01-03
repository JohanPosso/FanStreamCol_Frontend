import React, { useRef, useState, useEffect } from "react";
import { Toast } from "primereact/toast";
import { FileUpload } from "primereact/fileupload";
import { ProgressBar } from "primereact/progressbar";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";
import { Tag } from "primereact/tag";
import { Dropdown } from "primereact/dropdown";
import axios from "axios";

export default function TemplateDemo() {
  const toast = useRef(null);
  const [totalSize, setTotalSize] = useState(0);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const fileUploadRef = useRef(null);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios
      .get(`${apiUrl}/modelo`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, [apiUrl]);

  const onTemplateSelect = (e) => {
    let _totalSize = totalSize;
    let files = e.files;

    Object.keys(files).forEach((key) => {
      _totalSize += files[key].size || 0;
    });

    setTotalSize(_totalSize);
  };

  const handleUpload = async ({ files }) => {
    if (!selectedUser) return;

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("file", file); // Permite múltiples archivos
    });
    formData.append("modeloId", selectedUser);

    try {
      await axios.post(`${apiUrl}/upload-photo`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.current.show({
        severity: "success",
        summary: "Éxito",
        detail: "Archivos subidos exitosamente",
        life: 3000,
      });

      // Limpiar formulario
      setSelectedUser(null);
      fileUploadRef.current.clear();
      setTotalSize(0);
    } catch (error) {
      console.error("Error al subir los archivos:", error);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Error al subir los archivos",
        life: 3000,
      });
    }
  };

  const onTemplateRemove = (file, callback) => {
    setTotalSize((prevTotalSize) => prevTotalSize - file.size);
    callback();
  };

  const onTemplateClear = () => {
    setTotalSize(0);
  };

  const headerTemplate = (options) => {
    const { className, chooseButton, uploadButton, cancelButton } = options;
    const value = totalSize / 5242880;
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
          <span>{formattedValue} / 500 MB</span>
          <ProgressBar
            value={value}
            showValue={false}
            style={{ width: "10rem", height: "12px" }}
          ></ProgressBar>
        </div>
      </div>
    );
  };

  const itemTemplate = (file, props) => {
    const isImage = file.type.startsWith("image");
    const isVideo = file.type.startsWith("video");

    return (
      <div className="flex align-items-center flex-wrap">
        <div className="flex align-items-center" style={{ width: "40%" }}>
          {isImage && (
            <img
              alt={file.name}
              role="presentation"
              src={file.objectURL}
              width={100}
            />
          )}
          {isVideo && (
            <video width={100} controls preload="metadata">
              <source src={file.objectURL} type={file.type} />
            </video>
          )}
          <span className="flex flex-column text-left ml-3">
            {file.name}
            <small>{new Date().toLocaleDateString()}</small>
          </span>
        </div>
        <Tag
          value={props.formatSize}
          severity="warning"
          className="px-3 py-2"
        />
        <Button
          type="button"
          icon="pi pi-times"
          className="p-button-outlined p-button-rounded p-button-danger ml-auto"
          onClick={() => onTemplateRemove(file, props.onRemove)}
        />
      </div>
    );
  };

  const emptyTemplate = () => {
    return (
      <div
        className="flex align-items-center flex-column"
        style={{ display: "flex", alignItems: "center" }}
      >
        <i
          className="pi pi-image mt-3 p-5"
          style={{
            fontSize: "5em",
            borderRadius: "50%",
            backgroundColor: "var(--surface-b)",
            color: "var(--surface-d)",
          }}
        ></i>
        <span
          style={{ fontSize: "1.2em", color: "var(--text-color-secondary)" }}
          className="my-5"
        >
          Drag and Drop Image or Video Here
        </span>
      </div>
    );
  };

  const chooseOptions = {
    icon: "pi pi-fw pi-images",
    iconOnly: true,
    className: "custom-choose-btn p-button-rounded p-button-outlined",
  };
  const uploadOptions = {
    icon: "pi pi-fw pi-cloud-upload",
    iconOnly: true,
    className:
      "custom-upload-btn p-button-success p-button-rounded p-button-outlined",
  };
  const cancelOptions = {
    icon: "pi pi-fw pi-times",
    iconOnly: true,
    className:
      "custom-cancel-btn p-button-danger p-button-rounded p-button-outlined",
  };

  return (
    <div
      className="container"
      style={{ maxWidth: "80%", margin: "0 auto", padding: "2rem" }}
    >
      <Toast ref={toast}></Toast>

      <h3>Select a User</h3>
      <Dropdown
        value={selectedUser}
        options={users.map((user) => ({ label: user.name, value: user.id }))}
        onChange={(e) => setSelectedUser(e.value)}
        placeholder="Select a User"
        className="mb-3"
      />

      <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
      <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
      <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

      <FileUpload
        ref={fileUploadRef}
        name="file"
        customUpload
        uploadHandler={handleUpload}
        multiple
        accept="image/*, video/*"
        maxFileSize={524288000} // Límite de tamaño de archivo a 500 MB
        onSelect={onTemplateSelect}
        onError={onTemplateClear}
        onClear={onTemplateClear}
        headerTemplate={headerTemplate}
        itemTemplate={itemTemplate}
        emptyTemplate={emptyTemplate}
        chooseOptions={chooseOptions}
        uploadOptions={uploadOptions}
        cancelOptions={cancelOptions}
        disabled={!selectedUser}
      />
    </div>
  );
}
