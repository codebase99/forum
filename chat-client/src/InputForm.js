import {React, useState} from 'react'
import axios from 'axios'

export default function InputForm() {
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')

    var handleMessage = (message)=>{
        setMessage(message)
    }
    
    var handleName = (name)=>{
        setName(name)
    }

     var handleSubmit= async (e)=>{
        e.preventDefault()
        try{
            var result = await axios.post('http://localhost:3000/postMessage',{
                name:name,
                message:message
            })
            if(result){
                setMessage('')
                setName('')
                return true
            }
        }
        catch(error){
            console.log(error)
        }
        

    }
    return (
        <div className="InputForm">
            <form onSubmit={handleSubmit} method="post">
                <input type="text" name="name" id="name" value={name} onChange={e=>handleName(e.target.value)} />
                <input type="text" name="message" id="message" value={message} onChange={e=>handleMessage(e.target.value)}  />
                <input type="submit" value="send" />

            </form>
        </div>

    )
}
