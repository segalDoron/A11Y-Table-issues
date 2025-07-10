import {isNull} from 'lodash'
import { Link } from 'react-router-dom';

import type { Issue } from '@/types/issues';
import IssueCard from '@/components/IssueCard/IssueCard';
import './About.css'

type AboutViewProps = {
  selectedIssueNumber?: number | null;
  selectedIssue?: Issue | null,
}

const AboutView = ({selectedIssueNumber = 0, selectedIssue}: AboutViewProps) => {
  const index = isNull(selectedIssueNumber) ? 0 : selectedIssueNumber + 1

  return (
    <section className='about-root'>
        <nav><Link to='/'>Page list</Link> / Issue info</nav>
        <h1>A11Y issue id number: {index}</h1>
        {selectedIssue && <IssueCard issue={selectedIssue}/>}
    </section>
  );
}

export default AboutView;