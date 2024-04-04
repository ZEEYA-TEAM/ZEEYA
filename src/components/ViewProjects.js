import React, { useState, useEffect } from 'react';
import { fetchData } from '../resources/FetchData';
import './../resources/projects.scss';

function ViewProjects() {
  const [data, setData] = useState(null);

  async function fetchProjects() {
    try {
      const response = await fetchData("projects"); 
      setData(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Funktion för att formatera datumet. och detta fick jag ändra lite
  const formatTimespan = (dateProperty) => {
    if (!dateProperty) {
        return 'Inget datum angivet';
    }

    let dateStart, dateEnd, dateStartString, dateEndString;

    if (!dateProperty.start) {
      dateStartString = 'Inget datum angivet';
    } else {
      dateStart = new Date(dateProperty.start);

      dateStartString = dateStart.toLocaleDateString('en', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }
    
    if (!dateProperty.end) {
      dateEndString = 'Inget datum angivet';
    } else {
      dateEnd = new Date(dateProperty.end);

      dateEndString = dateEnd.toLocaleDateString('en', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }

    return dateStartString.concat(" -> ", dateEndString);
  };

  if (!data) {
    return <p aria-busy="true">Hämtar data</p>;
  }

  return (
    <>
      <div className='overflow-auto'>
        <table>
          <thead>
            <tr>
              <th>Projectname</th>
              <th>Status</th>
              <th>Hours</th>
              <th>Worked hours</th>
              <th>Hours left</th>
              <th>Timespan</th>
            </tr>
          </thead>
          <tbody>
            {data.results.map((page, index) => {
              // Rendera en rad i tabellen för varje objekt i 'data.results'.
              let statusColor;

              switch (page.properties.Status.select.color) { 
                case "blue":
                  statusColor = "#3C71F7"   
                  break; 
                case "brown":
                  statusColor = "#7F270B"  
                  break;  
                case "pink":
                  statusColor = "#D92662"   
                  break; 
                default:
                  statusColor = "#000";
                  break;
              }

              return (
                <tr key={index}>
                  <td>{page.properties.Projectname.title[0]?.plain_text ?? 'Ingen titel'}</td>
                  <td><span className='status-color' style={{ backgroundColor: statusColor }}>{page.properties.Status.select.name ?? 'Ingen status'}</span></td>
                  <td>{page.properties.Hours.number ?? 0}</td>
                  <td>{page.properties.Worked_hours.rollup.number ?? 0}</td>
                  <td>{page.properties.Hours_left.formula.number ?? 0}</td>
                  <td>{formatTimespan(page.properties.Timespan?.date)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ViewProjects;