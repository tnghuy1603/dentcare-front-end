import axios from 'axios';
import React, { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faMagnifyingGlass, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import DentistList from './DentistList';

const AppointmentList = ({role}) => {
    const auth = useAuth()
    const [date, setDate] = useState(new Date().toISOString());
    const [appointments, setAppointments] = useState([])
    const [patientName, setPatientName] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const listFilterBy = ['patient name', 'dentist', 'room'];
    const [filterOption, setFilterOption] = useState('patient name');
    const [dentists, setDentists] = useState([])
    const [selectedDentistId, setSelectedDentistId] = useState(-1);
    const [selectedAppointment, setSelectedAppointment] = useState(null)
    
    
    
    const [room, setRoom] = useState('');
    const fetchAppointments = async () => {
        console.log(date);
      const res = await axios.get(`http://localhost:8080/appointments/${date}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth.accessToken}`
        }
      })
      
      console.log("Appointments", res.data);
      setAppointments(res.data);
    }

    const fetchDentists = async() => {
        const res = await axios.get(`http://localhost:8080/users/all`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.accessToken}`
            },
            params: {
                role: 'ROLE_DENTIST'
            }
        });
        console.log("Dentists", res.data);
        setDentists(res.data);
    }
    const handleSearch = async () => {
        let params = {};
        console.log("Option", filterOption)
        switch (filterOption) {
            case 'patient name':
                params = {
                    ...params,
                    patientName: searchQuery,
                };
                break;
            case 'dentist':
                params = {
                    ...params,
                    dentist: selectedDentistId, 
                };
                break;
            case 'room':
                params = {
                    ...params,
                    room: searchQuery,
                };
                break;
            default:
                break;
        }
        console.log('Params', params);
        console.log("date", date);
        const res = await axios.get(`http://localhost:8080/appointments/${formatDateToISO(date)}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.accessToken}`
            },
            params: params
        });
        console.log("Search result", res.data);
        setAppointments(res.data)
    }
    const handleDeleteAppointment = async () => {
        try {
            const res = await axios.delete(`http://localhost:8080/appointments/${selectedAppointment.id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.accessToken}`
                },
                
            });
            if(res.status === 200){
                setAppointments(appointments.filter((appointment => appointment.id !== selectedAppointment.id)))
            }
            $('#deleteModal').modal('hide');
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchAppointments();
    }, [date])
    useEffect(() => {
        fetchDentists();
    }, [])
    
    
  return (
    <>
        
      <div className="d-flex">
        <h3 className="i-name">Manage Appointments</h3>
            <input type="date" className='me-2 ms-auto mt-5 me-5' defaultValue={date} onChange={(e) => setDate(e.target.value)}/>
            {(role.includes('ROLE_ADMIN') || role.includes('ROLE_STAFF')) && <button type="button" className="btn btn-info ms-auto h-50 mt-5 me-5" data-bs-toggle="modal" data-bs-target="#AddModal">Add appointment</button>
}
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
                <div className="d-flex">
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
                </div>
            </div>
        </div>
        {appointments ? 
        <>
        <div className="board">
        <table width="100%">
            <thead>
                <tr>
                    <td>#</td>
                    <td>Name</td>
                    <td>Created</td>
                    <td>Dentist</td>
                    <td>Assistant</td>
                    <td>Room</td>
                    <td>Status</td>
                    {((role.includes('ROLE_ADMIN') || role.includes('ROLE_STAFF') )) && <td>Edit</td>}
                    
                </tr>
            </thead>

            <tbody>
            {appointments.map((appoinment, idx) => (
                    <tr key={appoinment.id}>
                        <td>{idx + 1}</td>
                        <td>{appoinment.patient.name}</td>
                        <td>{appoinment.createdAt.replace('T', ' ')}</td>
                        <td>{appoinment.dentist.name}</td>
                        <td>{appoinment?.assistant?.name}</td>
                        <td>{appoinment.room}</td>
                        <td>{appoinment.status}</td>
                        {(role.includes('ROLE_ADMIN') || role.includes('ROLE_STAFF') ) && <>
                            <td className="edit d-flex">
                                <div className="me-4" data-bs-toggle="modal" data-bs-target="#editModal"><FontAwesomeIcon icon={faEdit} style={{color: 'green'}}/></div>
                                <div data-bs-toggle="modal" data-bs-target="#deleteModal" onClick={() => setSelectedAppointment(appoinment)}><FontAwesomeIcon icon={faTrash} style={{color: 'red'}}/></div>
                            </td>
                        </>}
                        
                    </tr>))}
            </tbody>
        </table>
        <div className="modal fade" id="AddModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>

        <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>

        <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        Do you want to delete ?
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-danger" onClick={handleDeleteAppointment}>Confirm</button>
                    </div>
                </div>
            </div>
        </div>
      </div>
        </> : 'No appointments'
        }
    </>
  )
}

export default AppointmentList;