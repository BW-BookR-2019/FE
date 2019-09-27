/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";
import Ratings from "react-ratings-declarative";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getGoogleBookData, addReview } from "../actions";

import DeleteModal from "./DeleteModal";

function BookPage(props) {
  // Uncomment when backend endpoints are up
  // const bookData = useSelector(state => state.bookList.find(book => book.id === props.match.params.id));

  const isFetching = useSelector(state => state.isFetching);

  const reviews = useSelector(state => state.reviews);

  // const reviews = useSelector(state => state.dummyReviews);

  // * Grabbing dynamic URL id
  const id = props.match.params.id;

  const googleBookData = useSelector(state => state.googleBookData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGoogleBookData(id));
  }, []);

  return (
    <div>
      {googleBookData && (
        <div className="book-content-container">
          <div className="book-cover">
            <img
              src={
                googleBookData.volumeInfo.imageLinks.small ||
                googleBookData.volumeInfo.imageLinks.thumbnail
              }
              alt="book cover"
            />
          </div>
          <div>
            <h3>{googleBookData.volumeInfo.title}</h3>
            <h4>{googleBookData.volumeInfo.subtitle}</h4>
            <div>
              Ratings:{" "}
              <Ratings rating={5} widgetDimensions="15px" widgetSpacings="1px">
                <Ratings.Widget widgetRatedColor="#f3bb01" />
                <Ratings.Widget widgetRatedColor="#f3bb01" />
                <Ratings.Widget widgetRatedColor="#f3bb01" />
                <Ratings.Widget widgetRatedColor="#f3bb01" />
                <Ratings.Widget widgetRatedColor="#f3bb01" />
              </Ratings>
            </div>
            <div>
              {googleBookData.volumeInfo.authors.map(item => (
                <p key={item}> By {item}</p>
              ))}
            </div>
            <div className="book-buttons">
              {/* <button>Add To My Books</button> */}
              {googleBookData.saleInfo.saleability === "FOR_SALE" && (
                <a href={googleBookData.saleInfo.buyLink}>
                  <button>Purchase</button>
                </a>
              )}
              <Link to={`/book-list/${id}/add-review`}>
                <button>Add a Review</button>
              </Link>
              {/* <button
                onClick={() =>
                  dispatch(addReview({ review: "fkjfl", rating: 2 }))
                }
              >
                Add review fake
              </button> */}
              <DeleteModal id={id} history={props.history} />
            </div>
            <div className="book-description">
              {ReactHtmlParser(googleBookData.volumeInfo.description)}
            </div>
            <p>Publisher: {googleBookData.volumeInfo.publisher}</p>
          </div>
        </div>
      )}

      <div className="review-section">
        <h2>Customer Reviews</h2>
        {reviews.length > 0 && reviews.map(item => {
          if (item.id === id) {
            return (<div key={item.id} className="review-section">
              <h3 className="review-content-section">
                {item.user}{" "}
                <Ratings
                  rating={item.rating}
                  widgetDimensions="12px"
                  widgetSpacings="1px"
                >
                  <Ratings.Widget widgetRatedColor="#f3bb01" />
                  <Ratings.Widget widgetRatedColor="#f3bb01" />
                  <Ratings.Widget widgetRatedColor="#f3bb01" />
                  <Ratings.Widget widgetRatedColor="#f3bb01" />
                  <Ratings.Widget widgetRatedColor="#f3bb01" />
                </Ratings>
              </h3>
              <p>"{item.review}"</p>
            </div>)
          }
        })}
        {/* Uncomment when backend endpoints are up */}
        {/* {bookData.reviews.map(item => (
          <div className="review-section">
            <h3 className="review-content-section">
              {item.user}{" "}
              <Ratings
                rating={item.rating}
                widgetDimensions="12px"
                widgetSpacings="1px"
              >
                <Ratings.Widget widgetRatedColor="#f3bb01" />
                <Ratings.Widget widgetRatedColor="#f3bb01" />
                <Ratings.Widget widgetRatedColor="#f3bb01" />
                <Ratings.Widget widgetRatedColor="#f3bb01" />
                <Ratings.Widget widgetRatedColor="#f3bb01" />
              </Ratings>
            </h3>
            <p>"{item.review}"</p>
          </div>
        ))} */}
      </div>
    </div>
  );
}

export default BookPage;
