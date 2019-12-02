import React from 'react';

import './ConversationListItem.css';

export default function ConversationListItem(props) {

    const { photo, name } = props.data;

    return (
      <div className="conversation-list-item">
        <img className="conversation-photo" src={photo} alt="conversation" />
        <div className="conversation-info">
         <h1 className="conversation-title">{ name }</h1>
         
        </div>
      </div>
    );
}
