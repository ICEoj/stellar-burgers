import { configureStore } from '@reduxjs/toolkit';
import { getAuthUser, login, register } from '../auth';
import { rootReducer } from '../store';
import { TUser } from '@utils-types';

const NAME = 'Ivanov Ivan'
const EMAIL = 'ivanov.ivan@yandex.ru';
const PASSWORD = 'password';

const user: TUser = {
  email: EMAIL,
  name: NAME
};

jest.mock('../../utils/cookie', () => ({
  setCookie: jest.fn()
}));

global.localStorage = {
  setItem: jest.fn(),
  getItem: jest.fn(() => null),
  removeItem: jest.fn(),
  clear: jest.fn(),
  length: 0,
  key: jest.fn((index: number) => null)
};

jest.mock('@api', () => ({
  getUserApi: jest.fn(() =>
    Promise.resolve({
      user
    })
  ),
  loginUserApi: jest.fn(() =>
    Promise.resolve({
      user,
      accessToken: 'accessToken',
      refreshToken: 'refreshToken'
    })
  )
}));

describe('auth', () => {
  let store = configureStore({
    reducer: rootReducer
  });

  beforeEach(() => {
    store = configureStore({
      reducer: rootReducer
    });
  });

  it('Регистрация пользователя', async () => {
    await store.dispatch(
      register({
        name: NAME,
        email: EMAIL,
        password: PASSWORD
      })
    );

    const { auth } = store.getState();

    expect(auth.user).toEqual(user);
  });

  it('Вход пользователя', async () => {
    await store.dispatch(
      login({
        email: EMAIL,
        password: PASSWORD
      })
    );

    const { auth } = store.getState();

    expect(auth.user).toEqual(user);
  });

  it('Получение данных авторизированного пользователя', async () => {
    await store.dispatch(getAuthUser());

    const { auth } = store.getState();

    expect(auth.user).toEqual(user);
  });
});
