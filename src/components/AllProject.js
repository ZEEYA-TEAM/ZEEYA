import React, { useState } from 'react';
import ViewProjects from './ViewProjects';
import FilterProjects from './ActiveProjects';
import UpdateProject from './UpdateProject';
import AddProject from './AddProject';
import ProjectWeekView from './ProjectWeekView';

const ProjectData = () => {
  const [userChoice, setuserChoice] = useState(null);

  const handleSelectChange = (event) => {
    setuserChoice(event.target.value);
  };

  const renderUserChoice = () => {
    switch (userChoice) {
      case 'projects':
        return <ViewProjects />;     
      case 'filterprojects':
        return <FilterProjects/>;
      case 'addprojects':
        return <AddProject/>;       
      case 'updateproject':
        return <UpdateProject />
      case 'projectWeekView':
        return <ProjectWeekView />
      default:
        return null;
    }
  };

  return (
    <>
        <h1>Projects</h1>
        <label htmlFor="componentDropdown" style={{fontSize:""}}>Select an option from the dropdown for projects:</label>
        <select id="componentDropdown" onChange={handleSelectChange}>
          <option value="">Choose..</option>
          <option value="projects">All Projects</option>
          <option value="filterprojects">Status project</option>         
          <option value="projectWeekView">Filter Projects</option>         
          <option value="addprojects">Add Projects</option>        
          <option value="updateproject">Update Project</option>
        </select>
      {renderUserChoice()}
    </>
  );
};

export default ProjectData;
