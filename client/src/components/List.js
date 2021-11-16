import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import ListItem from './ListItem'
import {getToken} from "../services/UserActions";

const List = () => {
    const params = useParams();
    const token = getToken();
    let [name, setName] = useState("");
    let [items, setItems] = useState([]);
    useEffect(
        () => {
            fetch("/api/lists/" + params.id,
                {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Token ' + token
                    }
                }
            )
                .then(response => {
                    return response.json();
                })
                .then(list => {
                    setName(list.name);
                    setItems(list.items);
                });
        }, []
    )
    return(
        <div className="list-container">
            <h1>{name}</h1>
            <ul>
                {items.map(item => {
                    return (
                        <ListItem item={item}/>
                    )
                })}
            </ul>
        </div>
    )
};

export default List