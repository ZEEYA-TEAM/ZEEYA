import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FilterProjects = () => {
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [filter, setFilter] = useState('');
  const [allProjectNames, setAllProjectNames] = useState([]);

  const fetchDataFromNotion = () => {
    const payload = {};

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

  useEffect(() => {
    if (data) {
      const names = data[0].results.map(page => page.properties.Projectname.title[0]?.plain_text);
      setAllProjectNames(names);
      setFilteredData(filterData(data, filter));
    }
  }, [data, filter]);

  const filterData = (data, filter) => {
    if (!filter) return data[0].results;

    const filtered = data[0].results.filter(page => {
      const projectName = page.properties.Projectname.title[0]?.plain_text.toLowerCase();
      const status = page.properties.Status.select.name.toLowerCase();

      return projectName.includes(filter.toLowerCase()) || status.includes(filter.toLowerCase());
    });

    return filtered;
  };

  const handleChangeFilter = (event) => {
    setFilter(event.target.value);
  };

  const formatTimespan = (dateProperty) => {
    // Your existing formatTimespan function
  };

  if (!filteredData || !Array.isArray(filteredData)) {
    return <p aria-busy="true">Hämtar data</p>;
  }

  return (
    <>
      <h1>Projects</h1>      
      <div>
        <label htmlFor="project">Select to see active project:</label>
        <select id="project" value={filter} onChange={handleChangeFilter}>
          <option value="">All projects</option>
          {allProjectNames.map((name, index) => (
            <option key={index} value={name}>{name}</option>
          ))}
        </select>
      </div>
      {filter && (
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
              {filteredData.map((page, index) => (
                <tr key={index}>
                  <td>{page.properties.Projectname.title[0]?.plain_text ?? 'Ingen titel'}</td>
                  <td>{page.properties.Status.select.name ?? 'Ingen status'}</td>
                  <td>{page.properties.Hours.number ?? 0}</td>
                  <td>{page.properties.Worked_hours.rollup.number ?? 0}</td>
                  <td>{page.properties.Hours_left.formula.number ?? 0}</td>
                  <td>{formatTimespan(page.properties.Timespan?.date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default FilterProjects;
