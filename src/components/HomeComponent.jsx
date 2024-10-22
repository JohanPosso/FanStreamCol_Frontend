import Headercomponent from "./HeaderComponent";
import CardComponent from "./CardComponent";
const HomeComponent = () => {
  return (
    <div>
      <Headercomponent />
      <section
        className="py-3"
        // style="background-image: url('images/background-pattern.jpg');background-repeat: no-repeat;background-size: cover;"
        style={{
          backgroundImage:
            "url('/onlycol/public/images/background-pattern.jpg')",
        }}
      >
        <div className="container-fluid">
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
                <h2 className="section-title">Category</h2>

                <div className="d-flex align-items-center">
                  <a href="#" className="btn-link text-decoration-none">
                    View All Categories →
                  </a>
                  <div className="swiper-buttons">
                    <button className="swiper-prev category-carousel-prev btn btn-yellow">
                      ❮
                    </button>
                    <button className="swiper-next category-carousel-next btn btn-yellow">
                      ❯
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="category-carousel swiper">
                <div className="swiper-wrapper-banner">
                  <a
                    href="index.html"
                    className="nav-link category-item swiper-slide"
                  >
                    <img
                      src="images/icon-vegetables-broccoli.png"
                      alt="Category Thumbnail"
                    ></img>
                    <h3 className="category-title">Fruits & Veges</h3>
                  </a>

                  <a
                    href="index.html"
                    className="nav-link category-item swiper-slide"
                  >
                    <img
                      src="images/icon-vegetables-broccoli.png"
                      alt="Category Thumbnail"
                    ></img>
                    <h3 className="category-title">Fruits & Veges</h3>
                  </a>
                  <a
                    href="index.html"
                    className="nav-link category-item swiper-slide"
                  >
                    <img
                      src="images/icon-vegetables-broccoli.png"
                      alt="Category Thumbnail"
                    ></img>
                    <h3 className="category-title">Fruits & Veges</h3>
                  </a>
                  <a
                    href="index.html"
                    className="nav-link category-item swiper-slide"
                  >
                    <img
                      src="images/icon-vegetables-broccoli.png"
                      alt="Category Thumbnail"
                    ></img>
                    <h3 className="category-title">Fruits & Veges</h3>
                  </a>
                  <a
                    href="index.html"
                    className="nav-link category-item swiper-slide"
                  >
                    <img
                      src="images/icon-vegetables-broccoli.png"
                      alt="Category Thumbnail"
                    ></img>
                    <h3 className="category-title">Fruits & Veges</h3>
                  </a>
                  <a
                    href="index.html"
                    className="nav-link category-item swiper-slide"
                  >
                    <img
                      src="images/icon-vegetables-broccoli.png"
                      alt="Category Thumbnail"
                    ></img>
                    <h3 className="category-title">Fruits & Veges</h3>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CardComponent />
    </div>
  );
};

export default HomeComponent;
