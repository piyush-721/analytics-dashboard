// hooks/useTopListData.js
import { useState, useEffect } from 'react';

export const useTopListData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Enhanced mock data with dynamic change metrics
  const mockData = [
    {
      id: 1,
      campaign: 'Discovery LOC',
      spend: 5000,
      installs: 1200,
      conversions: 0.00,
      region: 'India',
      // Dynamic change data for BiggestChanges
      spendChange: 45.8,        // +45.8% increase
      installsChange: 32.4,     // +32.4% increase  
      conversionsChange: -12.3, // -12.3% decrease
      changeDirection: 'increase' // overall trend
    },
    {
      id: 2,
      campaign: 'Competitor LOC',
      spend: 3500,
      installs: 800,
      conversions: 0.00,
      region: 'India',
      spendChange: 28.7,        // +28.7% increase
      installsChange: 18.9,     // +18.9% increase
      conversionsChange: -5.2,  // -5.2% decrease
      changeDirection: 'increase'
    },
    {
      id: 3,
      campaign: 'Retargeting Campaign',
      spend: 4200,
      installs: 950,
      conversions: 0.00,
      region: 'India',
      spendChange: -18.4,       // -18.4% decrease
      installsChange: -22.1,    // -22.1% decrease
      conversionsChange: -8.7,  // -8.7% decrease
      changeDirection: 'decrease'
    },
    {
      id: 4,
      campaign: 'Brand Awareness',
      spend: 2800,
      installs: 650,
      conversions: 0.00,
      region: 'India',
      spendChange: -35.6,       // -35.6% decrease
      installsChange: -28.3,    // -28.3% decrease
      conversionsChange: -15.2, // -15.2% decrease
      changeDirection: 'decrease'
    },
    {
      id: 5,
      campaign: 'Lookalike Audience',
      spend: 3900,
      installs: 1100,
      conversions: 0.00,
      region: 'India',
      spendChange: 52.3,        // +52.3% increase
      installsChange: 41.7,     // +41.7% increase
      conversionsChange: 2.1,   // +2.1% increase
      changeDirection: 'increase'
    }
  ];

  useEffect(() => {
    // Simulate API call
    const fetchData = () => {
      setTimeout(() => {
        setData(mockData);
        setLoading(false);
      }, 1000);
    };

    fetchData();
  }, []);

  return { data, loading, error };
};
