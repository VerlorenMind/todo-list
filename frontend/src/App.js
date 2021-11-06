import React, {useState, useEffect} from "react";
import {render} from "react-dom";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import HomePage from './components/HomePage'
import Login from './components/Login'
import Profile from './components/Profile'
// import './App.css'

const App = () => {
    /*
    let [list, setList] = useState([]);
    let [loaded, setLoaded] = useState(false);
    let [placeholder, setPlaceholder] = useState("Loading");
    useEffect(() => {
        fetch("api/lists")
            .then(response => {
                if (response.status > 400) {
                    setPlaceholder("Something went wrong!")
                }
                return response.json();
            })
            .then(list => {
                setList(list);
                setLoaded(true)
            });
    }, []);
*/
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path={'/'} element={<HomePage/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/profile'} element={<Profile/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default App;

const container = document.getElementById("app");
render(<App />, container);