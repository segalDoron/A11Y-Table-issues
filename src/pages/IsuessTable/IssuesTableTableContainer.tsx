import React from "react";
import { isUndefined } from "lodash";
import { Link, useNavigate } from 'react-router-dom';

import Loader from '../../components/loader/loader';
import PlaceHolder from '../../components/PlaceHolder/PlaceHolder';
import { fetchMockIssues, type Issue } from '../../services/mockIssuesService';

import './issuesTable.css'

const IssuesTable = () => {
  const [issues, setIssues] = React.useState<Issue[] | undefined>(undefined);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isFetchError, setIsFeatchError] = React.useState<boolean>(false);
  const [isSuccessfullFetch, setIsSuccessfullFetch] = React.useState<boolean>(false)
  
  React.useEffect(() => {
    const { promise, cancel } = fetchMockIssues({ isSuccessfull: isSuccessfullFetch });
    setIsLoading(true)
    promise
      .then((data) => {
        setIssues(data);
      })
      .catch((err) => {
        console.error(err);
        setIsFeatchError(true);
      })
      .finally(() => {
        setIsLoading(false)
      });

    return () => {
      cancel();
    };
  }, [isSuccessfullFetch]);

  if (isLoading) {
    return (
      <Loader isLoading/>
    );
  }

  if (isFetchError) {
    const action = () => {
      setIsSuccessfullFetch(true)
      setIsFeatchError(false);
    };
    const buttonText = 'Maybe try again?';

    return (
      <PlaceHolder type='error' buttonProps={{action, buttonText}}/>
    )
  }

  if (isUndefined(issues)) {
    return null;
  }

  return (
    <>
      <div className="tableRoot">
        <h1>A11Y Issues Overview</h1>
        <table>
          <thead>
            <tr>
              <th>Issue</th>
              <th>Severity</th>
              <th>Component</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {issues.map((issue) => (
              <tr key={issue.id}>
                <td>{issue.issueType}</td>
                <td>{issue.severity}</td>
                <td>{issue.component}</td>
                <td>{issue.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default IssuesTable;