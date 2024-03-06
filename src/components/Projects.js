import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Projects = () => {
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

  if (!data || !Array.isArray(data)) {
    return <p aria-busy="true">Hämtar data</p>;
  }

  return (
    <>
      <h1>Projects</h1>
      <table>
        <thead>
          <tr>
            <th>Projectname</th>
            <th>Status</th>
            <th>Hours</th>
            <th>Worked hours</th>
            <th>Hours left</th>
          </tr>
        </thead>
        <tbody>
          {data[0].results.map((page, index) => {
            // Rendera en rad i tabellen för varje objekt i 'data.results'.
            return (
              <tr key={index}>
                <td>{page.properties.Projectname.title[0]?.plain_text ?? 'Ingen titel'}</td>
                <td>{page.properties.Status.select.name ?? 'Ingen status'}</td>
                <td>{page.properties.Hours.number ?? 0}</td>
                <td>{page.properties.Worked_hours.rollup.number ?? 0}</td>
                <td>{page.properties.Hours_left.formula.number ?? 0}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default Projects
