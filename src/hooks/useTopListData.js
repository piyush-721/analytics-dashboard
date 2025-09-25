// hooks/useTopListData.js
import { useState, useEffect, useMemo } from 'react';
import { mockAPI } from '../services/mockData';

export const useTopListData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await mockAPI.getTopListData();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Memoize data for React Table performance
  const memoizedData = useMemo(() => data, [data]);

  // Define columns for React Table
  const columns = useMemo(
    () => [
      {
        accessorKey: 'campaign',
        header: 'Campaign',
        cell: info => info.getValue(),
      },
      {
        accessorKey: 'spend',
        header: 'Spend',
        cell: info => `$${info.getValue().toLocaleString()}`,
      },
      {
        accessorKey: 'installs',
        header: 'Installs',
        cell: info => info.getValue().toLocaleString(),
      },
      {
        accessorKey: 'conversions',
        header: 'Conversions',
        cell: info => info.getValue().toLocaleString(),
      },
    ],
    []
  );

  return { 
    data: memoizedData, 
    columns, 
    loading, 
    error 
  };
};
