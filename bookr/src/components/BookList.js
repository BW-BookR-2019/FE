import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import Ratings from 'react-ratings-declarative';


function BookList (props){

     // * State for book data after search
     const [bookData, setBookData] = useState([]);

     // * State for search and setting API URL
     const [searchTerm, setSearchTerm] = useState('')
     const [searching, setSearching] = useState('')

     useEffect(() => {
          if (searching !== ''){
               axios
                    .get(`https://www.googleapis.com/books/v1/volumes?q=${searching}`)
                    .then(response => {
                         const data = response.data.items;
                         console.log(data)
                         setBookData(data);
                    })
          }
     }, [searching])

     // * handleChange sets the input to a state value
     const handleChange = event => {
          console.log(event.target.value)
          setSearchTerm(event.target.value)
     }
     // * submitForm pushes the state value as the axios URL
     const submitForm = event => {
          event.preventDefault();
          setSearching(searchTerm)
     }
    
     return(
          <div>
               <form onSubmit={submitForm}>
                    <label htmlFor="search">Search: </label>
                    <input 
                         id="search"
                         type="text"
                         name="textfield"
                         placeholder="Search"
                         value={searchTerm}
                         onChange={handleChange}
                    />
                    <button type="submit">Search</button>
               </form>

               {
                    bookData.map(item => (
                         <div key={item.id}>
                              <Link to={`/book-list/${item.id}`}>
                                   <img src={item.volumeInfo.imageLinks.thumbnail} alt="book cover"/>
                                   <Ratings
                                        rating={item.volumeInfo.averageRating}
                                        widgetDimensions="25px"
                                        widgetSpacings="1px" >
                                        <Ratings.Widget widgetRatedColor="gold" />
                                        <Ratings.Widget widgetRatedColor="gold" />
                                        <Ratings.Widget widgetRatedColor="gold" />
                                        <Ratings.Widget widgetRatedColor="gold" />
                                        <Ratings.Widget widgetRatedColor="gold" />
                                   </Ratings>
                                   <h3>{item.volumeInfo.title}</h3>
                              </Link>
                              <p>{item.volumeInfo.subtitle}</p>
                              <p>{item.volumeInfo.publishedDate}</p>
                         </div>
                    ))
               }
          </div>
     )
}
export default BookList 