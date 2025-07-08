import { isUndefined } from "lodash";

import { type Issue } from '@/types/issues';
import {useIsMobile} from '@/hooks/useIsMobile';
import Loader from '@/components/loader/loader';
import IssuesList from '@/components/IssuesList/IssuesList'
import PlaceHolder from '@/components/PlaceHolder/PlaceHolder';
import IssuesListMobile from '@/components/IssuesListMobile/IssuesListMobile'

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

  const isMobile = useIsMobile();

  const content = () => {
    if (isLoading) {
      return <Loader isLoading/>
    }

    if (isFetchError) {
      return <PlaceHolder type='error' width={isMobile ? '240' : '600'} height="240" buttonProps={{action: tryAgain, buttonText: 'Maybe try again?'}}/>
    }

    if (isUndefined(data)) {
      return null;
    }

    if (isMobile) {
      return <IssuesListMobile data={[...data, ...data, ...data, ...data, ...data, ...data, ...data , ...data, ...data, ...data, ...data, ...data, ...data, ...data, ...data , ...data, ...data, ...data, ...data, ...data, ...data, ...data, ...data , ...data, ...data, ...data, ...data, ...data, ...data, ...data, ...data , ...data, ...data, ...data, ...data, ...data, ...data, ...data, ...data , ...data, ...data, ...data, ...data, ...data, ...data, ...data, ...data , ...data, ...data, ...data, ...data, ...data, ...data, ...data, ...data , ...data, ...data, ...data, ...data, ...data, ...data, ...data, ...data , ...data, ...data, ...data, ...data, ...data, ...data, ...data, ...data , ...data]}/>
    }

    return <IssuesList data={[...data, ...data, ...data, ...data, ...data, ...data, ...data , ...data, ...data, ...data, ...data, ...data, ...data, ...data, ...data , ...data, ...data, ...data, ...data, ...data, ...data, ...data, ...data , ...data, ...data, ...data, ...data, ...data, ...data, ...data, ...data , ...data, ...data, ...data, ...data, ...data, ...data, ...data, ...data , ...data, ...data, ...data, ...data, ...data, ...data, ...data, ...data , ...data, ...data, ...data, ...data, ...data, ...data, ...data, ...data , ...data, ...data, ...data, ...data, ...data, ...data, ...data, ...data , ...data, ...data, ...data, ...data, ...data, ...data, ...data, ...data , ...data]}/>
  }

  return (
    <section className="root">
      <h1>A11Y Issues Overview</h1>
      {content()}
    </section>
  );
}

export default WelcomPage;