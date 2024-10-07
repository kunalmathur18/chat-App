import React, { useContext, useEffect, useState } from 'react'
import "./ChatBox.css"
import assets from '../../assets/assets'
import { GrGallery } from "react-icons/gr";
import { AppContext } from '../../context/AppContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { data } from 'autoprefixer';

function ChatBox() {

  const {userData,messagesId,chatUser,messages,setMessages}=useContext(AppContext);
  const [input,setInput] = useState("");
  useEffect(()=>{
    if(messagesId){
      const unSub = onSnapshot(doc(db,'messages',messagesId),(res)=>{
        setMessages(res.data().messages.reverse())
        console.log(res.data().messages.reverse());

      })
      return ()=>{
        unSub();
      }
    }

  },[messagesId])
  return chatUser ?  (
    <div className='chat-box h-[75vh]  relative '>
      <div className="chat-user py-[10px] px-[15px]  items-center gap-[10px] border-b-2 border-solid border-[#c6c6c6] flex">
        <img className='w-[38px] aspect-square rounded-2xl' src={chatUser.avatar} alt="" />
        <p className='grow font-medium text-[20px] text-[#393939] flex items-center gap-[5px] '>{chatUser.name} <img className='w-[25px] dot'  src={assets.green_dot} alt="" /></p>
        <img  src={assets.help_icon} className='help w-[25px] rounded-2xl' alt="" />
      </div>


      <div className="chat-msg ">
        <div className="s-msg flex items-end justify-end gap-[5px] px-[15px]">
          <p className='msg text-white bg-[#296f25] p-[8px] max-w-[200px] text-[11px] font-light  mb-[30px] '>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias </p>
          <div className='text-center text-[9px]'>
            <img className='w-[27px] grow rounded-2xl' src={assets.profile_img} alt="" />
            <p>2.30 PM</p>
          </div>
        </div>

        <div className="s-msg flex items-end justify-end gap-[5px] px-[15px]">
          <img className='max-w-[230px] mb-[30px] rounded-[10px]' src={assets.pic1} alt="" />
          <div className='text-center text-[9px]'>
            <img className='w-[27px] grow rounded-2xl' src={assets.profile_img} alt="" />
            <p>2.30 PM</p>
          </div>
        </div>

        <div className="r-msg flex  justify-start items-end gap-[5px] px-[15px] flex-row-reverse">
          <p className='msg text-white bg-[#383b38] p-[8px] max-w-[200px] text-[11px] font-light  mb-[30px] '>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias </p>
          <div className='text-center text-[9px]'>
         
            <img className='w-[27px] grow rounded-2xl' src={assets.profile_img} alt="" />
            <p>2.30 PM</p>
          </div>
        </div>
      </div>





      <div className='chat-input flex items-center gap-[12px] py-[10px] px-[15px] absolute bottom-0 left-0 right-0 bg-[#423e3e] rounded-lg ml-1'>
        <input type="text" placeholder='Send a message'  className='grow border-none outline-none bg-transparent text-white'/>
        <input type="file" id='image' accept='image/png,image/jpeg,image/jpg,image/pdf' hidden />
        <label htmlFor="image" className='flex '>
          {/* <img className='w-[22px] cursor-pointer' src={assets.gallery_icon} alt="" /> */}
          <GrGallery className='text-white text-[20px]'/>
         </label>
        <img className='w-[30px] cursor-pointer' src={assets.send_button} alt="" />

      </div>
      
    </div>
  ):<div className='chat-welcome hidden '>
    {/* <img src={assets.logo_icon} alt="" />
    <p>Chat Anytime Anywhere</p> */}

  </div>
}

export default ChatBox