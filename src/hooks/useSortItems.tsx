import { useMemo } from 'react';
import _ from 'lodash';

import { type ColumnKey, type Issue } from '@/types/issues';

type SortDirection = boolean;

export const useSortItems = (
  issues: Issue[] | null | undefined,
  sortKey: ColumnKey,
  sortAsc: SortDirection
): Issue[] | null => {
  return useMemo(() => {
    if (!issues || _.isEmpty(issues)) {
      return null;
    }

    if (sortKey === 'rowIndex') {
      return sortAsc ? [...issues] : _.reverse([...issues]);
    }

    const sorted = [...issues].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      return String(aVal).localeCompare(String(bVal));
    });

    return sortAsc ? sorted : _.reverse(sorted);
  }, [issues, sortKey, sortAsc]);
}
