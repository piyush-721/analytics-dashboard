// components/Header.jsx
import React from 'react';
import pdfIcon from '../assets/pdf-icon.png';
import calendarIcon from '../assets/calendar-icon.png';
import filterIcon from '../assets/filter-icon.png';

const Header = () => {
  return (
    <header 
      className="bg-white px-4 py-6 ml-10" 
      style={{ width: '1314px' }}
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-start">
          <h1 className="mb-2 font-inter font-semibold text-black leading-none tracking-normal"
     style={{
       width: '322px',
       height: '39px',
       fontSize: '32px',
       opacity: 1
     }}>
  Overview dashboard
</h1>

          <p className="text-gray-600">A consolidated view of your app efficiency by storefronts and key metrics.</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div 
            className="flex items-center space-x-2 px-3 py-2"
            style={{
              width: '238px',
              height: '41px',
              borderRadius: '12px',
              border: '1px solid #BEBEBE',
              opacity: 1
            }}
          >
            <img src={pdfIcon} alt="PDF" className="w-5 h-5" />
            <select 
              className="bg-transparent border-none outline-none flex-1"
              style={{ color: '#7B7B7B' }}
            >
              <option>Pdf Name</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2 px-3 py-2">
            <img src={calendarIcon} alt="Calendar" className="w-5 h-5" />
            <div className="text-left">
              <div className="text-xs text-gray-500">Last 7 Days</div>
              <div className="text-sm font-medium text-gray-900">Jul 5 - Jul 11, 2025</div>
            </div>
          </div>
          
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <img src={filterIcon} alt="Filter" className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
