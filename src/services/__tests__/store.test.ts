import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '../store';

describe('rootReducer', () => {
  it('Проверка инициализации', () => {
    const store = configureStore({
      reducer: rootReducer
    });

    const UNKNOWN_ACTION = {
      type: 'UNKNOWN_ACTION'
    };

    const state = rootReducer(undefined, UNKNOWN_ACTION);

    expect(state).toEqual(store.getState());
  });
});
