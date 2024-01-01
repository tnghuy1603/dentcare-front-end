import React from "react";

const ManageSchedule = () => {
    const auth = useAuth();
    const [schedules, setSchedules] = useState([]);
    const [id, setID] = useState('');
    const [name, setName] = useState('');
    const [schedule, setSchedule] = useState('');
    const [errorMsg, setErrorMsg] = useState('')
    useEffect(() => {
        const getSchedules = async () => {
            const res = await axios.get(`http://localhost:8080/schedules`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${auth.accessToken}`,
                },
            });
            // console.log(res.data);
            setSchedules(res.data);
        };
        console.log(schedules);
        return () => getSchedules();
    }, []);
    return (
        <>
            <div className="d-flex">

                <h3 className="i-name">Manage Schedules</h3>
                <button type="button" className="btn btn-info ms-auto h-50 mt-5 me-5" data-bs-toggle="modal" data-bs-target="#AddModal">Add schedule</button>
            </div>
            <div className="board">
                <table width="100%">
                    <thead>
                        <tr>
                            <td>#</td>
                            <td>ID</td>
                            <td>Dentist</td>
                            <td>Schedule</td>
                            <td></td>
                        </tr>
                    </thead>

                    <tbody>
                        {schedules.map((schedule, index) => (
                            <tr>
                                <th scope="row" className="text-center">{index}</th>
                                <td>{schedule.id}</td>
                                <td>{schedule.name}</td>
                                <td><p>MONTHLY: { }</p>
                                    <p>WEEKLY: { }</p>
                                    <p>AUTO: { }</p>
                                </td>
                                <td className="edit text-center">
                                    <a href="#" className="me-4" data-bs-toggle="modal" data-bs-target="#EditModal">Edit</a>
                                    <Link to={`/schedules/${index}`}>
                                        View
                                    </Link>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <form action="">

                    <div className="modal fade" id="AddModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputPassword1" className="form-label">Gender</label>
                                        <input type="text" className="form-control" id="exampleInputPassword1" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputPassword1" className="form-label">Date of birth</label>
                                        <input type="date" className="form-control" id="exampleInputPassword1" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputPassword1" className="form-label">Phone number</label>
                                        <input type="text" className="form-control" id="exampleInputPassword1" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputPassword1" className="form-label">Email</label>
                                        <input type="text" className="form-control" id="exampleInputPassword1" />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary">Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

                <div className="modal fade" id="EditModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="input-id" className="form-label">ID</label>
                                    <input type="text" className="form-control" id="input-id" aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="input-dentist" className="form-label">Dentist</label>
                                    <input type="text" className="form-control" id="input-dentist" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="input-monthly-schedule" className="form-label">Monthly</label>
                                    <input type="tel" className="form-control" id="input-monthly-schedule" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="input-weekly-schedule" className="form-label">Weekly</label>
                                    <input type="text" className="form-control" id="input-weekly-schedule" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="input-auto-schedule" className="form-label">Auto</label>
                                    <input type="date" className="form-control" id="input-auto-schedule" />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="DeleteModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Delete</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                Do you want to delete ?
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Confirm</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ManageSchedule