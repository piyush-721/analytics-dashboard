// components/BiggestChanges.jsx
import React, { useState, useEffect } from 'react';
import { useTopListData } from '../hooks/useTopListData';

const BiggestChanges = () => {
  const { data, loading, error } = useTopListData();
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [sortedData, setSortedData] = useState([]);

  // Update sorted data when data or sorting changes
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

  // Bar configuration for each row
  const getBarConfig = (rowIndex) => {
    switch(rowIndex) {
      case 0: // Discovery - Orange right, long
        return { direction: 'right', color: '#FF6200', width: 80 };
      case 1: // Competitor - Orange right, medium  
        return { direction: 'right', color: '#FF6200', width: 60 };
      case 2: // Today tab - Yellow left, medium
        return { direction: 'left', color: '#F7CE02', width: 50 };
      case 3: // Branding - Yellow left, short
        return { direction: 'left', color: '#F7CE02', width: 20 };
      default:
        return { direction: 'right', color: '#FF6200', width: 40 };
    }
  };

  if (loading) {
    return (
      <div className="p-1 h-full">
        <div className="mb-6">
          <div className="flex space-x-6 border-b">
            {['Campaigns', 'Ad Groups', 'Keywords', 'Ads'].map((tab, index) => (
              <div key={tab} className={`pb-2 text-sm font-medium ${index === 0 ? 'border-b-2 border-orange-500 text-gray-900' : 'text-gray-500'}`}>
                {tab}
              </div>
            ))}
          </div>
        </div>
        <div className="animate-pulse">
          {[...Array(4)].map((_, index) => (
            <div key={`skeleton-${index}`} className="h-16 bg-gray-200 rounded mb-4"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-1 h-full">
        <div className="text-center py-8">
          <div className="text-red-500 mb-2">Error loading data</div>
          <div className="text-gray-500 text-sm">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-1 h-full flex flex-col">
      {/* Tabs */}
      <div className="mb-6 pt-4">
        <div className="flex space-x-8 border-b">
          {['Campaigns', 'Ad Groups', 'Keywords', 'Ads'].map((tab, index) => (
            <button
              key={tab}
              className={`pb-2 text-sm font-medium ${
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
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider text-center" style={{ width: '117px' }}>
            {/* Empty Column 1 */}
          </div>
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider text-center" style={{ width: '117px' }}>
            {/* Empty Column 2 */}
          </div>
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider text-center" style={{ width: '117px' }}>
            {/* Empty Column 3 */}
          </div>
        </div>
      </div>

      {/* Table Rows */}
      <div className="flex-1">
        {sortedData.map((campaign, rowIndex) => {
          const barConfig = getBarConfig(rowIndex);
          
          return (
            <div key={campaign.id}>
              <div className="flex items-center">
                {/* Campaign Name with Green Dot */}
                <div className="flex-1 flex items-center space-x-3 pr-4">
                  <div 
                    className="flex-shrink-0"
                    style={{
                      width: '13px',
                      height: '13px',
                      borderRadius: '50px',
                      backgroundColor: '#46A756',
                      opacity: 1
                    }}
                  ></div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">{campaign.campaign}</div>
                    <div className="text-xs text-gray-500">India</div>
                  </div>
                </div>

                {/* Data Boxes */}
                <div className="flex">
                  {/* Column 1 - Contains yellow bars extending left from 2nd vertical line */}
                  <div 
                    className="text-center flex flex-col items-center justify-center border-l border-gray-200 relative"
                    style={{
                      width: '117px',
                      height: '59px',
                      backgroundColor: 'transparent',
                      opacity: 1
                    }}
                  >
                    {barConfig.direction === 'left' && (
                      <div 
                        className="h-6 rounded absolute"
                        style={{
                          backgroundColor: barConfig.color,
                          width: `${barConfig.width}%`,
                          maxWidth: '100px',
                          right: '0',  // Attached to 2nd vertical line, extends left
                          top: '50%',
                          transform: 'translateY(-50%)'
                        }}
                      ></div>
                    )}
                  </div>

                  {/* Column 2 - Contains orange bars extending right from 2nd vertical line */}
                  <div 
                    className="flex items-center border-l border-gray-200 relative"
                    style={{
                      width: '117px',
                      height: '59px',
                      backgroundColor: 'transparent',
                      opacity: 1
                    }}
                  >
                    {barConfig.direction === 'right' && (
                      <div 
                        className="h-6 rounded absolute"
                        style={{
                          backgroundColor: barConfig.color,
                          width: `${barConfig.width}%`,
                          maxWidth: '100px',
                          left: '0',   // Attached to 2nd vertical line, extends right
                          top: '50%',
                          transform: 'translateY(-50%)'
                        }}
                      ></div>
                    )}
                  </div>

                  {/* Column 3 - Spend Values */}
                  <div 
                    className="text-center flex flex-col items-center justify-center border-l border-gray-200"
                    style={{
                      width: '117px',
                      height: '59px',
                      backgroundColor: 'transparent',
                      opacity: 1
                    }}
                  >
                    <div className="text-sm font-semibold text-gray-900">
                      ${campaign.spend.toLocaleString()}
                    </div>
                    <div className="text-xs text-orange-500">+27.42%</div>
                  </div>
                </div>
              </div>
              
              {/* Horizontal Rule - only after first 3 rows */}
              {rowIndex < 3 && (
                <hr className="border-t border-gray-200 my-0" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BiggestChanges;
