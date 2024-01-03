import React from "react";
import useAuth from "../../hooks/useAuth";
import { useState, useEffect } from "react";
import axios from "axios";

const ManageDrug = ({role}) => {
    const auth = useAuth();
    const [isAdmin, setIsAdmin] = useState(true);
    // const [isStaff, setIsStaff] = useState(false);
    
    const [medicines, setMedicines] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [expireDate, setExpireDate] = useState(null)
    const fetchMedicines = async () => {
        const res = await axios.get(`http://localhost:8080/medications`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.accessToken}`
            },

        });
        setMedicines(res.data)
    }
    useEffect(() => {
        fetchMedicines();
    }, []);
    const handleAddMedicine = async () => {
        const res = await axios.post(`http://localhost:8080/medications`, { name, description, price, expireDate }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.accessToken}`
            },

        });
        setMedicines([...medicines, res.data]);
        setName('');
        setPrice(null);
        setExpireDate(null);
        setDescription('');

    }

    const showFunctionRoleOwn = () => {

    }
    return (
        <div onLoad={showFunctionRoleOwn}>
            <div className="d-flex">

                <h3 className="i-name">Manage Drugs</h3>
                {isAdmin && <button type="button" className="btn btn-info ms-auto h-50 mt-5 me-5" data-bs-toggle="modal" data-bs-target="#AddModal">Add drug</button>}
            </div>
            <div className="board">
                <table width="100%">
                    <thead>
                        <tr>
                            <td>#</td>
                            <td>Name</td>
                            <td>Description</td>
                            <td>Price</td>
                            <td>Expire date</td>
                            <td>Edit</td>
                        </tr>
                    </thead>

                    <tbody>
                        {medicines.map((medicine) => (
                            <tr key={medicine.id}>
                                <th scope="row">{medicine.id}</th>
                                <td>{medicine.name}</td>
                                <td>{medicine.gender}</td>
                                <td>{medicine.dob}</td>
                                <td>{medicine.address}</td>
                                <td>{medicine.phoneNumber}</td>
                                <td>{medicine.email}</td>
                                <td className="edit text-center">
                                    {isAdmin && 
                                        <a href="#" className="me-4" data-bs-toggle="modal" data-bs-target="#EditModal">Edit</a> &&
                                        <a href="#" type="button" data-bs-toggle="modal" data-bs-target="#DeleteModal">Delete</a>}
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

                <div className="modal fade" id="DeleteModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Delete</h1>
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
        </div>
    )
}

export default ManageDrug