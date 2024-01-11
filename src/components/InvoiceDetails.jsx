import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import useAuth from "../hooks/useAuth";

const InvoiceDetails = () => {
  const location = useLocation();
  const auth = useAuth();
  const invoice = location.state;
  console.log('State', location.state);
  const [treatments, setTreatments] = useState([]);
    const fetchTreatments = async () => {
      const res = await axios.get(`http://localhost:8080/treatments`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.accessToken}`
        },
        params: {
          treatmentPlan: invoice.id
        }
      });
      console.log("Treatments", res.data);
      setTreatments(res.data)
    }
    useEffect(() => {
      fetchTreatments();
    }, [])
    return (
        <>
            <div id="interface">
              <Header/>
              <Sidebar/>
              <div className="d-flex">
                <h3 className="i-name">Invoice details</h3>
            </div>
              <div className="board mt-4 d-flex justify-content-center">
                <table className="table table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">#</th>
                            {/* <th scope="col">Id</th> */}
                            <th scope="col">Description</th>
                            <th scope="col">Fee</th>
                            <th scope="col">Peform at</th>
                            <th scope="col">Payment method</th>
                        </tr>
                    </thead>
                    <tbody>
                        {treatments && treatments.map((treatment, idx) => (
                            <tr key={invoice.id}>
                                <th scope="row">{idx + 1}</th>
                                <td>{treatment.description}</td>
                                <td>{treatment.fee}</td>
                                <td>{treatment.performAt ? treatment.performAt: 'Not yet'}</td>
                                <td>{invoice.method}</td>                                                         
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            </div>
        </>
    )
}

export default InvoiceDetails