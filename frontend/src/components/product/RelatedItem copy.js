import React, { useState, useEffect } from "react";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import "../../App.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { getRelatedProducts } from "../../actions/productActions";

const RelatedItem = ({ product }) => {
  const alert = useAlert();
  const dispatch = useDispatch();

  // const { products } = useSelector((state) => state.products);
  const { productsRelated } = useSelector((state) => state.productsRelated);

  const category = product.category;
  const d = `
  h 50, 53
  k 30  50
  z 15 30

  `;

  useEffect(() => {
    if (category) {
      dispatch(getRelatedProducts(category));
    }
  }, []);

  let settings = {
    infinite: false,
    speed: 1000,
    arrows: true,
    slidesToShow: 5,

    slidesToScroll: 4,

    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <div className="container">
      <h3 className="text-muted">Similar products</h3>
      <hr />
      {Object.keys(product).length === 0 ? (
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <Slider {...settings}>
          {productsRelated &&
            productsRelated.map((product) => (
              <div className="col-sm-12 col-md-6 col-lg-3 my-3">
                <div className="card rounded border`
                
          
                ` border-light">
                  
                  <div className="text-center">
                    <div className="card-related" key={product._id}>
                      <Link to={`/product/${product._id}`}>
                        <img
                          className="card-img-top mx-auto"
                          alt={"Related items"}
                          src={product.images[0].url}
                          height={150}
                          width="100%"
                        />
                      </Link>
                      <div className="card-body">
                        <h6 className="card-title">
                          <Link to={`/product/${product._id}`}>
                            {String(product.name) > 54
                              ? String(product.name).slice(0, 54)
                              : String(product.name)}
                          </Link>
                        </h6>

                        <div className="ratings mt-auto">
                          <div className="rating-outer">
                            <div
                              className="rating-inner"
                              style={{
                                width: `${(product.ratings / 5) * 100}%`,
                              }}
                            ></div>
                          </div>
                          <span id="no_of_reviews">
                            ({product.numOfReviews} Reviews)
                          </span>
                        </div>

                        <small className="card-text text-sm-left text-dark">
                          <p className="ml-2">
                            <span className="card-text">
                              &#8377;{product.discountPrice?.toFixed(0)}{" "}
                            </span>
                            {product.discount > 0 ? (
                              <sub className="text-secondary discount-label">
                                /-<del>&#8377;{product.price?.toFixed(0)}</del>,
                                <span className="text-success">
                                  {" "}
                                  {product.discount}% off
                                </span>
                              </sub>
                            ) : (
                              ""
                            )}
                          </p>
                        </small>

                        <Link
                          to={`/product/${product._id}`}
                          id="view_btn"
                          className="btn btn-block"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </Slider>
      )}
    </div>
  );
};

export default RelatedItem;
