import React, { useState } from "react";
import axios from "axios";

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
      await sendDataToNotion(newPerson);
      alert(`Welcome: ${newPerson.name} Role: ${newPerson.role}`);
      console.log("Data sparad i Notion:", newPerson);
    } catch (error) {
      console.error("Fel vid sparande av data i Notion:", error);
    }
  };

  const sendDataToNotion = (newPerson) => {
    if (!newPerson || typeof newPerson !== 'object') {
      throw new Error('Invalid person object');
    }
    if (!newPerson.name || !newPerson.role) {
      throw new Error('Name or role is null or undefined');
    }

    const payload = {
      parent: {
        type: "database_id",
        database_id: "b86de2e54b4c4e7789b07dc308489e4d"
      },
      properties: {
        'Name': {
          type:'title',
          title: [
            {
              type: 'text',
              text: {
                content: newPerson.name,
              },
            },
          ],
        },
        'Role': {
          rich_text: [
            {
              text: {
                content: newPerson.role,
              },
            },
          ],
        },
      },
    };

    axios.post('http://localhost:3001/api/notion/send', payload)
    .then(response => {
      alert("Data skickat")
      console.log('Data skickad: ', response.data);
    })
    .catch(error => {
      console.error('Fel vid skickning av data till notion: ', error);
    });
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