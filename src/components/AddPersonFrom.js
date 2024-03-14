import React, { useState } from "react";

function AddPersonForm({ onAddPerson }) {
    const [name, setName] = useState("");
    const [role, setRole] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        const newPerson = {
            name: name,
            role: role
        };
        onAddPerson(newPerson);
        setName("");
        setRole("");
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