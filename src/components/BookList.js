/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Ratings from "react-ratings-declarative";
import { useSelector, useDispatch } from "react-redux";
import { getBookList } from "../actions";

function BookList(props) {
  // Uncomment when backend endpoints are up
  // const dispatch = useDispatch();
  // const bookList = useSelector(state => state.bookList);

  // useEffect(() => {
  //   dispatch(getBookList());
  // }, []);

  const isFetching = useSelector(state => state.isFetching);

  // * State for book data after search
  const [bookData, setBookData] = useState([]);

  // * State for search and setting API URL
  const [searchTerm, setSearchTerm] = useState("");
  const [searching, setSearching] = useState("coding books");

  useEffect(() => {
    if (searching !== "") {
      axios
        .get(`https://www.googleapis.com/books/v1/volumes?q=${searching}`)
        .then(response => {
          const data = response.data.items;
          // console.log(data);
          setBookData(data);
        });
    }
  }, [searching]);

  // * handleChange sets the input to a state value
  const handleChange = event => {
    setSearchTerm(event.target.value);
  };
  // * submitForm pushes the state value as the axios URL
  const submitForm = event => {
    event.preventDefault();
    setSearching(searchTerm);
  };

  return (
    <div>
      <div className="search-container">
        <form onSubmit={submitForm} className="form-container">
          <input
            id="search"
            type="text"
            name="textfield"
            placeholder="Search For a Book to Review!"
            value={searchTerm}
            onChange={handleChange}
            className="search-form"
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>

        <div className="book-list-container">
          {bookData.map(item => (
            <div key={item.id} className="book-list-item">
              <Link to={`/book-list/${item.id}`}>
                <img
                  src={item.volumeInfo.imageLinks.thumbnail}
                  alt="book cover"
                />
                <Ratings
                  rating={5}
                  // rating={item.volumeInfo.averageRating}
                  widgetDimensions="15px"
                  widgetSpacings="1px"
                >
                  <Ratings.Widget widgetRatedColor="#f3bb01" />
                  <Ratings.Widget widgetRatedColor="#f3bb01" />
                  <Ratings.Widget widgetRatedColor="#f3bb01" />
                  <Ratings.Widget widgetRatedColor="#f3bb01" />
                  <Ratings.Widget widgetRatedColor="#f3bb01" />
                </Ratings>
                <h3>{item.volumeInfo.title}</h3>
              </Link>
              <p className="book-subtitle">{item.volumeInfo.subtitle}</p>
              {item.saleInfo.buyLink && (
                <a
                  className="purchase-button"
                  href={item.saleInfo.buyLink}
                  alt="purchase link"
                >
                  In Stock!
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="review-container">
        <div className="review-content">
          <h3>Did You Write A Book, Want Us To Review It?</h3>
          <p>Get featured and discovered by people from around the world.</p>
          <button>Get Started</button>
        </div>
      </div>
    </div>
  );
}
export default BookList;
