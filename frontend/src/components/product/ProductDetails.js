import React, { Fragment, useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import ListReviews from "../review/ListReviews";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductDetails,
  newReview,
  clearErrors,
  getRelatedProducts,
} from "../../actions/productActions";
import { addItemToCart } from "../../actions/cartActions";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import ReadMore from "./ReadMore ";
import RelatedItem from "./RelatedItem";
import "react-medium-image-zoom/dist/styles.css";
import ImageZoom from "react-image-zooom";
import Slider from "react-slick";
import {
  EmailShareButton,
  FacebookShareButton,
  PinterestShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import {
  EmailIcon,
  FacebookIcon,
  PinterestIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
const ProductDetails = ({ match }) => {
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, product } = useSelector((state) => state.productDetails);
  const { user } = useSelector((state) => state.auth);
  const { error: reviewError, success } = useSelector((state) => state.newReview);
  const { productsRelated } = useSelector((state) => state.productsRelated);
  const pCategory = product.category;
  useEffect(() => {
    if (!product._id || product._id !== match.params.id) {
      dispatch(getProductDetails(match.params.id))
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Review posted successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    if (pCategory) {
      dispatch(getRelatedProducts(pCategory));
    }

  }, [
    dispatch,
    pCategory,
    product._id,
    alert,
    error,
    reviewError,
    match.params.id,
    success,
  ]);

  const addToCart = () => {
    dispatch(addItemToCart(match.params.id, quantity));
    alert.success("Item Added to Cart");
  };
  const increaseQty = () => {
    const count = document.querySelector(".count");
    if (count.valueAsNumber >= product.stock) return;
    const qty = count.valueAsNumber + 1;
    setQuantity(qty);
  };
  const decreaseQty = () => {
    const count = document.querySelector(".count");
    if (count.valueAsNumber <= 1) return;
    const qty = count.valueAsNumber - 1;
    setQuantity(qty);
  };
  function setUserRatings() {
    const stars = document.querySelectorAll(".star");
    stars.forEach((star, index) => {
      star.starValue = index + 1;

      ["click", "mouseover", "mouseout"].forEach(function (e) {
        star.addEventListener(e, showRatings);
      });
    });
    function showRatings(e) {
      stars.forEach((star, index) => {
        if (e.type === "click") {
          if (index < this.starValue) {
            star.classList.add("orange");
            setRating(this.starValue);
          } else {
            star.classList.remove("orange");
          }
        }
        if (e.type === "mouseover") {
          if (index < this.starValue) {
            star.classList.add("yellow");
          } else {
            star.classList.remove("yellow");
          }
        }
        if (e.type === "mouseout") {
          star.classList.remove("yellow");
        }
      });
    }
  }
  const reviewHandler = () => {
    const formData = new FormData();
    formData.set("rating", rating);
    formData.set("comment", comment);
    formData.set("productId", match.params.id);
    dispatch(newReview(formData));
  };
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
  const currentURL = window.location.href;
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={product.name} />
          <div className="container-fluid">
          <div className="container-fluid">
            <div className="row d-flex justify-content-around">
              <div className="col-12 col-lg-5 img-fluid" id="product_image">
                <Carousel pause="hover" interval={null}>
                  {product.images &&
                    product.images.map((image) => (
                      <Carousel.Item key={image.public_id}>
                        <div className="gallery">
                          <ImageZoom
                            className="gallery-img d-block "
                            src={image.url}
                            alt={product.title}
                          />
                        </div>
                      </Carousel.Item>
                    ))}
                </Carousel>
              </div>

              <div className="col-12 col-lg-6 mt-5">
                <div className="social">
                  <EmailShareButton
                    url={currentURL}
                    quote={"フェイスブックはタイトルが付けれるようです"}
                    hashtag={"#hashtag"}
                    description={"aiueo"}
                    className="Demo__some-network__share-button"
                  >
                    <EmailIcon size={24} round />
                    &nbsp;
                  </EmailShareButton>
                  <FacebookShareButton
                    url={currentURL}
                    quote={"フェイスブックはタイトルが付けれるようです"}
                    hashtag={"#hashtag"}
                    description={"aiueo"}
                    className="Demo__some-network__share-button"
                  >
                    <FacebookIcon size={24} round />
                    &nbsp;
                  </FacebookShareButton>
                  <TwitterShareButton
                    title={"test"}
                    url={currentURL}
                    hashtags={["hashtag1", "hashtag2"]}
                  >
                    <TwitterIcon size={24} round />
                    &nbsp;
                  </TwitterShareButton>
                  <WhatsappShareButton
                    url={currentURL}
                    quote={"フェイスブックはタイトルが付けれるようです"}
                    hashtag={"#hashtag"}
                    description={"aiueo"}
                    className="Demo__some-network__share-button"
                  >
                    <WhatsappIcon size={24} round />
                    &nbsp;
                  </WhatsappShareButton>
                  <PinterestShareButton
                    url={currentURL}
                    quote={"フェイスブックはタイトルが付けれるようです"}
                    hashtag={"#hashtag"}
                    description={"aiueo"}
                    className="Demo__some-network__share-button"
                  >
                    <PinterestIcon size={24} round />
                    &nbsp;
                  </PinterestShareButton>
                </div>
                <br />
                <h3>{product.name}</h3>
                <p id="product_id">Product # {product._id}</p>

                <hr />

                <div className="rating-outer">
                  <div
                    className="rating-inner"
                    style={{ width: `${(product.ratings / 5) * 100}%` }}
                  ></div>
                </div>
                <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
                <hr />
                <p>
                  {" "}
                  <span id="product_price">
                    &#8377;{product.discountPrice?.toFixed(2)}{" "}
                  </span>
                  <span>
                    {product.discount > 0 ? (
                      <span className="text-secondary discount-label">
                        /-<del>&#8377;{product.price}</del>,
                        <span className="text-success">
                          {" "}
                          {product.discount}% off
                        </span>
                      </span>
                    ) : (
                      ""
                    )}
                  </span>
                </p>
                <div className="stockCounter d-inline">
                  <span className="btn minus-btn" onClick={decreaseQty}>
                    -
                  </span>
                  <input
                    type="number"
                    className="form-control count d-inline"
                    value={quantity}
                    readOnly
                  />
                  <span className="btn plus-btn" onClick={increaseQty}>
                    +
                  </span>
                </div>
                <button
                  type="button"
                  id="cart_btn"
                  className="btn btn-primary d-inline ml-4"
                  disabled={product.stock === 0}
                  onClick={addToCart}
                >
                  Add to Cart
                </button>
                <hr />
                <p>
                  Status:{" "}
                  <span
                    id="stock_status"
                    className={product.stock > 0 ? "greenColor" : "redColor"}
                  >
                    {product.stock > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                </p>
                <hr />
                <h4 className="mt-2">Description:</h4>
                <span>
                  <ReadMore text={String(product.description)} />
                </span>
                <hr />
                <p id="product_seller mb-3">
                  Sold by: <strong>{product.seller}</strong>
                </p>
                {user ? (
                  <button
                    id="review_btn"
                    type="button"
                    className="btn btn-primary mt-4"
                    data-toggle="modal"
                    data-target="#ratingModal"
                    onClick={setUserRatings}
                  >
                    Submit Your Review
                  </button>
                ) : (
                  <div className="alert alert-danger mt-5" type="alert">
                    Login to post your review.
                  </div>
                )}
                <div className="row mt-2 mb-5">
                  <div className="rating w-50">
                    <div
                      className="modal fade"
                      id="ratingModal"
                      tabIndex="-1"
                      role="dialog"
                      aria-labelledby="ratingModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="ratingModalLabel">
                              Submit Review
                            </h5>
                            <button
                              type="button"
                              className="close"
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <ul className="stars">
                              <li className="star">
                                <i className="fa fa-star"></i>
                              </li>
                              <li className="star">
                                <i className="fa fa-star"></i>
                              </li>
                              <li className="star">
                                <i className="fa fa-star"></i>
                              </li>
                              <li className="star">
                                <i className="fa fa-star"></i>
                              </li>
                              <li className="star">
                                <i className="fa fa-star"></i>
                              </li>
                            </ul>
                            <textarea
                              name="review"
                              id="review"
                              className="form-control mt-3"
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                            ></textarea>
                            <button
                              className="btn my-3 float-right review-btn px-4 text-white"
                              onClick={reviewHandler}
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              Submit
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
            {product.reviews && product.reviews.length > 0 && (
              <ListReviews reviews={product.reviews} />
            )}
            <div className="m-3">
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
                      <RelatedItem key={product._id} product={product} />
                    ))}
                </Slider>
              )}
              <hr />
            </div>
          </div>
          {/* {(products && products.map(product => (
                  <RelatedItem key={product._id} product={product}  />
                )))} */}

          {/* {(productsRelated && productsRelated.map(rProduct => (
                  <RelatedItem key={rProduct._id} rProduct={rProduct}  />
                )))} */}

          {/* {(productsRelated && <RelatedItem key={productsRelated._id} productsRelated={productsRelated}  />)} */}

          {/* <RelatedItem key={product._id} product={product} /> */}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
