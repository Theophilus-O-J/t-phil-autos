import React from 'react';

interface StatusBadgeProps {
  status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusClass = () => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'status-badge status-completed';
      case 'processing':
        return 'status-badge status-processing';
      case 'pending':
        return 'status-badge status-pending';
      case 'available':
        return 'status-badge status-available';
      case 'sold':
        return 'status-badge status-sold';
      default:
        return 'status-badge bg-gray-100 text-gray-800';
    }
  };

  return <span className={getStatusClass()}>{status}</span>;
};

export default StatusBadge;