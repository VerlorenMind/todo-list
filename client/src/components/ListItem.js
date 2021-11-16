import React, {useState} from 'react'

const ListItem = (props) => {
    let text;
    let [item, setItem] = useState(props.item);
    if(item.done) {
        text = <li key={item.id}><s>{item.contents}</s></li>
    }
    else {
        text = <li key={item.id}>{item.contents}</li>
    }
  return(
      <div className="list-item">
          {text}
      </div>
  )
};

export default ListItem
