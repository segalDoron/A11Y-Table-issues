import React from "react";

import { useTableContext } from '@/context/TableContext';
import { fetchMockIssues} from '@/services/mockIssuesService';

import WelcomePageView from './WelcomePageView';

const WelcomePage = () => {
  const { tableData, setTableData } = useTableContext();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isFetchError, setIsFetchError] = React.useState<boolean>(false);
  const [isSuccessfulFetch, setIsSuccessfulFetch] = React.useState<boolean>(false)
  
  React.useEffect(() => {
    if (tableData) {
      return;
    }

    const { promise, cancel } = fetchMockIssues({ isSuccessfulFetch });
    setIsLoading(true)
    promise
      .then((data) => {
        setTableData(data);
      })
      .catch((err) => {
        console.error(err);
        setIsFetchError(true);
      })
      .finally(() => {
        setIsLoading(false)
      });

    return () => {
      cancel();
    };
  }, [tableData, isSuccessfulFetch]);

  const tryAgain = () => {
    setIsSuccessfulFetch(true)
    setIsFetchError(false);
  }

  return (
    <WelcomePageView
      data = {tableData}
      tryAgain = {tryAgain}
      isLoading={isLoading}
      isFetchError = {isFetchError}
    />
  )
}

export default WelcomePage;