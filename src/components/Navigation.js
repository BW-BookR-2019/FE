import React from "react";
import { NavLink, Route, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../actions";

import PrivateRoute from "./PrivateRoute";
import BookList from "../components/BookList";
import BookPage from "../components/BookPage";
import AddReviewForm from "../components/AddReviewForm";
import NavLogo from "../navlogo.png";

const Navigation = () => {
  const dispatch = useDispatch();
  return (
    <>
      <div className="nav">
        <img className="logo" src={NavLogo} />
        <div className="nav-links">
          <NavLink to="/book-list">Book List</NavLink>
          <NavLink to="/login" onClick={() => dispatch(logout())}>
            Logout
          </NavLink>
        </div>
      </div>
      {/* <PrivateRoute exact path='/book-list' component={BookList} />
      <PrivateRoute path='/book-list/:id' component={BookPage} />
      <PrivateRoute path='/add-review/:id' component={AddReviewForm} /> */}
      <Route exact path="/book-list" component={BookList} />
      <Route exact path="/book-list/:id" component={BookPage} />
      <Route path="/book-list/:id/add-review" component={AddReviewForm} />
      <Redirect from="/" to="/book-list" />
    </>
  );
};

export default Navigation;
