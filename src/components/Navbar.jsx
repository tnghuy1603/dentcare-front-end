import { Avatar } from '@mui/material'
import React from 'react'
function Navbar({username, role}) {
  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid d-flex">
          <div>
            <a className="navbar-brand" href="#"></a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex gap-4">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#"><i class="fas fa-house"></i></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/dentists">
                  <i class="fas fa-user-md"></i>
                </a>
                <p>Doctor</p>
              </li>
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/staffs">
                  <i class="fa-solid fa-users"></i>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/patients">
                  <i class="fa-solid fa-hospital-user"></i>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/medicines">
                  <i class="fa-solid fa-pills"></i>
                </a>
              </li>
              <li className='nav-item'>
                
              </li>

            </ul>
            <div className='d-flex gap-3'>
              {/* <Avatar/> */}
              <span>Hi, {username}</span>
              <button className="btn btn-danger">Logout</button>
            </div>
            
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar