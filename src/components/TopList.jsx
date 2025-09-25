// components/TopList.jsx
import React, { useState, useEffect } from 'react';
import { useTopListData } from '../hooks/useTopListData';

const TopList = () => {
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

  const backgroundColors = ['#FFCE85', '#FFDCC7', '#FFF1E7', '#F1FBFC', '#F4F8F9', '#E7EDED'];

// Update the getBackgroundColor function
const getBackgroundColor = (rowIndex, colIndex) => {
  // Conversions column is always transparent
  if (colIndex >= 2) return 'transparent';
  
  // Special case for Installs column (colIndex === 1): rows 1 and 2 should be transparent
  if (colIndex === 1 && (rowIndex === 1 || rowIndex === 2)) {
    return 'transparent';
  }
  
  // For Spend column and other Installs rows, use background colors
  const colorMap = [
    [0, 1], // row 0: Spend=color0, Installs=color1  
    [2, null], // row 1: Spend=color2, Installs=transparent
    [3, null], // row 2: Spend=color3, Installs=transparent  
    [4, 5]  // row 3: Spend=color4, Installs=color5
  ];
  
  const colorIndex = colorMap[rowIndex][colIndex];
  return colorIndex !== null ? backgroundColors[colorIndex % backgroundColors.length] : 'transparent';
};


  if (loading) {
    return (
      <div className="p-4 h-full">
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
      <div className="p-4 h-full">
        <div className="text-center py-8">
          <div className="text-red-500 mb-2">Error loading data</div>
          <div className="text-gray-500 text-sm">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 h-full flex flex-col">
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
            
          </div>
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider text-center" style={{ width: '117px' }}>
            <button 
              onClick={() => handleSort('spend')}
              className="flex items-center justify-center w-full hover:text-gray-700"
            >
              Spend {getSortIcon('spend')}
            </button>
          </div>
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider text-center" style={{ width: '117px' }}>
            <div className="flex items-center justify-center w-full">
              Installs {getSortIcon('installs')}
            </div>
          </div>
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider text-center" style={{ width: '117px' }}>
            <div className="flex items-center justify-center w-full">
              Conversions {getSortIcon('conversions')}
            </div>
          </div>
        </div>
      </div>

      {/* Table Rows */}
      <div className="flex-1">
        {sortedData.map((campaign, rowIndex) => (
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

              {/* Data Boxes - No gaps between them */}
              <div className="flex">
                {/* Spend Box */}
                <div 
                  className="text-center flex flex-col items-center justify-center"
                  style={{
                    width: '117px',
                    height: '59px',
                    backgroundColor: getBackgroundColor(rowIndex, 0),
                    opacity: 1
                  }}
                >
                  <div className="text-sm font-semibold text-gray-900">
                    ${campaign.spend.toLocaleString()}
                  </div>
                  <div className="text-xs text-orange-500">+27.42%</div>
                </div>

                {/* Installs Box */}
                <div 
                  className="text-center flex flex-col items-center justify-center"
                  style={{
                    width: '117px',
                    height: '59px',
                    backgroundColor: getBackgroundColor(rowIndex, 1),
                    opacity: 1
                  }}
                >
                  <div className="text-sm font-semibold text-gray-900">
                    ${campaign.installs}
                  </div>
                  <div className="text-xs text-orange-500">+27.42%</div>
                </div>

                {/* Conversions Box - No background color */}
                <div 
                  className="text-center flex flex-col items-center justify-center border border-gray-200"
                  style={{
                    width: '117px',
                    height: '59px',
                    backgroundColor: 'transparent',
                    opacity: 1
                  }}
                >
                  <div className="text-sm font-semibold text-gray-900">0.00%</div>
                  <div className="text-xs text-gray-500">0%</div>
                </div>
              </div>
            </div>
            
            {/* Horizontal Rule - only after first 3 rows */}
            {rowIndex < 3 && (
              <hr className="border-t border-gray-200 my-0" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopList;
