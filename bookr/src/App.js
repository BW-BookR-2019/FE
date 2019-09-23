import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Route} from 'react-router-dom'
import BookList from './components/BookList'
import BookPage from './components/BookPage'
import Register from './components/Register'
import Login from './components/Login'

function App() {
  return (
    <div className="App">
      




      <div>
        <Route path="/book-list" component={BookList}/>
        <Route path="/book-list/:id" component={BookPage} />
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
      </div>
    </div>
  );
}

export default App;
