import React from 'react';
import _ from 'lodash';
import { type ListChildComponentProps } from 'react-window';

import IssueRow from '@/components/IssuesRow/IssuesRow'
import { useDebouncedSearch } from '@/hooks/useDebouncedSearch';

import {useSortItems} from '@/hooks/useSortItems';
import { COLUMN_NAMES, SEARCHABLE_COLUMNS, type ColumnKey, type Issue } from '@/types/issues';

import SharedList from '@/components/SharedList/SharedList';

type IssuesListProps = {
    data?: Issue[];
};

const ROW_HEIGHT = 45;

const IssuesList = ({data}: IssuesListProps) => {
  const [sortAsc, setSortAsc] = React.useState(true);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [listHeight, setListHeight] = React.useState<number>(400);
  const [sortKey, setSortKey] = React.useState<ColumnKey>('rowIndex');
  const [filteredIssues, setFilteredIssues] = React.useState<Issue[]>(data ?? []);

    const debouncedSearch = useDebouncedSearch({
      data: data ?? [],
      onSearchResult: setFilteredIssues,
    });

    const sortedData = useSortItems(filteredIssues, sortKey, sortAsc);

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

  return(
    <SharedList
          tableHeaderProps={{
              sortKey,
              sortAsc,
              setSortAsc,
              setSortKey,
              searchFunction: debouncedSearch,
              columns: Object.keys(COLUMN_NAMES) as ColumnKey[],
              searchableColumns: SEARCHABLE_COLUMNS,
          }}
          ListProps= {{
              height: listHeight,
              itemSize:ROW_HEIGHT,
              style:{ minWidth: '768px'}
          }}
          row={Row}
          containerRef={containerRef}
          sectionClass='table-container'
          tableCount={_.size(filteredIssues)}
      />
  )
}

export default IssuesList;