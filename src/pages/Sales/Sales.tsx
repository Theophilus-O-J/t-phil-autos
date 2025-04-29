import React, { useState } from 'react';
import { Download, Plus, Search } from 'lucide-react';
import DataTable from '../../components/Tables/DataTable';
import { salesData } from '../../utils/mockData';

const Sales: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredData = salesData.filter(
    (sale) =>
      sale.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.tel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.engineNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="space-y-6 fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Sales Record</h1>
        <div className="flex space-x-3">
          <button className="btn btn-secondary flex items-center gap-2">
            <Download size={16} />
            Export
          </button>
          <button className="btn btn-primary flex items-center gap-2">
            <Plus size={16} />
            New Sale
          </button>
        </div>
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
              placeholder="Search sales..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <select className="input">
              <option>Last 30 days</option>
              <option>This month</option>
              <option>Last month</option>
              <option>This year</option>
            </select>
          </div>
        </div>

        <DataTable
          headers={[
            'Customer',
            'Tel',
            'Vehicle',
            'Engine No',
            'Chassis No',
            'Plate No',
            'Date',
            'Actions',
          ]}
        >
          {currentItems.map((sale) => (
            <tr key={sale.id} className="hover:bg-gray-50">
              <td className="font-medium">{sale.customer}</td>
              <td>{sale.tel}</td>
              <td>{sale.vehicle}</td>
              <td>{sale.engineNo}</td>
              <td>{sale.chassisNo}</td>
              <td>{sale.plateNo}</td>
              <td>{sale.date}</td>
              <td>
                <div className="flex space-x-2">
                  <button className="text-[var(--primary)] hover:underline">Edit</button>
                  <button className="text-gray-500 hover:underline">View</button>
                </div>
              </td>
            </tr>
          ))}
        </DataTable>

        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-gray-600">
              Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredData.length)} of{' '}
              {filteredData.length} results
            </p>
            <div className="flex space-x-1">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded border disabled:opacity-50"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-8 h-8 rounded ${
                    currentPage === i + 1
                      ? 'bg-[var(--primary)] text-white'
                      : 'border hover:bg-gray-50'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded border disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sales;