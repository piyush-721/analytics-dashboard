// components/StoreFrontMap.jsx - Pixel Perfect Empty Box
import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const StoreFrontMap = () => {
  const { storefrontsData = [] } = useSelector(state => state.dashboard || {});

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white border border-[#B1B1B1] shadow-[0px_4px_26.4px_0px_rgba(0,0,0,0.05)]"
      style={{
        width: '598px',      // Exact Figma width
        height: '427px',     // Exact Figma height  
        borderRadius: '15px' // Exact Figma border radius
      }}
    >
      {/* Header - Exact Figma Specifications */}
      <div className="flex items-center justify-between px-6 pt-6 pb-4">
        <h3 className="text-lg font-semibold text-[#333333]">Storefronts</h3>
        <div className="flex space-x-1">
          {/* Three dots menu - Exact as Figma */}
          <button className="p-2 hover:bg-gray-50 rounded transition-colors">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="3" cy="8" r="1.5" fill="#9CA3AF"/>
              <circle cx="8" cy="8" r="1.5" fill="#9CA3AF"/>
              <circle cx="13" cy="8" r="1.5" fill="#9CA3AF"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Empty Content Area - Exact Figma Inner Box */}
      <div 
        className="mx-6 mb-6 bg-[#F8F9FA] border border-[#E5E7EB] rounded-lg" 
        style={{ height: '335px' }} // Exact calculated height
      >
        {/* Completely empty - Ready for your content */}
      </div>
    </motion.div>
  );
};

export default StoreFrontMap;
