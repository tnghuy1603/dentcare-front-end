import { faCartShopping, faEye, faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";

const InvoiceList = ({invoices, updateInvoice, role}) => {
    const auth = useAuth();
    const [amount, setAmount] = useState(0);
    const [note, setNote] = useState('');
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const checkout = async () => {
        const res = await axios.put(`http://localhost:8080/invoices/checkout`, {treatmentPlanId: selectedInvoice.id, paidAmount: amount, note, method: 'online'}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.accessToken}`
            }
        })
        console.log('Invoice: ', res.data);
        updateInvoice(res.data);
        setAmount(0);
        setNote('');
        $('#checkoutModal').modal('hide');
      }
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
                            <th scope="col">Issue at</th>
                            <th scope="col">Checkout</th>
                            <th scope="col">Edit</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {invoices && invoices.map((invoice, idx) => (
                            <tr key={invoice.id}>
                                <th scope="row">{idx + 1}</th>
                                <td>{invoice.treatmentPlan.dentist.name}</td>
                                <td>{invoice.totalFee}</td>
                                <td>{invoice.createdAt.replace('T', " ")}</td>
                                
                                {(invoice.paidAmount < invoice.totalFee && role.includes('ROLE_STAFF')) ? 
                                <td>
                                    <div data-bs-toggle="modal" data-bs-target="#checkoutModal">
                                        <FontAwesomeIcon icon={faCartShopping} style={{color: 'green'}} className="mx-3 fs-5" onClick={() => setSelectedInvoice(invoice)}/>
                                    </div>
                                </td>: <td> <button className="btn btn-success">Completed</button> </td>}
                                
                                
                                <td>
                                    <Link to={`/invoices/${invoice.id}`} state={{invoice}}>
                                        <div className="px-3"><FontAwesomeIcon icon={faEye} style={{'color' : 'green'}}/></div>
                                    </Link>
                                </td>
                                
                                
                            </tr>
                            
                        ))}
                    </tbody>
                </table>
            </div>
            <div class="modal fade" id="checkoutModal" tabindex="-1" aria-labelledby="checkoutModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="checkoutModalLabel">Checkout</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                <div className="mb-3">
                    <label htmlFor="totalFee" className="form-label">Total fee</label>
                    <div className="form-control" id="totalFee"> {selectedInvoice && selectedInvoice.totalFee} </div>
                </div>
                <div className="mb-3">
                    <label htmlFor=""paidAmount className="form-label">Paid amount</label>
                    <div className="form-control" id="paidAmount"> {selectedInvoice && selectedInvoice.paidAmount} </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="amount" className="form-label">Amount</label>
                    <input type="number" className="form-control" id="amount" onChange={(e) => setAmount(e.target.value)} value={amount}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="checkoutNote" className="form-label">Note</label>
                    <input type="text" className="form-control" id="checkoutNote" onChange={(e) => setNote(e.target.value)} value={note}/>
                </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" onClick={checkout}>Checkout</button>
                </div>
                </div>
            </div>
            </div>


        </>
    )
}

export default InvoiceList