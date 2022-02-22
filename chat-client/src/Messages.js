import React from 'react';
import './Messages.css'
import Message from './Message'

function Messages(props) {
    
    return (
        <div className="messages">
            {props.messages.map((m)=>{
                // console.log(m.id)
                return (<div className="message-container">
                    <Message  key = {m.id} _id={m.id} name={m.name} message = {m.message}/>      
                </div>)
            })}
        </div>
    );
}

export default Messages
