// components/StoreFrontMap.jsx
import React from 'react';
import { useSelector } from 'react-redux';

const StoreFrontMap = () => {
  const { storefrontsData = [] } = useSelector(state => state.dashboard || {});

  return (
    <div className="h-full flex items-center justify-center p-4">
      <div className="text-center">
        <div className="text-gray-400 text-sm sm:text-base mb-2">
          StoreFront Map
        </div>
        <div className="text-gray-500 text-xs sm:text-sm">
          Map visualization will be implemented here
        </div>
      </div>
    </div>
  );
};

export default StoreFrontMap;
