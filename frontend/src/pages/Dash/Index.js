import React, {useEffect, useState} from 'react';
import {CheckAuth} from '../../utils';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function Index() {

  const [data, setData] = useState();

  const calendarChange = (event) => {
    console.log(event)
  }

  const fetchActivities = () => {
    const headers = {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    };
    axios.get("/homework", headers).then(response => {
      if(response["status"] === 200){
        setData(response["data"]["data"]);
      };
    })
  }

  useEffect(() => {
    CheckAuth();
    fetchActivities();
  }, [])

  return (
    <div className="max-w-screen overflow-x-hidden min-h-screen bg-gray-300">
      <Calendar className="mx-auto shadow-lg" onChange={calendarChange} />
    </div>
  )
}

export default Index
