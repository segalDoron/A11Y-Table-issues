import React from 'react';

import { useTable } from '../context/TableContext';


const About = () => {
  const { tableInfo } = useTable();
  const { selectedRow } = tableInfo || {};

  return (
    <div>
       <h1>About Page</h1>
        <div>{selectedRow}</div>
    </div>
  );
}

export default About;