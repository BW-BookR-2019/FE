import React, {useEffect, useState} from 'react'
import axios from 'axios'

function BookPage (props) {

     let id = props.match.params.id

     const [bookData, setBookData] = useState([])

     useEffect(() => {
          axios
               .get(`https://www.googleapis.com/books/v1/volumes/${id}`)
               .then(response => {
                    console.log(response.data.volumeInfo)
                    const data = response.data.volumeInfo
                    setBookData(data)
               })
     }, [id])


     return(
          <div>

                         <div>
                              <div>
                                 
                                   <p>Ratings: </p>
                              </div>

                              <div>
                                   <h3>{bookData.title}</h3>
                                   <h4>{bookData.subtitle}</h4>
                                   <p>{bookData.publisher}</p>
                                   <p>{bookData.authors}</p>
                                   <button>Add To My Books</button>
                              <button>Purchase</button>
                              </div>
                         </div>
 
               {/* <div>
                    <div>
                         <img />     
                         <p>Ratings: </p>
                    </div>

                    <div>
                         <h3>Title</h3>
                         <p>Author</p>
                         <p>Publisher</p>
                         <button>Add To My Books</button>>
                         <button>Purchase</button>>
                    </div>
               </div> */}

               {/* Block for description of book  */}
               <div>
                    Description
               </div>
          </div>
     )
}

export default BookPage 