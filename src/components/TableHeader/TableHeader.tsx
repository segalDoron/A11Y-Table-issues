import React from 'react';
import {includes, type DebouncedFunc} from 'lodash';

import { COLUMN_NAMES, type ColumnKey } from '@/types/issues';
import './TableHeader.css';

export type TableHeaderProps = {
    sortKey?: string,
    sortAsc?: boolean,
    setSortAsc?: React.Dispatch<React.SetStateAction<boolean>>,
    setSortKey?: React.Dispatch<React.SetStateAction<ColumnKey>>,
    searchableColumns?: ColumnKey[],
    columns: ColumnKey[],
    searchFunction?: DebouncedFunc<(searchTerm: string, columnKey: string) => void>,
}

const TableHeader = ({
    sortKey,
    setSortAsc,
    sortAsc,
    setSortKey,
    searchableColumns,
    searchFunction,
    columns,
}: TableHeaderProps) => {

    const getHeaderCoulmnStyle = (key: ColumnKey) => {
        const activeSortStyle = sortKey === key ? 'active-sorted-cloumn' : '';
        const isRowIndex = 'rowIndex' === key ? 'index-cloumn' : ''
        return `${activeSortStyle} ${isRowIndex}`;
    }

    const handleSort = (key: ColumnKey) => {
        if (!setSortAsc || !setSortKey) {
            return;
        }

            if (key === sortKey) {
                setSortAsc(!sortAsc);
            } else {
                setSortKey(key);
                setSortAsc(true);
            }
      };

    return (
        <table className="header-root">
            <thead>
                <tr>
                    {columns.map((key: ColumnKey) => (
                        <th 
                            key={key}
                            scope="col"
                            className={getHeaderCoulmnStyle(key)}
                        >
                            <div className="th-content">
                                <span>
                                    <span title={COLUMN_NAMES[key]}>
                                        {COLUMN_NAMES[key]}
                                    </span>
                                    <button
                                        onClick={() => handleSort(key)}
                                        aria-label={`Sort by ${key}`}
                                        className="sort-icon"
                                    >
                                        {sortKey === key ? (sortAsc ? '▲' : '▼') : '↕'}
                                    </button>
                                </span>
                                    {searchableColumns && includes(searchableColumns, key) && (
                                        <input
                                            type="text"
                                            className="column-filter-input"
                                            placeholder={`Search ${COLUMN_NAMES[key]}`}
                                            aria-label={`Filter by ${COLUMN_NAMES[key]}`}
                                            onChange={(e) => {
                                                if (searchFunction) {
                                                    searchFunction(e.target.value, key)
                                                }
                                            }}
                                        />
                                )}
                            </div>
                        </th>
                    ))}
                </tr>
            </thead>
        </table>
    )
}

export default TableHeader