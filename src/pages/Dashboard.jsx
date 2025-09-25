// pages/Dashboard.jsx
import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import TotalSummary from '../components/TotalSummary';
import TopList from '../components/TopList';

const Dashboard = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div 
          className="p-6 bg-white opacity-100 relative"
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
          
          {/* Main 4 components grid */}
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
                className="bg-white border border-gray-300 rounded-xl opacity-100 p-4"
                style={{
                  width: '598px',
                  height: '427px',
                  borderRadius: '15px',
                  border: '1px solid #B1B1B1',
                  boxShadow: '0px 4px 26.4px 0px rgba(0, 0, 0, 0.05)'
                }}
              >
                <div className="text-gray-500">Trends content...</div>
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
                className="bg-white border border-gray-300 rounded-xl opacity-100 p-4"
                style={{
                  width: '598px',
                  height: '427px',
                  borderRadius: '15px',
                  border: '1px solid #B1B1B1',
                  boxShadow: '0px 4px 26.4px 0px rgba(0, 0, 0, 0.05)'
                }}
              >
                <div className="text-gray-500">Biggest Changes content...</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
