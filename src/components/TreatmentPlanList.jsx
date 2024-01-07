import { faDAndD } from '@fortawesome/free-brands-svg-icons';
import { faAdd, faEdit, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const TreatmentPlanList = ({treatmentPlans}) => {
  const [selectedTreatmentPlan, setSelectedTreatmentPlan] = useState(null);
  const styleOfStatus = (status) => {
    if(status === 'Completed'){
      return 'green'
    } 
    if(status === 'Cancelled'){
      return 'red';
    }
    return 'blue';
  }
  return (
    <>
        <div className="panel-heading text-center mt-5 mb-4">
          <h3 className="panel-title">Treatment plan</h3>
        </div>

        
        <table className="table table-striped">
            <thead className="table-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Starting date</th>
                    <th scope="col">Status</th>
                    <th scope="col">Edit</th>
                </tr>
            </thead>
            <tbody>
            {treatmentPlans.map((treatmentPlan, idx) => (
                <tr key={idx}>
                    <th scope='row'>{idx+1}</th>
                    <td>{treatmentPlan.startDate}</td>
                    <td><div className={`btn text-light text-center fw-bold ${styleOfStatus(treatmentPlan.status)}`}>{treatmentPlan.status}</div></td>
                    <td>
                        <div className='d-flex'>
                          <Link to={`/treatment-plans/${treatmentPlan.id}`} state={{treatmentPlan}}>
                              <div className=''><FontAwesomeIcon icon={faEye} style={{color: 'green'}}/></div>
                          </Link>
                          <div  className="mx-3" data-bs-toggle="modal" data-bs-target="#updateTreatmentPlanModel">
                            <FontAwesomeIcon icon={faEdit} style={{color: 'green'}}/>
                          </div>
                          
                          
                        </div>
                        
                    </td>
                </tr>
                
                
            ))}
            </tbody>
        </table>
        Chu
        
    </>
  )
}

export default TreatmentPlanList