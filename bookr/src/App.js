import React from 'react';
import './App.css';
import {Route, Link} from 'react-router-dom'
import BookList from './components/BookList'
import BookPage from './components/BookPage'

function App() {
  return (
    <div className="App">
      <Link to="/book-list">Book Selection</Link>
     




     <div>
       <Route exact path="/book-list" component={BookList}/>
       <Route path="/book-list/:id" component={BookPage} />
      </div>
    </div>
  );
}

export default App;
