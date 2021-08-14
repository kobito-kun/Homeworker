import React, {useRef, useState} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';

function Login() {

  const [message, setMessage] = useState("");
  const emailInput = useRef(null);
  const passwordInput = useRef(null);
  const History = useHistory();

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const object = {
      email: emailInput.current.value,
      password: passwordInput.current.value
    };
    axios.post("/user/login", object).then(response => {
      if(response["status"] === 200){
        localStorage.setItem("token", response["data"]["token"]);
        setMessage(response["data"]["message"]);
        History.push("/dashboard")
      }else{
        setMessage(response["data"]["message"]);
      }
    })
  }

  return (
    <div className="max-w-screen overflow-x-hidden min-h-screen bg-gradient-to-br from-gray-300 via-gray-200 to-gray-100  flex justify-center items-center relative">
      <form onSubmit={(e) => handleSubmitForm(e)} className="flex flex-col justify-center items-center">
        <p className="text-red-700 font-bold">{message}</p>
        <input ref={emailInput} className="px-4 py-2 rounded-lg shadow m-1 outline-none" placeholder="Email..." type="email" />
        <input ref={passwordInput} className="px-4 py-2 rounded-lg shadow m-1 outline-none" placeholder="Password..." type="password" />
        <input type="submit" value="Login" className="px-4 py-2 rounded-lg shadow bg-gray-100 text-black m-1" />
      </form>
      {/* <h1 className={`text-white duration-300 text-5xl lg:text-9xl font-bold tracking-widest select-none absolute`}>LOGIN</h1> */}
    </div>
  )
}

export default Login
