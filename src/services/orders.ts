import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';

/**
 * @description Состояние хранилища заказов.
 * */
export interface IOrdersState {
  /**
   * @description Заказы.
   * */
  orders: TOrder[];

  /**
   * @description Флаг загрузки заказов или заказа.
   * */
  isLoading: boolean;

  /**
   * @description Заказ.
   * */
  order: TOrder | null;
}

/**
 * @description Изначальное состояние хранилища заказов.
 * */
export const initialState: IOrdersState = {
  orders: [],
  isLoading: false,
  order: null
};

/**
 * @description Получить заказы.
 * */
export const getOrders = createAsyncThunk('orders/getOrders', getOrdersApi);

/**
 * @description Создать заказ.
 * */
export const createOrder = createAsyncThunk(
  'orders/createOrder',
  orderBurgerApi
);

/**
 * @description Получить заказ по номеру.
 * */
export const getOrder = createAsyncThunk(
  'orders/getOrder',
  getOrderByNumberApi
);

/**
 * @description Хранилище заказов.
 * */
export const orders = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.order = null;
    }
  },
  extraReducers: (builder) => {
    /// Получить заказы.
    builder
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      });

    /// Создание заказа.
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.order = action.payload.order;
        state.isLoading = false;
      });

    /// Получения заказа по номеру.
    builder
      .addCase(getOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrder.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.order = action.payload.orders.at(0) || null;
        state.isLoading = false;
      });
  },
  selectors: {
    getOrdersSelector: ({ orders }) => orders,
    getCreateOrderSelector: ({ isLoading, order }) => ({
      isLoading,
      order
    })
  }
});

export const { resetOrder } = orders.actions;

/**
 * @description Селекторы хранилища заказов.
 * */
export const { getOrdersSelector, getCreateOrderSelector } = orders.selectors;
