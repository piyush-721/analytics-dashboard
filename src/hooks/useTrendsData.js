// hooks/useTrendsData.js
import { useState, useEffect } from 'react';
import { mockAPI } from '../services/mockData';

export const useTrendsData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendsData = async () => {
      try {
        setLoading(true);
        const trendsData = await mockAPI.getTrendsData();
        setData(trendsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendsData();
  }, []);

  return { data, loading, error };
};
