import React, { useState } from 'react';
import People from './People';
import Timereports from './Timereports';
import AddPersonForm from './AddPersonFrom';

const ToDo = () => {
  const [userChoice, setuserChoice] = useState(null);

  const handleSelectChange = (event) => {
    setuserChoice(event.target.value);
  };

  const renderUserChoice = () => {
    switch (userChoice) {
        case 'people':
            return <People />;
          case 'timereports':
            return <Timereports />;      
          case 'addpeople':
            return <AddPersonForm/>
      default:
        return null;
    }
  };

  return (
    <>
        <label htmlFor="componentDropdown" style={{fontSize:""}}>Select from dropdown list to add people or time reports:</label>
        <select id="componentDropdown" onChange={handleSelectChange}>
          <option value="">Choose..</option>
          <option value="people">People</option>
          <option value="timereports">Time reports</option>         
          <option value="addpeople">Add People</option>            
        </select>
      {renderUserChoice()}
    </>
  );
};

export default ToDo;
