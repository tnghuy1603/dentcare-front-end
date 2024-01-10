import React from "react";

const InvoiceList = () => {
    return (
        <>
            <div className="panel-heading text-center mt-5">
                <h3 className="panel-title">Invoice</h3>
            </div>
            <div className="board mt-4 d-flex justify-content-center">
                <table className="table table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Dentist</th>
                            <th scope="col">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices && invoices.map((invoice, idx) => (
                            <tr key={invoice.id}>
                                <th scope="row">{idx + 1}</th>
                                <td>{invoice.dentist}</td>
                                <td>{invoice.payment}</td>
                                <td colSpan={1} className="d-flex gap-3 align-middle">
                                    {/* <Link to={`/patients-profile`} state={{patientData: patient}}>
              <div className="px-3"><FontAwesomeIcon icon={faEye} style={{'color' : 'green'}}/></div>
            </Link> */}         </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </>
    )
}

export default InvoiceList