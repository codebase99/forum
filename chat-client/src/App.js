
import axios from 'axios'
import { useEffect, useState } from 'react';
import './App.css';
import Messages from './Messages'
import InputForum from './InputForm'    
import { io } from "socket.io-client";





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
    const socket = io("http://localhost:3000/",{
      withCredentials: true,
      extraHeaders: {
        "my-custom-header": "abcd"
      }
    });
    // socket.on("connection");
    socket.on("db changed", async () => {
      console.log("message posted")
      var newdata = await fetchMessages()
      setMessages(newdata)
    }); 
  },[])
  // useEffect(()=>{
  //   socket.on("x",(a)=>{
  //     console.log("okk")
  //   })
  // })
  return   (
    <div className='App'>
      <div className="header-container">
        <h1>Forum</h1>
      </div>
      <div className="InputForm-container">
        <InputForum/>
      </div>
      <div className="messages-container">
        <Messages messages={messages}/>
      </div>
      <div className="footer">

      </div>
    </div>
  );
}

export default App;
