import React, { useLayoutEffect, useState, type CSSProperties } from 'react';
import { FixedSizeList as List } from 'react-window';

type RowRendererProps<T> = {
  item: T;
  index: number;
  style: CSSProperties;
};

type VirtualListProps<T> = {
  data: T[];
  offset?: number;
  minWidth?: number;
  rowHeight?: number;
  rowClassName?: string;
  tableClassName?: string;
  containerRef?: React.RefObject<HTMLDivElement | null>,
  renderRow: (props: {
    item: T;
    index: number;
    style: React.CSSProperties;
  }) => React.ReactNode;
  rowComponent?: React.FC<RowRendererProps<T>>;
};

const VirtualList = <T,>({
  data,
  renderRow,
  rowHeight = 45,
  offset = 45,
  minWidth = 738,
  rowClassName = '',
  tableClassName = '',
  containerRef,
}: VirtualListProps<T>) => {
  const [listHeight, setListHeight] = useState<number>(0);

  // Set list hight to be full box without the header
  useLayoutEffect(() => {
    const updateHeight = () => {
      if (containerRef && containerRef.current) {
        const height = containerRef.current.getBoundingClientRect().height;
        setListHeight(height - offset - Math.round(rowHeight/2)); // subtract your fixed header height and more to show there are more items in the list
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);

    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, [offset]);

  const DefaultRow = ({ index, style }: { index: number; style: CSSProperties }) => (
    <div style={style} className={rowClassName}>
      {JSON.stringify(data[index])}
    </div>
  );

  const RenderRow = ({ index, style }: { index: number; style: CSSProperties }) => {
    if (!data[index]) {
        return null;
    }

    const item = data[index];
    return renderRow ? renderRow({ item, index, style }) : <DefaultRow index={index} style={style} />;
  };

  return (
    <div className={tableClassName} style={{ minWidth }}>
      {listHeight > 0 && (
        <List
          height={listHeight}
          itemCount={data.length}
          itemSize={rowHeight}
          width="100%"
        >
          {RenderRow}
        </List>
      )}
    </div>
  );
};

export default VirtualList;