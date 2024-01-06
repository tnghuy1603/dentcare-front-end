import React from "react";

const Header = () => {
    return (
        <div className="navigation justify-content-end">
            

            <div className="profile">
                <nav className="navbar navbar-expand-lg navbar-dark bg-white">
                        <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
                            <ul className="navbar-nav">
                                <li className="nav-item dropdown">
                                    <button className="user-btn btn btn-dark dropdown-toggle bg-white text-black" data-bs-toggle="dropdown" aria-expanded="false">
                                        <img src="" alt="" />
                                    </button>
                                    <ul className="dropdown-menu dropdown-menu-white">
                                        <li><a className="dropdown-item" href="#">Logout</a></li>
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