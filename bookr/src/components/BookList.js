import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'



function BookList (props){

     const [bookData, setBookData] = useState([])

     useEffect( () => {
          axios
               .get('https://www.googleapis.com/books/v1/volumes?q=REACT')
          .then(response => {
               const data = response.data.items;
               console.log(data)
               setBookData(data);
          })
     },[])


     return(
          <div>
               {
                    bookData.map(item => (
                         <div key={item.id}>
                              <Link to={`/book-list/${item.id}`}>
                                   <img src={item.volumeInfo.imageLinks.thumbnail} alt="book cover"/>
                                   <h3>{item.volumeInfo.title}</h3>
                              </Link>
                              <p>{item.volumeInfo.subtitle}</p>
                              <p>{item.volumeInfo.publishedDate}</p>
                              <p>{item.volumeInfo.averageRating}</p>
                         </div>
                    ))
               }
          </div>
     )
}
export default BookList 