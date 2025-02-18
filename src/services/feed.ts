import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFeedsApi, TFeedsResponse } from '@api';

export interface IFeedState extends Omit<TFeedsResponse, 'success'> {
  isLoading: boolean;
}

const initialState: IFeedState = {
  isLoading: false,
  orders: [],
  totalToday: 0,
  total: 0
};

export const getOrdersAll = createAsyncThunk('feed/getOrdersAll', () =>
  getFeedsApi()
);

export const feed = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrdersAll.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrdersAll.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getOrdersAll.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.isLoading = false;
      });
  },
  selectors: {
    getFeedSelector: (state) => state
  }
});

export const { getFeedSelector } = feed.selectors;
