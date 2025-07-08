import React from 'react';
import _ from 'lodash';
import { FixedSizeList as List, type ListChildComponentProps } from 'react-window';

import IssueRow from '@/components/IsuessRow/IsuessRow'
import { useTableContext } from '@/context/TableContext';
import TableHeader from '@/components/TableHeader/TableHeader';
import { useDebouncedSearch } from '@/hooks/useDebouncedSearch';
import Placeholder from '@/components/PlaceHolder/PlaceHolder';
import { COLUMN_NAMES, SEARCHABLE_COLUMNS, type ColumnKey, type Issue } from '@/types/issues';
import './IssuesList.css';

type IssuesListProps = {
    data?: Issue[];
};

const ROW_HEIGHT = 45;

const IssuesList = ({data}: IssuesListProps) => {
  const listRef = React.useRef<List>(null);
  const { selectedIssueNumber } = useTableContext();
  const [sortAsc, setSortAsc] = React.useState(true);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [listHeight, setListHeight] = React.useState<number>(400);
  const [sortKey, setSortKey] = React.useState<ColumnKey>('rowIndex');
  const [filteredIssues, setFilteredIssues] = React.useState<Issue[]>(data ?? []);

  React.useEffect(() => {
    if (selectedIssueNumber && listRef) {
      if (listRef.current) {
        listRef.current.scrollToItem(selectedIssueNumber, "center");
      }
    }
  }, [selectedIssueNumber, listRef]);

  const debouncedSearch = useDebouncedSearch({
    data: data ?? [],
    onSearchResult: setFilteredIssues,
  });

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

  React.useLayoutEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        const height = containerRef.current.getBoundingClientRect().height;
        setListHeight(height - ROW_HEIGHT - Math.round(ROW_HEIGHT/2));
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);
 
  const Row =  ({index, style }: ListChildComponentProps) => {
    return (
      <IssueRow
          index={index}
          style={style}
          sortAsc={sortAsc}
          sortedData={sortedData || []}
          listSize={_.size(filteredIssues)}
        />
    )
  };

  return (
    <section className="table-container" role="region" aria-label="Accecabilty issues Table" ref={containerRef}>
      <TableHeader
        sortKey={sortKey}
        sortAsc={sortAsc}
        setSortAsc={setSortAsc}
        setSortKey={setSortKey}
        searchFunction={debouncedSearch}
        columns={Object.keys(COLUMN_NAMES) as ColumnKey[]}
        searchableColumns={SEARCHABLE_COLUMNS}
      />
      {_.isEmpty(filteredIssues) ? 
         <Placeholder type='empty' infoText='Nothing to see here' height="312"/> :
         <List
            ref={listRef}
            width="100%"
            height={listHeight}
            itemSize={ROW_HEIGHT}
            outerElementType="div"
            innerElementType="div"
            itemCount={_.size(sortedData)}
            style={{ minWidth: '768px'}}
            itemData={{sortAsc, listSize: _.size(filteredIssues)}} // do I need it
          >
         {Row}
       </List>
      }
    </section>
  );
};

export default IssuesList;