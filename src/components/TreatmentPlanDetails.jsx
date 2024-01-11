import React from 'react'
import { useLocation } from 'react-router-dom'

const TreatmentPlanDetails = () => {
  const location = useLocation();
  const { treatmentPlan } = location.state
  return (
    <>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="w-100 col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xs-offset-0 col-sm-offset-0 col-md-offset-3 col-lg-offset-3 toppad" >
            <div className="panel panel-info">
              <div className="panel-heading text-center mb-4">
                <h3 className="panel-title">Patient Profile</h3>
              </div>
              <div className="panel-body">
                <div className="row justify-content-center">
                  <div className=" col-md-9 col-lg-9 ">
                    <table className="table table-user-information">
                      <tbody>
                        <tr>
                          <td> <b>Personal Information: </b></td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>ID:</td>
                          <td> {patient.id}</td>
                        </tr>
                        <tr>
                          <td>Patient name:</td>
                          <td> {patient.name}</td>
                        </tr>
                        <tr>
                          <td>Gender:</td>
                          <td>{patient.gender}</td>
                        </tr>
                        <tr>
                          <td>Age:</td>
                          <td>{getAge(patient.dob)}</td>
                        </tr>
                        <tr>
                          <td>Oral health:</td>
                          <td>{patient.oralHealth}
                            <a href="">Update</a>
                          </td>
                        </tr>

                        <tr>
                          <td>Phone:</td>
                          <td>{patient.phoneNumber}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TreatmentPlanDetails