import React from 'react'
import { Link } from 'react-router-dom'

const TreatmentPlanList = ({treatmentPlans}) => {

  return (
    <>
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
                    <td>{treatmentPlan.startingDate}</td>
                    <td><div className={`btn text-light text-center fw-bold ${treatmentPlan === 'Completed' ? 'green' : 'red'}`}>{treatmentPlan.status}</div></td>
                    <td>
                        <Link to={`/treatment-plans/${treatmentPlan.id}`} state={{treatmentPlan}}>
                            <button className='btn btn-success'>Details</button>
                        </Link>
                        <button type="button" className="btn btn-primary mx-2" data-bs-toggle="modal" data-bs-target="#updateTreatmentPlanModel">Update</button>
                        <div className="modal fade" id="updateTreatmentPlanModel" tabIndex="-1" aria-labelledby="updateTreatmentPlanModelLabel" aria-hidden="true">
                            <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                <h1 className="modal-title fs-5 fw-bold text-center" id="addTreatmentPlanModelLabel">Update patient</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    
                                </div>
                                <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Add</button>
                                </div>
                            </div>
                            </div>
                        </div>
                        
                    </td>
                </tr>
                
                
            ))}
            </tbody>
        </table>
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addTreatmentPlanModel">Add staff</button>
      <div className="modal fade" id="addTreatmentPlanModel" tabIndex="-1" aria-labelledby="addTreatmentPlanModelLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 fw-bold text-center" id="addTreatmentPlanModelLabel">Add patient</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                  
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Add</button>
            </div>
          </div>
        </div>
      </div>
        
    </>
  )
}

export default TreatmentPlanList