import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { mockAPI } from '../services/mockData'; // ADD THIS IMPORT

// Async thunk for fetching storefronts data (your existing)
export const fetchStorefrontsData = createAsyncThunk(
  'dashboard/fetchStorefrontsData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/storefronts');
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  // Your existing storefronts data
  storefrontsData: [
    { country: 'IN', countryName: 'India', value: 6109.89, region: 'Asia', currency: 'USD' },
    { country: 'US', countryName: 'United States', value: 8500.50, region: 'North America', currency: 'USD' },
    { country: 'GB', countryName: 'United Kingdom', value: 4200.75, region: 'Europe', currency: 'GBP' },
    { country: 'CA', countryName: 'Canada', value: 3800.25, region: 'North America', currency: 'CAD' },
    { country: 'AU', countryName: 'Australia', value: 2900.90, region: 'Oceania', currency: 'AUD' }
  ],
  
  // NEW: Add these for dashboard components
  summary: [],
  topList: [],
  trends: [],
  
  // Your existing mapConfig, filters
  mapConfig: {
    colorScale: {
      noData: '#F3E6A3',
      lowSpend: '#FFB366',
      mediumSpend: '#FF8C42',
      highSpend: '#FF6B35',
      veryHighSpend: '#E55B2B'
    },
    thresholds: {
      low: 1000,
      medium: 3000,
      high: 5000,
      veryHigh: 8000
    }
  },
  
  filters: {
    selectedRegions: [],
    minSpend: 0,
    maxSpend: 10000,
    currencies: []
  },
  
  loading: false,
  error: null,
  lastUpdated: null
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    // Your existing reducers
    addStorefront: (state, action) => {
      state.storefrontsData.push(action.payload);
    },
    
    updateStorefront: (state, action) => {
      const { country, updates } = action.payload;
      const index = state.storefrontsData.findIndex(item => item.country === country);
      if (index !== -1) {
        state.storefrontsData[index] = { ...state.storefrontsData[index], ...updates };
      }
    },
    
    removeStorefront: (state, action) => {
      state.storefrontsData = state.storefrontsData.filter(
        item => item.country !== action.payload
      );
    },
    
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    
    setMapConfig: (state, action) => {
      state.mapConfig = { ...state.mapConfig, ...action.payload };
    },
    
    // NEW: Normal reducers for dashboard data (NO THUNKS)
    setSummary: (state, action) => {
      state.summary = action.payload;
    },
    
    setTopList: (state, action) => {
      state.topList = action.payload;
    },
    
    setTrends: (state, action) => {
      state.trends = action.payload;
    }
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(fetchStorefrontsData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStorefrontsData.fulfilled, (state, action) => {
        state.loading = false;
        state.storefrontsData = action.payload;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchStorefrontsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { 
  addStorefront, 
  updateStorefront, 
  removeStorefront, 
  setFilters, 
  setMapConfig,
  // NEW EXPORTS
  setSummary,
  setTopList,
  setTrends
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
