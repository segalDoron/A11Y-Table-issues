import React from "react";
import { Link, useNavigate } from 'react-router-dom';

import Loader from '../../components/loader/loader';
import PlaceHolder from '../../components/PlaceHolder/PlaceHolder';

import './isuessTable.css'

const IsuessTable = () => {
  const [isLoading, setIsloading] = React.useState<boolean>(false);
  const [isFetchError, setIsFeatchError] = React.useState<boolean>(false);

  if (isLoading) {
    return (
      <>
        <h1>A11Y Issues overview</h1>
        <Loader isLoading={true}/>
      </>
    )
  }

  if (isFetchError) {
    const action = () => {};
    const buttonText = 'Maybe try again?';

    return (
      <>
         <div className="tableRoot">
          <h1>A11Y Issues overview</h1>
            <PlaceHolder type='error' buttonProps={{action, buttonText}}/>
        </div>
      </>
    )
  }

  return (
    <div>
        <h1>A11Y Issues overview</h1>
        {/* <h1>
        Home <br/>
        {/* <button onClick={() => navigate('/a11y-issue')}>on click</button> */}
        {/* <button onClick={() =>  setTableInfo({ selectedRow: 6 })}>set row id to 6</button> */}
        {/* <nav>
            <Link to="/">Home</Link> | <Link to="/a11y-issue">About</Link>
        </nav>
        </h1> */}
    </div>
  );
}
export default IsuessTable;