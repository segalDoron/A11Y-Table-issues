import React, {type RefObject} from 'react';
import { FixedSizeList as List, type ListChildComponentProps } from 'react-window';

import { useTableContext } from '@/context/TableContext';
import TableHeader, {type TableHeaderProps} from '@/components/TableHeader/TableHeader';
import Placeholder from '@/components/PlaceHolder/PlaceHolder';
import { type Issue } from '@/types/issues';
import './SharedList.css';

type ListProps = {
    height: number,
    style?: object,
    itemSize?: number,
}

type IssuesListProps = {
    data?: Issue[];
    sectionClass?: string,
    containerRef?: RefObject<HTMLDivElement | null>;
    tableHeaderProps: TableHeaderProps,
    imgWidth?: string | number,
    ListProps: ListProps,
    tableCount: number,
    row: React.ComponentType<ListChildComponentProps>;
};

const ROW_HEIGHT = 45;

const SharedList = ({sectionClass, containerRef, tableHeaderProps, imgWidth = '', ListProps, row: Row, tableCount}: IssuesListProps) => {
  const listRef = React.useRef<List>(null);
  const { selectedIssueNumber } = useTableContext();

  React.useEffect(() => {
    if (selectedIssueNumber && listRef) {
      if (listRef.current) {
        listRef.current.scrollToItem(selectedIssueNumber, "center");
      }
    }
  }, [selectedIssueNumber, listRef]);

  return (
    <section className={sectionClass} role="region" aria-label="Accecabilty issues Table" ref={containerRef}>
      <TableHeader {...tableHeaderProps}/>
      {tableCount === 0 ? 
        <Placeholder type='empty' infoText='Nothing to see here' height="312" width={imgWidth}/> :
        <List
            ref={listRef}
            width="100%"
            itemSize={ROW_HEIGHT}
            outerElementType="div"
            innerElementType="div"
            itemCount={tableCount}
            {...ListProps}
          >
          {Row}
        </List>
      }
    </section>
  );
};

export default SharedList;