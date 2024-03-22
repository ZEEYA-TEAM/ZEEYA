import React, { useState, useEffect } from 'react';
import axios from 'axios';

const People = () => {
  const [data, setData] = useState(null);

  const fetchDataFromNotion = () => {
    const payload = {

    };

    axios.post('http://localhost:3001/api/notion', payload)
      .then(response => {
        setData(response.data);
        console.log('Data hämtad från notion:', response.data);
      })
      .catch(error => {
        console.error('Fel vi inhämtning från notion: ', error);
      });
  };

  useEffect(() => {
    fetchDataFromNotion();
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
    return data[1].results.find(person => person.id === id).properties.Name.title[0]?.plain_text;
  };

  const findProject = (id) => {
    return data[0].results.find(project => project.id === id).properties.Projectname.title[0]?.plain_text;
  };

  if (!data || !Array.isArray(data)) {
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
            {data[2].results.map((page, index) => {
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


export default People
