import {React, useState} from 'react'
import './Message.css'
import axios from 'axios'
import {Link} from 'react-router-dom'

const Message = ({_id, name, message}) => {
    var [editMode, setEditMode]=useState(false)
    var [editedMessage, setEditedMessage]=useState(message)
    

    var handleDelete = async ()=>{
        console.log(_id)
        const res = await axios.delete('http://localhost:3000/deleteMessage',{data:{id:_id}})
        if(res){
            console.log(res)
            return true
        }
    }

    var handleCancel=()=>{
        setEditedMessage(message)
        setEditMode(false)
    }
    var editMessage = async ()=>{
        console.log(editedMessage, _id)
        var data = {
            id:_id,
            message:editedMessage
        }
        var res = await axios.put('http://localhost:3000/updateMessage', data)
        if (res){
            alert('edited Message')
        }
        setEditedMessage(message)
        setEditMode(false)

    }
    
    
    return (
        
        <div className='Message'>
            <div className="name-container">
                <h1>{name}</h1>
            </div>
            {editMode?
            <div className="message-container">
                <input type="text" value={editedMessage} onChange={(e)=>setEditedMessage(e.target.value)} />
            </div>:
            <div className="message-container">
                <p>{message}</p> 
            </div>
            

            }

            {editMode?
            <div>
                <button onClick={()=>handleCancel()}>Cancel</button>
                
                <button  onClick={()=>editMessage()}>Edit</button>
            </div>:
            <div>
                <button onClick={()=>handleDelete()}>Delete</button>
                
                <button  onClick={()=>setEditMode(true)}>Edit</button>
            </div>}
            
            
        </div>
    )
}

export default Message
