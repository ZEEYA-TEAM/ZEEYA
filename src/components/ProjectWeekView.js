import React, { useState, useEffect } from 'react';
import { fetchData } from '../resources/FetchData';

function ProjectWeekView() {
  const [timereports, setTimereports] = useState(null);
  const [people, setPeople] = useState(null);
  const [projects, setProjects] = useState(null);
  const [filtered, setFiltered] = useState({ results: [] });

  async function fetchTimereports() {
    try {
      const timereports = await fetchData("timereports");
      const people = await fetchData("people");
      const projects = await fetchData("projects");

      setTimereports(timereports);
      setPeople(people);
      setProjects(projects);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTimereports();

    if (timereports) {
        const start = new Date("2023-03-06");
        const end = new Date("2025-03-06");

        filterTimereports(start, end);
    }
  }, []);

  const filterTimereports = (dateStart, dateEnd) => {
    const dateStartUnix = dateStart.getTime();
    const dateEndUnix = dateEnd.getTime();
    let filtered = {
        results: []
    };

    timereports.results.forEach(report => {
        const date = new Date(report.properties.Date.date.start);
        
        if (date.getTime() > dateStartUnix && date.getTime() < dateEndUnix) {
            filtered.results.push(report);
        }
    });

    setFiltered(filtered);
  }

  const findReportedHours = (id) => {
    let hours = 0;

    filtered.results
        .filter(project => project.properties.Project.relation[0]?.id === id)
        .map((report) => {
            hours += report.properties.Hours.number;
        });

    return hours;
  };

  if (!timereports || !people || !projects) {
    return <p aria-busy="true">Hämtar data</p>;
  } 

  return (
    <>
      <h1>Project Week View</h1>
      <div className='overflow-auto'>
        <table>
          <thead>
            <tr>
              <th>Project</th>
              <th>Reported hours</th>
            </tr>
          </thead>
          <tbody>
            {projects.results.map((page, index) => {
              // Rendera en rad i tabellen för varje objekt i 'data.results'.
              return (
                <tr key={index}>
                  <td>{page.properties.Projectname.title[0]?.plain_text}</td>
                  <td>{findReportedHours(page.id)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}


export default ProjectWeekView;