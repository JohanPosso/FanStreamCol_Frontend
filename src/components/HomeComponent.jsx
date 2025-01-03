import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "primereact/carousel";
import { useQuery } from "@tanstack/react-query"; // Importa useQuery de la versión 5
import CardComponent from "./CardComponent";
import axios from "axios";
import { ProgressSpinner } from "primereact/progressspinner";

const HomeComponent = () => {
  const apiUrl = process.env.REACT_APP_API_URL;

  // Consulta para obtener categorías usando React Query v5
  const {
    data: categories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axios.get(`${apiUrl}/categories`);
      return response.data;
    },
  });

  // Plantilla para mostrar cada categoría en el carousel
  const categoryTemplate = (item) => (
    <Link to={`/category/${item.name}`} className="nav-link category-item">
      <div className="category-card">
        <img className="category-image" src={item.photo} alt={item.name} />
        <h3 className="category-title">{item.name}</h3>
      </div>
    </Link>
  );

  // Si hay un error en la carga de datos
  if (error) {
    return <div>Error al cargar las categorías</div>;
  }

  return (
    <div>
      {/* Spinner de carga mientras se obtienen los datos */}
      {isLoading ? (
        <div className="spinner-overlay">
          <ProgressSpinner size={150} color="#36d7b7" loading={isLoading} />
        </div>
      ) : (
        <>
          <section
            className="py-3"
            style={{
              backgroundImage:
                "url('/onlycol/public/images/background-pattern.jpg')",
            }}
          >
            <div className="container-fluid">
              <div className="row ">
                <div className="d-flex justify-content-center justify-content-sm-between align-items-center">
                  <nav className="main-menu d-flex navbar navbar-expand-lg">
                    <button
                      className="navbar-toggler"
                      type="button"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#offcanvasNavbar"
                      aria-controls="offcanvasNavbar"
                    >
                      <span className="navbar-toggler-icon"></span>
                    </button>

                    <div
                      className="offcanvas offcanvas-end"
                      tabIndex="-1"
                      id="offcanvasNavbar"
                      aria-labelledby="offcanvasNavbarLabel"
                    >
                      <div className="offcanvas-header justify-content-center">
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="offcanvas"
                          aria-label="Close"
                        ></button>
                      </div>
                    </div>
                  </nav>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="banner-blocks">
                    <div className="large bg-info block-1">
                      <div className="swiper main-swiper">
                        <div className="swiper-wrapper">
                          <div className="swiper-slide">
                            <div className="row banner-content p-5">
                              <div className="content-wrapper col-md-7">
                                <div className="categories my-3">
                                  100% Gratuito
                                </div>
                                <h3 className="display-4">FanStream Col</h3>
                                <p>
                                  Estamos encantados de tenerte aquí. Antes de
                                  explorar nuestro contenido exclusivo, queremos
                                  recordarte que este sitio está destinado a
                                  adultos mayores de 18 años. Asegúrate de estar
                                  en un entorno apropiado y de cumplir con todas
                                  las regulaciones locales sobre contenido para
                                  adultos.
                                </p>
                                <p style={{ fontWeight: "bold" }}>
                                  Síguenos en nuestras redes sociales →
                                </p>
                              </div>
                              <div className="img-wrapper col-md-5">
                                <img
                                  alt="img"
                                  src="/images/img2.png"
                                  className="img-fluid"
                                ></img>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="swiper-pagination"></div>
                      </div>
                    </div>

                    <div
                      className="bg-success-subtle block-2"
                      style={{
                        backgroundImage:
                          "url('/onlycol/public/images/images/ad-image-1.png')",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{ maxHeight: "100px" }}
                        className="row banner-content p-5"
                      >
                        <div className="content-wrapper col-md-7 div-img">
                          <a
                            style={{ fontSize: "13px" }}
                            href="https://www.tiktok.com/@fanstreamcol"
                            className="item-title"
                            rel="noreferrer"
                            target="_blank"
                          >
                            <i
                              style={{ fontSize: "32px" }}
                              className="pi pi-tiktok"
                            >
                              {" "}
                              <span> TikTok</span>
                            </i>
                            https://www.tiktok.com/@fanstreamcol
                          </a>
                          <img
                            style={{ width: "80%" }}
                            src="/images/img3.png"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>

                    <div
                      className="bg-danger block-3"
                      style={{
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{ maxHeight: "100px" }}
                        className="row banner-content p-5"
                      >
                        <div className="content-wrapper col-md-7 div-img">
                          <a
                            target="_blank"
                            style={{ fontSize: "13px" }}
                            rel="noreferrer"
                            href="https://www.facebook.com/FanStreamCol"
                            className="item-title"
                          >
                            <i
                              style={{ fontSize: "32px" }}
                              className="pi pi-facebook"
                            >
                              {" "}
                              <span> Facebook</span>
                            </i>
                            https://www.facebook.com/FanStreamCol
                          </a>
                          <img
                            style={{ width: "80%" }}
                            src="/images/img1.png"
                            alt="img"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-5 overflow-hidden">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12">
                  <div className="section-header d-flex flex-wrap justify-content-between mb-5">
                    <h2 className="section-title">Categorías</h2>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <Carousel
                    value={categories}
                    itemTemplate={categoryTemplate}
                    numVisible={6}
                    numScroll={1}
                    circular
                    responsiveOptions={[
                      { breakpoint: "1024px", numVisible: 3, numScroll: 1 },
                      { breakpoint: "768px", numVisible: 2, numScroll: 1 },
                      { breakpoint: "560px", numVisible: 1, numScroll: 1 },
                    ]}
                    className="category-carousel"
                  />
                </div>
              </div>
            </div>
          </section>
          <CardComponent />
        </>
      )}
    </div>
  );
};

export default HomeComponent;
