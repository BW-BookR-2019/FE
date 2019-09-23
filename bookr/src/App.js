import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Route} from 'react-router-dom'
import BookList from './components/BookList'
import BookPage from './components/BookPage'

function App() {
  return (
    <div className="App">
      




      <div>
        <Route path="/book-list" component={BookList}/>
        <Route path="/book-list/:id" component={BookPage} />
        <Route path='/register' component={Register} />
        <Route pathe='/login' component={login} />
      </div>
    </div>
  );
}

export default App;
