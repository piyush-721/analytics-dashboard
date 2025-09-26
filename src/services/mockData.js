// services/mockData.js
// services/mockData.js - Update the campaign names
// services/mockData.js - Updated with correct colors
// services/mockData.js 
export const topListMock = [
  { id: 1, campaign: "Discovery (LOC)", spend: 5000, installs: 1200, conversions: 300, color: '#FF6200' },
  { id: 2, campaign: "Competitor (LOC)", spend: 3000, installs: 800, conversions: 200, color: '#FF6200' },
  { id: 3, campaign: "Today tab (LOC)", spend: 7500, installs: 1800, conversions: 450, color: '#F7CE02' },
  { id: 4, campaign: "Branding (LOC)", spend: 2500, installs: 600, conversions: 150, color: '#F7CE02' },
  { id: 5, campaign: "Search Marketing", spend: 6100, installs: 1400, conversions: 380, color: '#FF6200' },
  { id: 6, campaign: "Social Media Ads", spend: 4200, installs: 950, conversions: 280, color: '#F7CE02' }
];

// NEW: Trends Chart Data
export const trendsMock = [
  { date: "2025-09-20", spend: 1200, revenue: 4500, conversions: 50 },
  { date: "2025-09-21", spend: 1400, revenue: 4800, conversions: 60 },
  { date: "2025-09-22", spend: 1600, revenue: 5000, conversions: 70 },
  { date: "2025-09-23", spend: 1800, revenue: 5200, conversions: 80 },
  { date: "2025-09-24", spend: 1500, revenue: 4900, conversions: 65 },
  { date: "2025-09-25", spend: 1700, revenue: 5300, conversions: 75 },
  { date: "2025-09-26", spend: 2000, revenue: 5800, conversions: 90 }
];

export const mockAPI = {
  getSummaryData: () => 
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          metrics: [
            { id: 'conv-roas-1', label: 'Conversions ROAS:', value: '0.00%', change: 0 },
            { id: 'conv-roas-2', label: 'Conversions ROAS:', value: '$6,109.89', change: 27.42 },
            { id: 'conv-roas-3', label: 'Conversions ROAS:', value: '0.00%', change: 0 },
            { id: 'conv-roas-4', label: 'Conversions ROAS:', value: '$2,101', change: 0 },
            { id: 'conv-roas-5', label: 'Conversions ROAS:', value: '$2.91', change: 0 },
            { id: 'conv-roas-6', label: 'Conversions ROAS:', value: '0', change: 0 },
            { id: 'conv-roas-7', label: 'Conversions ROAS:', value: '$0.00', change: 0 }
          ]
        });
      }, 800);
    }),

  getTopListData: () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(topListMock);
      }, 600);
    }),

  // NEW: Trends Chart API
  getTrendsData: () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(trendsMock);
      }, 500);
    })
};
