import React from 'react';

interface DataTableProps {
  headers: string[];
  children: React.ReactNode;
}

const DataTable: React.FC<DataTableProps> = ({ headers, children }) => {
  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {children}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;