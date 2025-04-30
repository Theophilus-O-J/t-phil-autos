import React, { useState } from 'react';
import { salesData, purchaseData, dashboardMetrics, calculateMetrics } from '../../utils/mockData';

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sales' | 'purchases'>('sales');
  const [formData, setFormData] = useState({
    customer: '',
    name: '',
    tel: '',
    vehicle: '',
    engineNo: '',
    chassisNo: '',
    plateNo: '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSaleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newSale = {
      id: salesData.length + 1,
      customer: formData.customer,
      tel: formData.tel,
      vehicle: formData.vehicle,
      engineNo: formData.engineNo,
      chassisNo: formData.chassisNo,
      plateNo: formData.plateNo,
      date: formData.date
    };
    salesData.unshift(newSale);
    // Force dashboard metrics recalculation
    dashboardMetrics.splice(0, dashboardMetrics.length, ...calculateMetrics());
    setFormData({
      customer: '',
      name: '',
      tel: '',
      vehicle: '',
      engineNo: '',
      chassisNo: '',
      plateNo: '',
      date: new Date().toISOString().split('T')[0]
    });
  };

  const handlePurchaseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPurchase = {
      id: purchaseData.length + 1,
      name: formData.name,
      tel: formData.tel,
      carName: formData.vehicle,
      engineNo: formData.engineNo,
      chassisNo: formData.chassisNo,
      plateNo: formData.plateNo,
      date: formData.date
    };
    purchaseData.unshift(newPurchase);
    // Force dashboard metrics recalculation
    dashboardMetrics.splice(0, dashboardMetrics.length, ...calculateMetrics());
    setFormData({
      customer: '',
      name: '',
      tel: '',
      vehicle: '',
      engineNo: '',
      chassisNo: '',
      plateNo: '',
      date: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <div className="space-y-6 fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
      </div>

      <div className="card">
        <div className="border-b mb-4">
          <div className="flex space-x-4">
            <button
              className={`px-4 py-2 font-medium ${
                activeTab === 'sales'
                  ? 'text-[var(--primary)] border-b-2 border-[var(--primary)]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('sales')}
            >
              Sales Update
            </button>
            <button
              className={`px-4 py-2 font-medium ${
                activeTab === 'purchases'
                  ? 'text-[var(--primary)] border-b-2 border-[var(--primary)]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('purchases')}
            >
              Purchase Update
            </button>
          </div>
        </div>

        {activeTab === 'sales' && (
          <div className="space-y-4">
            <form onSubmit={handleSaleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    name="customer"
                    value={formData.customer}
                    onChange={handleInputChange}
                    className="input w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tel
                  </label>
                  <input
                    type="tel"
                    name="tel"
                    value={formData.tel}
                    onChange={handleInputChange}
                    className="input w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vehicle
                  </label>
                  <input
                    type="text"
                    name="vehicle"
                    value={formData.vehicle}
                    onChange={handleInputChange}
                    className="input w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Engine No
                  </label>
                  <input
                    type="text"
                    name="engineNo"
                    value={formData.engineNo}
                    onChange={handleInputChange}
                    className="input w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Chassis No
                  </label>
                  <input
                    type="text"
                    name="chassisNo"
                    value={formData.chassisNo}
                    onChange={handleInputChange}
                    className="input w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Plate No
                  </label>
                  <input
                    type="text"
                    name="plateNo"
                    value={formData.plateNo}
                    onChange={handleInputChange}
                    className="input w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="input w-full"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button type="submit" className="btn btn-primary">
                  Save Sale
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'purchases' && (
          <div className="space-y-4">
            <form onSubmit={handlePurchaseSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="input w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tel
                  </label>
                  <input
                    type="tel"
                    name="tel"
                    value={formData.tel}
                    onChange={handleInputChange}
                    className="input w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vehicle
                  </label>
                  <input
                    type="text"
                    name="vehicle"
                    value={formData.vehicle}
                    onChange={handleInputChange}
                    className="input w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Engine No
                  </label>
                  <input
                    type="text"
                    name="engineNo"
                    value={formData.engineNo}
                    onChange={handleInputChange}
                    className="input w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Chassis No
                  </label>
                  <input
                    type="text"
                    name="chassisNo"
                    value={formData.chassisNo}
                    onChange={handleInputChange}
                    className="input w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Plate No
                  </label>
                  <input
                    type="text"
                    name="plateNo"
                    value={formData.plateNo}
                    onChange={handleInputChange}
                    className="input w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="input w-full"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button type="submit" className="btn btn-primary">
                  Save Purchase
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
