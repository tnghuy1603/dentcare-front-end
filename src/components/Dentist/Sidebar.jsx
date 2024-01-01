import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
    const [selected, setSelected] = useState(null);
    const handleClickSelected = (index) => {
        let lastClickTime = new Date().getTime() - 300;
        const now = new Date().getTime();
        if (selected === index && now - lastClickTime < 300) {
            return;
        }

        // Update the selected item
        setSelected(index);

        // Record the timestamp of the last click
        lastClickTime = now;
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
                <li onClick={() => handleClickSelected(1)} style={getLiStyle(1)}><i className="fa-solid fa-house"></i><Link to={"/"}>Dashboard</Link></li>
                <li onClick={() => handleClickSelected(2)} style={getLiStyle(2)}><i className="fa-solid fa-users"></i><Link to={"/patients-profile"}>Patient profiles</Link></li>
                <li onClick={() => handleClickSelected(3)} style={getLiStyle(3)}><i className="fa-solid fa-calendar-check"></i><Link to={"/manage-appointments"}>Manage appointments</Link></li>
                <li onClick={() => handleClickSelected(4)} style={getLiStyle(4)}><i className="fa-solid fa-calendar-days"></i><Link to={"/manage-schedules"}>Schedules</Link></li>
                <li onClick={() => handleClickSelected(5)} style={getLiStyle(5)}><i className="fa-solid fa-stethoscope"></i><Link to={"/manage-drugs"}>Drugs</Link></li>
                <li onClick={() => handleClickSelected(6)} style={getLiStyle(6)}><i className="fa-solid fa-user"></i><Link to={"/dentist-profile"}>Dentist profile</Link></li>

            </div>
        </section>

    )
}

export default Sidebar