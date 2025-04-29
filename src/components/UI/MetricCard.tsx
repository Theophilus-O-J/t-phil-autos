import React from 'react';
import { BarChart2, DollarSign, TrendingDown, TrendingUp, Truck } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  icon: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, icon }) => {
  const isPositive = change.includes('+');
  
  const renderIcon = () => {
    switch (icon) {
      case 'barChart2':
        return <BarChart2 className="w-6 h-6 text-secondary" />;
      case 'truck':
        return <Truck className="w-6 h-6 text-secondary" />;
      case 'trendingUp':
        return <TrendingUp className="w-6 h-6 text-secondary" />;
      case 'dollarSign':
        return <DollarSign className="w-6 h-6 text-secondary" />;
      default:
        return <BarChart2 className="w-6 h-6 text-secondary" />;
    }
  };

  return (
    <div className="card transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
        </div>
        <div className="p-2 rounded-lg bg-secondary bg-opacity-10">
          {renderIcon()}
        </div>
      </div>
      <div className="mt-4 flex items-center">
        {isPositive ? (
          <TrendingUp className="w-4 h-4 text-success mr-1" />
        ) : (
          <TrendingDown className="w-4 h-4 text-error mr-1" />
        )}
        <span className={`text-sm font-medium ${isPositive ? 'text-success' : 'text-error'}`}>
          {change}
        </span>
        <span className="text-sm text-gray-500 ml-1">vs previous month</span>
      </div>
    </div>
  );
};

export default MetricCard;