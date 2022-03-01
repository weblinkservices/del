import React from "react";

import "../../App.css";
import { Link } from "react-router-dom";

const RelatedItem = ({ product }) => {
  return (
    <div className="">
      <div className="card card1 p-3 rounded">
        <div className="text-center">
          <Link to={`/product/${product._id}`}>
            <img
              className="card-img-top mx-auto"
              alt="card"
              src={product.images[0].url}
            />
          </Link>
        </div>
        <div className="card-body d-flex flex-column">
          <h6 className="card-title">
            <Link to={`/product/${product._id}`} title={product.name}>{String(product.name).slice(0, 48)}</Link>
          </h6>
          <div className="ratings mt-auto">
            <div className="rating-outer">
              <div
                className="rating-inner"
                style={{ width: `${(product.ratings / 5) * 100}%` }}
              ></div>
            </div>
            <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
          </div>
          <p></p>
          <p>
            <span className="card-text">
              &#8377;{product.discountPrice?.toFixed(2)}{" "}
            </span>
            {product.discount > 0 ? (
              <sub className="text-secondary discount-label">
                /-<del>&#8377;{product.price?.toFixed(0)}</del>,
                <span className="text-success"> {product.discount}% off</span>
              </sub>
            ) : (
              ""
            )}
          </p>

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
  );
};

export default RelatedItem;
