import React, {useEffect, useState} from 'react';
import Slide from 'react-reveal/Slide';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import {CheckAuth, dateRead} from '../../utils';

function Index() {

  const [data, setData] = useState();
  const [todayHome, setTodayHome] = useState();
  const [loading, setLoading] = useState(true);
  const [dateChange, setDateChange] = useState(null);

  const calendarChange = (event) => {
    setDateChange(event);
    filterDay(event, [...data])
  }

  const filter = (a, s) => {
    const today = new Date().getTime();
    let o = [];
    // console.log(today, "THIS IS TODAY") // Debug
    a.forEach(i => {
      // console.log(new Date(i["dateDue"]).getTime(), "THIS IS SOMEDAY") // Debug
      if(new Date(i["dateDue"]).getTime() >= today){
        o.push(i);
      }
    })
    
    const b = o.sort((a, b) => {
      let keyA = new Date(a.dateDue), keyB = new Date(b.dateDue);
      if (keyA < keyB) return -1;
      if (keyA > keyB) return 1;
      return 0;
    });

    s([...b]);
    setLoading(false);
  };

  const filterDay = (a, b) => {    
    let o = [];

    b.forEach(item => {
      if(String(dateRead(item["dateDue"])) === String(dateRead(a))){
        o.push(item)
      };
    });

    setTodayHome([...o]);
  };

  const fetchActivities = () => {
    const headers = {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    };
    axios.get("/homework", headers).then(response => {
      if(response["status"] === 200){
        setData(response["data"]);
        filter(response["data"], setTodayHome);
      };
    })
  }

  useEffect(() => {
    CheckAuth();
    fetchActivities();
    // eslint-disable-next-line
  }, [])

  return (
    <div className="max-w-screen overflow-x-hidden min-h-screen overflow-y-hidden bg-gray-300 pt-10">
      <Slide top>
        <Calendar className="mx-auto shadow-lg" onChange={calendarChange} />
      </Slide>
      <h3 className="font-bold uppercase tracking-tight text-3xl text-center my-5">{dateChange ? dateRead(dateChange) : "upcoming events"}</h3>
      {
      loading
      ?
        <svg className="animate-spin h-20 w-20 text-black mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      :
      <Slide bottom>
        <div className="w-full flex justify-center items-center flex-col">
          {todayHome.length > 0 ? todayHome.map(item => (
            <div key={item["_id"]} className="w-80 lg:w-96 p-4 shadow bg-gray-400 rounded-lg my-2 hover:-translate-y-2 transform duration-500 cursor-pointer">
              <div className="font-bold text-white">
                {dateRead(item["dateDue"])}
              </div>
              <hr className="my-2" />
              <h2 className="text-3xl text-white font-thin">
                {item["content"]}
              </h2>
              <p className="font-bold text-gray-100">
                {item["extra"]}
              </p>
            </div>
          )) : "None"}
        </div>
      </Slide>
      }
    </div>
  )
}

export default Index
