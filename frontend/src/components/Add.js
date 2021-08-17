import React, {useState, useRef} from 'react';
import Slide from 'react-reveal/Slide';
import DatePicker from 'react-date-picker';
import axios from 'axios';

function Add({setAdd, fetchActivities}) {

  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const contentInput = useRef(null);
  const extraInput = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const object = {
      content: contentInput.current.value,
      extra: extraInput.current.value,
      dateDue: date
    };
    const headers = {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    };
    axios.post("/homework/create", object, headers).then(response => {
      console.log(response);
      if(response["status"] === 200){
        setAdd(false);
        fetchActivities();
        setLoading(false);
      }else{
        setLoading(false);
        setError(true)
      }
    })
  }

  return (
    <div className="top-0 left-0 fixed w-screen h-screen bg-gray-700 z-20 bg-opacity-60 flex justify-center items-center">
      <Slide bottom>
        <div className="lg:w-96 w-80 h-72 bg-white rounded-xl shadow-lg p-5 relative">
          <div onClick={() => setAdd(false)} className="absolute top-5 right-5 cursor-pointer">&#10060;</div>
          <h3 className="text-center font-bold text-2xl mt-5">Add an event.</h3>
          {error === true ? "There has been an error." : ""}
          {loading === true
          ?
            <svg className="animate-spin h-20 w-20 text-black mx-auto mt-14" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          :
            <form onSubmit={(e) => handleSubmit(e)}>
              <input ref={contentInput} required type="text" className="px-4 py-2 w-full shadow-lg m-1 outline-none border rounded-lg" placeholder="Subject" />
              <input ref={extraInput} required type="text" className="px-4 py-2 w-full shadow-lg m-1 outline-none border rounded-lg" placeholder="Extra" />
              <div className="flex justify-center items-center p-1">
                <DatePicker value={date} onChange={setDate} className="w-full" />
              </div>
              <input type="submit" className="px-4 py-2 rounded-lg bg-blue-500 text-white w-full m-1 hover:bg-blue-700 duration-300 cursor-pointer" />
            </form>
          }
        </div>
      </Slide>
    </div>
  )
}

export default Add