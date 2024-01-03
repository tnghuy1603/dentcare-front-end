import axios from 'axios';
import React, { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReceipt, faTooth, faUserNurse } from '@fortawesome/free-solid-svg-icons';
import { faRebel } from '@fortawesome/free-brands-svg-icons';

const AddTreatmentPlan = () => {
  const auth = useAuth();
  const [dentists, setDentists] = useState([]);
  const [treatmentCategories, setTreatmentCategories] = useState([]);
  const [treatmentCodes, setTreatmentCodes] = useState([]);
  const [selectedTreatmentCategoryId, setSelectedTreatmentCategoryId] = useState(null)
  const [startDate, setStartDate] = useState(new Date());
  const [teeth, setTeeth] = useState([]);
  const [surfaces, setSurfaces] = useState([]);
  const [selectedToTreat, setSelectedToTreat] = useState([]);
  const [selectedDentistId, setSelectedDentistId] = useState(null)
  const [selectedTreamentCodeIds, selectedTreatmentCodeIds] = useState([]);
  const apiUrl = 'http://localhost:8080';
  const fetchDentists = async () => {
    const res = await axios.get(`${apiUrl}/users/all`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.accessToken}`
      },
      params: {
        role: 'ROLE_DENTIST'
      }
    });
    setDentists(res.data);
  }
  const fetchTreatmentCategories = async() => {
    const res = await axios.get(`${apiUrl}/treatment-categories`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.accessToken}`
      },
    })
    console.log("Treatment categories", res.data)
    setTreatmentCategories(res.data);
  }
  useEffect(() => {
    const fetchTreatmentCodes = async () => {
      const res = await axios.get(`${apiUrl}/treatment-codes`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.accessToken}`
        },
      })
      console.log("Treatment code", res.data);
      setTreatmentCodes(res.data)
    }
    fetchTreatmentCodes();
  }, [selectedTreatmentCategoryId])
  useEffect(() => {
    fetchTreatmentCategories();
    fetchDentists();
  }, [])

  return (
    <>
      <div id="container" class="container mt-5 bg-white p-3">
        <div class="progress px-1 w-75" style={{height: "3px"}}>
          <div class="progress-bar bg-primary" role="progressbar" style={{width: "0%"}} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <div class="step-container d-flex justify-content-between">
          <div class="step-circle" onClick={(e) => displayStep(1)}><FontAwesomeIcon icon={faUserNurse} /></div>
          <div class="step-circle" onClick={(e) => displayStep(2)}><FontAwesomeIcon icon={faTooth} /></div>
          <div class="step-circle" onClick={(e) => displayStep(3)}><FontAwesomeIcon icon={faReceipt}/> </div>
        </div>
        <form id="multi-step-form">
          <div class="step step-1">
            <h3>Select dentitst and date</h3>
            <div class="mb-3">
              <label for="date" class="form-label">Choose your date</label>
              <input type="date" class="form-control" id="date" onChange={(e) => setStartDate(e.target.value)}/>
            </div>
            <select class="form-select" aria-label="Select dentist" onChange={(e) => setSelectedTreatmentCategoryId(e.target.value)}>
                <option selected>Open to select dentist</option>
              {dentists.map(dentist => <>
                <option value={dentist.id} key={dentist.id}>{dentist.name}</option>
              </>
              )}
            </select>

            <select class="form-select" aria-label="Select category">
              <option selected>Open treatment categories</option>
              {treatmentCategories.map(category => <>
                <option value={category.id} key={category.id}>{category.name}</option>
              </>
              )}
            </select>
            <p>Choose treatment</p>
            <div class="form-check">
              {treatmentCodes.map((code) => <>
                <input class="form-check-input" type="checkbox" value="" id={`treatment${code.id}`}/>
                <label class="form-check-label" for={`treatment${code.id}`}>
                  {code.description}
                </label>
              </>
              )}
            </div>

            
            <div class>

            </div>
            <button type="button" class="btn btn-primary next-step">Next</button>
          </div>
          <div class="step step-2">
            <h3>Step 2</h3>
            <div class="mb-3">
              <label for="field2" class="form-label">Field 2:</label>
              <input type="text" class="form-control" id="field2" name="field2"/>
            </div>
            <button type="button" class="btn btn-primary prev-step">Previous</button>
            <button type="button" class="btn btn-primary next-step">Next</button>
          </div>

          <div class="step step-3 row justify-content-center">
            <div className='col-8'>
              <h3>Step 3</h3>
              <div class="mb-3">
                <label for="field3" class="form-label">Field 3:</label>
                <input type="text" class="form-control" id="field3" name="field3"/>
              </div>
              <button type="button" class="btn btn-primary prev-step">Previous</button>
              <button type="submit" class="btn btn-success">Submit</button>
            </div>
            </div>
        </form>
      </div>
    </>
  )
}

export default AddTreatmentPlan