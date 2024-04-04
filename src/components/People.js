import React, { useState, useEffect } from 'react';
import { fetchData } from '../resources/FetchData';

function People() {
  const [data, setData] = useState(null);

  async function fetchPeople() {
    try {
      const people = await fetchData("people");
      setData(people);
    } catch (error) {
      console.error("Failed to fetch people: ", error);
    }
  }

  useEffect(() => {
    fetchPeople();
  }, []);

  if (!data) {
    return <p aria-busy="true">Hämtar data</p>;
  }

  return (
    <>
      <h1>People</h1>
      <div className='overflow-auto'>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Total hours</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {data.results.map((page, index) => {
              // Rendera en rad i tabellen för varje objekt i 'data.results'.
              return (
                <tr key={index}>
                  <td>{page.properties.Name.title[0]?.plain_text ?? 'Ingen titel'}</td>
                  <td>{page.properties.Total_hours.rollup.array[0]?.number ?? 0}</td>
                  <td>{page.properties.Role.rich_text[0]?.plain_text ?? 0}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}


export default People;
