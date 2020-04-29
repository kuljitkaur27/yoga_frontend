import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';


export default class Navigation extends Component {
  render() {
    return(
      <Navbar bg="dark" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav" >
          <Nav>
            <NavLink className="d-inline p-2 bg-dark text-white" to="/">Home</NavLink>
            <NavLink className="d-inline p-2 bg-dark text-white" to="/yogas">Yoga</NavLink>
            <NavLink className="d-inline p-2 bg-dark text-white" to="/instructors">Instructors</NavLink>
            <NavLink className="d-inline p-2 bg-dark text-white" to="/classes">Classes</NavLink>
            <NavLink className="d-inline p-2 bg-dark text-white" to="/packages">Packages</NavLink>
            <NavLink className="d-inline p-2 bg-dark text-white" to="/contact">Contact</NavLink>
            <NavLink className="d-inline p-2 bg-dark text-white" to="/signin">SignIn</NavLink>
            <NavLink className="d-inline p-2 bg-dark text-white" to="/Admin">Admin</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
