import React from 'react';

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
  return (
    <div 
      className="bg-[#FF5900] flex flex-col items-center"
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
  );
};

export default Sidebar;
