import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

/**
 * @description Состояние хранилища справочников.
 * */
export interface IDictionariesState {
  /**
   * @description Список ингредиентов.
   * */
  ingredients: TIngredient[];

  /**
   * @description Флаг загрузки.
   * */
  isLoading: boolean;
}

/**
 * @description Изначальное состояние хранилища справочников.
 * */
export const initialState: IDictionariesState = {
  ingredients: [],
  isLoading: false
};

/**
 * @description Получить список ингредиентов.
 * */
export const getIngredients = createAsyncThunk(
  'dictionaries/getIngredients',
  () => getIngredientsApi()
);

/**
 * @description Хранилище справочников.
 * */
export const dictionaries = createSlice({
  name: 'dictionaries',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Получить список ингредиентов.
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getIngredients.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.isLoading = false;
      });
  },
  selectors: {
    getDictionariesSelector: (state) => state,
    getIngredientsByTypeSelector: (state) => ({
      buns: state.ingredients.filter((item) => item.type === 'bun'),
      mains: state.ingredients.filter((item) => item.type === 'main'),
      sauces: state.ingredients.filter((item) => item.type === 'sauce')
    })
  }
});

/**
 * @description Селекторы хранилища справочников.
 * */
export const { getDictionariesSelector, getIngredientsByTypeSelector } =
  dictionaries.selectors;
