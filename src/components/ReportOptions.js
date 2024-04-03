import React, { useState } from 'react';
import Timereports from './Timereports';
import AddTimeReports from './AddTimeReports'

const ReportOptions = () => {
  const [userChoice, setuserChoice] = useState(null);

  const handleSelectChange = (event) => {
    setuserChoice(event.target.value);
  };

  const renderUserChoice = () => {
    switch (userChoice) {
        case 'timereports':
            return <Timereports />;      
        case 'addReport':
            return <AddTimeReports />;      
        default:
            return null;
    }
  };

  return (
    <>
        <label htmlFor="componentDropdown" style={{fontSize:""}}>Select from dropdown list to add people or time reports:</label>
        <select id="componentDropdown" onChange={handleSelectChange}>
          <option value="">Choose..</option>
          <option value="timereports">View time reports</option>           
          <option value="addReport">New time report</option>                  
        </select>
      {renderUserChoice()}
    </>
  );
};

export default ReportOptions;