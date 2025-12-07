import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { mockAPI } from '../services/mockData';
import { setSummary, setTopList, setTrends } from '../store/dashboardSlice';

export const useDashboardData = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { summary, topList, trends } = useSelector(state => state.dashboard);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        await Promise.all([
          mockAPI.getSummaryData().then(data => dispatch(setSummary(data.metrics))),
          mockAPI.getTopListData().then(data => dispatch(setTopList(data))),
          mockAPI.getTrendsData().then(data => dispatch(setTrends(data)))
        ]);
      } catch (err) {
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [dispatch]);

  return { 
    summary, 
    topList, 
    trends, 
    loading,
    error 
  };
};
