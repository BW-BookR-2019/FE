import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <NavLink to='/'>Home</NavLink>
          </li>
          <li>
            <NavLink to='/login'>Logout</NavLink>
          </li>
          <li>
            <NavLink to='/book-list'>Book-Selection</NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Nav;
