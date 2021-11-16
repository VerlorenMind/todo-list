import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {getToken} from "../services/UserActions";

const Profile = () => {
    let token = getToken();
    let [lists, setLists] = useState([]);
    useEffect(
        () => {
            fetch("api/lists",
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
                    setLists(list);
                });
        }, []
    )
    return(
        <div>
            <Link to={"/create-list"}>Create new list</Link>
            <div className={'list-container'}>
                <ul>
                    {lists.map(item => {
                        return (
                            <li key={item.id}><Link to={'/list/' + item.id}>{item.name}</Link></li>
                        )
                    })}
                </ul>
            </div>
        </div>
    );
}

export default Profile;