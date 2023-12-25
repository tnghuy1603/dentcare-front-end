import axios from "axios";
import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";

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
  useEffect(() => {
    const getPatients = async () => {
      const res = await axios.get(`http://localhost:8080/patients`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });
      console.log(res.data);
      setPatients(res.data);
    };
    console.log(patients);
    getPatients();
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
      setPatients([...patients, res.data])
      setAddress('');
      setName('');
      setDob(null);
      setGender('');
      setPhoneNumber('');
    } catch (error) {
      console.log(error.message);
      setErrorMsg(error.message)
    }
    
  }
  

  return (
    <>
      <table className="table table-striped">
        <thead className="table-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Gender</th>
            <th scope="col">Day of brith</th>
            <th scope="col">Address</th>
            <th scope="col">Phonenumber</th>
            <th scope="col">Email</th>
            <th scope="col">Edit</th>
            
          </tr>
        </thead>
        <tbody>
        {patients.map((patient) => (
        <tr key={patient.id}>
          <th scope="row">{patient.id}</th>
          <td>{patient.name}</td>
          <td>{patient.gender}</td>
          <td>{patient.dob}</td>
          <td>{patient.address}</td>
          <td>{patient.phoneNumber}</td>
          <td>{patient.email}</td>
          <td colSpan={1} className="d-flex gap-3">
          <Link to={`./${patient.id}`} state={{patientData: patient}}>
            <button className="btn btn-success">Details</button>
          </Link>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Update</button>
            <div className="modal fade" id="exampleModal" tabIndex={'-1'} aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Update Patient</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
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
                  </div>
                  
                </div>
              </div>
            </div>
          </td>
        </tr>
      ))}
        </tbody>
      </table>
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addPatientModel">Add patient</button>
      <div className="modal fade" id="addPatientModel" tabIndex="-1" aria-labelledby="addPatientModelLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 fw-bold text-center" id="addPatientModelLabel">Add patient</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            
            <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="patientName" className="form-label">Full name</label>
                    <input type="text" className="form-control" id="patientName" onChange={(e) => setName(e.target.value)}/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="addressToUpdate" className="form-label">Address</label>
                    <input type="text" className="form-control" id="addressToUpdate" onChange={(e) => setAddress(e.target.value)}/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phoneNumberToUpdate" className="form-label">Phone number</label>
                    <input type="text" className="form-control" id="phoneNumberToUpdate" onChange={(e) => setPhoneNumber(e.target.value)}/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="addressToUpdate" className="form-label">Address</label>
                    <input type="text" className="form-control" id="addressToUpdate" onChange={(e) => setAddress(e.target.value)}/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="dobToUpdate" className="form-label">Day of brith</label>
                    <input type="date" className="form-control" id="dobToUpdate" onChange={(e) => setDob(e.target.value)}/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="emailToUpdate" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="emailToUpdate" onChange={(e) => setEmail(e.target.value)}/>
                  </div>
                  
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleAdd}>Add</button>
            </div>
          </div>
        </div>
      </div>

      
    </>
  );
}

export default PatientList;
