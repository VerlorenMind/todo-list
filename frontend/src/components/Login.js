import React, {useState} from 'react'
import {Navigate} from 'react-router-dom'
import {login, isLoggedIn} from "../services/UserActions";

const Login = () => {
    const [ username, changeUsername ] =  useState('');
    const [ password, changePassword ] =  useState('');
    const [ response, setResponse ] = useState({});

    function onSubmit(e) {
        e.preventDefault();
        return login(username, password, setResponse);
    }

    if (!isLoggedIn()) {
        return (
            <form onSubmit={onSubmit} className={'login-form'}>
                <div>
                    <input
                        onChange={(e) => changeUsername(e.target.value)}
                        value={username}
                        type={'input'}
                        name={'username'}/>
                    <label className={'error-msg'}>{response.username}</label>
                </div>
                <div>
                    <input
                        onChange={(e) => changePassword(e.target.value)}
                        value={password}
                        type={'password'}
                        name={'password'}/>
                    <label className={'error-msg'}>{response.password}</label>
                </div>
                <label className={'error-msg'}>{response.non_field_errors}</label>
                <button type={'submit'}>Submit</button>
            </form>
        );
    }
    else {
        return(<Navigate to={'/'}/>);
    }
}

export default Login;
