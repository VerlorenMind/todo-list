import React, {useState, useEffect} from "react";
import {render} from "react-dom";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from './components/Login'
import Profile from './components/Profile'
import List from "./components/List";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute"
import './App.css'
import CreateList from "./components/CreateList";

const App = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path={'/'} element={<PrivateRoute><Profile/></PrivateRoute>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/create-list'} element={<PrivateRoute><CreateList/></PrivateRoute>}/>
                <Route path={'/list/:id'} element={<PrivateRoute><List/></PrivateRoute>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default App;

const container = document.getElementById("app");
render(<App />, container);