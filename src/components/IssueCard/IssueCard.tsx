import {useNavigate} from 'react-router-dom';

import type { Issue } from '@/types/issues';
import {useTableContext} from '@/context/TableContext';
import './IssueCard.css';

type IssueCardProps = {
  issue: Issue;
  index?: number,
  isListCard?: boolean
  sortAsc?: boolean,
  listSize?: number
};

const IssueCard= ({
    issue,
    index = 0,
    sortAsc,
    listSize = 0,
    isListCard = false,
}: IssueCardProps) => {

  const navigate = useNavigate();
  const {setSelectedIssue, setSelectedIssueNumber, selectedIssueNumber } = useTableContext();

  const {issueType, severity, component, selector, url, description, codeSnippet, screenshot} = issue || {}

  const onClick = () => {
    setSelectedIssue(issue);
    setSelectedIssueNumber(index);
    navigate('/a11y-issue')
  }

  const isActiveCard = isListCard && index === selectedIssueNumber ? 'isSelected' : ''
  const rowIndex = sortAsc ? index + 1 : listSize - index;
  const subHeaderText = `Here are the issue details ${isListCard ? `of number ${rowIndex}` : ''}`

  return (
    <article className={`card ${isActiveCard}`} aria-label={`Issue: ${issueType}`} tabIndex={0}>
        <div className="card-details">
            <h4 className="card-header">{subHeaderText}</h4>
            <div><strong>Issue type:</strong> {issueType}</div>
            <div><strong>Severity:</strong> {severity}</div>
            {!isListCard && (
              <>
                <div><strong>Component:</strong> {component}</div>
                <div><strong>Selector:</strong> {selector}</div>
                <div><strong>URL:</strong> <a href={url} target="_blank" rel="noopener noreferrer">{url}</a></div>
                <div><strong>Description:</strong> {description}</div>
                <div className="codeSnippe"><strong>Code Snippet:</strong> <code>{codeSnippet}</code></div>
                <div><img src={screenshot} alt="Accecabilty issue screen shot"/></div>
              </>
            )}
            {isListCard && (
              <button
                type="button"
                className="accessible-link"
                onClick={onClick}
                aria-label="See full issue info"
              >
                See full issue info
              </button>
            )}
        </div>
    </article>
  );
};

export default IssueCard;
