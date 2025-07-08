import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useTableContext } from '@/context/TableContext';
import AboutView from './AboutView';
import './About.css'

const About = () => {
  const navigate = useNavigate();
  const { selectedIssue, selectedIssueNumber} = useTableContext();

  React.useEffect(() => {
    if (!selectedIssue) {
      navigate('/');
    }
  }, [selectedIssue]);

  return (
    <AboutView selectedIssueNumber={selectedIssueNumber} selectedIssue={selectedIssue}/>
  );
}

export default About;