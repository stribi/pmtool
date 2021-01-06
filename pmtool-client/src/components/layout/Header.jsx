import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { logoutUser, selectUsers } from "./../userManagement/usersSlice";
import { useSelector, useDispatch } from "react-redux";
//import store from "../../app/store";

function Header(props) {
  const { user, validToken } = useSelector(selectUsers);
  const dispatch = useDispatch();

  const handleLogout = () => {
    console.log("handleLogout");
    //store.dispatch(logoutUser());
    dispatch(logoutUser());
    window.location.href = "/";
  };

  const userIsAuthenticated = (
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link href="/dashboard">Dashboard</Nav.Link>
      </Nav>
      <Nav>
        <Nav.Link href="/dashboard">
          <FontAwesomeIcon icon={faUserCircle} /> {user.fullName}
        </Nav.Link>
        <Nav.Link href="/" onClick={handleLogout}>
          Logout
        </Nav.Link>
      </Nav>
    </Navbar.Collapse>
  );

  const userIsNotAuthenticated = (
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link href=""></Nav.Link>
      </Nav>
      <Nav>
        <Nav.Link href="login">Login</Nav.Link>
        <Nav.Link href="register">Register</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  );

  let headerLinks;
  if (validToken && user) {
    headerLinks = userIsAuthenticated;
  } else {
    headerLinks = userIsNotAuthenticated;
  }
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="/">Project Management Tool</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      {headerLinks}
    </Navbar>
  );
}

export default Header;
