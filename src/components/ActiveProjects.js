import React, { useState, useEffect } from 'react';
import { fetchData } from '../resources/FetchData';

const FilterProjects = () => {
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [filter, setFilter] = useState('');
  const [allProjectStatuses, setAllProjectStatuses] = useState([]);

  async function fetchProjects() {
    try {
      const response = await fetchData("projects");
      console.log('Data hämtad från notion:', response.data);
      setData(response);
    } catch (error) {
      console.error('Fel vi inhämtning från notion: ', error);
    }
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (data) {
      const statuses = data.results.map(page => page.properties.Status.select.name);
      setAllProjectStatuses(statuses);
      setFilteredData(filterData(data, filter));
    }
  }, [data, filter]);

  const filterData = (data, filter) => {
    if (!filter) return data.results;

    const filtered = data.results.filter(page => {
      const status = page.properties.Status.select.name.toLowerCase();
      return status === filter.toLowerCase();
    });

    return filtered;
  };

  const handleChangeFilter = (event) => {
    setFilter(event.target.value);
  };

  const formatTimespan = (dateProperty) => {   
  };

  if (!filteredData || !Array.isArray(filteredData)) {
    return <p aria-busy="true">Hämtar data</p>;
  }

  return (
    <>
      <h1>Projects</h1>      
      <div>
        <label htmlFor="status">Select from dropdown list to see project status:</label>
        <select id="status" value={filter} onChange={handleChangeFilter}>
          <option value="">Project status</option>
          {allProjectStatuses.map((status, index) => (
            <option key={index} value={status}>{status}</option>
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
