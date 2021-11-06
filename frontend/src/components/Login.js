import React, {useState} from 'react'
import {Navigate} from 'react-router-dom'

const Login = () => {
    const [ username, changeUsername ] =  useState('');
    const [ password, changePassword ] =  useState('');
    const [logged, setLogged] = useState(false);

    function onSubmit(e) {
        e.preventDefault();
        return fetch('dj-rest-auth/login/', {
            method: 'POST',
            credentials: 'omit',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body:  JSON.stringify({username, password})
        }).then(resp => resp.json()).then(data => {
            localStorage.setItem("userToken", data.key);
            setLogged(true);
        }).catch(error => console.log('error ->', error))
    }

    if (logged) {
        return(<Navigate to={"/profile"}/>)
    }
    else {
        return (
        <form onSubmit={onSubmit} className={'login-form'}>
            <div>
                <input
                    onChange={(e) => changeUsername(e.target.value)}
                    value={username}
                    type={'input'}
                    name={'username'}/>
            </div>
            <div>
                <input
                    onChange={(e) => changePassword(e.target.value)}
                    value={password}
                    type={'password'}
                    name={'password'}/>
            </div>
            <button type={'submit'}>Submit</button>
        </form>
        );
    }
}

export default Login;
