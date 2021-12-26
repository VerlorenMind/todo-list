import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {getToken} from "../services/UserActions";

const CreateList = () =>
{
    let [listName, setListName] = useState('')
    let [listItems, setListItems] = useState([])
    let [response, setResponse] = useState({})
    const navigate = useNavigate();
    const addItem = () => {
        setListItems(
            [...listItems,
            {
                contents: '',
                done: false,
            }]
        )
    }
    const deleteItem = (index) => {
        let items_cpy = listItems;
        items_cpy.splice(index, 1);
        setListItems([...items_cpy]);
    }
    const setItem = (index, contents) => {
        let items_cpy = listItems;
        items_cpy[index] = {
            ...items_cpy[index],
            contents: contents,
        }
        setListItems([...items_cpy]);
    }
    const onSubmit = (e) => {
        e.preventDefault();
        let request = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + getToken()
                },
                body: JSON.stringify({name: listName, items: listItems})
            };
        console.log(request);
        fetch("/api/lists/create/",
            request
        ).then(response => {
            if (response.ok && response.status === 201) {
                return response.json()
            }
            else {
                console.log(response);
                setResponse(response);
                throw new Error('Failed to create list')
            }
        }).then(data => {
            navigate('/list/' + data.id);
        }).catch(error => console.log('error ->', error))
    }
    return(
        <form onSubmit={onSubmit} className={'create-list-form'}>
            <div>
                <input
                    onChange={(e) => setListName(e.target.value)}
                    value={listName}
                    type={'input'}
                    name={'list-name'}/>
            </div>
            <button type={"button"} onClick={addItem}>Add item</button>
            {
                listItems.map(
                    (item, index) => {
                        return (
                            <div>
                                <input
                                    onChange={(e) => setItem(index, e.target.value)}
                                    value={item.contents}
                                    key={index}
                                    type={'input'}
                                    name={'list-item'}/>
                                <button type={"button"} onClick={() => deleteItem(index)}>Delete item</button>
                            </div>
                        )
                    }
                )
            }
            <button type={'submit'}>Save</button>
        </form>
    )
}

export default CreateList;
