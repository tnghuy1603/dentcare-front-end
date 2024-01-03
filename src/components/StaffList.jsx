import axios from 'axios';
import React, { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth';

const StaffList = () => {
    const [staffs, setStaffs] = useState([]);
    const [branches, setBranches] = useState([])
    const [name, setName] = useState('');
    const [address, setAddress] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState(null);
    const [password, setPassword] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0)
    
    const [selectedBranchId, setSelectedBranchId] = useState(null);

    const auth = useAuth();
    
    
    useEffect(() => {
        const fetchStaffs = async() => {
          const res = await axios.get(`http://localhost:8080/users`, {
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${auth.accessToken}`
              },
              params: {
                  role: 'ROLE_STAFF',
                  page: currentPage
              }
          });
          setStaffs(res.data.users);
          setTotalPages(res.data.totalPages);
          
        };
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
        fetchStaffs();
    }, []);
    const handleAdd = async () => {
      console.log(email, name, dob, address, phoneNumber, selectedBranchId);
      const res = await axios.post(`http://localhost:8080/users`, {email, name, password, dob, address, phoneNumber, role: 'ROLE_STAFF', branchId: selectedBranchId}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.accessToken}`
            },
        });
      
      setEmail('');
      setName('');
      setDob('');
      setPassword('');
      setPhoneNumber('');
      setSelectedBranchId(null);
      setStaffs([...staffs, res.data])
    }
  return (
    <>
        <table className="table table-striped">
        <thead className="table-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Address</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Email</th>
            <th scope="col">Day of birth</th>
            <th scope="col">Edit</th>
            
          </tr>
        </thead>
        <tbody>
        {staffs.map((staff, idx) => (
        <tr key={staff.id}>
          <th scope="row">{idx}</th>
          <td>{staff.name}</td>
          <td>{staff.address}</td>
          <td>{staff.phoneNumber}</td>
          <td>{staff.email}</td>
          <td>{staff.dob}</td>
          <td>
          <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">Update</button>
            <div className="modal fade" id="exampleModal" tabIndex={'-1'} aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Update Staff</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  {/* <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="nameToUpdate" className="form-label">Full name</label>
                    <input type="text" className="form-control" id="nameToUpdate" onChange={(e) => setName(e.target.value)} defaultValue={patient.name}/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="addressToUpdate" className="form-label">Address</label>
                    <input type="text" className="form-control" id="addressToUpdate" onChange={(e) => setAddress(e.target.value)} defaultValue={patient.address}/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phoneNumberToUpdate" className="form-label">Phone number</label>
                    <input type="text" className="form-control" id="phoneNumberToUpdate" onChange={(e) => setPhoneNumber(e.target.value)} defaultValue={patient.phoneNumber}/>
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="addressToUpdate" className="form-label">Address</label>
                    <input type="text" className="form-control" id="addressToUpdate" onChange={(e) => setAddress(e.target.value)} defaultValue={patient.address}/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="emailToUpdate" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="emailToUpdate" onChange={(e) => setEmail(e.target.value)} value={patient.email}/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="dobToUpdate" className="form-label">Day of brith</label>
                    <input type="date" className="form-control" id="dobToUpdate" onChange={(e) => setDob(e.target.value)} value={patient.dob}/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="emailToUpdate" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="emailToUpdate" onChange={(e) => setEmail(e.target.value)} value={patient.email}/>
                  </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" onClick={() => handleUpdate(patient.id) }>Update</button>
                  </div> */}
                  
                </div>
              </div>
            </div>
          </td>
        </tr>
      ))}
        </tbody>
      </table>
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addPatientModel">Add staff</button>
      <div className="modal fade" id="addPatientModel" tabIndex="-1" aria-labelledby="addPatientModelLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 fw-bold text-center" id="addPatientModelLabel">Add patient</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="staffName" className="form-label">Name</label>
                    <input type="text" className="form-control" id="staffName" onChange={(e) => setName(e.target.value)} required defaultValue={name}/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="emailToAdd" className="form-label">Email</label>
                    <input type="email" className="form-control" id="addressToAdd" onChange={(e) => setEmail(e.target.value)} required defaultValue={email}/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="passwordToAdd" className="form-label">Password</label>
                    <input type="password" className="form-control" id="addressToAdd" onChange={(e) => setPassword(e.target.value)} required defaultValue={password}/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="addressToAdd" className="form-label">Address</label>
                    <input type="text" className="form-control" id="addressToAdd" onChange={(e) => setAddress(e.target.value)} required defaultValue={address}/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phoneNumberToAdd" className="form-label">Phone number</label>
                    <input type="text" className="form-control" id="phoneNumberToAdd" onChange={(e) => setPhoneNumber(e.target.value)} required defaultValue={phoneNumber}/>
                  </div>
        
                  <div className="mb-3">
                    <label htmlFor="dobToAdd" className="form-label">Day of brith</label>
                    <input type="date" className="form-control" id="dobToAdd" onChange={(e) => setDob(e.target.value)} required defaultValue={dob}/>
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
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleAdd}>Add</button>
            </div>
          </div>
        </div>
      </div>
      <div className='d-flex justify-content-center'>
        <nav aria-label="...">
        <ul className="pagination">
          {/* <li className="page-item disabled">
            <a className="page-link">Previous</a>
          </li>
          <li className="page-item"><a class="page-link" href="#">1</a></li>
          <li className="page-item active" aria-current="page">
            <a className="page-link" href="#">2</a>
          </li>
          <li className="page-item"><a class="page-link" href="#">3</a></li>
          <li className="page-item">
            <a className="page-link" href="#">Next</a>
          </li> */}
          {[...Array(10)].map((e,i) => {
            return <>
              {currentPage === i ? (
                <li className="page-item active" aria-current="page">
                  <a className="page-link" href="#">{i+1}</a>
                </li>
              ): (
                <li className="page-item " aria-current="page">
                    <a className="page-link" href="#">{i+1}</a>
                </li>
              )
              }
            </>
          })}
        
        </ul>
      </nav>
      </div>
     
    </>
  )
}

export default StaffList;