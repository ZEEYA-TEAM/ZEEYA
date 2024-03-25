import React, { useState } from "react";
import { updateProjectHours } from "../resources/UpdateData";

function UpdateProject() {
  const [pageId, setPageId] = useState("");
  const [hours, setHours] = useState(null);

  // Definiera en funktion som heter handleSubmit som tar en händelse (event) som indata
  const handleSubmit = async (event) => {
     // Förhindra standardbeteendet för händelsen, vilket i detta fall förhindrar att sidan omladdas när formuläret skickas in
    event.preventDefault();
     // Skapa en ny variabel newPerson som innehåller ett objekt med egenskaperna name och role

    try {
      await updateProjectHours(pageId, hours);
      alert("Data uppdaterad");
      console.log("Data uppdaterad");
      setPageId("");
      setHours(null);
    } catch (error) {
      console.error("Fel vid sparande av data i Notion:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        PageId:
        <input
          type="text"
          value={pageId}
          onChange={(event) => setPageId(event.target.value)}
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
      <button type="submit">Submit</button>
    </form>
  );
}

export default UpdateProject;