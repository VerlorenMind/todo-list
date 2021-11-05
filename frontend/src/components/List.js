import React from 'react'
import ListItem from './ListItem'

const List = (props) => {
    return(
        <div className="list-container">
            <ul>
                {props.data.map(item => {
                    return (
                        <ListItem item={item}/>
                    )
                })}
            </ul>
        </div>
    )
};

export default List