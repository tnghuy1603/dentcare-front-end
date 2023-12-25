import axios from 'axios'
import React, { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth';

const MedicineList = () => {
    const auth = useAuth();
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
    const handleAddMedicine =  async () => {
      const res = await axios.post(`http://localhost:8080/medications`, {name, description, price, expireDate},{
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
  return (
    <>
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Add medicine</button>
            <div className="modal fade" id="exampleModal" tabIndex={'-1'} aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Add Medicine</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <div className="mb-3">
                        <label htmlFor="nameToUpdate" className="form-label">Name</label>
                        <input type="text" className="form-control" id="nameToUpdate" onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="descriptionToUpdate" className="form-label">Description</label>
                        <input type="text" className="form-control" id="descriptionToUpdate" onChange={(e) => setDescription(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="price" className="form-label">Price</label>
                        <input type="number" className="form-control" id="price" onChange={(e) => setPrice(e.target.value)}/>
                    </div><div className="mb-3">
                        <label htmlFor="expireDate" className="form-label">Expired date</label>
                        <input type="date" className="form-control" id="expireDate" onChange={(e) => setExpireDate(e.target.value)}/>
                    </div>
                  
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" onClick={handleAddMedicine}>Add</button>
                  </div>
                </div>
              </div>
            </div>
        <table className="table table-striped">
        <thead className="table-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Price</th>
            <th scope="col">Expire date</th> 
            <th scope="col">Edit</th> 
          </tr>
        </thead>
        <tbody>
        {medicines.map((medicine, idx) => (
        <tr key={medicine.id}>
          <th scope="row">{idx}</th>
          <td>{medicine.name}</td>
          <td>{medicine.description}</td>
          <td>{medicine.price}</td>
          <td>{medicine.expireDate}</td>
          <td colSpan={1} className="d-flex gap-3">
          
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Update</button>
            <div className="modal fade" id="exampleModal" tabIndex={'-1'} aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Update Medicine</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    {/* <div className="mb-3">
                        <label htmlFor="nameToUpdate" className="form-label">Name</label>
                        <input type="text" className="form-control" id="nameToUpdate" onChange={(e) => setName(e.target.value)} defaultValue={patient.name}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="descriptionToUpdate" className="form-label">Description</label>
                        <input type="text" className="form-control" id="descriptionToUpdate" onChange={(e) => setAddress(e.target.value)} defaultValue={patient.address}/>
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
                    </div> */}
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
    </>
  )
}

export default MedicineList