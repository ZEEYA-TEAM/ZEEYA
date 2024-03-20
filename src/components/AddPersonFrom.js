import React, { useState } from "react";
import { sendPerson } from "../resources/SendData";

function AddPersonForm() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  // Definiera en funktion som heter handleSubmit som tar en händelse (event) som indata
  const handleSubmit = async (event) => {
     // Förhindra standardbeteendet för händelsen, vilket i detta fall förhindrar att sidan omladdas när formuläret skickas in
    event.preventDefault();
     // Skapa en ny variabel newPerson som innehåller ett objekt med egenskaperna name och role
    const newPerson = {
      name: name, //Hämta värdet från variabeln name och tilldela det till egenskapen name i newPerson
      role: role //Hämta värdet från variabeln role och tilldela det till egenskapen role i newPerson
    };

    try {
      await sendPerson(newPerson.name, newPerson.role);
      alert("Data sparad");
      console.log("Data sparad i Notion:", newPerson);
      setName("");
      setRole("");
    } catch (error) {
      console.error("Fel vid sparande av data i Notion:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </label>
      <label>
        Role:
        <input
          type="text"
          value={role}
          onChange={(event) => setRole(event.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default AddPersonForm;