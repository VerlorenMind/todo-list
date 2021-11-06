import React, {useState} from 'react'

const flipDone =  (item, setItem) => {
    let newItem = {...item, done : !item.done};
    console.log(JSON.stringify(newItem));
    fetch('api/lists/update-item/' + item.id + '/', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
    })
    .then(response => {console.log(response); return response.json()})
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
    setItem(() => newItem);
};

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
          <button onClick={() => flipDone(item, setItem)} className='done-button'>
              Done
          </button>
      </div>
  )
};

export default ListItem
