export const isLoggedIn = () => {
    return !!localStorage.getItem("userToken");
}

export const login = (username, password, setResponse) => {
    return fetch('api/token-auth/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body:  JSON.stringify({username, password})
    }).then(response => {
        return response.json()
    }).then(data => {
        if(data.token) {
            localStorage.setItem("userToken", data.token);
        }
        console.log(data);
        setResponse(data);
    }).catch(error => console.log('error ->', error))
}

export const logout = () => {
    localStorage.removeItem('userToken');
}

export const getToken = () => {
    return(localStorage.getItem("userToken"))
}