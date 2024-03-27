import React, { useState } from "react";
import { sendProject } from "../resources/SendData";
import LoggingService from "../LoggingService";

function AddProject() {
  const [projectName, setProjectName] = useState("");
  const [hours, setHours] = useState("");
  const [status, setStatus] = useState("");
  const [statusColor, setStatusColor] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");  

  const handleSubmit = async (event) => {    
    event.preventDefault();     
    const newProject = {
        projectName: projectName, 
        hours: hours, 
        status: status,
        statusColor: statusColor,
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
      setStatusColor("");
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
        <input
          type="select"
          value={status}
          onChange={(event) => setStatus(event.target.value)}
        />
      </label>
      <label>
        StatusColor:
        <input
          type="select"
          value={statusColor}
          onChange={(event) => setStatusColor(event.target.value)}
        />
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