import React from "react";
import "./App.css";
import { Route, Link } from "react-router-dom";

import PrivateRoute from './components/PrivateRoute';
import BookList from "./components/BookList";
import BookPage from "./components/BookPage";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  return (
    <div className="App">
      <Link to="/book-list">Book Selection</Link>
      <div>
        <PrivateRoute exact path="/book-list" component={BookList} />
        <PrivateRoute path="/book-list/:id" component={BookPage} />
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
      </div>
    </div>
  );
}

export default App;
