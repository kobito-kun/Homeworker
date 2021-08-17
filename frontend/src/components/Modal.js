import React, {useState} from 'react';
import Slide from 'react-reveal/Slide';
import axios from 'axios';

function Modal({item, fetchActivities, setModal}) {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const deleteEvent = () => {
    const theConfirmation = window.confirm("Are you sure!?")
    if(theConfirmation === true){
      const headers = {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      };
      axios.delete(`/homework/delete/${item["_id"]}`, headers).then(response => {
        console.log(response);
        if(response["status"] === 200){
          setLoading(true);
          fetchActivities();
          setModal(false);
        }else{
          setError(response["message"]);
        }
      })
    }
  }

  return (
    <div className="top-0 left-0 fixed w-screen h-screen bg-gray-700 z-20 bg-opacity-60 flex justify-center items-center">
      <Slide bottom>
        <div className="lg:w-96 w-80 h-72 bg-white rounded-xl shadow-lg p-5 relative flex justify-center items-center flex-col  222222">
          <div onClick={() => setModal(false)} className="absolute top-5 right-5 cursor-pointer">&#10060;</div>
          <h3 className="text-center font-bold text-2xl mt-5">Delete Event?</h3>
          {error === true ? "There has been an error." : ""}
          {loading === true
          ?
            <svg className="animate-spin h-20 w-20 text-black mx-auto mt-14" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          :
            <>
              <div className="text-center my-5">Are you sure you want to delete: <h3 className="font-bold">{item["content"]}</h3></div>
              <div className="flex justify-center items-center w-full">
                <button onClick={deleteEvent} className="px-4 py-2 mb-2 mx-1 rounded-lg shadow bg-blue-600 hover:bg-blue-700 text-white duration-300">YES!</button>
                <button onClick={() => setModal(false)} className="px-4 py-2 mb-2 mx-1 rounded-lg shadow bg-red-600 hover:bg-red-700 text-white duration-300">OMG NOT YET!</button>
              </div>
            </>
          }
        </div>
      </Slide>
    </div>
  )
}

export default Modal