import React from "react";
import Profile from './Profile'
import Login from './Login'
import {Redirect} from "react-router-dom";

const HomePage = () => {
    if (localStorage.getItem("userToken")) {
        return(<Redirect to='/profile'/>);
    }
    else {
        return(<Redirect to='/login'/>);
    }
}

export default HomePage;
