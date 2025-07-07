import React from "react";
import { isUndefined } from "lodash";

import { type Issue } from '@/types/issues';
import Loader from '@/components/loader/loader';
import IssuesList from '@/components/IssuesList/IssuesList'
import PlaceHolder from '@/components/PlaceHolder/PlaceHolder';

import './welcomPage.css'

type issuesListProps = {
  isLoading: boolean;
  isFetchError: boolean;
  tryAgain: () => void;
  data?: Issue[] | undefined;
};

const WelcomPage = ({
  isLoading = true,
  data = undefined,
  tryAgain = () => {},
  isFetchError = false,
} : issuesListProps) => {

  const content = () => {
    if (isLoading) {
      return <Loader isLoading/>
    }

    if (isFetchError) {
      return <PlaceHolder type='error' width="600" height="240" buttonProps={{action: tryAgain, buttonText: 'Maybe try again?'}}/>
    }

    if (isUndefined(data)) {
      return null;
    }

    return <IssuesList data={[...data, ...data, ...data, ...data, ...data, ...data, ...data , ...data, ...data, ...data, ...data, ...data, ...data, ...data, ...data , ...data, ...data, ...data, ...data, ...data, ...data, ...data, ...data , ...data, ...data, ...data, ...data, ...data, ...data, ...data, ...data , ...data, ...data, ...data, ...data, ...data, ...data, ...data, ...data , ...data, ...data, ...data, ...data, ...data, ...data, ...data, ...data , ...data, ...data, ...data, ...data, ...data, ...data, ...data, ...data , ...data, ...data, ...data, ...data, ...data, ...data, ...data, ...data , ...data, ...data, ...data, ...data, ...data, ...data, ...data, ...data , ...data]}/>
  }

  return (
    <div className="root">
      <h1>A11Y Issues Overview</h1>
      {content()}
    </div>
  );
}

export default WelcomPage;