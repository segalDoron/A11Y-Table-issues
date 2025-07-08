import React from 'react';
import _ from 'lodash';
import { FixedSizeList as List } from 'react-window';

import { useTableContext } from '@/context/TableContext';
import IssueCard from '@/components/IssueCard/IssueCard';
import Placeholder from '@/components/PlaceHolder/PlaceHolder';
import { useDebouncedSearch } from '@/hooks/useDebouncedSearch';
import TableHeader from '@/components/TableHeader/TableHeader';
import { SEARCHABLE_COLUMNS, MOBILE_COLUMN_NAMES, type ColumnKey, type Issue } from '@/types/issues';

import './IssuesListMobile.css'

type IssuesListProps = {
    data?: Issue[];
};

const CARD_HEIGHT = 224;
const CARD_SPACING = 24;

const ITEM_SIZE = CARD_HEIGHT + CARD_SPACING;

const IssuesListMobile = ({data}: IssuesListProps) => {
    const listRef = React.useRef<List>(null);
    const [sortAsc, setSortAsc] = React.useState(true);
    const [filteredIssues, setFilteredIssues] = React.useState<Issue[]>(data ?? []);
    const [sortKey, setSortKey] = React.useState<ColumnKey>('rowIndex');
    const { selectedIssueNumber } = useTableContext();

    React.useEffect(() => {
        if (selectedIssueNumber && listRef) {
          if (listRef.current) {
            listRef.current.scrollToItem(selectedIssueNumber, "center");
          }
        }
      }, [selectedIssueNumber, listRef]);

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

    const sortedData = React.useMemo(() => {
        if (!filteredIssues || _.isEmpty(filteredIssues)) {
            return null;
        }
    
        if (sortKey === 'rowIndex') {
            return sortAsc ? [...filteredIssues] : _.reverse([...filteredIssues]);
        }
    
        const sorted = [...filteredIssues].sort((firstItem, seconedItem) => {
          const firstItemValue = firstItem[sortKey];
          const seconedItemValue = seconedItem[sortKey];
          return String(firstItemValue).localeCompare(String(seconedItemValue));
        });
        
        return sortAsc ? sorted : _.reverse(sorted);
    }, [filteredIssues, sortKey, sortAsc]);

    const debouncedSearch = useDebouncedSearch({
    data: data ?? [],
    onSearchResult: setFilteredIssues,
    });

    return (
        <section aria-label='A11Y issues table'>
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
            <TableHeader
                sortKey={sortKey}
                sortAsc={sortAsc}
                setSortAsc={setSortAsc}
                setSortKey={setSortKey}
                columns={MOBILE_COLUMN_NAMES}
            />

            {_.isEmpty(filteredIssues) ? 
                <Placeholder type='empty' infoText='Nothing to see here' height="312" width='90%'/> :
                <List
                    height={600}
                    width={'100%'}
                    itemCount={_.size(sortedData)}
                    itemSize={ITEM_SIZE}
                    ref={listRef}
                >
                    {Row}
                </List>
            }
        </section>
    )
}

export default IssuesListMobile;
