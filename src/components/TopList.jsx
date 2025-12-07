// components/TopList.jsx
import React, { useState, useEffect } from 'react';
import { useTopListData } from '../hooks/useTopListData';
import { useDashboardData } from '../hooks/useDashboardData';

const TopList = () => {
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

  const backgroundColors = ['#FFCE85', '#FFDCC7', '#FFF1E7', '#F1FBFC', '#F4F8F9', '#E7EDED'];

  const getBackgroundColor = (rowIndex, colIndex) => {
    if (colIndex >= 2) return 'transparent';
    if (colIndex === 1 && (rowIndex === 1 || rowIndex === 2)) {
      return 'transparent';
    }
    const colorMap = [
      [0, 1], [2, null], [3, null], [4, 5]
    ];
    const colorIndex = colorMap[rowIndex][colIndex];
    return colorIndex !== null ? backgroundColors[colorIndex % backgroundColors.length] : 'transparent';
  };

  if (loading) {
    return (
      <>
        {/* Desktop: EXACT original loading */}
        <div className="p-4 h-full hidden lg:block">
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

        {/* Mobile: Card loading */}
        <div className="p-4 h-full lg:hidden">
          <div className="mb-4">
            <div className="flex space-x-4 border-b overflow-x-auto scrollbar-hide">
              {['Campaigns', 'Ad Groups', 'Keywords', 'Ads'].map((tab, index) => (
                <div key={tab} className={`pb-2 text-sm font-medium whitespace-nowrap ${index === 0 ? 'border-b-2 border-orange-500 text-gray-900' : 'text-gray-500'}`}>
                  {tab}
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            {[...Array(4)].map((_, index) => (
              <div key={`mobile-skeleton-${index}`} className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm animate-pulse">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="h-8 bg-gray-200 rounded"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        {/* Desktop: EXACT original error */}
        <div className="p-4 h-full hidden lg:block">
          <div className="text-center py-8">
            <div className="text-red-500 mb-2">Error loading data</div>
            <div className="text-gray-500 text-sm">{error}</div>
          </div>
        </div>

        {/* Mobile: Error */}
        <div className="p-4 h-full lg:hidden">
          <div className="text-center py-8">
            <div className="text-red-500 mb-2 text-sm">Error loading data</div>
            <div className="text-gray-500 text-xs">{error}</div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Desktop: EXACT original component */}
      <div className="p-4 h-full flex-col hidden lg:flex">
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
            <div className="flex-1 text-xs font-medium text-gray-500 uppercase tracking-wider"></div>
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

      {/* Mobile: Beautiful card layout - NO SCROLL BARS */}
      <div className="p-4 h-full flex flex-col lg:hidden">
        {/* Tabs */}
        <div className="mb-4">
          <div className="flex space-x-4 border-b overflow-x-auto scrollbar-hide">
            {['Campaigns', 'Ad Groups', 'Keywords', 'Ads'].map((tab, index) => (
              <button
                key={tab}
                className={`pb-2 text-sm font-medium whitespace-nowrap ${
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

        {/* Mobile Cards - REMOVED overflow-y-auto */}
        <div className="flex-1 space-y-4">
          {sortedData.map((campaign, rowIndex) => (
            <div key={campaign.id} className="bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm">
              {/* Campaign Header */}
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-3 h-3 rounded-full bg-green-500 flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">{campaign.campaign}</div>
                  <div className="text-xs text-gray-500">India</div>
                </div>
              </div>
              
              {/* Metrics Grid - Enhanced spacing */}
              <div className="grid grid-cols-3 gap-3">
                {/* Spend */}
                <div className="bg-white rounded-lg p-3 text-center shadow-xs">
                  <div className="text-xs text-gray-500 mb-2">Spend</div>
                  <div className="text-sm font-semibold text-gray-900">${campaign.spend.toLocaleString()}</div>
                  <div className="text-xs text-orange-500 mt-1">+27.42%</div>
                </div>
                
                {/* Installs */}
                <div className="bg-white rounded-lg p-3 text-center shadow-xs">
                  <div className="text-xs text-gray-500 mb-2">Installs</div>
                  <div className="text-sm font-semibold text-gray-900">${campaign.installs}</div>
                  <div className="text-xs text-orange-500 mt-1">+27.42%</div>
                </div>
                
                {/* Conversions */}
                <div className="bg-white rounded-lg p-3 text-center shadow-xs">
                  <div className="text-xs text-gray-500 mb-2">Conversions</div>
                  <div className="text-sm font-semibold text-gray-900">0.00%</div>
                  <div className="text-xs text-gray-500 mt-1">0%</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TopList;
