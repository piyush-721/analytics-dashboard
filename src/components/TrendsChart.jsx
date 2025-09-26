// components/TrendsChart.jsx
import React, { useState, useRef, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const TrendsChart = () => {
  const [selectedMetric, setSelectedMetric] = useState('Spend');
  const chartRef = useRef();

  // Mock data that matches your image pattern
  const trendData = {
    labels: ['5 July', '5 July', '5 July', '5 July', '5 July', '5 July', '5 July'],
    spend: [27.42, 27.42, 27.42, 65, 75, 45, 85], // Orange line pattern from image
    installs: [15, 25, 35, 45, 55, 40, 70],
    conversions: [5, 10, 15, 20, 25, 30, 35]
  };

  // Function to determine segment colors (orange main, blue at end)
  const getSegmentColor = (ctx) => {
    const { p0, p1 } = ctx;
    const dataIndex = p0.parsed ? p0.parsed.x : 0;
    
    // Blue color for the last segment (like in your image)
    if (dataIndex >= 5) {
      return 'rgb(59, 130, 246)'; // Blue color
    }
    
    // Orange color for main line
    return '#FF6200'; // Your brand orange
  };

  const data = {
    labels: trendData.labels,
    datasets: [
      {
        label: selectedMetric,
        data: trendData[selectedMetric.toLowerCase()],
        borderColor: '#FF6200', // Default orange
        backgroundColor: 'rgba(255, 98, 0, 0.1)', // Light orange background
        borderWidth: 3,
        fill: true,
        tension: 0.4, // Smooth curves like in your image
        pointRadius: 0, // Hide points for clean look
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#FF6200',
        pointHoverBorderColor: '#ffffff',
        pointHoverBorderWidth: 2,
        segment: {
          borderColor: ctx => getSegmentColor(ctx), // Dynamic segment colors
        },
        // Gradient background fill
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, 'rgba(255, 98, 0, 0.15)');   // Orange at top
          gradient.addColorStop(0.5, 'rgba(255, 98, 0, 0.05)'); // Fade to light orange
          gradient.addColorStop(1, 'rgba(255, 98, 0, 0.01)');   // Almost transparent at bottom
          return gradient;
        }
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false // Hide legend as you have custom header
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#FF6200',
        borderWidth: 1,
        displayColors: false,
        callbacks: {
          title: function(context) {
            return context[0].label;
          },
          label: function(context) {
            return `${selectedMetric}: $${context.parsed.y.toFixed(2)}K`;
          }
        }
      }
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: false // Clean look without grid lines
        },
        ticks: {
          color: '#9CA3AF',
          font: {
            size: 11
          },
          maxTicksLimit: 7
        },
        border: {
          display: false
        }
      },
      y: {
        display: false, // Hide Y axis for minimal look like your image
        grid: {
          display: false
        },
        border: {
          display: false
        }
      }
    },
    elements: {
      line: {
        borderWidth: 3
      }
    },
    interaction: {
      intersect: false,
      mode: 'index'
    },
    // Custom plugin to show percentage labels on the line
    plugins: [{
      id: 'percentageLabels',
      afterDatasetsDraw: function(chart) {
        const ctx = chart.ctx;
        chart.data.datasets.forEach((dataset, i) => {
          const meta = chart.getDatasetMeta(i);
          meta.data.forEach((element, index) => {
            // Show percentage only for some points (like in your image)
            if (index < 6) { // Show for first 6 points
              ctx.fillStyle = '#F59E0B'; // Orange color for text
              ctx.font = '12px Inter, sans-serif';
              ctx.textAlign = 'center';
              ctx.textBaseline = 'bottom';
              
              const percentage = '$27.42%'; // Your static percentage from image
              const position = element.tooltipPosition();
              ctx.fillText(percentage, position.x, position.y - 10);
            }
          });
        });
      }
    }]
  };

  return (
    <>
      {/* Desktop: EXACT original component */}
      <div className="h-full flex-col hidden lg:flex" style={{ padding: '16px 16px 8px 16px' }}>
        {/* Header Section */}
        <div className="flex items-center justify-between mb-6">
          {/* Left Side - Plus and Spend closer together */}
          <div className="flex items-center space-x-3">
            {/* Plus Button - no border or background */}
            <button className="flex items-center justify-center w-6 h-6 text-gray-600 hover:text-gray-800">
              <svg 
                className="w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6" 
                />
              </svg>
            </button>

            {/* Metric Selector - closer to plus */}
            <div className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: '#FF6200' }}
              ></div>
              <span className="text-sm font-medium text-gray-900">
                {selectedMetric}
              </span>
            </div>
          </div>

          {/* Right Side - Chart Type Icons */}
          <div className="flex items-center space-x-2">
            {/* Line Chart Icon - Active (blue) */}
            <button className="p-1 text-blue-500 hover:text-blue-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4" />
              </svg>
            </button>
            
            {/* Bar Chart Icon */}
            <button className="p-1 text-gray-400 hover:text-gray-600">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <rect x="3" y="14" width="2" height="4" />
                <rect x="7" y="10" width="2" height="8" />
                <rect x="11" y="6" width="2" height="12" />
                <rect x="15" y="8" width="2" height="10" />
              </svg>
            </button>

            {/* Expand Icon */}
            <button className="p-1 text-gray-400 hover:text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </button>

            {/* Grid Icon */}
            <button className="p-1 text-gray-400 hover:text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Chart Area - Chart.js Line Chart */}
        <div className="flex-1 mb-4" style={{ minHeight: '300px' }}>
          <Line ref={chartRef} data={data} options={options} />
        </div>

        {/* Horizontal Line */}
        <hr className="border-t border-gray-200 mb-2" />

        {/* Bottom Legend - positioned at very bottom with minimal padding */}
        <div className="flex items-center justify-between" style={{ paddingBottom: '4px' }}>
          {/* Left - India with orange box */}
          <div className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: '#FF6200' }}
            ></div>
            <span className="text-sm text-gray-700">India</span>
          </div>

          {/* Right - Info icon with white background, border and circular shape */}
          <button className="flex items-center justify-center w-6 h-6 bg-white border border-gray-300 rounded-full text-black text-xs font-semibold hover:bg-gray-50">
            i
          </button>
        </div>
      </div>

      {/* Mobile: Compact responsive version */}
      <div className="h-full flex flex-col p-4 lg:hidden">
        {/* Header - Simplified for mobile */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <button className="flex items-center justify-center w-5 h-5 text-gray-600">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 rounded-sm bg-orange-500"></div>
              <span className="text-xs font-medium text-gray-900">{selectedMetric}</span>
            </div>
          </div>

          <div className="flex items-center space-x-1">
            <button className="p-1 text-blue-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4" />
              </svg>
            </button>
            <button className="p-1 text-gray-400">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <rect x="3" y="14" width="2" height="4" />
                <rect x="7" y="10" width="2" height="8" />
                <rect x="11" y="6" width="2" height="12" />
                <rect x="15" y="8" width="2" height="10" />
              </svg>
            </button>
          </div>
        </div>

        {/* Chart Area - Mobile optimized */}
        <div className="flex-1 mb-3 min-h-[200px]">
          <Line data={data} options={{
            ...options,
            plugins: {
              ...options.plugins,
              tooltip: {
                ...options.plugins.tooltip,
                titleFont: { size: 12 },
                bodyFont: { size: 11 }
              }
            }
          }} />
        </div>

        {/* Bottom Legend - Mobile */}
        <div className="pt-2 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-sm bg-orange-500"></div>
              <span className="text-xs text-gray-700">India</span>
            </div>
            <button className="flex items-center justify-center w-5 h-5 bg-white border border-gray-300 rounded-full text-black text-xs font-semibold">
              i
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrendsChart;
