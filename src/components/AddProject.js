import React, { useState } from "react";
import { sendProject } from "../resources/SendData";
import LoggingService from "../LoggingService";

function AddProject() {
  const [projectName, setProjectName] = useState("");
  const [hours, setHours] = useState("");
  const [statusAll] = useState(["Active", "Next Up", "Done"]);
  const [statusColorAll] = useState({"Active": "blue", "Next Up": "brown", "Done": "pink"});
  const [status, setStatus] = useState(null);
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");  

  const handleSubmit = async (event) => {    
    event.preventDefault();     
    const newProject = {
        projectName: projectName, 
        hours: hours, 
        status: status,
        statusColor: statusColorAll[status],
        dateStart: dateStart,
        dateEnd: dateEnd
    };

    try {
      await sendProject(newProject.projectName, newProject.hours, newProject.status, newProject.statusColor, newProject.dateStart, newProject.dateEnd);
      alert("Data sparad");
      console.log("Data sparad i Notion:", newProject);
      setProjectName("");
      setHours("");
      setStatus("");
      setDateStart("");
      setDateEnd("")
    } catch (error) {
      console.error("Fel vid sparande av data i Notion:", error);
    }

    LoggingService.logUserAction('unknown', 'button_click', 'AddProject', 'Add-Project-Button');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        ProjectName:
        <input
          type="text"
          value={projectName}
          onChange={(event) => setProjectName(event.target.value)}
        />
      </label>
      <label>
        Hours:
        <input
          type="number"
          value={hours}
          onChange={(event) => setHours(parseInt(event.target.value))}
        />
      </label>
      <label>
        Status:
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">Choose status</option>
          {statusAll.map((index) => (
            <option key={index} value={index}>{index}</option>
          ))}
        </select>
      </label>
      <label>
        DateStart:
        <input
          type="date"
          value={dateStart}
          onChange={(event) => setDateStart(event.target.value)}
        />
      </label>
      <label>
        DateEnd:
        <input
          type="date"
          value={dateEnd}
          onChange={(event) => setDateEnd(event.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default AddProject;