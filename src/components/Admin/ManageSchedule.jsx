import React from "react";

const ManageSchedule = () => {
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
                        <tr>
                            <td className="people">
                                <img src="" alt="" />
                                <div className="people-de">
                                    <h5>John Doe</h5>
                                    <p>john@gmail.com</p>
                                </div>
                            </td>

                            <td className="people-des">
                                <h5>Software Engineer</h5>
                                <p>web developer</p>
                            </td>

                            <td className="active"><p>Active</p></td>

                            <td className="role">
                                <p>Owner</p>
                            </td>

                            <td className="edit text-center">
                                <a href="#" className="me-4">Edit</a>
                                <a href="#" type="button" data-bs-toggle="modal" data-bs-target="#DeleteModal">Delete</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="modal fade" id="AddModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                ...
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