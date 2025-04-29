import React, { useState } from 'react';
import { Grid, List, Plus, Search, Filter } from 'lucide-react';
import StatusBadge from '../../components/UI/StatusBadge';
import { inventoryData } from '../../utils/mockData';

const Inventory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredData = inventoryData.filter(
    (item) =>
      (statusFilter === 'all' || item.status.toLowerCase() === statusFilter.toLowerCase()) &&
      (item.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.year.toString().includes(searchTerm) ||
        item.price.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6 fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Inventory Management</h1>
        <button className="btn btn-primary flex items-center gap-2">
          <Plus size={16} />
          Add Vehicle
        </button>
      </div>

      <div className="card">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <div className="relative w-full md:w-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="input pl-10 w-full md:w-80"
              placeholder="Search inventory..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex w-full md:w-auto justify-between md:justify-end gap-2">
            <div className="flex gap-2">
              <button
                className={`btn px-3 ${
                  viewMode === 'grid'
                    ? 'bg-secondary text-white'
                    : 'bg-white border border-gray-300 text-gray-700'
                }`}
                onClick={() => setViewMode('grid')}
              >
                <Grid size={18} />
              </button>
              <button
                className={`btn px-3 ${
                  viewMode === 'list'
                    ? 'bg-secondary text-white'
                    : 'bg-white border border-gray-300 text-gray-700'
                }`}
                onClick={() => setViewMode('list')}
              >
                <List size={18} />
              </button>
            </div>
            <div className="flex gap-2">
              <button className="btn flex items-center gap-2 border border-gray-300 bg-white text-gray-700">
                <Filter size={16} />
                More Filters
              </button>
              <select
                className="input"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="available">Available</option>
                <option value="sold">Sold</option>
              </select>
            </div>
          </div>
        </div>

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredData.map((vehicle) => (
              <div
                key={vehicle.id}
                className="card overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={vehicle.imageUrl}
                    alt={vehicle.model}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold">{vehicle.model}</h3>
                    <StatusBadge status={vehicle.status} />
                  </div>
                  <div className="mt-2 space-y-2">
                    <p className="text-lg font-bold text-primary">{vehicle.price}</p>
                    <div className="flex gap-4 text-sm text-gray-600">
                      <span>Year: {vehicle.year}</span>
                      <span>Color: {vehicle.color}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between">
                    <button className="text-secondary hover:underline">View Details</button>
                    <button className="text-gray-500 hover:underline">Edit</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Model</th>
                  <th>Year</th>
                  <th>Color</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((vehicle) => (
                  <tr key={vehicle.id} className="hover:bg-gray-50">
                    <td className="w-24">
                      <img
                        src={vehicle.imageUrl}
                        alt={vehicle.model}
                        className="w-20 h-12 object-cover rounded"
                      />
                    </td>
                    <td className="font-medium">{vehicle.model}</td>
                    <td>{vehicle.year}</td>
                    <td>{vehicle.color}</td>
                    <td className="font-semibold">{vehicle.price}</td>
                    <td>
                      <StatusBadge status={vehicle.status} />
                    </td>
                    <td>
                      <div className="flex space-x-2">
                        <button className="text-secondary hover:underline">View</button>
                        <button className="text-gray-500 hover:underline">Edit</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {filteredData.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No vehicles found matching your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inventory;