import React from "react";
import { Link, useNavigate } from 'react-router-dom';

import { useTable } from '../context/TableContext';

const IssuesTable = () => {
  const { setTableInfo } = useTable();
  // const navigate = useNavigate();

  return (
    <h1>
      Home <br/>
      {/* <button onClick={() => navigate('/a11y-issue')}>on click</button> */}
      <button onClick={() =>  setTableInfo({ selectedRow: 6 })}>set row id to 6</button>
      <nav>
        <Link to="/">Home</Link> | <Link to="/a11y-issue">About</Link>
      </nav>
    </h1>
  );
}
export default IssuesTable;