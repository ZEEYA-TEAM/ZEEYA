// import React, { useState } from 'react';
// import People from './People';
// import Timereports from './Timereports';
// import AddPersonForm from './AddPersonFrom';
// import ProjectData from './AllProject';
// import ToDo from './ToDo';


// const Layout = () => {
//   const [userChoice, setuserChoice] = useState(null);

//   const handleSelectChange = (event) => {
//     setuserChoice(event.target.value);
//   };

//   const renderUserChoice = () => {
//     switch (userChoice) {
//       case 'projectdata':
//         return <ProjectData/>;
//       case 'todo':
//         return <ToDo />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <>
     
//         <label htmlFor="componentDropdown" style={{fontSize:""}}>Choose function from dropdown list:</label>
//         <select id="componentDropdown" onChange={handleSelectChange}>
//           <option value="">Choose..</option>
          
//           <option value="people">Projects</option>
//           <option value="timereports">Timereports</option>       
//           <option value="addpeople">Add people</option>
          
//         </select>
//       {renderUserChoice()}
//     </>
//   );
// };

// export default Layout;