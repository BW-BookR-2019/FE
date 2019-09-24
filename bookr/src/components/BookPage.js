import React, {useEffect, useState} from 'react'
import axios from 'axios'
import ReactHtmlParser from 'react-html-parser';
import Ratings from 'react-ratings-declarative';
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


     return(
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
                          <button>Add To My Books</button>
                          <button>Purchase</button>
                         <DeleteModal id={id} history={props.history} />

                          <div className="book-description">
                              {ReactHtmlParser(description)} 
                          </div>
                         <p>Publisher: {bookData.publisher}</p>
                     </div>
                </div>
     )
}

export default BookPage;

