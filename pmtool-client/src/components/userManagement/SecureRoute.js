import React from "react";
import { Route, Redirect } from "react-router-dom";
//import { useSelector } from "react-redux";
//import { selectToken } from "./usersSlice";

function SecureRoute({ component: Component, isAuthenticated, ...other }) {
  //let token = useSelector(selectToken);

  if (isAuthenticated === true) {
    return <Route {...other} render={(props) => <Component {...props} />} />;
  }
  return <Redirect to="/" />;
}

export default SecureRoute;
