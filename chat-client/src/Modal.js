import React, { useState } from 'react'
import {axios} from 'axios'

function Modal() {
    var [form, setForm]=useState({
        message:""
    })
    var handleSubmit = async ()=>{
        var data = {
            // id:_id,
            message: form.message
        }
        var res = await axios.post('http://localhost:3000/updateMessage',data)

    }
  return (
    <div className='Modal'>
        <form onSubmit="handleSubmit" method="post">
            {/* <div className="name-input-container">
                <input type="text" name="name-input" id="name-input" value={form.name} onchange={(e)=>setForm({...form,message:e.target.value})}/>
            </div> */}
            <div className="message-input-container">
                <input type="text" name="message-input" id="message-input" value={form.message} onChange={e=>setForm(e.target.value)} />
            </div>
            <input type="submit" value="Submit" onSubmit={handleSubmit}/>
        </form>
        
    </div>
  )
}

export default Modal