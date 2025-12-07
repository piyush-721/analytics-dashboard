// components/BiggestChanges.jsx
import React, { useState, useEffect } from 'react';
import { useTopListData } from '../hooks/useTopListData';
import { useDashboardData } from '../hooks/useDashboardData';

const BiggestChanges = () => {
  // const { data, loading, error } = useTopListData();
  const { topList: data, loading, error } = useDashboardData();
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      let sorted = [...data];
      if (sortConfig.key) {
        sorted.sort((a, b) => {
          if (sortConfig.direction === 'asc') {
            return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
          }
          return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
        });
      }
      setSortedData(sorted.slice(0, 4));
    }
  }, [data, sortConfig]);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (columnKey) => {
    if (sortConfig.key === columnKey) {
      return sortConfig.direction === 'asc' ? '↑' : '↓';
    }
    return '↕';
  };

  const getBarConfig = (rowIndex) => {
    switch(rowIndex) {
      case 0: return { direction: 'right', color: '#FF6200', width: 80 };
      case 1: return { direction: 'right', color: '#FF6200', width: 60 };
      case 2: return { direction: 'left', color: '#F7CE02', width: 50 };
      case 3: return { direction: 'left', color: '#F7CE02', width: 20 };
      default: return { direction: 'right', color: '#FF6200', width: 40 };
    }
  };

  if (loading) {
    return (
      <div className="p-2 sm:p-3 lg:p-4 h-full">
        <div className="mb-4 sm:mb-6">
          <div className="flex space-x-4 sm:space-x-6 border-b overflow-x-auto">
            {['Campaigns', 'Ad Groups', 'Keywords', 'Ads'].map((tab, index) => (
              <div key={tab} className={`pb-2 text-xs sm:text-sm font-medium whitespace-nowrap ${index === 0 ? 'border-b-2 border-orange-500 text-gray-900' : 'text-gray-500'}`}>
                {tab}
              </div>
            ))}
          </div>
        </div>
        <div className="animate-pulse">
          {[...Array(4)].map((_, index) => (
            <div key={`skeleton-${index}`} className="h-12 sm:h-16 bg-gray-200 rounded mb-4"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-2 sm:p-3 lg:p-4 h-full">
        <div className="text-center py-8">
          <div className="text-red-500 mb-2 text-sm">Error loading data</div>
          <div className="text-gray-500 text-xs">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-2 sm:p-3 lg:p-4 h-full flex flex-col">
      {/* Tabs - Responsive */}
      <div className="mb-4 sm:mb-6 pt-2 sm:pt-4">
        <div className="flex space-x-4 sm:space-x-6 lg:space-x-8 border-b overflow-x-auto scrollbar-hide">
          {['Campaigns', 'Ad Groups', 'Keywords', 'Ads'].map((tab, index) => (
            <button
              key={tab}
              className={`pb-2 text-xs sm:text-sm font-medium whitespace-nowrap ${
                index === 0 
                  ? 'border-b-2 border-orange-500 text-gray-900' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Card View (sm and below) */}
      <div className="block sm:hidden flex-1 space-y-3">
        {sortedData.map((campaign, rowIndex) => {
          const barConfig = getBarConfig(rowIndex);
          return (
            <div key={campaign.id} className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-green-500 flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">{campaign.campaign}</div>
                  <div className="text-xs text-gray-500">India</div>
                </div>
              </div>
              
              {/* Mobile Bar Visualization */}
              <div className="mb-3">
                <div className="text-xs text-gray-500 mb-2">Spend Change</div>
                <div className="relative h-6 bg-gray-100 rounded">
                  <div 
                    className="absolute top-0 h-6 rounded"
                    style={{
                      backgroundColor: barConfig.color,
                      width: `${Math.min(barConfig.width, 100)}%`,
                      [barConfig.direction === 'left' ? 'right' : 'left']: '50%',
                      transform: barConfig.direction === 'left' ? 'translateX(50%)' : 'translateX(-50%)'
                    }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-medium text-gray-900">
                      ${campaign.spend.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="text-xs text-orange-500 mt-1 text-center">+27.42%</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop Table View (sm and above) */}
      <div className="hidden sm:block flex-1">
        {/* Table Headers */}
        <div className="mb-3">
          <div className="flex">
            <div className="flex-1 text-xs font-medium text-gray-500 uppercase tracking-wider">
              <button 
                onClick={() => handleSort('spend')}
                className="flex items-center hover:text-gray-700"
              >
                Spend {getSortIcon('spend')}
              </button>
            </div>
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider text-center w-20 sm:w-24 lg:w-[117px]"></div>
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider text-center w-20 sm:w-24 lg:w-[117px]"></div>
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider text-center w-20 sm:w-24 lg:w-[117px]"></div>
          </div>
        </div>

        {/* Table Rows */}
        <div className="space-y-0">
          {sortedData.map((campaign, rowIndex) => {
            const barConfig = getBarConfig(rowIndex);
            
            return (
              <div key={campaign.id}>
                <div className="flex items-center">
                  {/* Campaign Name with Green Dot */}
                  <div className="flex-1 flex items-center space-x-2 sm:space-x-3 pr-2 sm:pr-4 min-w-0">
                    <div className="w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-green-500 flex-shrink-0"></div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs sm:text-sm font-medium text-gray-900 truncate">{campaign.campaign}</div>
                      <div className="text-xs text-gray-500">India</div>
                    </div>
                  </div>

                  {/* Data Boxes */}
                  <div className="flex">
                    {/* Column 1 - Yellow bars extending left */}
                    <div 
                      className="text-center flex flex-col items-center justify-center border-l border-gray-200 relative"
                      style={{
                        width: '80px',
                        height: '48px',
                        '@media (min-width: 640px)': { width: '96px', height: '52px' },
                        '@media (min-width: 1024px)': { width: '117px', height: '59px' }
                      }}
                    >
                      {barConfig.direction === 'left' && (
                        <div 
                          className="h-4 sm:h-5 lg:h-6 rounded absolute"
                          style={{
                            backgroundColor: barConfig.color,
                            width: `${Math.min(barConfig.width, 90)}%`,
                            right: '0',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            maxWidth: '70px'
                          }}
                        ></div>
                      )}
                    </div>

                    {/* Column 2 - Orange bars extending right */}
                    <div 
                      className="flex items-center border-l border-gray-200 relative"
                      style={{
                        width: '80px',
                        height: '48px',
                        '@media (min-width: 640px)': { width: '96px', height: '52px' },
                        '@media (min-width: 1024px)': { width: '117px', height: '59px' }
                      }}
                    >
                      {barConfig.direction === 'right' && (
                        <div 
                          className="h-4 sm:h-5 lg:h-6 rounded absolute"
                          style={{
                            backgroundColor: barConfig.color,
                            width: `${Math.min(barConfig.width, 90)}%`,
                            left: '0',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            maxWidth: '70px'
                          }}
                        ></div>
                      )}
                    </div>

                    {/* Column 3 - Spend Values */}
                    <div 
                      className="text-center flex flex-col items-center justify-center border-l border-gray-200"
                      style={{
                        width: '80px',
                        height: '48px',
                        '@media (min-width: 640px)': { width: '96px', height: '52px' },
                        '@media (min-width: 1024px)': { width: '117px', height: '59px' }
                      }}
                    >
                      <div className="text-xs sm:text-sm font-semibold text-gray-900">
                        ${campaign.spend.toLocaleString()}
                      </div>
                      <div className="text-xs text-orange-500">+27.42%</div>
                    </div>
                  </div>
                </div>
                
                {/* Horizontal Rule */}
                {rowIndex < 3 && (
                  <hr className="border-t border-gray-200 my-0" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BiggestChanges;
