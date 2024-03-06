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

  if (!data || !Array.isArray(data)) {
    return <p aria-busy="true">Hämtar data</p>;
  }

  return (
    <>
      <h1>People</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Total hours</th>
          </tr>
        </thead>
        <tbody>
          {data[1].results.map((page, index) => {
            // Rendera en rad i tabellen för varje objekt i 'data.results'.
            return (
              <tr key={index}>
                <td>{page.properties.Name.title[0]?.plain_text ?? 'Ingen titel'}</td>
                <td>{page.properties.Total_hours.rollup.array[0]?.number ?? '0'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}


export default People
