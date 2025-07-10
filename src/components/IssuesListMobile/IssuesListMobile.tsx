import React from 'react';
import _ from 'lodash';

import IssueCard from '@/components/IssueCard/IssueCard';
import { useDebouncedSearch } from '@/hooks/useDebouncedSearch';
import { SEARCHABLE_COLUMNS, MOBILE_COLUMN_NAMES, type ColumnKey, type Issue } from '@/types/issues';

import {useSortItems} from '@/hooks/useSortItems';
import SharedList from '@/components/SharedList/SharedList';

import './IssuesListMobile.css'

type IssuesListProps = {
    data?: Issue[];
};

const height = 600;

const CARD_HEIGHT = 224;
const CARD_SPACING = 24;

const ITEM_SIZE = CARD_HEIGHT + CARD_SPACING;

const IssuesListMobile = ({data}: IssuesListProps) => {
    const [sortKey, setSortKey] = React.useState<ColumnKey>('rowIndex');
    const [sortAsc, setSortAsc] = React.useState(true);
    const [filteredIssues, setFilteredIssues] = React.useState<Issue[]>(data ?? []);

    const debouncedSearch = useDebouncedSearch({
        data: data ?? [],
        onSearchResult: setFilteredIssues,
    });

    const sortedData = useSortItems(filteredIssues, sortKey, sortAsc);

    const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
        if (!sortedData) {
            return null;
        }
        const item = sortedData[index];
    
        return (
            <div style={{ ...style, paddingBottom: `${CARD_SPACING}px` }}>
                <IssueCard issue={item} isListCard index={index} sortAsc={sortAsc} listSize={_.size(sortedData)}/>
            </div>
        );
    };

    return (
        <>
            <div className='search-wrapper'>
                {SEARCHABLE_COLUMNS.map(name => (
                    <span role="search" aria-label={`${name} selector Search`} className='search-box'>
                        <label htmlFor={`${name}-search`}>search:</label>
                        <input 
                            type="text"
                            id="selector-search" 
                            name={name} 
                            className="column-filter-input"
                            placeholder={name}
                            aria-label={name}
                            onChange={(e) => {debouncedSearch(e.target.value, name)}}
                        />
                    </span>
                ))}
            </div>
            <SharedList
                tableHeaderProps={{
                    sortKey,
                    sortAsc,
                    setSortAsc,
                    setSortKey,
                    columns: MOBILE_COLUMN_NAMES
                }}
                ListProps= {{
                    height,
                    itemSize: ITEM_SIZE,
                }}
                imgWidth={'90%'}
                row={Row}
                tableCount={_.size(filteredIssues)}
            />
        </>
    )
}

export default IssuesListMobile;
