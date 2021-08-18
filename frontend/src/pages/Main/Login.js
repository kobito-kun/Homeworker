import React, {useRef, useState, useEffect} from 'react';
import axios from 'axios';
import {useHistory, Link} from 'react-router-dom';

// import {loggedIn} from '../../utils';

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

  useEffect(() => {
    // loggedIn();

    if(localStorage.getItem("token") !== null){
      History.push("/dashboard")
    }
    // eslint-disable-next-line
  }, [])

  return (
    <div className="max-w-screen overflow-x-hidden min-h-screen bg-gradient-to-br from-gray-300 via-gray-200 to-gray-100  flex justify-center items-center relative">
      <form onSubmit={(e) => handleSubmitForm(e)} className="flex flex-col justify-center items-center">
        <h3 className="text-white font-bold mb-4 tracking-widest uppercase text-4xl">LOGIN</h3>
        <p className="text-red-700 font-bold">{message}</p>
        <input ref={emailInput} className="px-4 py-2 rounded-lg shadow m-1 outline-none" placeholder="Email..." type="email" />
        <input ref={passwordInput} className="px-4 py-2 rounded-lg shadow m-1 outline-none" placeholder="Password..." type="password" />
        <input type="submit" value="Login" className="px-4 py-2 rounded-lg shadow bg-gray-100 text-black m-1" />
        <Link to="/signup" className="text-xs text-black font-thin">Not registered yet?</Link>
      </form>
      {/* <h1 className={`text-white duration-300 text-5xl lg:text-9xl font-bold tracking-widest select-none absolute`}>LOGIN</h1> */}
    </div>
  )
}

export default Login
