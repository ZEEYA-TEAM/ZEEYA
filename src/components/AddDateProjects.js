import { useState } from "react";
function AddDateProjects(){
    const[projects, setProjects]= useState("")
    const DateChange = (event)=>{
        setProjects(event.target.value);
    };
    const handelSubmit = (event)=>{
        event.preventDefault();
    };
    return(
        <form onSubmit={handelSubmit}>
            <input type="projects" value={projects}>{DateChange}</input>
            <button type="submit">Download projects</button>

        </form>
    );
}
export default AddDateProjects;