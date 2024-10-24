import React, { useState, useRef } from "react";
import axios from "axios";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

const LoginComponent = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const apiurl = process.env.REACT_APP_API_URL;
  const toast = useRef(null);
  const { login } = useUser();

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${apiurl}/token`, {
        email,
        password,
      });
      const userData = response.data;
      login(userData);
      toast.current.show({
        severity: "success",
        summary: "Éxito",
        detail: "Inicio de sesión exitoso",
        life: 3000,
      });
      navigate("/home");
    } catch (error) {
      console.error(error);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Credenciales incorrectas",
        life: 3000,
      });
    }
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post(`${apiurl}/crear`, {
        name,
        lastname,
        email,
        password,
      });
      console.log("Registro exitoso:", response.data);
      toast.current.show({
        severity: "success",
        summary: "Registro Exitoso",
        detail: "Usuario creado correctamente.",
      });

      setName("");
      setLastName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Error de registro:", error.response.data);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: error.response.data.error,
      });
    }
  };

  return (
    <div>
      <Toast ref={toast} />
      <div className="section">
        <div className="container">
          <div className="row full-height justify-content-center">
            <div className="col-12 text-center align-self-center py-5">
              <div className="section pb-5 pt-5 pt-sm-2 text-center">
                <h6 className="mb-0 pb-3">
                  <span onClick={() => setIsLogin(true)}>Log In </span>
                  <span onClick={() => setIsLogin(false)}>Sign Up</span>
                </h6>
                <input
                  className="checkbox"
                  type="checkbox"
                  id="reg-log"
                  checked={!isLogin}
                  onChange={() => setIsLogin(!isLogin)}
                />
                <label htmlFor="reg-log"></label>
                <div className="card-3d-wrap mx-auto">
                  <div className="card-3d-wrapper">
                    <div className={`card-front ${isLogin ? "" : "d-none"}`}>
                      <div className="center-wrap">
                        <div className="section text-center">
                          <h4 className="mb-4 pb-3">Log In</h4>
                          <div className="form-group">
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="form-style"
                              placeholder="Your Email"
                              id="logemail"
                              autoComplete="off"
                            />
                            <i className="input-icon uil uil-at"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              className="form-style"
                              placeholder="Your Password"
                              id="logpass"
                              autoComplete="off"
                            />
                            <i className="input-icon uil uil-lock-alt"></i>
                          </div>
                          <button onClick={handleLogin} className="btn mt-4">
                            submit
                          </button>
                          <p className="mb-0 mt-4 text-center">
                            <a href="#0" className="link">
                              Forgot your password?
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className={`card-back ${isLogin ? "d-none" : ""}`}>
                      <div className="center-wrap">
                        <div className="section text-center">
                          <h4 className="mb-4 pb-3">Sign Up</h4>
                          <div className="form-group">
                            <input
                              type="text"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="form-style"
                              placeholder="Your Full Name"
                              id="logname"
                              autoComplete="off"
                            />
                            <i className="input-icon uil uil-user"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="text"
                              value={lastname}
                              onChange={(e) => setLastName(e.target.value)}
                              className="form-style"
                              placeholder="Lastname"
                              id="loglastname"
                              autoComplete="off"
                            />
                            <i className="input-icon uil uil-user"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="form-style"
                              placeholder="Your Email"
                              id="logemail"
                              autoComplete="off"
                            />
                            <i className="input-icon uil uil-at"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              className="form-style"
                              placeholder="Your Password"
                              id="logpass"
                              autoComplete="off"
                            />
                            <i className="input-icon uil uil-lock-alt"></i>
                          </div>
                          <button onClick={handleRegister} className="btn mt-4">
                            submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
