import React, { useState } from "react";
import { sendPerson } from "../resources/SendData";

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
      const response = await sendPerson(newPerson.name, newPerson.role);
      console.log("Data sparad i Notion: ", response.data);
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