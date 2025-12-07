// pages/Dashboard.jsx
import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import TotalSummary from '../components/TotalSummary';
import TopList from '../components/TopList';
import BiggestChanges from '../components/BiggestChanges';
import TrendsChart from '../components/TrendsChart';

const Dashboard = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Header />
        
        {/* Desktop: EXACT original layout */}
        <div
          className="p-6 bg-white opacity-100 relative lg:block hidden"
          style={{
            width: '1314px',
            height: '1288px',
            background: '#FEFEFE',
            boxShadow: '0px 4px 29.1px 0px rgba(0, 0, 0, 0.04) inset',
            top: '10px',
            left: '23px'
          }}
        >
          <TotalSummary />
          
          {/* Desktop: Original 2x2 grid */}
          <div className="grid grid-cols-2 gap-8 mt-8">
            {/* Top Left - Storefronts */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Storefronts</h3>
              <div
                className="bg-white border border-gray-300 rounded-xl opacity-100 p-4"
                style={{
                  width: '598px',
                  height: '427px',
                  borderRadius: '15px',
                  border: '1px solid #B1B1B1',
                  boxShadow: '0px 4px 26.4px 0px rgba(0, 0, 0, 0.05)'
                }}
              >
                <div className="text-gray-500">Storefronts content...</div>
              </div>
            </div>

            {/* Top Right - Trends */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Trends</h3>
              <div 
                className="bg-white border border-gray-300 rounded-xl opacity-100"
                style={{
                  width: '598px',
                  height: '427px',
                  borderRadius: '15px',
                  border: '1px solid #B1B1B1',
                  boxShadow: '0px 4px 26.4px 0px rgba(0, 0, 0, 0.05)'
                }}
              >
                <TrendsChart />
              </div>
            </div>

            {/* Bottom Left - Top List */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top List</h3>
              <div 
                className="bg-white border border-gray-300 rounded-xl opacity-100"
                style={{
                  width: '598px',
                  height: '427px',
                  borderRadius: '15px',
                  border: '1px solid #B1B1B1',
                  boxShadow: '0px 4px 26.4px 0px rgba(0, 0, 0, 0.05)'
                }}
              >
                <TopList />
              </div>
            </div>

            {/* Bottom Right - Biggest Changes */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Biggest Changes</h3>
              <div 
                className="bg-white border border-gray-300 rounded-xl opacity-100"
                style={{
                  width: '598px',
                  height: '427px',
                  borderRadius: '15px',
                  border: '1px solid #B1B1B1',
                  boxShadow: '0px 4px 26.4px 0px rgba(0, 0, 0, 0.05)'
                }}
              >
                <BiggestChanges />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: Fixed overlapping issue with MUCH LARGER heights */}
        <div className="lg:hidden p-4 bg-gray-50 min-h-screen pb-32">
          <TotalSummary />
          
          {/* Mobile: Stacked components with MAXIMUM space to prevent overlap */}
          <div className="mt-8 space-y-12"> {/* Increased spacing from space-y-8 to space-y-12 */}
            
            {/* Storefronts */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">Storefronts</h3>
              </div>
              <div className="p-4 h-80 flex items-center justify-center text-gray-500">
                Storefronts content...
              </div>
            </div>

            {/* Trends */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">Trends</h3>
              </div>
              <div className="h-[30rem]"> {/* Slightly increased */}
                <TrendsChart />
              </div>
            </div>

            {/* Top List - MAXIMUM height to prevent overlap */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">Top List</h3>
              </div>
              <div className="h-[50rem]"> {/* SIGNIFICANTLY increased from h-[42rem] to h-[50rem] (800px) */}
                <TopList />
              </div>
            </div>

            {/* Biggest Changes - Also increased to ensure no overlap */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">Biggest Changes</h3>
              </div>
              <div className="h-[45rem]"> {/* Increased from h-[38rem] to h-[45rem] (720px) */}
                <BiggestChanges />
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
