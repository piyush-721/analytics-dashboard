// components/TotalSummary.jsx
import React from 'react';
import { useDashboardData } from '../hooks/useDashboardData';

const TotalSummary = () => {
  const { data, loading, error } = useDashboardData();

  const getChangeColor = (change) => {
    if (change > 0) return 'text-green-500';
    if (change < 0) return 'text-red-500';
    return 'text-orange-500';
  };

  const formatChange = (change) => {
    if (change === 0) return '0%';
    return `${change > 0 ? '+' : ''}${change}%`;
  };

  if (loading) {
    return (
      <div className=" p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Total Summary</h2>
        <div className="grid grid-cols-7 gap-4">
          {[...Array(7)].map((_, index) => (
            <div 
              key={`skeleton-${index}`} 
              className="text-center animate-pulse bg-white"
              style={{
                width: '159px',
                height: '98px',
                borderRadius: '6.8px',
                boxShadow: '0px 4px 13.3px 0px rgba(0, 0, 0, 0.03)',
                opacity: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '12px'
              }}
            >
              <div className="h-3 bg-gray-200 rounded mb-2 w-full"></div>
              <div className="h-5 bg-gray-300 rounded mb-1 w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Total Summary</h2>
        <div className="text-center py-8">
          <div className="text-red-500 mb-2">Error loading data</div>
          <div className="text-gray-500 text-sm">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Total Summary</h2>
      
      <div className="grid grid-cols-7 gap-4">
        {data?.metrics.map((metric) => (
          <div 
            key={metric.id} 
            className="text-center bg-white"
            style={{
              width: '159px',
              height: '98px',
              borderRadius: '6.8px',
              boxShadow: '0px 4px 13.3px 0px rgba(0, 0, 0, 0.03)',
              opacity: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '12px'
            }}
          >
            <div className="text-xs text-gray-500 mb-2">{metric.label}</div>
            <div className="text-lg font-bold text-gray-900 mb-1">{metric.value}</div>
            <div className={`text-sm ${getChangeColor(metric.change)}`}>
              {formatChange(metric.change)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TotalSummary;
