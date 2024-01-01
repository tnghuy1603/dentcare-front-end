import React, { useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";

const DentistProfile = () => {
    let auth = useAuth();
    // let roles = jwtDecode(auth.accessToken);
    console.log(auth.accessToken);
    const [isAdmin, setIsAdmin] = useState(false);
    const [dentists, setDentists] = useState([])
    const [branches, setBranches] = useState([])
    const [name, setName] = useState('');
    const [address, setAddress] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState(null);
    const [password, setPassword] = useState('');
    const [selectedBranchId, setSelectedBranchId] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    useEffect(() => {
        const fetchDentists = async () => {
            const res = await axios.get(`http://localhost:8080/users`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.accessToken}`
                },
            });
            console.log("Res", res.data);
            setDentists(res.data.users);
            // setTotalPages(res.data.totalPages);
        };
        fetchDentists();
    }, [currentPage]);
    const showFunctionRoleOwn = () => {

    }

    return (
        <div onLoad={showFunctionRoleOwn}>
            <div className="d-flex">

                <h3 className="i-name">Dentist Profile</h3>
                {isAdmin && <button type="button" className="btn btn-info ms-auto h-50 mt-5 me-5" data-bs-toggle="modal" data-bs-target="#AddModal">Add dentist</button>}
            </div>
            <div className="board">
                <table width="100%">
                    <thead>
                        <tr>
                            <td scope="col">#</td>
                            <td scope="col">Name</td>
                            <td scope="col">Address</td>
                            <td scope="col">Phone Number</td>
                            <td scope="col">Email</td>
                            <td scope="col">Date of birth</td>
                            <td scope="col"></td>
                        </tr>
                    </thead>

                    <tbody>
                        {dentists.map((dentist, idx) => (
                            <tr key={dentist.id}>
                                <Link to={`dentists/${dentist.id}`}>

                                    <td>{idx}</td>
                                    <td>{dentist.name}</td>
                                    <td>{dentist.address}</td>
                                    <td>{dentist.phoneNumber}</td>
                                    <td>{dentist.email}</td>
                                    <td>{dentist.dob}</td>
                                    <td className="edit text-center">
                                        {isAdmin && <a href="#" className="me-4">Edit</a>}
                                    </td>
                                </Link>
                            </tr>))}
                    </tbody>
                </table>
                <form action="">
                    <div className="modal fade" id="AddModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label htmlFor="input-name" className="form-label">Name</label>
                                        <input type="text" className="form-control" id="input-name" aria-describedby="emailHelp" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="input-password" className="form-label">Adress</label>
                                        <input type="text" className="form-control" id="input-password" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="input-phone" className="form-label">Phone number</label>
                                        <input type="tel" className="form-control" id="input-phone" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="input-email" className="form-label">Email</label>
                                        <input type="text" className="form-control" id="input-email" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="input-dob" className="form-label">Date of birth</label>
                                        <input type="date" className="form-control" id="input-dob" />
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

                <div className="modal fade" id="DeleteModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Delete</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                ...
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Confirm</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DentistProfile