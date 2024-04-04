import React, { useState, useEffect } from 'react';
import { fetchData } from '../resources/FetchData';

  function ProjectWeekView() {
    const [timereports, setTimereports] = useState(null);
    const [projects, setProjects] = useState(null);
    const [filtered, setFiltered] = useState({ results: [] });
    const [dateStart, setDateStart] = useState(null);
    const [dateEnd, setDateEnd] = useState(null);  

    function handleSubmit(event) {
        event.preventDefault();

        filterTimereports(new Date(dateStart), new Date(dateEnd));
    }

    function filterTimereports(dateStart, dateEnd) {
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
    
    function findReportedHours(id) {
        let hours = 0;

        filtered.results
            .filter(project => project.properties.Project.relation[0]?.id === id)
            .map((report) => {
                hours += report.properties.Hours.number;
            });

        return hours;
    };
    
    async function fetchTimereports() {
        try {
            const timereports = await fetchData("timereports");
            const projects = await fetchData("projects");

            setTimereports(timereports);
            setProjects(projects);
        } catch (error) {
            console.error(error);
        }
    };

  useEffect(() => {
    fetchTimereports();
  }, []);

  if (!timereports || !projects) {
    return <p aria-busy="true">Hämtar data</p>;
  } 

  return (
    <>
      <h1>Filter Projects</h1>
      <form className='grid' onSubmit={handleSubmit}>
        <input type="date" name="startDate" aria-label="startDate" defaultValue={dateStart} onChange={(event) => setDateStart(event.target.value)} />
        <input type="date" name="endDate" aria-label="endDate" defaultValue={dateEnd} onChange={(event) => setDateEnd(event.target.value)} />

        <button type='submit'>Confirm</button>
      </form>
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