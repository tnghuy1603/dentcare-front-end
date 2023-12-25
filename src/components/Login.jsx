import axios from 'axios';
import React, { useState } from 'react'
import useAuth from '../hooks/useAuth';

const Login = () => {
  const auth = useAuth()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const handleSignIn = async () => {
    console.log(email, password);
    const res = await axios.post('http://localhost:8080/auth/login', {email, password}, {
      headers: {
        'Content-Type' : 'application/json'
      }
    })
    auth.setAccessToken(res.data.accessToken);
    window.location.href = '/dashboard'

  }
  return (
    <>
      <div>
        <div className='card'>
            <div className='card-title fw-bold text-primary-emphasis fs-1'>Login</div>
            <div className="card-body">
              <div className='mb-3 d-flex flex-column align-items-start'>
                  <label htmlFor='email' className='form-label text-start'>Email</label>
                  <input type='email' className="form-control" id="email" onChange={(e) => setEmail(e.target.value)}/>
              </div>
              <div className='mb-3 d-flex flex-column align-items-start'>
                <label htmlFor="pwd" className="form-label">Password</label>
                <input type='password' className="form-control" id="pwd" onChange={(e) => setPassword(e.target.value)}/>
              </div>
              <div> 
                <button onClick={handleSignIn} className='btn text-light btn-primary'>Sign in</button>
              </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default Login