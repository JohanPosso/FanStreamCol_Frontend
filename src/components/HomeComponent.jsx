import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "primereact/carousel";

import CardComponent from "./CardComponent";
import axios from "axios";
const HomeComponent = () => {
  const [categories, setCategories] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;
  const categoryTemplate = (item) => (
    <Link to={`/category/${item.name}`} className="nav-link category-item">
      <div className="category-card">
        <img className="category-image" src={item.photo} alt={item.name} />
        <h3 className="category-title">{item.name}</h3>
      </div>
    </Link>
  );
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${apiUrl}/categories`);
        setCategories(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, [apiUrl]);
  return (
    <div>
      <section
        className="py-3"
        // style="background-image: url('images/background-pattern.jpg');background-repeat: no-repeat;background-size: cover;"
        style={{
          backgroundImage:
            "url('/onlycol/public/images/background-pattern.jpg')",
        }}
      >
        <div className="container-fluid">
          <div className="row ">
            <div className="d-flex  justify-content-center justify-content-sm-between align-items-center">
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

                  <div className="offcanvas-body">
                    <ul className="navbar-nav justify-content-end menu-list list-unstyled d-flex gap-md-3 mb-0">
                      <li className="nav-item active">
                        <a href="#women" className="nav-link">
                          Women
                        </a>
                      </li>
                      <li className="nav-item dropdown">
                        <a href="#men" className="nav-link">
                          Men
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="#kids" className="nav-link">
                          Kids
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="#accessories" className="nav-link">
                          Accessories
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="banner-blocks">
                <div className="banner-ad large bg-info block-1">
                  <div className="swiper main-swiper">
                    <div className="swiper-wrapper">
                      <div className="swiper-slide">
                        <div className="row banner-content p-5">
                          <div className="content-wrapper col-md-7">
                            <div className="categories my-3">100% natural</div>
                            <h3 className="display-4">
                              Fresh Smoothie & Summer Juice
                            </h3>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Dignissim massa diam elementum.
                            </p>
                            <a
                              href="#"
                              className="btn btn-outline-dark btn-lg text-uppercase fs-6 rounded-1 px-4 py-3 mt-3"
                            >
                              Shop Now
                            </a>
                          </div>
                          <div className="img-wrapper col-md-5">
                            <img
                              alt="img"
                              src="images/img2.png"
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
                  className="banner-ad bg-success-subtle block-2"
                  style={{
                    backgroundImage:
                      "url('/onlycol/public/images/images/ad-image-1.png')",
                  }}

                  // style="background:url('images/ad-image-1.png') no-repeat;background-position: right bottom
                >
                  <div
                    style={{ maxHeight: "100px" }}
                    className="row banner-content p-5"
                  >
                    <div
                      style={{ display: "-webkit-box" }}
                      className="content-wrapper col-md-7"
                    >
                      <h3 className="banner-title">Fruits & Vegetables</h3>
                      <img
                        style={{ width: "87%" }}
                        src="images/img3.png"
                        alt=""
                      />
                    </div>
                  </div>
                </div>

                <div
                  className="banner-ad bg-danger block-3"
                  // style="background:url('images/ad-image-2.png') no-repeat;background-position: right bottom"
                >
                  <div
                    style={{ maxHeight: "100px" }}
                    className="row banner-content p-5"
                  >
                    <div
                      style={{ display: "-webkit-box" }}
                      className="content-wrapper col-md-7"
                    >
                      <h3 className="item-title">Baked Products</h3>
                      <img
                        style={{ width: "87%" }}
                        src="images/img1.png"
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
                <h2 className="section-title">Categorias</h2>
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
                // autoplayInterval={3000}
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
    </div>
  );
};

export default HomeComponent;
