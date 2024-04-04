import React, { useState } from "react";
import { sendTimereport } from "../resources/SendData";

function AddTimeReport() {
  const [hours, setHours] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState(""); 

  const handleSubmit = async (event) => {    
    event.preventDefault();     
    const newTimeReport = { 
        hours: hours, 
        note: note,        
        date: date,     
        PrivateId: localStorage.getItem("PrivateId")
    };

    try {
      await sendTimereport(newTimeReport.hours, newTimeReport.note, newTimeReport.date, newTimeReport.PrivateId);
      alert("Data sparad");
      console.log("Data sparad i Notion:", newTimeReport);      
      setHours("");
      setNote("");
      setDate("");
    } catch (error) {
      console.error("Fel vid sparande av data i Notion:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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