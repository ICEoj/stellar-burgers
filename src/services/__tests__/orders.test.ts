import { TOrder } from '@utils-types';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '../store';
import { createOrder, getOrder, getOrders } from '../orders';
import { getOrderByNumberApi } from '@api';

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
  getOrdersApi: jest.fn(() => Promise.resolve([order])),
  getOrderByNumberApi: jest.fn(() => Promise.resolve({ orders: [order] })),
  orderBurgerApi: jest.fn(() =>
    Promise.resolve({
      success: true,
      name: 'Краторный spicy био-марсианский бургер',
      order
    })
  )
}));

describe('orders', () => {
  let store = configureStore({
    reducer: rootReducer
  });

  beforeEach(() => {
    store = configureStore({
      reducer: rootReducer
    });
  });

  it('Получение списка заказов пользователя', async () => {
    await store.dispatch(getOrders());

    const { orders } = store.getState();

    expect(orders.orders).toEqual([order]);
    expect(orders.order).toBeNull();
    expect(orders.isLoading).toBeFalsy();
  });

  it('Создание заказа', async () => {
    await store.dispatch(createOrder(order.ingredients));

    const { orders } = store.getState();

    expect(orders.orders).toEqual([]);
    expect(orders.order).toEqual(order);
    expect(orders.isLoading).toBeFalsy();
  });

  it('Получение информации по заказу', async () => {
    await store.dispatch(getOrder(order.number));

    const { orders } = store.getState();

    expect(orders.orders).toEqual([]);
    expect(orders.order).toEqual(order);
    expect(orders.isLoading).toBeFalsy();
  });
});
