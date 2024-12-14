import React, { useState, useEffect } from 'react';
import styles from '../styles/Table.module.css';

const FreshnessTable = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/fetch-data');
        const data = await response.json();
        setTableData(data);
      } catch (error) {
        console.error('Error fetching table data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1>Freshness Detection Results</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Sl. No</th>
            <th>Timestamp</th>
            <th>Produce</th>
            <th>Freshness</th>
            <th>Expected Life Span (Days)</th>
          </tr>
        </thead>
        <tbody>
          {tableData.length > 0 ? (
            tableData.map((row, index) => (
              <tr key={row._id}>
                <td>{index + 1}</td>
                <td>{new Date(row.timestamp).toLocaleString()}</td>
                <td>{row.produce}</td>
                <td>{row.freshness}</td>
                <td>{row.expectedLifeSpan}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FreshnessTable;