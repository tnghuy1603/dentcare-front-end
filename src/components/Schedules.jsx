import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useState } from 'react'
import useAuth from '../hooks/useAuth';

function Schedules({role}) {
  const [workingSchedules, setWorkingSchedule] = useState([]);
  
  const [month, setMonth] = useState([]);
  const [year, setYear] = useState([]);
  const [date, setDate] = useState(new Date());
  const auth = useAuth();
  
  const  getWeekDates = (inputDate) => {
    let date = new Date(inputDate);
    let startDate = new Date(date.setDate(date.getDate() - date.getDay()));
    let endDate = new Date(date.setDate(startDate.getDate() + 6));
    let weekDates = [];
    for (let currentDate = startDate; currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
      weekDates.push(new Date(currentDate));
    }
    return weekDates;
  }
  const fetchWorkingSchedules = async () => {
    let params = {};
    switch(filterOption){
      case 'Daily': 
          params = {...params, date: date.toISOString().split('T')[0]};
          break;
      case 'Monthly':
          params = {...params, month};
      case 'Weekly': 
        const dates = getWeekDates(date)
        params = {...params, dates};
        break;
      default:
        break;
    }
    console.log("Params", params);
    const res = await axios.get(`http://localhost:8080/working-schedules`, {
      headers: {
        "Content-Type": "application/json",
        'Authorization' : `Bearer ${auth.accessToken}`,
      },
       params: params
    });
    
    console.log(res.data);
    setWorkingSchedule(res.data);
  }
  
  
  
  const listFilterBy = ['Weekly', 'Daily', 'Monthly'];
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const [filterOption, setFilterOption] = useState(listFilterBy[1]);
  return (
    <>
      <div className="d-flex">
        <h3 className="i-name">Manage Appointments</h3>
        {(filterOption === 'Daily' || filterOption === 'Weekly') ?  <input type="date" className='me-2 ms-auto mt-5 me-5' defaultValue={formatDateToISO}/> :  <input type="text" className='me-2 ms-auto mt-5 me-5' defaultValue={formatDateToISO} placeholder=''/>}
           
        {(role.includes('ROLE_ADMIN') || role.includes('ROLE_STAFF')) && <button type="button" className="btn btn-info ms-auto h-50 mt-5 me-5" data-bs-toggle="modal" data-bs-target="#AddModal">Add appointment</button>}
        <button onClick={fetchWorkingSchedules}>Search</button>
        </div>
        <div className='d-flex justify-content-start align-items-center mt-3'>
            <form className='mx-3 d-flex justify-content-start align-items-center'>
                <label htmlFor='filter' className='mx-3'>Filter by</label>
                <select id='filter' className='p-1 rounded-2' onChange={(e) => setFilterOption(e.target.value)}>
                    {listFilterBy.map((item) => (
                        <option style={{ backgroundColor: 'white', color: 'black' }} key={item} value={item}>{item}</option>
                    ))}
                </select>
            </form>
            <div className="search-container">
                {/* <div className="d-flex">
                    {filterOption === 'dentist' ? <>
                    <select class="form-select" aria-label="Select filter" onChange={(e) => setSelectedDentistId(e.target.value)}>
                        <option selected>Select dentist</option>
                        {dentists.map(dentist => <>
                            <option value={dentist.id} key={dentist.id}>{dentist.name}</option>
                        </>)}
                         </select>
                    </>: 
                        <input className="form-control me-2" type="search" placeholder="Tìm kiếm" aria-label="Search" onChange={(e) => setSearchQuery(e.target.value)}/>
                    }
                                        
                    <button className="btn btn-outline-success mx-3" onClick={handleSearch}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} className='search-icon' />
                    </button>
                </div> */}
            </div>
        </div>
    </>
  )
}

export default Schedules