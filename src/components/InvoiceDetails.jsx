import React from "react";

const InvoiceDetails = () => {
    return (
        <>
            <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="w-100 col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xs-offset-0 col-sm-offset-0 col-md-offset-3 col-lg-offset-3 toppad" >


            <div className="panel panel-info">
              <div className="panel-heading text-center mb-4">
                <h3 className="panel-title">Invoice detail</h3>
              </div>
              <div className="panel-body">
                <div className="row justify-content-center">
                  <div className=" col-md-9 col-lg-9 ">
                    <table className="table table-user-information">
                      <tbody>
                        <tr>
                          <td> <b>Information: </b></td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>Date:</td>
                          <td> {patient.id}</td>
                        </tr>
                        <tr>
                          <td>Name:</td>
                          <td> {patient.name}</td>
                        </tr>
                        <tr>
                          <td>Total:</td>
                          <td>{patient.gender}</td>
                        </tr>
                        <tr>
                          <td>Paid:</td>
                          <td>{getAge(patient.dob)}</td>
                        </tr>
                        <tr>
                          <td>Charge:</td>
                          <td>{patient.oralHealth}
                            <a href="">Update</a>
                          </td>
                        </tr>

                        <tr>
                          <td>Type of payment:</td>
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

export default InvoiceDetails