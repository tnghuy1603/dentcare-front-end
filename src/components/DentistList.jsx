import axios from 'axios';
import React, { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth';
import Header from './Header';
import Sidebar from './Sidebar';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-regular-svg-icons';


const DentistList = ({role}) => {
  const auth = useAuth();
  const [dentists, setDentists] = useState([])
  const [branches, setBranches] = useState([])
  const [name, setName] = useState('');
  const [address, setAddress] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState(null);
  const [password, setPassword] = useState('');
  const [selectedBranchId, setSelectedBranchId] = useState(null);
  const [selectedDentist, setSelecetedDentist] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchPage, setSearchPage] = useState('')
  const maxPageDisplay = 5;
  useEffect(() => {
    const fetchDentists = async () => {
      const res = await axios.get(`http://localhost:8080/users`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.accessToken}`
        },
        params: {
          role: 'ROLE_DENTIST',
          page: currentPage

        }
      });
      console.log("Dentists", res.data.users);
      console.log("sdf", res.data);
      setDentists(res.data.users);
      setTotalPages(res.data.totalPages);
    };
    fetchDentists();
  }, [currentPage]);
  useEffect(() => {
    const fetchBranches = async() => {
      const res = await axios.get(`http://localhost:8080/branches`, {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${auth.accessToken}`
          },
      });
      setBranches(res.data);
    }
    fetchBranches();
  }, [])
  const addDentist =  async () => {
    try {
        console.log(email, name, dob, address, phoneNumber, selectedBranchId);
        const res = await axios.post(`http://localhost:8080/users`, {email, name, password, dob, address, phoneNumber, role: 'ROLE_DENTIST', branchId: selectedBranchId}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.accessToken}`
            },
        });
        setEmail('');
        setName('');
        setDob('');
        setPassword('');
        setAddress('');
        setPhoneNumber('');
        setSelectedBranchId(null);
        setDentists([...dentists, res.data])
        $('#addModal').modal('hide');
    } catch (error) {
        console.log(error.response)
    }
  }
  
  const handleUpdate = async () => {
    console.log(email, name, dob, address, phoneNumber, selectedBranchId, selectedDentist.id);
    const res = await axios.put(`http://localhost:8080/users/${selectedDentist.id}`, {email, name, password, dob, address, phoneNumber, branchId: selectedBranchId, userId: selectedDentist.id}, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth.accessToken}`
        }
    })
    setEmail('');
    setName('');
    setDob('');
    setPassword('');
    setAddress('');
    setPhoneNumber('');
    setSelectedBranchId(null);
    setSelecetedDentist(null)
    setDentists(dentists.map(dentist => dentist.id === selectedDentist.id ? res.data: dentist))
    $('#editModal').modal('hide');
  }
  const popUpEditModal = (dentist) => {
    setSelecetedDentist(dentist)
    setEmail(dentist.email);
    setAddress(dentist.address);
    setDob(dentist.dob)
    setAddress(dentist.address);
    setPhoneNumber(dentist.phoneNumber)
    setName(dentist.name)
  }
  const clearInput = () => {
    setEmail('');
    setName('');
    setDob('');
    setPassword('');
    setAddress('');
    setPhoneNumber('');
    setSelectedBranchId(null);
    setSelecetedDentist(null)
  }
  const getPages = () => {
    const startPage = Math.max(currentPage - Math.floor(maxPageDisplay / 2), 1);
    const endPage = Math.min(startPage + maxPageDisplay - 1, totalPages);
    return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
  };
  const handleSearchPage = () => {
    setCurrentPage(searchPage);
    setSearchPage('');
  }
  
  return (
    <>
    <div className="d-flex">
        <h3 className="i-name">Manage Dentist</h3>
        {role.includes('ROLE_ADMIN') && <button type="button" className="btn btn-primary ms-auto h-50 mt-5 me-5" data-bs-toggle="modal" data-bs-target="#addModel">Add dentist</button>
}
    </div>
    <div className='mt-3 p-3'>
      <table className="table table-striped" width='100%'>
        <thead className="table-dark text-center">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Address</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Email</th>
            <th scope="col">Day of birth</th>
            {role.includes('ROLE_ADMIN') && <th scope="col">Edit</th>}
            
          </tr>
        </thead>
        <tbody className='text-center'>
          {dentists.map((dentist, idx) => (
            <tr key={idx}>
              <th scope="row">{idx + 1}</th>
              <td className='aligin-middle'>{dentist.name}</td>
              <td className='aligin-middle'>{dentist.address}</td>
              <td className='aligin-middle'>{dentist.phoneNumber}</td>
              <td className='aligin-middle'>{dentist.email}</td>
              <td className='aligin-middle'>{dentist.dob}</td>
              {role.includes('ROLE_ADMIN') && (
              <td className='aligin-middle'>
                <div data-bs-toggle="modal" data-bs-target="#editModal"><FontAwesomeIcon icon={faEdit} style={{'color': 'green'}} onClick={() => popUpEditModal(dentist)}/></div>
              </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="modal fade" id="editModal" tabIndex={'-1'} aria-labelledby="editModalLabel" aria-hidden="true">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1 className="modal-title fs-5 fw-bold" id="editModalLabel">Update dentist</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={clearInput}></button>
                      </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label htmlFor="nameToUpdate" className="form-label">Full name</label>
                            <input type="text" className="form-control" id="nameToUpdate" onChange={(e) => setName(e.target.value)} defaultValue={selectedDentist?.name}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="addressToUpdate" className="form-label">Address</label>
                            <input type="text" className="form-control" id="addressToUpdate" onChange={(e) => setAddress(e.target.value)} defaultValue={selectedDentist?.address}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phoneNumberToUpdate" className="form-label">Phone number</label>
                            <input type="text" className="form-control" id="phoneNumberToUpdate" onChange={(e) => setPhoneNumber(e.target.value)} defaultValue={selectedDentist?.phoneNumber}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="dobToUpdate" className="form-label">Day of brith</label>
                            <input type="date" className="form-control" id="dobToUpdate" onChange={(e) => setDob(e.target.value)} defaultValue={selectedDentist?.dob}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="emailToUpdate" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="emailToUpdate" onChange={(e) => setEmail(e.target.value)} defaultValue={selectedDentist?.email}/>
                        </div>
                        <select class="form-select" aria-label="Default select example" onChange={(e) => setSelectedBranchId(e.target.value)} required>
                            <option selected>Select branch</option>
                            {branches.map((branch) => (
                              <>
                                {(selectedDentist && selectedDentist?.branch?.name === branch.name) ? <option value={branch.name} selected>{branch.name}</option> : <option value={branch.id} >{branch.name}</option>}
                                
                              </>
                          ))}
                        </select>
                        
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={handleUpdate}>Update</button>
                    </div>
                    </div>
                  </div>
                </div>
      <div className="modal fade" id="addModel" tabIndex="-1" aria-labelledby="addModelLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 fw-bold text-center" id="addModelLabel">Add dentist</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={clearInput}></button>
            </div>
            <form className="modal-body">
              <div className="mb-3">
                <label htmlFor="dentistName" className="form-label">Name</label>
                <input type="text" className="form-control" id="dentistName" onChange={(e) => setName(e.target.value)} required value={name} />
              </div>
              <div className="mb-3">
                <label htmlFor="emailToAdd" className="form-label">Email</label>
                <input type="email" className="form-control" id="addressToAdd" onChange={(e) => setEmail(e.target.value)} required value={email} />
              </div>
              <div className="mb-3">
                <label htmlFor="passwordToAdd" className="form-label">Password</label>
                <input type="password" className="form-control" id="addressToAdd" onChange={(e) => setPassword(e.target.value)} required value={password} />
              </div>
              <div className="mb-3">
                <label htmlFor="addressToAdd" className="form-label">Address</label>
                <input type="text" className="form-control" id="addressToAdd" onChange={(e) => setAddress(e.target.value)} required value={address}/>
              </div>
              <div className="mb-3">
                <label htmlFor="phoneNumberToAdd" className="form-label">Phone number</label>
                <input type="text" className="form-control" id="phoneNumberToAdd" onChange={(e) => setPhoneNumber(e.target.value)} required value={phoneNumber} />
              </div>

              <div className="mb-3">
                <label htmlFor="dobToAdd" className="form-label">Day of brith</label>
                <input type="date" className="form-control" id="dobToAdd" onChange={(e) => setDob(e.target.value)} required value={dob} />
              </div>
              <select class="form-select" aria-label="Default select example" onChange={(e) => setSelectedBranchId(e.target.value)} required>
                <option selected>Select branch</option>
                {branches.map((branch) => (
                  <>
                    <option value={branch.id}>{branch.name}</option>
                  </>
                ))}
              </select>
            </form>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={clearInput}>Close</button>
              <button type="button" className="btn btn-primary" onClick={addDentist}>Add</button>
            </div>

          </div>
        </div>
      </div>
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
      </div>
      
    </>
  )
}

export default DentistList;