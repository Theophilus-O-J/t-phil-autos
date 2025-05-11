import React, { useState } from 'react';
import { Plus, Search, Filter, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../components/Tables/DataTable';
import { purchaseData } from '../../utils/mockData';
import { supabase } from '../../lib/supabase';

const Purchases: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: string } | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPurchaseId, setSelectedPurchaseId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const sortedData = React.useMemo(() => {
    let sortableItems = [...purchaseData];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
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

  const handleDelete = (id: string) => {
    try {
      setSelectedPurchaseId(id);
      setDeleteError(null);
      setShowDeleteModal(true);
    } catch (error) {
      console.error('Error preparing delete:', error);
      setDeleteError(error instanceof Error ? error.message : 'Failed to prepare delete operation');
    }
  };

  const confirmDelete = async () => {
    if (!selectedPurchaseId) return;

    try {
      const { error } = await supabase
        .from('purchases')
        .delete()
        .eq('id', selectedPurchaseId);

      if (error) {
        console.error('Supabase delete error:', error);
        setDeleteError(error.message);
        return;
      }

      setShowDeleteModal(false);
      setSelectedPurchaseId(null);
      setDeleteError(null);
    } catch (error) {
      console.error('Error deleting purchase:', error);
      setDeleteError(error instanceof Error ? error.message : 'An unexpected error occurred');
    }
  };

  return (
    <div className="space-y-6 fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Purchase Tracking</h1>
        <button 
          className="btn btn-primary flex items-center gap-2"
          onClick={() => navigate('/admin/purchases')}
        >
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
                      <button 
                        className="text-[var(--primary)] hover:underline"
                        onClick={() => {/* Handle edit */}}
                      >
                        Edit
                      </button>
                      <button 
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(purchase.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this purchase record? This action cannot be undone.</p>
            {deleteError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-600">
                {deleteError}
              </div>
            )}
            <div className="flex justify-end space-x-3">
              <button
                className="btn border border-gray-300 hover:bg-gray-50"
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteError(null);
                }}
              >
                Cancel
              </button>
              <button
                className="btn bg-red-500 text-white hover:bg-red-600"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Purchases;
