import React, {Component} from "react";
import {Navigate} from "react-router-dom";
import {isLoggedIn} from "../services/UserActions"

const PrivateRoute = ({children}) => {
    return isLoggedIn() ?
        children :
        <Navigate to={'/login'}/>
}

export default PrivateRoute;