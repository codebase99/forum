import React from 'react'
import './Message.css'

const Message = (props) => {
    return (
        <div className='Message'>
            <h1>{props.name}</h1>
            <p>{props.message}</p> 
        </div>
    )
}

export default Message
