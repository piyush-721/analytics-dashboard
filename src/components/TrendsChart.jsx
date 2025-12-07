// components/TrendsChart.jsx
import React, { useState } from 'react';
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
import { useTrendsData } from '../hooks/useTrendsData';
import { useDashboardData } from '../hooks/useDashboardData';

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
  // const { data: trendsData, loading, error } = useTrendsData();
  const { trends: trendsData, loading, error } = useDashboardData();


  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-gray-500 text-sm">Loading trends...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-red-500 text-sm">Error: {error}</div>
      </div>
    );
  }

  // Format dates for X-axis (dynamic from mockAPI)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'short' 
    });
  };

  const xAxisLabels = trendsData.map(item => formatDate(item.date));

  // Get values based on selected metric (dynamic from mockAPI)
  const getMetricValues = (metric) => {
    switch(metric.toLowerCase()) {
      case 'spend':
        return trendsData.map(item => item.spend);
      case 'revenue':
        return trendsData.map(item => item.revenue);
      case 'conversions':
        return trendsData.map(item => item.conversions);
      default:
        return trendsData.map(item => item.spend);
    }
  };

  const metricValues = getMetricValues(selectedMetric);

  // Function for segment colors (orange main, blue at end)
  const getSegmentColor = (ctx) => {
    const { p0 } = ctx;
    const dataIndex = p0.parsed ? p0.parsed.x : 0;
    
    // Blue for last 2 segments (matches your image)
    if (dataIndex >= trendsData.length - 2) {
      return 'rgb(59, 130, 246)';
    }
    
    return '#FF6200'; // Your brand orange
  };

  const data = {
    labels: xAxisLabels,
    datasets: [
      {
        label: selectedMetric,
        data: metricValues,
        borderColor: '#FF6200',
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const chartArea = context.chart.chartArea;
          
          if (!chartArea) {
            return null;
          }
          
          // Simple gradient from top to bottom
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, 'rgba(255, 98, 0, 0.1)');     // Top - light orange
          gradient.addColorStop(0.5, 'rgba(255, 98, 0, 0.15)');  // Middle - stronger
          gradient.addColorStop(1, 'rgba(255, 98, 0, 0.02)');    // Bottom - very light
          
          return gradient;
        },
        borderWidth: 2,
        fill: 'start', // Fill from top of chart to line
        tension: 0, // STRAIGHT LINES
        pointRadius: 0,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: '#FF6200',
        pointHoverBorderColor: '#ffffff',
        pointHoverBorderWidth: 2,
        segment: {
          borderColor: ctx => getSegmentColor(ctx),
        },
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20
      }
    },
    plugins: {
      legend: {
        display: false
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
            const metric = selectedMetric.toLowerCase();
            const prefix = metric === 'spend' || metric === 'revenue' ? '$' : '';
            const suffix = metric === 'conversions' ? ' conversions' : '';
            return `${selectedMetric}: ${prefix}${context.parsed.y.toLocaleString()}${suffix}`;
          }
        }
      }
    },
    scales: {
      x: {
        display: true,
        position: 'bottom',
        grid: {
          display: false
        },
        ticks: {
          color: '#9CA3AF',
          font: {
            size: 11,
            family: 'Inter, sans-serif'
          },
          maxTicksLimit: 7,
          padding: 8
        },
        border: {
          display: false
        }
      },
      y: {
        display: true,
        position: 'left',
        grid: {
          display: true, // Show horizontal grid lines
          color: 'rgba(0, 0, 0, 0.04)', // Very faint gray lines
          lineWidth: 1,
          drawTicks: false,
          drawBorder: false
        },
        ticks: {
          color: '#F59E0B', // Orange color for Y-axis
          font: {
            size: 11,
            family: 'Inter, sans-serif',
            weight: '500'
          },
          padding: 15,
          callback: function(value) {
            // Dynamic formatting based on selected metric
            const metric = selectedMetric.toLowerCase();
            if (metric === 'spend' || metric === 'revenue') {
              return `$${(value / 1000).toFixed(1)}K`;
            } else if (metric === 'conversions') {
              return `${value}`;
            }
            return value;
          },
          maxTicksLimit: 6
        },
        border: {
          display: false
        }
      }
    },
    elements: {
      line: {
        borderWidth: 2,
        tension: 0 // STRAIGHT LINES
      },
      point: {
        radius: 0,
        hoverRadius: 5
      }
    },
    interaction: {
      intersect: false,
      mode: 'index'
    }
  };

  return (
    <>
      {/* Desktop: EXACT original component with FIXED height */}
      <div className="h-full flex-col hidden lg:flex" style={{ padding: '16px 16px 8px 16px' }}>
        {/* Header Section */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <button className="flex items-center justify-center w-6 h-6 text-gray-600 hover:text-gray-800">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>

            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#FF6200' }}></div>
              <select 
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                className="text-sm font-medium text-gray-900 bg-transparent border-none outline-none cursor-pointer"
              >
                <option value="Spend">Spend</option>
                <option value="Revenue">Revenue</option>
                <option value="Conversions">Conversions</option>
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button className="p-1 text-blue-500 hover:text-blue-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4" />
              </svg>
            </button>
            
            <button className="p-1 text-gray-400 hover:text-gray-600">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <rect x="3" y="14" width="2" height="4" />
                <rect x="7" y="10" width="2" height="8" />
                <rect x="11" y="6" width="2" height="12" />
                <rect x="15" y="8" width="2" height="10" />
              </svg>
            </button>

            <button className="p-1 text-gray-400 hover:text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </button>

            <button className="p-1 text-gray-400 hover:text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Chart Area - FIXED HEIGHT to prevent overflow */}
        <div className="flex-1 mb-4 min-h-0" style={{ maxHeight: 'calc(100% - 120px)' }}>
          <Line data={data} options={options} />
        </div>

        {/* Horizontal Line */}
        <hr className="border-t border-gray-200 mb-2" />

        {/* Bottom Legend */}
        <div className="flex items-center justify-between" style={{ paddingBottom: '4px' }}>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#FF6200' }}></div>
            <span className="text-sm text-gray-700">India</span>
          </div>

          <button className="flex items-center justify-center w-6 h-6 bg-white border border-gray-300 rounded-full text-black text-xs font-semibold hover:bg-gray-50">
            i
          </button>
        </div>
      </div>

      {/* Mobile: Responsive version */}
      <div className="h-full flex flex-col p-4 lg:hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <button className="flex items-center justify-center w-5 h-5 text-gray-600">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 rounded-sm bg-orange-500"></div>
              <select 
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                className="text-xs font-medium text-gray-900 bg-transparent border-none outline-none"
              >
                <option value="Spend">Spend</option>
                <option value="Revenue">Revenue</option>
                <option value="Conversions">Conversions</option>
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-1">
            <button className="p-1 text-blue-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex-1 mb-3 min-h-0">
          <Line data={data} options={options} />
        </div>

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
