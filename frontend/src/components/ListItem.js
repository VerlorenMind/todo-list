import React from 'react'

const ListItem = (props) => {
    let text;
    if(props.item.done) {
        text = <li key={props.item.id}><s>{props.item.contents}</s></li>
    }
    else {
        text = <li key={props.item.id}>{props.item.contents}</li>
    }
  return(
      <div className="list-item">
          {text}
          <button className='done-button'>Done</button>
      </div>
  )
};

export default ListItem
