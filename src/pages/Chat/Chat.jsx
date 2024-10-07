import React, { useContext, useEffect, useState } from 'react'
import './Chat.css'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import ChatBox from '../../components/ChatBox/ChatBox'
import RightSidebar from '../../components/RightSidebar/RightSidebar'
import { AppContext } from '../../context/AppContext'


const Chat = () => {
  const {chatData,userData} = useContext(AppContext);
  const[loading,setloading] = useState(true);
  useEffect(()=>{
    if(chatData && userData){
      setloading(false)

    }

  },[chatData,userData])
  return (
    <div className='chat min-h-[100vh]'> 
    {
      loading ? <p className='loading text-[50px] animate-spin'> Loading...</p>
      :
      <div className="chat-container w-[95%] h-[75vh] max-w-[1000px] ">
      <LeftSidebar/>
      <ChatBox/>
      <RightSidebar/>

    </div>
    }
    
     
    </div>
  )
}

export default Chat
