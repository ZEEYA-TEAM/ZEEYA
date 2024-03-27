import React, { useState } from 'react';
import Projects from './Projects';
import People from './People';
import Timereports from './Timereports';
import FilterProjects from './ActiveProjects';
import AddPersonForm from './AddPersonFrom';
import UpdateProject from './UpdateProject';
import AddProject from './AddProject';
import ViewReport from './ViewReports';
import ProjectWeekView from './ProjectWeekView';

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
      case 'filterprojects':
        return <FilterProjects/>;
      case 'addprojects':
        return <AddProject/>; 
      case 'addpeople':
        return <AddPersonForm/>
      case 'updateproject':
        return <UpdateProject />;
      case 'viewReport':
        return <ViewReport/>;
      case 'projectweekview':
        return <ProjectWeekView />;
      default:
        return null;
    }
  };

  return (
    <>
        <label htmlFor="componentDropdown" style={{fontSize:""}}>Choose function from dropdown list:</label>
        <select id="componentDropdown" onChange={handleSelectChange}>
          <option value="">Choose..</option>
          <option value="projects">Projects</option>
          <option value="people">People</option>
          <option value="timereports">Timereports</option>
          <option value="filterprojects">Filter Projects</option>
          <option value="addprojects">Add Projects</option>
          <option value="addpeople">Add people</option>
          <option value="updateproject">Update Project</option>
          <option value="ViewReport"> ViewReport</option>
          <option value="projectweekview">Project Week View</option>
        </select>
      {renderUserChoice()}
    </>
  );
};

export default Layout;
