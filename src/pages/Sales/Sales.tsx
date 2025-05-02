import React, { useState } from 'react';
import { Download, Plus, Search, Trash2 } from 'lucide-react';
import DataTable from '../../components/Tables/DataTable';
import { salesData } from '../../utils/mockData';
import { supabase } from '../../lib/supabase';

const Sales: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedSaleId, setSelectedSaleId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
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

  const handleDelete = async (mockId: string) => {
    try {
      // Find the sale in mock data to get unique identifiers
      const sale = salesData.find(s => s.id === Number(mockId));
      if (!sale) {
        throw new Error('Sale not found in mock data');
      }

      // Query Supabase to get the actual UUID using all available unique identifiers
      const { data, error } = await supabase
        .from('sales')
        .select('id')
        .eq('customer', sale.customer)
        .eq('engine_no', sale.engineNo)
        .eq('chassis_no', sale.chassisNo)
        .eq('plate_no', sale.plateNo)
        .eq('date', sale.date)
        .single();

      if (error) {
        if (error.message.includes('no rows')) {
          throw new Error('Sale record not found in database');
        }
        throw error;
      }

      if (!data?.id) {
        throw new Error('Invalid sale record data returned from database');
      }

      setSelectedSaleId(data.id);
      setDeleteError(null);
      setShowDeleteModal(true);
    } catch (error) {
      console.error('Error preparing delete:', error);
      setDeleteError(error instanceof Error ? error.message : 'Failed to prepare delete operation');
    }
  };

  const confirmDelete = async () => {
    if (!selectedSaleId) return;

    try {
      const { error } = await supabase
        .from('sales')
        .delete()
        .eq('id', selectedSaleId);

      if (error) {
        console.error('Supabase delete error:', error);
        setDeleteError(error.message);
        return;
      }

      setShowDeleteModal(false);
      setSelectedSaleId(null);
      setDeleteError(null);
      
      // Refresh data from Supabase here instead of manipulating mock data
    } catch (error) {
      console.error('Error deleting sale:', error);
      setDeleteError(error instanceof Error ? error.message : 'An unexpected error occurred');
    }
  };

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
                  <button 
                    className="text-[var(--primary)] hover:underline"
                    onClick={() => {/* Handle edit */}}
                  >
                    Edit
                  </button>
                  <button 
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(sale.id.toString())}
                  >
                    <Trash2 size={16} />
                  </button>
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

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this sale record? This action cannot be undone.</p>
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

export default Sales;
