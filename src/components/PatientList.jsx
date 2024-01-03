import axios from "axios";
import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faInfo, faSearch } from "@fortawesome/free-solid-svg-icons";

const PatientList = () =>  {
  const auth = useAuth();
  const [patients, setPatients] = useState([]);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [dob, setDob] = useState(null);
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('Male');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorMsg, setErrorMsg] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchPage, setSearchPage] = useState('')
  const maxPageDisplay = 5;
  const fetchPatients = async () => {
    const res = await axios.get(`http://localhost:8080/patients`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${auth.accessToken}`,
      },
      params: {
        page: currentPage
      }
    });
    setTotalPages(res.data.totalPages)
    setPatients(res.data.patients);
  };
  const fetchPatientByName = async () => {
    const res = await axios.get(`http://localhost:8080/patients`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${auth.accessToken}`,
      },
      params: {
        page: currentPage,
        patientName: searchTerm
      }
    });
    setCurrentPage(res.data.currentPage);
    setTotalPages(res.data.totalPages);
    setPatients(res.data.patients);
  }
  useEffect(() => {
    fetchPatients();
  }, []);
  

  const handleUpdate = async (patientId) => {
    console.log(name, address, gender, dob,  phoneNumber);
    const res = await axios.put(`http://localhost:8080/patients/${patientId}`, {patientId, name, address, gender, dob,  phoneNumber}
    , {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.accessToken}`
      }
    });
    setPatients(
      patients.map((patient) => patient.id === patientId ? res.data : patient)
    );
  }
  
  const handleAdd = async() => {
    try {
      const res = await axios.post(`http://localhost:8080/patients`, {name, gender, dob, address, phoneNumber}, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth.accessToken}`
          }
      });
      
      console.log(res.data);
      setAddress('');
      setName('');
      setDob(null);
      setGender('');
      setPhoneNumber('');
      setPatients([...patients, res.data])
    } catch (error) {
      console.log(error.message);
      setErrorMsg(error.message);
    }
    
  }
  const getPages = () => {
    const startPage = Math.max(currentPage - Math.floor(maxPageDisplay / 2), 1);
    const endPage = Math.min(startPage + maxPageDisplay - 1, totalPages);
    return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
  };
  const handleSearchPage = () => {
    setCurrentPage(searchPage);
    setSearchPage('')
  }
  const handleSearch = async () => {
    console.log("Handling search");
    if(searchTerm === ''){
      await fetchPatients();
    } else {
      await fetchPatientByName();
    }
  }
  

  return (
    <>
      <div className="d-flex">
          <h3 className="i-name">Patient Profiles</h3>
          <div class="d-flex mx-5" role="search">
            <input class="form-control me-2 ms-auto h-50 mt-5 me-5" type="search" placeholder="Search" aria-label="Search" onChange={(e) => setSearchTerm(e.target.value)}/>
            <button class="btn btn-success ms-auto h-50 mt-5 me-5" type="submit"><FontAwesomeIcon icon={faSearch} onClick={handleSearch}/></button>
          </div>
          <button type="button" className="btn btn-primary ms-auto h-50 mt-5 me-5" data-bs-toggle="modal" data-bs-target="#addPatientModel">Add patient</button>
      </div>
      

      <div className="board mt-5">
        <table className="table table-striped">
          <thead className="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Gender</th>
              <th scope="col">Day of brith</th>
              <th scope="col">Address</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Edit</th>
            </tr>
          </thead>
          <tbody>
          {patients.map((patient, idx) => (
          <tr key={patient.id}>
            <th scope="row">{idx+1}</th>
            <td>{patient.name}</td>
            <td>{patient.gender}</td>
            <td>{patient.dob}</td>
            <td>{patient.address}</td>
            <td>{patient.phoneNumber}</td>
            <td colSpan={1} className="d-flex gap-3 align-middle">
            <Link to={`./${patient.id}`} state={{patientData: patient}}>
              <div className="px-3"><FontAwesomeIcon icon={faEye} style={{'color' : 'green'}}/></div>
            </Link>
              <div data-bs-toggle="modal" data-bs-target="#editModal"><FontAwesomeIcon icon={faEdit} style={{'color': 'green'}}/></div>
              <div className="modal fade" id="editModal" tabIndex={'-1'} aria-labelledby="editModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5 fw-bold" id="editModalLabel">Update Patient</h1>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                    <div className="mb-3">
                      <label htmlFor="nameToUpdate" className="form-label">Full name</label>
                      <input type="text" className="form-control" id="nameToUpdate" onChange={(e) => setName(e.target.value)} defaultValue={patient.name} required/>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="addressToUpdate" className="form-label">Address</label>
                      <input type="text" className="form-control" id="addressToUpdate" onChange={(e) => setAddress(e.target.value)} defaultValue={patient.address} required/>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="phoneNumberToUpdate" className="form-label">Phone number</label>
                      <input type="text" className="form-control" id="phoneNumberToUpdate" onChange={(e) => setPhoneNumber(e.target.value)} defaultValue={patient.phoneNumber} required/>
                    </div>
                    
                    <div className="mb-3">
                      <label htmlFor="addressToUpdate" className="form-label">Address</label>
                      <input type="text" className="form-control" id="addressToUpdate" onChange={(e) => setAddress(e.target.value)} defaultValue={patient.address} required/>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="dobToUpdate" className="form-label">Day of birth</label>
                      <input type="date" className="form-control" id="dobToUpdate" onChange={(e) => setDob(e.target.value)} value={patient.dob} required/>
                    </div>
        
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button type="button" className="btn btn-primary" onClick={() => handleUpdate(patient.id) }>Update</button>
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        ))}
          </tbody>
        </table>
      </div>
      <div className="modal fade" id="addPatientModel" tabIndex="-1" aria-labelledby="addPatientModelLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 fw-bold text-center" id="addPatientModelLabel">Add patient</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="addName" className="form-label">Full name</label>
                    <input type="text" className="form-control" id="addName" onChange={(e) => setName(e.target.value)} value={name}/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="addAddress" className="form-label">Address</label>
                    <input type="text" className="form-control" id="addAddress" onChange={(e) => setAddress(e.target.value)} value={address}/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="addPhoneNumber" className="form-label">Phone number</label>
                    <input type="text" className="form-control" id="addPhoneNumber" onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber}/>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="addDOB" className="form-label">Day of birth</label>
                    <input type="date" className="form-control" id="addBOB" onChange={(e) => setDob(e.target.value)} value={dob}/>
                  </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleAdd}>Add</button>
            </div>
          </div>
        </div>
      </div>
      { patients && <>
      <div className='d-flex justify-content-center'>
        <nav aria-label="Paging nav">
                    <ul className="pagination justify-content-center">
                        <li className="page-item">
                            <button className="page-link" href="#" aria-label="Previous" onClick={(e) => setCurrentPage(currentPage -1)}>
                                <span aria-hidden="true">&laquo;</span>
                            </button>
                        </li>
                        {
                            getPages().map((page, index) => (

                                <li className={`page-item ${currentPage + 1 === page ? "active" : ""}`} key={index}><div className="page-link" onClick={() => setCurrentPage(page-1)}>{page}</div></li>
                            ))
                        }

                        <li className="page-item">
                            <button className="page-link" href="#" aria-label="Next" onClick={() => setCurrentPage(currentPage + 1)}>
                                <span aria-hidden="true">&raquo;</span>
                            </button>
                        </li>
                        <input type="text" className="bg-white text-black search-page-input" value={searchPage} onChange={(e) => setSearchPage(e.target.value)}/>
                        <button  className="ms-3 bg-primary" onClick={handleSearchPage}>Search</button>
                        
                    </ul>
                </nav>
        </div>
        </>}

      
    </>
  );
}

export default PatientList;
