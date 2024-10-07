import React from 'react'
import './RightSidebar.css'
import assets from '../../assets/assets'
import { logout } from '../../config/firebase'

function RightSidebar() {
  return (
    <div className='rs text-white  relative h-[75vh] overflow-y-scroll'>
      <div className="rs-profile flex flex-col items-center pt-[60px] text-center max-w-[70%] m-auto">
        <img className='w-[110px] grow rounded-full' src={assets.profile_img} alt="" />
        <h3 className='text-[18px] font-normal flex items-center justify-center gap-2'>Kunal Mathur <img src={assets.green_dot} className='dot' alt="" /></h3>
        <p className='text-[10px] font-light opacity-[80%]'>Hey ,Online Message me</p>
      </div>
      <hr className=' border-[#ffffff50] my-[15px]'/>
      <div className="rd-media px-[20px] text-[13px]">
        <p>Media</p>
        <div className='max-h-[180px] overflow-y-scroll grid grid-cols-2 gap-8 mt-[8px]'>
          <img className='rounded-lg w-[100px] cursor-pointer'  src={assets.pic1} alt="" />
          <img className='rounded-lg w-[100px] cursor-pointer' src={assets.pic2} alt="" />
          <img className='rounded-lg w-[100px] cursor-pointer' src={assets.pic1} alt="" />
          <img className='rounded-lg w-[100px] cursor-pointer' src={assets.pic2} alt="" />
          <img className='rounded-lg w-[100px] cursor-pointer' src={assets.pic3} alt="" /> 
          <img className='rounded-lg w-[100px] cursor-pointer' src={assets.pic4} alt="" />
        </div>
        <button onClick={()=>logout()} className='absolute bottom-[20px] left-[50%] translate-x-[-50%] bg-[#077eff] text-white border-none text-[12px] font-light py-[10px] px-[65px] rounded-2xl cursor-pointer '>Logout</button>
      </div>
      
    </div>
  )
}

export default RightSidebar
