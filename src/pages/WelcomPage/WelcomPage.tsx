import React from "react";

import { type Issue } from '@/types/issues';
import { fetchMockIssues} from '@/services/mockIssuesService';

import WelcomView from './WelcomPageView';
import './welcomPage.css'

const WelcomPage = () => {
  const [issues, setIssues] = React.useState<Issue[] | undefined>(undefined);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isFetchError, setIsFeatchError] = React.useState<boolean>(false);
  const [isSuccessfullFetch, setIsSuccessfullFetch] = React.useState<boolean>(false)
  
  React.useEffect(() => {
    const { promise, cancel } = fetchMockIssues({ isSuccessfullFetch });
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

  const tryAgain = () => {
    setIsSuccessfullFetch(true)
    setIsFeatchError(false);
  }

  return (
    <WelcomView
      data = {issues}
      tryAgain = {tryAgain}
      isLoading={isLoading}
      isFetchError = {isFetchError}
    />
  )
}

export default WelcomPage;