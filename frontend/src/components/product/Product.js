import React from "react";
import { Link } from "react-router-dom";

const product = ({ product, col }) => {
    return (
        <div  className={`col-sm-12 col-md-6 col-lg-${col} my-3`}>
              <div className="card p-3 rounded">
              <div className="text-center">
              <Link to={`/product/${product._id}` }target="_blank">
               
                <img
                  className="card-img-top mx-auto" alt={product.category}
                  src={product.images[0].url }
                /></Link></div>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">
                    <Link to={`/product/${product._id}`} title={product.name} target="_blank">{product.name.length < 72 ? product.name : String(product.name).slice(0, 72)+"..."}</Link>
                  </h5>
                  <div className="ratings mt-auto">
                    <div className="rating-outer">
                      <div className="rating-inner" style={{ width: `${(product.ratings / 5) * 100}%` }}></div>
                    </div>
                    <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
                  </div><p></p>
                  <p>
                  <span className="card-text">&#8377;{(product.discountPrice)?.toFixed(2)}  </span>
                  {product.discount > 0 ?(
                   <sub className="text-secondary discount-label">/-<del>&#8377;{(product.price)?.toFixed(0)}</del>,
                  <span className="text-success"> {product.discount}% off</span></sub>):("")}
                  </p>
                 
                  <Link to={`/product/${product._id}`} id="view_btn" className="btn btn-block" target="_blank">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
    );
};

export default product;
