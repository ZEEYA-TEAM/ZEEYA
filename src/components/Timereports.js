import React, { useState, useEffect } from 'react';
import { fetchData } from '../resources/FetchData';

function Timereports() {
  const [data, setData] = useState(null);
  const [people, setPeople] = useState(null);
  const [projects, setProjects] = useState(null);

  async function fetchTimereports() {
    try {
      const response = await fetchData("timereports");
      const people = await fetchData("people");
      const projects = await fetchData("projects");

      setData(response);
      setPeople(people);
      setProjects(projects);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTimereports();
  }, []);

  // Funktion för att formatera datumet. och detta fick jag ändra lite
  const formatDate = (dateProperty) => {
    if (!dateProperty || !dateProperty.start) {
        return 'Inget datum angivet';
    }
    const date = new Date(dateProperty.start);
    return date.toLocaleDateString('en', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
  };

  const findPerson = (id) => {
    return people.results.find(person => person.id === id).properties.Name.title[0]?.plain_text;
  };

  const findProject = (id) => {
    return projects.results.find(project => project.id === id).properties.Projectname.title[0]?.plain_text;
  };

  if (!data) {
    return <p aria-busy="true">Hämtar data</p>;
  }

  return (
    <>
      <h1>Timereports</h1>
      <div className='overflow-auto'>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Person</th>
              <th>Hours</th>
              <th>Project</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            {data.results.map((page, index) => {
              // Rendera en rad i tabellen för varje objekt i 'data.results'.
              return (
                <tr key={index}>
                  <td>{formatDate(page.properties.Date?.date)}</td>
                  <td>{findPerson(page.properties.Person.relation[0]?.id) ?? 'No title'}</td>
                  <td>{page.properties.Hours.number ?? 0}</td>
                  <td>{findProject(page.properties.Project.relation[0]?.id)}</td>
                  <td>{page.properties.Note.title[0]?.text.content ?? <i>None</i>}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}


export default Timereports;
