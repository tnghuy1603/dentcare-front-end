import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import useAuth from "../hooks/useAuth";

const Header = () => {
    const auth = useAuth();
    return (
        <div className="navigation justify-content-end">
            

            <div className="profile">
                <nav className="navbar navbar-expand-lg navbar-dark bg-white">
                        <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
                            <ul className="navbar-nav">
                                <li className="nav-item dropdown">
                                    <button className="user-btn btn btn-dark dropdown-toggle bg-white text-black" data-bs-toggle="dropdown" aria-expanded="false">
                                        <FontAwesomeIcon icon={faUser} className="mt-3"/>
                                    </button>
                                    <ul className="dropdown-menu dropdown-menu-white">
                                        <li><div className="dropdown-item">Logout</div></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                </nav>
            </div>
        </div>
    )
}

export default Header