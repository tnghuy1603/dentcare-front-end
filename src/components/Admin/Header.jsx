import React from "react";

const Header = () => {
    return (
        <div className="navigation">
            <div className="n1">
                <i id="menu-btn" className="fas fa-bars"></i>
                <form className="search">
                    <i className="fa-solid fa-search"></i>
                    <input type="text" name="" id="" placeholder="Search" />
                    <button type="submit" className="btn btn-secondary ms-3">Submit</button>
                </form>
                <form action="" className="d-flex">
                    <input type="date" className="ms-3 search" />

                </form>
            </div>

            <div className="profile">
                <i className="far fa-bell"></i>
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