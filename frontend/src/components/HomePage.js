import React from "react";
import {Link} from "react-router-dom";
import {isLoggedIn} from "../services/UserActions";

const HomePage = () => {
    if (isLoggedIn()) {
        return(<Link to='/profile'>Profile</Link>);
    }
    else {
        return(<Link to='/login'>Login</Link>);
    }
}

export default HomePage;
