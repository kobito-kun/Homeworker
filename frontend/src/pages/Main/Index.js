import React, {useState} from 'react'
import calenderImage from '../../assets/Calendar.png';
import {useHistory} from 'react-router-dom';

function Index() {

  const [hover, setHover] = useState(false);
  const History = useHistory();

  const handleClick = () => {
    History.push("/login");
  }

  return (
    <div className="max-w-screen overflow-x-hidden min-h-screen bg-gray-300 flex justify-center items-center relative flex-col">
      <div onClick={() => handleClick()} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className="z-10 cursor-pointer">
        <img src={calenderImage} alt="Calender" className={`${hover ? "scale-110" : ""} transform duration-300 w-80 lg:w-96 select-none z-10`} />
      </div>
      <h1 className={`${hover ? "text-gray-400 -translate-y-48" : "text-white"} transform duration-300 text-5xl lg:text-9xl font-bold tracking-widest select-none absolute`}>{!hover ? "HOMEWORKER" : "START NOW!"}</h1>
    </div>
  )
}

export default Index