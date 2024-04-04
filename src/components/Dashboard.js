import React, { useState } from 'react';

const Dashboard = () => {
  const [name, setName] = useState(localStorage.getItem("UserName"));
  const [id, setId] = useState(localStorage.getItem("PrivateId"));

  return (
    <>
        <h1>Dashboard</h1>
        <div>
            <p>Welcome, <strong>{name}</strong></p>
            <p>Your User ID: <strong>{id}</strong></p>
        </div>
    </>
  );
};

export default Dashboard;