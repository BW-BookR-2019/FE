import React, {useEffect, useState} from 'react'
import axios from 'axios'
import ReactHtmlParser from 'react-html-parser';

function BookPage (props) {

     // * Grabbing dynamic URL id
     let id = props.match.params.id

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
                    setBookCover(response.data.volumeInfo.imageLinks.thumbnail)
               })
     }, [id])

     // * Needed to create a new state to parse book description
     const description = bookData.description


     return(
          <div>
               <div>
                    <div>
                         <img src={bookCover} alt="book cover"/>
                         <p>Ratings: </p>
                    </div>
                     <div>
                          <h3>{bookData.title}</h3>
                          <h4>{bookData.subtitle}</h4>
                          <p>{bookData.publisher}</p>
                          <div>
                              {bookAuthor.map(item => (
                              <p key={item}>{item}</p>
                              ))}
                          </div>
                          <button>Add To My Books</button>
                          <button>Purchase</button>
                     </div>
                </div>
 
               <div>
                   { ReactHtmlParser(description) } 
               </div>
          </div>
     )
}

export default BookPage 