import React from 'react';
import './App.css';
import { Route, Link } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';
import Navigation from './components/Navigation';
import BookList from './components/BookList';
import BookPage from './components/BookPage';
import Register from './components/Register';
import Login from './components/Login';
import AddReviewForm from './components/AddReviewForm';

function App() {
  return (
    <div className='App'>
      <Navigation />
      <div>
        {/* <PrivateRoute exact path='/book-list' component={BookList} />
        <PrivateRoute path='/book-list/:id' component={BookPage} />
        <PrivateRoute path='/add-review/:id' component={AddReviewForm} /> */}
        <Route exact path='/book-list' component={BookList} />
        <Route path='/book-list/:id' component={BookPage} />
        <Route path='/add-review/:id' component={AddReviewForm} />
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
      </div>
    </div>
  );
}

export default App;
