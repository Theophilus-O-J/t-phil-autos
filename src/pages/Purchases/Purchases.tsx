import React, { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import DataTable from '../../components/Tables/DataTable';
import { purchaseData } from '../../utils/mockData';

const Purchases: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: string } | null>(null);

  const sortedData = React.useMemo(() => {
    let sortableItems = [...purchaseData];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        // @ts-ignore: dynamic key access
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        // @ts-ignore: dynamic key access
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [purchaseData, sortConfig]);

  const filteredData = sortedData.filter(
    (purchase) =>
      purchase.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      purchase.carName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      purchase.plateNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const requestSort = (key: string) => {
    let direction = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortDirection = (key: string) => {
    if (!sortConfig || sortConfig.key !== key) {
      return 'none';
    }
    return sortConfig.direction === 'ascending' ? 'asc' : 'desc';
  };

  return (
    <div className="space-y-6 fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Purchase Tracking</h1>
        <button className="btn btn-primary flex items-center gap-2">
          <Plus size={16} />
          New Purchase
        </button>
      </div>

      <div className="card">
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <div className="relative w-full md:w-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="input pl-10 w-full md:w-80"
              placeholder="Search purchases..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <button className="btn flex items-center gap-2 border border-gray-300 bg-white text-gray-700">
              <Filter size={16} />
              Filters
            </button>
            <select className="input">
              <option>All Records</option>
              <option>This month</option>
              <option>Last month</option>
              <option>This year</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th className="cursor-pointer" onClick={() => requestSort('name')}>
                  Name
                  {getSortDirection('name') !== 'none' && (
                    <span className="ml-1">
                      {getSortDirection('name') === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </th>
                <th className="cursor-pointer" onClick={() => requestSort('tel')}>
                  Tel
                  {getSortDirection('tel') !== 'none' && (
                    <span className="ml-1">
                      {getSortDirection('tel') === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </th>
                <th className="cursor-pointer" onClick={() => requestSort('carName')}>
                  Car Name
                  {getSortDirection('carName') !== 'none' && (
                    <span className="ml-1">
                      {getSortDirection('carName') === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </th>
                <th className="cursor-pointer" onClick={() => requestSort('engineNo')}>
                  Engine No
                  {getSortDirection('engineNo') !== 'none' && (
                    <span className="ml-1">
                      {getSortDirection('engineNo') === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </th>
                <th className="cursor-pointer" onClick={() => requestSort('chassisNo')}>
                  Chassis No
                  {getSortDirection('chassisNo') !== 'none' && (
                    <span className="ml-1">
                      {getSortDirection('chassisNo') === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </th>
                <th className="cursor-pointer" onClick={() => requestSort('plateNo')}>
                  Plate No
                  {getSortDirection('plateNo') !== 'none' && (
                    <span className="ml-1">
                      {getSortDirection('plateNo') === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </th>
                <th className="cursor-pointer" onClick={() => requestSort('date')}>
                  Date
                  {getSortDirection('date') !== 'none' && (
                    <span className="ml-1">
                      {getSortDirection('date') === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((purchase) => (
                <tr key={purchase.id} className="hover:bg-gray-50">
                  <td>{purchase.name}</td>
                  <td>{purchase.tel}</td>
                  <td>{purchase.carName}</td>
                  <td>
                    <span className="font-mono text-xs">{purchase.engineNo}</span>
                  </td>
                  <td>
                    <span className="font-mono text-xs">{purchase.chassisNo}</span>
                  </td>
                  <td>{purchase.plateNo}</td>
                  <td>{purchase.date}</td>
                  <td>
                    <div className="flex space-x-2">
                      <button className="text-secondary hover:underline">Edit</button>
                      <button className="text-gray-500 hover:underline">View</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Purchases;