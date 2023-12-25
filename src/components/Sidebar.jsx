import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
function Sidebar() {
  const [selected, setSelected] = useState(1);
  
  return (
    <>
      <div className='d-flex justify-content-center flex-column list-group'>
          <div className={`p-3 d-flex gap-2 list-group-item align-items-center ${selected === 1 ? 'active' : ''}`} onClick={() => setSelected(1)}>
            <i class="fas fa-user-md"></i>
            <p>Doctor</p>
          </div>
          <div className={`p-3 d-flex gap-2 list-group-item align-items-center ${selected === 2 ? 'active' : ''}`} onClick={() => setSelected(2)}>
            <i class="fa-solid fa-users"></i>
            <p>Staff</p>
          </div>
          <div className={`p-3 d-flex gap-2 list-group-item align-items-center ${selected === 3 ? 'active' : ''}`} onClick={() => setSelected(3)}>
            <i class="fa-solid fa-hospital-user"></i>
            <span>Patient</span>
          </div>
          <div className={`p-3 d-flex gap-2 list-group-item align-items-center ${selected === 4 ? 'active' : ''}`} onClick={() => setSelected(4)}>
            <a href="/medicine"><i class="fa-solid fa-pills"></i></a>
            <p>Medicine</p>
          </div>
      </div>
    </>
  )
}

export default Sidebar