import React from 'react';
import './Messages.css'
import Message from './Message'

function Messages(props) {
    
    return (
        <div className="messages">
            {/* <div className="messages-container">
                <Message id='1' name='Abhilash1' message=' This is Abhilash '/>
            </div>
            <div className="message-container">
                <Message id='2' name='carl' message='this is carl'/>
            </div>
            <div className="message-container">
                <Message id='3' name='bob' message=' this is bob'/>
            </div> */}
            {/* {JSON.stringify(props.messages)} */}
            {props.messages.map((m)=>{
                return (<div className="message-container">
                    <Message name={m.name} message = {m.message}/>      
                    
                </div>)
            })}
        </div>
    );
}

export default Messages
