import React from "react";

import { useTableContext } from '@/context/TableContext';
import { fetchMockIssues} from '@/services/mockIssuesService';

import WelcomView from './WelcomPageView';
import './welcomPage.css'

const WelcomPage = () => {
  const { tableData, setTableData } = useTableContext();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isFetchError, setIsFeatchError] = React.useState<boolean>(false);
  const [isSuccessfullFetch, setIsSuccessfullFetch] = React.useState<boolean>(false)
  
  React.useEffect(() => {
    if (tableData) {
      return;
    }

    const { promise, cancel } = fetchMockIssues({ isSuccessfullFetch });
    setIsLoading(true)
    promise
      .then((data) => {
        setTableData(data);
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
  }, [tableData, isSuccessfullFetch]);

  const tryAgain = () => {
    setIsSuccessfullFetch(true)
    setIsFeatchError(false);
  }

  return (
    <WelcomView
      data = {tableData}
      tryAgain = {tryAgain}
      isLoading={isLoading}
      isFetchError = {isFetchError}
    />
  )
}

export default WelcomPage;