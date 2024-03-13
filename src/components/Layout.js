import React, { useState } from 'react';
import Projects from './Projects';
import People from './People';
import Timereports from './Timereports';

const Layout = () => {
  const [userChoice, setuserChoice] = useState(null);

  const handleSelectChange = (event) => {
    setuserChoice(event.target.value);
  };

  const renderUserChoice = () => {
    switch (userChoice) {
      case 'projects':
        return <Projects />;
      case 'people':
        return <People />;
      case 'timereports':
        return <Timereports />;
      default:
        return null;
    }
  };

  return (
    <>
      <nav style={{display:"grid", width:"auto",fontSize:"1.2em"}}>
        <label htmlFor="componentDropdown" style={{fontSize:""}}>Choose from dropdown list to see reports:</label>
        <select id="componentDropdown" onChange={handleSelectChange}>
          <option value="">Choose..</option>
          <option value="projects">Projects</option>
          <option value="people">People</option>
          <option value="timereports">Timereports</option>
        </select>
      </nav>

      {renderUserChoice()}
    </>
  );
};

export default Layout;
