import React, { useState, useEffect } from "react";
import { sendTimereport } from "../resources/SendData";
import { fetchData } from "../resources/FetchData";

function AddTimeReport() {
  const [projectId, setprojectId] = useState("");
  const [hours, setHours] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState(""); 
  const [projects, setProjects] = useState(null);

  const handleSubmit = async (event) => {    
    event.preventDefault();     
    const newTimeReport = { 
        hours: hours, 
        note: note,        
        date: date
    };

    const id = localStorage.getItem("PrivateId");

    try {
      await sendTimereport(projectId, newTimeReport.hours, newTimeReport.note, newTimeReport.date, id);
      alert("Data sparad");
      console.log("Data sparad i Notion:", newTimeReport);      
      setHours("");
      setNote("");
      setDate("");
    } catch (error) {
      console.error("Fel vid sparande av data i Notion:", error);
    }
  };

  async function fetchProjects() {
    try {
      const response = await fetchData("projects");
      setProjects(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  if (!projects) {
    return <p aria-busy="true">Läser in</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Project:
        <select value={projectId} onChange={(e) => setprojectId(e.target.value)}>
          <option value="">Choose project</option>
          {projects.results.map((page, index) => (
            <option key={index} value={page.id}>{page.properties.Projectname.title[0]?.plain_text}</option>
          ))}
        </select>
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
        Note:
        <input
          type="text"
          value={note}
          onChange={(event) => setNote(event.target.value)}
        />
      </label>
      <label>
        Date:
        <input
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default AddTimeReport;