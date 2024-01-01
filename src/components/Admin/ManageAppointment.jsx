import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";

const ManageAppointment = () => {
    const auth = useAuth();
    const [isAdmin, setIsAdmin] = useState(false);
    const [isStaff, setIsStaff] = useState(false);
    const [date, setDate] = useState(new Date());
    const [appoinments, setAppointment] = useState([])
    const [patientName, setPatientName] = useState('');
    const [room, setRoom] = useState('');
    useEffect(() => {
        const getAppointments = async () => {
            const res = await axios.get(`http://localhost:8080/appointments`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${auth.accessToken}`,
                },
            });
            console.log(res.data);
            setAppointment(res.data);
        };
        console.log(appoinments);
        getAppointments();
    }, []);
    
    
    
    useEffect(() => {
        
    }, [date, patientName, room])

    const showFunctionRoleOwn = () => {
        
    }
    return (
        <>
            <div className="d-flex">

                <h3 className="i-name">Manage Appointments</h3>
                {(isAdmin || isStaff) &&  <button type="button" className="btn btn-info ms-auto h-50 mt-5 me-5" data-bs-toggle="modal" data-bs-target="#AddModal">Add appointment</button>}
            </div>
            <div className="board">
                <table width="100%">
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Requested Appointment Date</td>
                            <td>Note</td>
                            <td>Submitted Date</td>
                            <td></td>
                        </tr>
                    </thead>

                    <tbody>
                    {appoinments.map((appoinment, idx) => (
                            <tr key={appoinment.id}>
                                <td>{idx}</td>
                                <td>{appoinment.name}</td>
                                <td>{appoinment.address}</td>
                                <td>{appoinment.phoneNumber}</td>
                                <td>{appoinment.email}</td>
                                <td>{appoinment.dob}</td>
                                <td className="edit text-center">
                                    {(isAdmin || isStaff) && <a href="#" className="me-4" data-bs-toggle="modal" data-bs-target="#EditModal">Edit</a> &&
                                    <a href="#" type="button" data-bs-toggle="modal" data-bs-target="#DeleteModal">Delete</a>}
                                </td>
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

                <div className="modal fade" id="DeleteModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                <button type="button" className="btn btn-primary">Confirm</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ManageAppointment