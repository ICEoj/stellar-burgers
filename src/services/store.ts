import { combineSlices, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { auth } from './auth';
import { orders } from './orders';
import { dictionaries } from './dictionaries';
import { burgerConstructor } from './burger-constructor';
import { feed } from './feed';

const rootReducer = combineSlices(
  auth,
  orders,
  dictionaries,
  burgerConstructor,
  feed
);

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
