import React, {useEffect, useState} from "react";
import {Redirect} from "react-router-dom";
import ListItem from "./ListItem";

const Profile = () => {
    let token = localStorage.getItem("userToken");
    let [lists, setLists] = useState([]);
    if(token)
    {
        useEffect(
            () => {
                fetch("api/lists",
                    {
                        method: 'GET',
                        headers: {
                            'Authorization' : 'Token ' + token
                        }
                    }
                )
                .then(response => {
                    return response.json();
                })
                .then(list => {
                    setLists(list);
                });
            }
        )
        return(
            <ul>
                {lists.map(item => {
                    return (
                        <li key={item.id}>{item.name}</li>
                    )
                })}
            </ul>
        );
    }
    else
    {
        return (<Redirect to={'/login'}/>)
    }
}

export default Profile;