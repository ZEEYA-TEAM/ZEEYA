import React, { useState, useEffect } from "react";
import { updateProjectHours } from "../resources/UpdateData";
import { fetchData } from "../resources/FetchData";
import LoggingService from "../LoggingService";

function UpdateProject() {
  const [pageId, setPageId] = useState("");
  const [hours, setHours] = useState("");
  const [projects, setProjects] = useState(null);

  // Definiera en funktion som heter handleSubmit som tar en händelse (event) som indata
  const handleSubmit = async (event) => {
     // Förhindra standardbeteendet för händelsen, vilket i detta fall förhindrar att sidan omladdas när formuläret skickas in
    event.preventDefault();
     // Skapa en ny variabel newPerson som innehåller ett objekt med egenskaperna name och role

    LoggingService.logUserAction('unknown', 'button_click', 'UpdateProject', 'Update-Project-Button');

    try {
      await updateProjectHours(pageId, hours);
      alert("Data uppdaterad");
      console.log("Data uppdaterad");
      setHours("");
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
        PageId:
        <select value={pageId} onChange={(e) => setPageId(e.target.value)}>
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
      <button type="submit">Submit</button>
    </form>
  );
}

export default UpdateProject;