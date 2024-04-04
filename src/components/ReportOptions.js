import React, { useState } from 'react';
import Timereports from './Timereports';
import AddTimeReports from './AddTimeReports'
import ViewReports from './ViewReport';

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
        case 'viewReport':
            return <ViewReports />
        default:
            return null;
    }
  };

  return (
    <>
      <h1>Time reports</h1>
        <label htmlFor="componentDropdown" style={{fontSize:""}}>Select an option from the dropdown for time reports:</label>
        <select id="componentDropdown" onChange={handleSelectChange}>
          <option value="">Choose..</option>
          <option value="timereports">View time reports</option>  
          <option value="viewReport">Filter Reports</option>             
          <option value="addReport">New time report</option>                  
        </select>
      {renderUserChoice()}
    </>
  );
};

export default ReportOptions;