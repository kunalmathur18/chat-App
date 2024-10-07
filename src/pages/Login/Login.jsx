import React, { useState } from 'react';
import './Login.css';
import assets from '../../assets/assets';
import logo from '../../assets/background.gif'
import { signup ,login} from '../../config/firebase'

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign Up");
  const [userName , setUserName] = useState("");
  const[email,setEmail] = useState("");
  const[password,setPassword] = useState("");
  const onSubmithandler = (event) => {
    event.preventDefault();
    if(currentState === "Sign Up"){
      signup(userName,email,password);
    } 
    else{
      login(email,password)
    }

  }

  return (
    <div className='login min-h-[100vh] flex flex-col md:flex-row justify-evenly py-9 px-3'>
      <img src={logo} className='logo rounded-full' alt="Logo" />
      <form onSubmit={onSubmithandler} action="" className='login-form flex flex-col py-[20px] px-[30px] gap-[20px] rounded-[10px]'>
        <h2 className='font-medium text-[25px] text-white'>{currentState}</h2>
        {currentState === "Sign Up" && (
          <input onChange={(e)=>setUserName(e.target.value)} value={userName} type="text" placeholder='User name' className="form-input py-[8px] px-[10px] border-[1px] border-solid border-[#c9c9c9] rounded-[4px] outline-[#077EFF]" required />
        )}
        <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder='Email address' className="form-input py-[8px] px-[10px] border-[1px] border-solid border-[#c9c9c9] rounded-[4px] outline-[#077EFF]" required />
        <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" placeholder='Password' className="form-input py-[8px] px-[10px] border-[1px] border-solid border-[#c9c9c9] rounded-[4px] outline-[#077EFF]" required />
        <button type='submit' className='bg-[#077EFF] text-white text-[16px] border-none rounded-[4px] cursor-pointer p-[10px]'>{currentState === "Sign Up" ? "Create Account" : "Login"}</button>
        <div className="login-term flex gap-[5px] text-[12px] text-[#e9e2e2]">
          <input type="checkbox" />
          <p>Agree to the terms of use & privacy policy</p>
        </div>
        <div className="login-forgot flex flex-col gap-[5px]">
          {currentState === "Sign Up" ? (
            <p className='login-toggle text-[13px] text-[#e9e2e2]'>Already have an account? <span className='font-medium text-[#64cec2] cursor-pointer' onClick={() => setCurrentState("Login")}>Login Here</span></p>
          ) : (
            <p className='login-toggle text-[13px] text-[#e9e2e2]'>Create an Account <span className='font-medium text-[#64cec2] cursor-pointer' onClick={() => setCurrentState("Sign Up")}>Click Here</span></p>
          )}
        </div>
      </form>
    </div>
  );
}

export default Login;
