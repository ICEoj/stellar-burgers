import { TOrder } from '@utils-types';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '../store';
import { getOrdersAll } from '../feed';

const order: TOrder = {
  _id: '67c35edd133acd001be54944',
  ingredients: [
    '643d69a5c3f7b9001cfa093d',
    '643d69a5c3f7b9001cfa093e',
    '643d69a5c3f7b9001cfa0949',
    '643d69a5c3f7b9001cfa093d'
  ],
  status: 'done',
  name: 'Экзо-плантаго флюоресцентный люминесцентный бургер',
  createdAt: '2025-03-01T19:24:13.719Z',
  updatedAt: '2025-03-01T19:24:14.737Z',
  number: 69762
};

jest.mock('@api', () => ({
  getFeedsApi: jest.fn(() =>
    Promise.resolve({
      orders: [order],
      totalToday: 1,
      total: 1
    })
  )
}));

describe('feed', () => {
  let store = configureStore({
    reducer: rootReducer
  });

  beforeEach(() => {
    store = configureStore({
      reducer: rootReducer
    });
  });

  it('Получение всех заказов', async () => {
    await store.dispatch(getOrdersAll());

    const { feed } = store.getState();

    expect(feed.orders).toEqual([order]);
    expect(feed.total).toEqual(1);
    expect(feed.totalToday).toEqual(1);
    expect(feed.isLoading).toBeFalsy();
  });
});
