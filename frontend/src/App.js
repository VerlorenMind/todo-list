import React, {useState, useEffect} from "react";
import {render} from "react-dom";
import './App.css'
import List from './components/List'

const App = () => {
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

    return (
        <List data={list}/>
    );
};

export default App;

const container = document.getElementById("app");
render(<App />, container);