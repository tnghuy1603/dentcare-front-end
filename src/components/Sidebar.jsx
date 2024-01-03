import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
    const [selected, setSelected] = useState(null);
    const handleClickSelected = (index) => {
        // let lastClick = new Date().getTime() - 200;
        // const now = new Date().getTime();
        // if (selected === index && now - lastClick < 300) {
        //     return;
        // }
        setSelected(index);
        // lastClick = now;
    }
    const getLiStyle = (index) => {
        return {
            borderLeft: index === selected ? '4px solid #fff' : 'none',
        }
    }
    return (
        <section className="active" id="menu">
            <div className="logo">
                <h2 className="me-auto"><i className="fa-solid fa-tooth me-3"></i>DentCare</h2>
            </div>
            <div className="items">
                <li onClick={() => setSelected(1)} style={getLiStyle(1)}><i className="fa-solid fa-house"></i><Link to={"/"}>Dashboard</Link></li>
                <li onClick={() => setSelected(6)} style={getLiStyle(6)}><i className="fa-solid fa-user"></i><Link to={"/dentists"}>Dentist profiles</Link></li>
                <li onClick={() => setSelected(8)} style={getLiStyle(8)}><i className="fa-solid fa-user"></i><Link to={"/patients"}>Patient profiles</Link></li>
                <li onClick={() => setSelected(2)} style={getLiStyle(2)}><i className="fa-solid fa-users"></i><Link to={"/manage-staffs"}>Manage staffs</Link></li>
                <li onClick={() => setSelected(3)} style={getLiStyle(3)}><i className="fa-solid fa-calendar-check"></i><Link to={"/appointments"}>Manage appointments</Link></li>
                <li onClick={() => setSelected(4)} style={getLiStyle(4)}><i className="fa-solid fa-calendar-days"></i><Link to={"/manage-schedules"}>Manage schedules</Link></li>
                <li onClick={() => setSelected(5)} style={getLiStyle(5)}><i className="fa-solid fa-stethoscope"></i><Link to={"/manage-drugs"}>Manage drugs</Link></li>
                <li onClick={() => setSelected(7)} style={getLiStyle(7)}><i className="fa-solid fa-chart-simple"></i><Link to={"/statistics"}>Statistics</Link></li>
            </div>
        </section>

    )
}

export default Sidebar