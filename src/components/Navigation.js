/* eslint-disable no-unused-vars */
import React from "react";
import { NavLink, Route, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../actions";

import PrivateRoute from "./PrivateRoute";
import BookList from "../components/BookList";
import BookPage from "../components/BookPage";
import ReviewForm from "../components/ReviewForm";
import NavLogo from "../navlogo.png";

const Navigation = props => {
  const dispatch = useDispatch();
  return (
    <>
      <div className="nav">
        <NavLink exact to="/book-list"><img className="logo" src={NavLogo} alt='Bookr Logo'/></NavLink>
        <div className="nav-links">
          <NavLink to="/book-list">Book List</NavLink>
          <NavLink to="/login" onClick={() => dispatch(logout())}>
            Logout
          </NavLink>
        </div>
      </div>
      <PrivateRoute exact path='/book-list' component={BookList} />
      <PrivateRoute exact path='/book-list/:id' component={BookPage} />
      <PrivateRoute exact path='/book-list/:id/add-review' component={ReviewForm} />
      {props.location.pathname === '/' && <Redirect from="/" to="/book-list" />}
    </>
  );
};

export default Navigation;
