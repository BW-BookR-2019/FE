import React from 'react'

function BookList (props){

     // const [bookData, setBookData] = useState([])

     // useEffect( () => {
     //      axios
     //           .get('https://www.directtextbook.com/api')
     //      .then(response => {
     //           console.log(response)
     //           setBookData(response)
     //      })
     // },[])




     return(
          <div>
               Hello this is the book list 

          <div>
               <img />
               <p>Rating:</p>
               <p>Price:</p>
               <p>Description</p>
          </div>
          {/* {
               bookData.map(item => {

               })
          } */}
          </div>
     )
}
export default BookList 