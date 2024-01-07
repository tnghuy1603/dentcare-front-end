import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const PatientProfile = () => {
    const auth = useAuth();
    const [patients, setPatients] = useState([]);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [dob, setDob] = useState(null);
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [errorMsg, setErrorMsg] = useState('')
    useEffect(() => {
        const getPatients = async () => {
            const res = await axios.get(`http://localhost:8080/patients`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${auth.accessToken}`,
                },
            });
            
            // console.log(res.data);
            setPatients(res.data);
        };
        console.log(patients);
        return () => getPatients();
    }, []);


    return (
        <>
            <div className="d-flex">
                <h3 className="i-name">Patient Profiles</h3>
                <button type="button" className="btn btn-info ms-auto h-50 mt-5 me-5" data-bs-toggle="modal" data-bs-target="#AddModal">Add patient</button>
            </div>
            <div className="board">
                <table width="100%">
                    <thead>
                        <tr>
                            <td>#</td>
                            <td>Name</td>
                            <td>Gender</td>
                            <td>Date of brith</td>
                            <td>Address</td>
                            <td>Phonenumber</td>
                            <td>Email</td>
                            <td></td>
                        </tr>
                    </thead>

                    <tbody>

                        {patients.map((patient) => (
                            <tr>
                                <th scope="row" className="text-center">1</th>
                                <td>{patient.name}</td>
                                <td>{patient.gender}</td>
                                <td>{patient.dob}</td>
                                <td>{patient.address}</td>
                                <td>{patient.phoneNumber}</td>
                                <td>{patient.email}</td>



                                <td className="edit text-center">
                                    <a href="#" className="me-4" data-bs-toggle="modal" data-bs-target="#EditModal">Edit</a>
                                    <Link to={`/patients/${patient.id}`} className="patients-router">
                                        View
                                    </Link>

                                </td>
                            </tr>
                        ))}
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
                                ...
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
                <form>
                    <div className="modal fade" id="EditModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Edit patient</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputPassword1" className="form-label">Gender</label>
                                        <input type="text" className="form-control" id="exampleInputPassword1" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputPassword1" className="form-label">Date of birth</label>
                                        <input type="date" className="form-control" id="exampleInputPassword1" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputPassword1" className="form-label">Phone number</label>
                                        <input type="text" className="form-control" id="exampleInputPassword1" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputPassword1" className="form-label">Email</label>
                                        <input type="text" className="form-control" id="exampleInputPassword1" />
                                    </div>
                                    
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary">Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default PatientProfile