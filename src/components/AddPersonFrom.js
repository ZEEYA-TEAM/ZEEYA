import React, { useState } from "react";
import axios from "axios";

function AddPersonForm() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newPerson = {
      name: name,
      role: role
    };

    try {
      await sendDataToNotion(newPerson);
      alert("Data sparad");
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