import React from 'react'
import './Message.css'
import axios from 'axios'

const Message = ({_id, name, message}) => {
    var handleEdit = (id)=>{

    }
    var handleDelete = async ()=>{
        console.log(_id)
        const res = await axios.delete('http://localhost:3000/deleteMessage',{data:{id:_id}})
        if(res){
            console.log(res)
            return true
        }
    }
    
    return (
        <div className='Message'>
            <div className="name-container">
                <h1>{name}</h1>
            </div>
            <div className="message-container">
                <p>{message}</p> 
            </div>
            <div>
                <button onClick={()=>handleDelete()}>Delete</button>
                <button onClick={()=>handleEdit()}>Edit</button>
            </div>
        </div>
    )
}

export default Message
