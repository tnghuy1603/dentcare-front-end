import React from "react";
import useAuth from "../../hooks/useAuth";
import { useState, useEffect } from "react";
import axios from "axios";

const ManageStaff = () => {
    const auth = useAuth();
    const [staffs, setStaffs] = useState([]);
    const [branches, setBranches] = useState([])
    const [name, setName] = useState('');
    const [address, setAddress] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState(null);
    const [password, setPassword] = useState('');
    useEffect(() => {
        const fetchStaffs = async () => {
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
        const fetchBranches = async () => {
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
    return (
        <>
            <h3 className="i-name">Manage Staffs</h3>
            <div className="board">
                <table width="100%">
                    <thead>
                        <tr>
                            <td>#</td>
                            <td>Name</td>
                            <td>Address</td>
                            <td>Phone Number</td>
                            <td>Email</td>
                            <td>Day of birtd</td>
                            <td></td>
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
                                <td className="edit text-center">
                                    {isAdmin && 
                                        <a href="#" className="me-4" data-bs-toggle="modal" data-bs-target="#EditModal">Edit</a>}
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

                <div className="modal fade" id="EditModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
            </div>
        </>
    )
}

export default ManageStaff