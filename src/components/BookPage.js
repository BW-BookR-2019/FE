import React, {useEffect, useState} from 'react'
import axios from 'axios'
import ReactHtmlParser from 'react-html-parser';
import Ratings from 'react-ratings-declarative';
import { Link } from 'react-router-dom'
import reviews from '../reviewdata'
// import { useSelector } from 'react-redux';

import DeleteModal from './DeleteModal';

function BookPage (props) {

     // * Grabbing dynamic URL id
     let id = props.match.params.id
       // const bookList = useSelector(state => state.bookList);


     // * State values for book data, author, and image respectively
     const [bookData, setBookData] = useState([])
     const [bookAuthor, setBookAuthor] = useState([])
     const [bookCover, setBookCover] = useState('')

     useEffect(() => {
          axios
               .get(`https://www.googleapis.com/books/v1/volumes/${id}`)
               .then(response => {
                    console.log(response.data.volumeInfo)
                    const data = response.data.volumeInfo
                    setBookData(data)
                    setBookAuthor(response.data.volumeInfo.authors)
                    setBookCover(response.data.volumeInfo.imageLinks.small || response.data.volumeInfo.imageLinks.thumbnail)
               })
     }, [id])

     // * Needed to create a new state to parse book description
     const description = bookData.description


     // * State to hold review data
     const [review, setReview] = useState(reviews)


     return(
          <div>
               <div className="book-content-container">
                    <div className="book-cover">
                         <img src={bookCover} alt="book cover"/>
                    </div>
                    <div>
                          <h3>{bookData.title}</h3>
                          <h4>{bookData.subtitle}</h4>
                    <p>Ratings: <Ratings
                         rating={5}
                         widgetDimensions="15px"
                         widgetSpacings="1px" >
                         <Ratings.Widget widgetRatedColor="#f3bb01" />
                         <Ratings.Widget widgetRatedColor="#f3bb01" />
                         <Ratings.Widget widgetRatedColor="#f3bb01" />
                         <Ratings.Widget widgetRatedColor="#f3bb01" />
                         <Ratings.Widget widgetRatedColor="#f3bb01" />
                    </Ratings></p>
                         <div>
                              {bookAuthor.map(item => (
                                   <p key={item}> By {item}</p>
                              ))}
                         </div>
                         <div className="book-buttons">
                          <button>Add To My Books</button>
                          <button>Purchase</button>
                         <Link to={`/book-list/${id}/add-review`}><button>Add a Review</button></Link>
                         <DeleteModal id={id} history={props.history} />
                         </div>
                          <div className="book-description">
                              {ReactHtmlParser(description)} 
                          </div>
                         <p>Publisher: {bookData.publisher}</p>
                     </div>
               </div>
               <div className='review-section'>
                    <h2>Customer Reviews</h2>
                    {
                         review.map(item => (
                              <div className="review-section">
                                   <h3 className="review-content-section">{item.user} <Ratings
                                        rating={item.rating}
                                        widgetDimensions="12px"
                                        widgetSpacings="1px" >
                                        <Ratings.Widget widgetRatedColor="#f3bb01" />
                                        <Ratings.Widget widgetRatedColor="#f3bb01" />
                                        <Ratings.Widget widgetRatedColor="#f3bb01" />
                                        <Ratings.Widget widgetRatedColor="#f3bb01" />
                                        <Ratings.Widget widgetRatedColor="#f3bb01" />
                                   </Ratings></h3>
                                   <p>"{item.review}"</p>
                              </div>
                         ))
                    }
               </div>

          </div>
     )
}

export default BookPage;

