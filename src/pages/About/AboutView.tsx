import React from 'react';
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
    <div className='about-root'>
        <div><Link to='/'>Page list</Link> / Issue info</div>
        <h1>A11Y issue id number: {index}</h1>
        {selectedIssue && <IssueCard issue={selectedIssue}/>}
    </div>
  );
}

export default AboutView;