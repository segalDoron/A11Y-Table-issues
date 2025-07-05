import React, { useState, useMemo, useCallback } from "react";

// Sample data for demonstration
const sampleColumns = [
  { id: "name", label: "Name", sortable: true, width: "30%" },
  { id: "email", label: "Email Address", sortable: true, width: "40%" },
  { id: "role", label: "Role", sortable: true, width: "30%" },
];

const sampleData = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "zlice.johnson@example.com",
    role: "Software Engineer",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "aob.smith@example.com",
    role: "Project Manager with a very long title that should truncate",
  },
  {
    id: 3,
    name: "Catherine Zeta-Jones",
    email:
      "catherine.zeta.jones.with.a.very.long.email.address@example.com",
    role: "Product Owner",
  },
];

// Utility for comparing strings/numbers
const compare = (a: number, b: number, ascending = true) => {
  if (typeof a === "number" && typeof b === "number") {
    return ascending ? a - b : b - a;
  }
  // Convert to strings to compare (case insensitive)
  const strA = String(a).toLowerCase();
  const strB = String(b).toLowerCase();

  if (strA < strB) return ascending ? -1 : 1;
  if (strA > strB) return ascending ? 1 : -1;
  return 0;
};

const SortableTable = ({ columns, data }: {columns: Array<any> ,data: any}) => {
  const [sortConfig, setSortConfig] = useState({
    key: null,
    ascending: true,
  });

  // Sort the data memoized to prevent unnecessary recalculations
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;

    const {key} = sortConfig;

    const sorted = [...data].sort((a, b) =>
      compare(a[key], b[key], sortConfig.ascending)
    );

    return sorted;
  }, [data, sortConfig]);

  const toggleSort = useCallback(
    (key: any) => {
      setSortConfig((prev) => {
        if (prev.key === key) {
          // toggle ascending/descending
          return { key, ascending: !prev.ascending };
        } else {
          return { key, ascending: true };
        }
      });
    },
    [setSortConfig]
  );

  return (
    <>
      <style>{`
        /* Container for responsive scroll */
        .table-wrapper {
          overflow-x: auto;
          max-width: 100%;
        }
        table {
          border-collapse: collapse;
          width: 100%;
          min-width: 400px; /* Ensure some minimum width on small screens */
        }
        th, td {
          padding: 0.75rem 1rem;
          border-bottom: 1px solid #ccc;
          text-align: left;
          vertical-align: middle;
          white-space: nowrap;
        }
        th {
          position: relative;
          user-select: none;
          background-color: #f9f9f9;
        }
        /* Sort buttons style */
        button.sort-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          margin-left: 0.5rem;
          font-size: 1rem;
          line-height: 1;
          color: #333;
          display: inline-flex;
          align-items: center;
        }
        button.sort-btn:focus {
          outline: 2px solid #007acc;
          outline-offset: 2px;
        }
        /* Sort arrows */
        button.sort-btn .arrow {
          border: solid currentColor;
          border-width: 0 2px 2px 0;
          display: inline-block;
          padding: 3px;
          margin-left: 2px;
        }
        button.sort-btn.asc .arrow {
          transform: rotate(-135deg);
        }
        button.sort-btn.desc .arrow {
          transform: rotate(45deg);
        }

        /* Truncate cell content */
        td .truncate {
          display: block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 100%;
        }

        /* Tooltip styles */
        .tooltip {
          position: relative;
          display: inline-block;
        }
        .tooltip .tooltip-text {
          visibility: hidden;
          background-color: #333;
          color: #fff;
          text-align: center;
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          position: absolute;
          z-index: 1;
          bottom: 125%; /* Position above */
          left: 50%;
          transform: translateX(-50%);
          opacity: 0;
          transition: opacity 0.3s;
          white-space: nowrap;
        }
        .tooltip:hover .tooltip-text,
        .tooltip:focus-within .tooltip-text {
          visibility: visible;
          opacity: 1;
        }

        /* Responsive styles for tablet */
        @media (max-width: 768px) {
          table {
            font-size: 0.9rem;
          }
          th, td {
            padding: 0.5rem 0.75rem;
          }
        }
      `}</style>

      <div className="table-wrapper" role="region" aria-label="Sortable Data Table">
        <table>
          <thead>
            <tr>
              {columns.map(({ id, label, sortable, width }) => {
                const isSorted = sortConfig.key === id;
                const ariaSort = isSorted
                  ? sortConfig.ascending
                    ? "ascending"
                    : "descending"
                  : "none";

                return (
                  <th key={id} style={{ width }} scope="col" aria-sort={ariaSort}>
                    <span>{label}</span>
                    {sortable && (
                      <button
                        type="button"
                        onClick={() => toggleSort(id)}
                        className={`sort-btn ${isSorted ? (sortConfig.ascending ? "asc" : "desc") : ""}`}
                        aria-label={
                          isSorted
                            ? `Sort by ${label} ${sortConfig.ascending ? "descending" : "ascending"}`
                            : `Sort by ${label} ascending`
                        }
                      >
                        <span className="arrow" aria-hidden="true"></span>
                      </button>
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row) => (
              <tr key={row.id}>
                {columns.map(({ id, label }) => {
                  // Tooltip ID for accessibility
                  const tooltipId = `tooltip-${row.id}-${id}`;
                  const content = row[id];
                  const isTruncated =
                    String(content).length > 25; // heuristic for truncation

                  return (
                    <td key={id} tabIndex="0" aria-describedby={isTruncated ? tooltipId : undefined}>
                      <div className="tooltip" title={content}>
                        <span className="truncate">{content}</span>
                        {isTruncated && (
                          <span role="tooltip" id={tooltipId} className="tooltip-text">
                            {content}
                          </span>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

const Table = () => {
  return (
    <div style={{ margin: "1rem" }}>
      <h1>Sortable Responsive Table</h1>
      <SortableTable columns={sampleColumns} data={sampleData} />
    </div>
  );
}

export default Table;