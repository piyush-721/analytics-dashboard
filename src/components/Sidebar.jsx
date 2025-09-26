// components/Sidebar.jsx
import React, { useState } from 'react';
import homeIcon from '../assets/home-icon.png';
import timingIcon from '../assets/timing-icon.png';
import lightningIcon from '../assets/lightning-icon.png';
import chartIcon from '../assets/chart-icon.png';
import cubesIcon from '../assets/cubes-icon.png';
import searchIcon from '../assets/search-icon.png';
import imageIcon from '../assets/image-icon.png';
import settingsIcon from '../assets/settings-icon.png';
import questionIcon from '../assets/question-icon.png';
import userIcon from '../assets/user-icon.png';

const Sidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop: EXACT original sidebar */}
      <div 
        className="bg-[#FF5900] flex-col items-center hidden lg:flex"
        style={{
          width: '60px',
          height: '849px',
          opacity: 1
        }}
      >
        <div className="mt-6 mb-8 px-4">
          <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
            <img src={homeIcon} alt="Home" className="w-6 h-6 object-contain" />
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors">
            <img src={timingIcon} alt="Timing" className="w-5 h-5 object-contain opacity-60 hover:opacity-100 transition-opacity" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors">
            <img src={lightningIcon} alt="Performance" className="w-5 h-5 object-contain opacity-60 hover:opacity-100 transition-opacity" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors">
            <img src={chartIcon} alt="Analytics" className="w-5 h-5 object-contain opacity-60 hover:opacity-100 transition-opacity" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors">
            <img src={cubesIcon} alt="Apps" className="w-5 h-5 object-contain opacity-60 hover:opacity-100 transition-opacity" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors">
            <img src={searchIcon} alt="Search" className="w-5 h-5 object-contain opacity-60 hover:opacity-100 transition-opacity" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors">
            <img src={imageIcon} alt="Images" className="w-5 h-5 object-contain opacity-60 hover:opacity-100 transition-opacity" />
          </button>
        </div>

        <div className="mt-auto mb-6 flex flex-col space-y-4">
          <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors">
            <img src={settingsIcon} alt="Settings" className="w-5 h-5 object-contain opacity-60 hover:opacity-100 transition-opacity" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors">
            <img src={questionIcon} alt="Help" className="w-5 h-5 object-contain opacity-60 hover:opacity-100 transition-opacity" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors">
            <img src={userIcon} alt="Profile" className="w-6 h-6 object-contain opacity-60 hover:opacity-100 transition-opacity" />
          </button>
        </div>
      </div>

      {/* Mobile: Toggle Button - Fixed position top left */}
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 bg-[#FF5900] rounded-lg flex items-center justify-center shadow-lg"
      >
        <svg 
          className="w-6 h-6 text-white" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          {isMobileMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile: Overlay when menu is open */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile: Left Sidebar Drawer */}
      <div className={`
        lg:hidden fixed left-0 top-0 h-full bg-[#FF5900] z-50 transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        w-64 shadow-xl
      `}>
        {/* Mobile Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-orange-600">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <img src={homeIcon} alt="Home" className="w-5 h-5 object-contain" />
            </div>
            <span className="text-white font-semibold text-lg">Menu</span>
          </div>
          <button 
            onClick={closeMobileMenu}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Items */}
        <div className="p-4 space-y-2">
          {[
            { icon: homeIcon, label: 'Home', active: true },
            { icon: timingIcon, label: 'Timing' },
            { icon: lightningIcon, label: 'Performance' },
            { icon: chartIcon, label: 'Analytics' },
            { icon: cubesIcon, label: 'Apps' },
            { icon: searchIcon, label: 'Search' },
            { icon: imageIcon, label: 'Images' }
          ].map((item, index) => (
            <button 
              key={index}
              onClick={closeMobileMenu}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                item.active 
                  ? 'bg-white bg-opacity-20 text-white' 
                  : 'text-white text-opacity-80 hover:bg-white hover:bg-opacity-10 hover:text-opacity-100'
              }`}
            >
              <img 
                src={item.icon} 
                alt={item.label} 
                className={`w-5 h-5 object-contain ${item.active ? 'opacity-100' : 'opacity-70'}`} 
              />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Mobile Bottom Items */}
        <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2 border-t border-orange-600">
          {[
            { icon: settingsIcon, label: 'Settings' },
            { icon: questionIcon, label: 'Help' },
            { icon: userIcon, label: 'Profile' }
          ].map((item, index) => (
            <button 
              key={index}
              onClick={closeMobileMenu}
              className="w-full flex items-center space-x-3 p-3 rounded-lg text-white text-opacity-80 hover:bg-white hover:bg-opacity-10 hover:text-opacity-100 transition-colors"
            >
              <img 
                src={item.icon} 
                alt={item.label} 
                className="w-5 h-5 object-contain opacity-70" 
              />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
