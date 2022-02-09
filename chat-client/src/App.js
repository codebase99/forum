
import axios from 'axios'
import { useEffect, useState } from 'react';
import './App.css';
import Messages from './Messages'
import InputForum from './InputForm'    
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:3000"


function App() {
  const [messages, setMessages]= useState([])
    
  async function fetchMessages(){ 
    try{
        var result = await axios.get('http://localhost:3000/getMessages')
        
        return result.data

    } 
    catch(error){
      console.log(error)
    }
  }
  useEffect(async ()=>{
    var data = await fetchMessages()
    setMessages(data)

    //setting up socket.io for when messages are posted
    const socket = socketIOClient(ENDPOINT);
    socket.on("message posted", async (d) => {
      console.log("message posted")
      var data = await fetchMessages()
      setMessages(data)
    }); 
  },[])
  return (
    <div className='App'>
      <div className="header">
        <h1>Forum</h1>
      </div>
      <div className="InputForm">
        <InputForum/>
      </div>
      <div className="messages">
        <Messages messages={messages}/>
      </div>
      <div className="footer">

      </div>
    </div>
  );
}

export default App;
