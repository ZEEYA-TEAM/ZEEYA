import React, { useState } from 'react';
import People from './People';
import AddPersonForm from './AddPersonFrom';

const PeopleOptions = () => {
  const [userChoice, setuserChoice] = useState(null);

  const handleSelectChange = (event) => {
    setuserChoice(event.target.value);
  };

  const renderUserChoice = () => {
    switch (userChoice) {
        case 'people':
            return <People />;      
        case 'addPerson':
            return <AddPersonForm />;      
        default:
            return null;
    }
  };

  return (
    <>
        <label htmlFor="componentDropdown" style={{fontSize:""}}>Select from dropdown list to add people or time reports:</label>
        <select id="componentDropdown" onChange={handleSelectChange}>
          <option value="">Choose..</option>
          <option value="people">View people</option>           
          <option value="addPerson">New person</option>                  
        </select>
      {renderUserChoice()}
    </>
  );
};

export default PeopleOptions;