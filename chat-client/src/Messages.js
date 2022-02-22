import {React, useState} from 'react';
import './Messages.css'
import Message from './Message'

function Messages(props) {
    var [searchMode, setSearchMode] = useState(false)
    var [searchQuery, setSearchQuery] = useState('')

    var handleChange = (query)=>{
        if(query.length>0){
            setSearchMode(true)
            
        }
        else{
            setSearchMode(false)
            
        }
        setSearchQuery(query)
    }
    return (
        <div className="messages">
        <input type="text" value={searchQuery} onChange={(e)=>handleChange(e.target.value)}/>
        {searchMode?
            props.messages.map((m)=>{
                // console.log(m.id)
                if(m.message.includes(searchQuery)){
                    return (<div className="message-container">
                        <Message  key = {m.id} _id={m.id} name={m.name} message = {m.message}/>      
                    </div>)
                }
            }):
            props.messages.map((m)=>{
                // console.log(m.id)
                return (<div className="message-container">
                    <Message  key = {m.id} _id={m.id} name={m.name} message = {m.message}/>      
                </div>)
            })
        
        }
        </div>
    );
}

export default Messages
