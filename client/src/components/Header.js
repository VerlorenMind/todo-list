import React from 'react'
import {isLoggedIn, logout} from "../services/UserActions";
import {Link, useNavigate} from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const onLogoutClick = (e) => {
        e.preventDefault();
        logout();
        navigate('/login');
    }
    let button = isLoggedIn()
        ? <button onClick={onLogoutClick}>Log Out</button>
        : <Link to='/login'><button type='button'>Log in</button></Link>
    return(
        <header>
            <h1>Todo Lists app</h1>
            {button}
        </header>
    )
}

export default Header;
