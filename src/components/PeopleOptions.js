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
      <h1>People</h1>
        <label htmlFor="componentDropdown" style={{fontSize:""}}>Select an option from the dropdown for people:</label>
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