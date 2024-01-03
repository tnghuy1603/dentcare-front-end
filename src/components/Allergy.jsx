import axios from 'axios';
import React, { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth';

const Allergy = ({constraindicatedMedicines, addContraindicatedMedicine}) => {
    const auth = useAuth();
    const [selectedMedicineId, setSelectedMedinceId] = useState(0);
    const [medicines, setMedicines] = useState([])
    const fetchMedicines = async () => {
      const res = await axios.get(`http://localhost:8080/medications`, {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${auth.accessToken}`
          },
          
      });
      console.log(res.data);
      setMedicines(res.data)
    }
    
    useEffect(() => {
      fetchMedicines();
    }, [])
  return (
    <>
         <table className="table table-striped">
            <thead className="table-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Medicine name</th>
                    <th scope='col'>Edit</th>
                </tr>
            </thead>
            <tbody>
            {constraindicatedMedicines.map((contraindicatedMedicine, idx) => (
                <tr key={contraindicatedMedicine.id}>
                    <th scope='row'>{idx}</th>
                    <td>{contraindicatedMedicine.name}</td>
            
                    <td>
                        <button type="button" className="btn btn-primary mx-2" data-bs-toggle="modal" data-bs-target="#updateConstraindicatedMedicineModel">Update</button>
                        <div className="modal fade" id="updateConstraindicatedMedicineModel" tabIndex="-1" aria-labelledby="updateConstraindicatedMedicineModelLabel" aria-hidden="true">
                            <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                <h1 className="modal-title fs-5 fw-bold text-center" id="updateConstraindicatedMedicineModelLabel">Update contraindicated medicine</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                  <select class="form-select" aria-label="Default select example" onChange={(e) => setSelectedMedinceId(e.target.value)} required>
                                    <option selected>Select medicine</option>
                                    {medicines.map((medicine) => (
                                      <>
                                        <option value={medicine.id}>{medicine.name}</option>
                                      </>
                                    ))}
                                  </select>
                                </div>
                                <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Update</button>
                                </div>
                              </div>
                            </div>
                        </div>
                    </td>
                </tr>
                
                
            ))}
            </tbody>
        </table>
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addConstraindicatedMedicineModel">Add</button>
      <div className="modal fade" id="addConstraindicatedMedicineModel" tabIndex="-1" aria-labelledby="addConstraindicatedMedicineModelLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 fw-bold text-center" id="addConstraindicatedMedicineModelLabel">Add constraindicated medicine</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <select class="form-select" aria-label="Default select example" onChange={(e) => setSelectedMedinceId(e.target.value)} required>
                                    <option selected>Select medicine</option>
                                    {medicines.map((medicine) => (
                                      <>
                                        
                                        <option value={medicine.id}>{medicine.name}</option>
                                      </>
                                    ))}
                                  </select>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={() => addContraindicatedMedicine(selectedMedicineId)}>Add</button>
            </div>
          </div>
        </div>
      </div>
        
    </>
  )
}

export default Allergy