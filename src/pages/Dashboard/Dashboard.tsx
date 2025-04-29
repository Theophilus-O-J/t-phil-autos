import React from 'react';
import MetricCard from '../../components/UI/MetricCard';
import LineChart from '../../components/Charts/LineChart';
import DataTable from '../../components/Tables/DataTable';
import { dashboardMetrics, salesTrendData, recentTransactions } from '../../utils/mockData';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6 fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div>
          <button className="btn btn-primary">Export Report</button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardMetrics.map((metric, index) => (
          <MetricCard
            key={index}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            icon={metric.icon}
          />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card">
          <h2 className="text-lg font-semibold mb-4">Sales & Purchases Trend</h2>
          <LineChart data={salesTrendData} height={280} />
        </div>
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">Vehicle Stock by Type</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">Sedan</span>
              <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
                <div className="bg-secondary h-2.5 rounded-full" style={{ width: '70%' }}></div>
              </div>
              <span className="text-sm font-medium">12</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">SUV</span>
              <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
                <div className="bg-secondary h-2.5 rounded-full" style={{ width: '60%' }}></div>
              </div>
              <span className="text-sm font-medium">10</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Truck</span>
              <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
                <div className="bg-secondary h-2.5 rounded-full" style={{ width: '35%' }}></div>
              </div>
              <span className="text-sm font-medium">6</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Hatchback</span>
              <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
                <div className="bg-secondary h-2.5 rounded-full" style={{ width: '25%' }}></div>
              </div>
              <span className="text-sm font-medium">4</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Luxury</span>
              <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
                <div className="bg-secondary h-2.5 rounded-full" style={{ width: '12%' }}></div>
              </div>
              <span className="text-sm font-medium">2</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Recent Transactions</h2>
          <button className="text-secondary hover:underline">View All</button>
        </div>
        <DataTable headers={['Customer', 'Vehicle', 'Date', 'Plate No']}>
          {recentTransactions.map((transaction) => (
            <tr key={transaction.id} className="hover:bg-gray-50">
              <td>{transaction.customer}</td>
              <td>{transaction.vehicle}</td>
              <td>{transaction.date}</td>
              <td>{transaction.plateNo}</td>
            </tr>
          ))}
        </DataTable>
      </div>
    </div>
  );
};

export default Dashboard;