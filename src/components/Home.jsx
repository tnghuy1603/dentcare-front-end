import React from "react";

const Home = ({role}) => {
    return (
        <>
            <h3 className="i-name">{role.includes('ROLE_ADMIN') ? 'Admin': role.includes('ROLE_STAFF') ? 'Staff' : 'Dentist' } Dashboard</h3>
            <div className=""></div>
        </>
    )
}

export default Home