import React from 'react';
import _ from 'lodash';

import { type Issue } from '@/types/issues';

type SearchProps = {
  data: Issue[];
  onSearchResult: (results: Issue[]) => void;
};

export const useDebouncedSearch = ({ data, onSearchResult}: SearchProps) => {
  const debouncedSearch = React.useRef(
    _.debounce((searchTerm: string, sreach_coloumn: string) => {
      const term = _.toLower(searchTerm.trim());

      const results = _.filter(data, item => {
        const value = _.toLower(_.get(item, sreach_coloumn, ''));
        return _.includes(value, term);
      })
      onSearchResult(results);
    }, 300)
  ).current;

  React.useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return debouncedSearch;
}
