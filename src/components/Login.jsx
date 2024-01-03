import axios from "axios";
import React, { useState } from "react";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const auth = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("")
  const [showModal, setShowModal] = useState(false)
  const handleSignIn = async () => {
    try {
      console.log(email, password);
      const res = await axios.post(
        "http://localhost:8080/auth/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res.status);
      auth.setAccessToken(res.data.accessToken);
      window.location.href = "/dashboard";
    } catch (error) {
      setErrMsg('Invalid username or password');
      setShowModal()
    }
  };
  return (
    <>
      {/* <div>
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
      </div> */}
      <section className="vh-75 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card bg-dark text-white">
                <div className="card-body p-5 text-center">
                  <div className="mb-md-5 mt-md-4 pb-5">
                    <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                    <p className="text-white-50 mb-5">
                      Please enter your login and password!
                    </p>

                    <div className="form-outline form-white mb-4">
                      <input
                        type="email"
                        id="typeEmailX"
                        className="form-control form-control-lg"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <label className="form-label" htmlFor="typeEmailX">
                        Email
                      </label>
                    </div>

                    <div className="form-outline form-white mb-4">
                      <input
                        type="password"
                        id="typePasswordX"
                        className="form-control form-control-lg"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <label className="form-label" htmlFor="typePasswordX">
                        Password
                      </label>
                    </div>

                    <p className="small mb-5 pb-lg-2">
                      <a className="text-white-50" href="#!">
                        Forgot password?
                      </a>
                    </p>

                    <button
                      className="btn btn-outline-light btn-lg px-5"
                      type="button"
                      onClick={handleSignIn}
                    >
                      Login
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
