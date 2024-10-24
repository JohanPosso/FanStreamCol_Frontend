import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

const HeaderComponent = () => {
  const { user, logout } = useUser(); // Usa el hook para obtener el usuario
  const navigate = useNavigate(); // Hook para navegación

  const handleLogout = () => {
    logout(); // Llamada a la función de logout
    navigate("/"); // Redirigir al usuario a la página de inicio
  };

  return (
    <header>
      <div className="container-fluid">
        <div className="row py-3 border-bottom">
          <div className="col-sm-4 col-lg-3 text-center text-sm-start">
            <div className="main-logo">
              <Link to="/home">
                <img
                  src="/logo.png"
                  style={{ width: "100px" }}
                  alt="logo"
                  className="img-fluid"
                />
              </Link>
            </div>
          </div>

          <div className="col-sm-6 offset-sm-2 offset-md-0 col-lg-5 d-none d-lg-block">
            {/* Aquí puedes mantener la barra de búsqueda si es necesario */}
          </div>

          <div className="col-sm-8 col-lg-4 d-flex justify-content-end gap-5 align-items-center mt-4 mt-sm-0 justify-content-center justify-content-sm-end">
            <div className="support-box text-end d-none d-xl-block">
              {user ? ( // Verifica si hay un usuario
                <>
                  <span className="fs-6 text-muted">{`${user.name} ${user.lastname}`}</span>
                  <h5 className="mb-0">{user.email}</h5>
                </>
              ) : (
                <span className="fs-6 text-muted"></span>
              )}
            </div>

            <ul className="d-flex justify-content-end list-unstyled m-0">
              <li>
                <Link to="/admin">
                  <i className="pi pi-user" style={{ fontSize: "2rem" }}></i>
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout} // Usamos la función handleLogout para redirigir
                  style={{
                    border: "none",
                    background: "none",
                    boxShadow: "none",
                    color: "red",
                  }}
                  className="btn btn-primary"
                  label="Submit"
                >
                  <i
                    className="pi pi-power-off"
                    style={{ fontSize: "2rem" }}
                  ></i>
                </button>
              </li>
              <li></li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;
