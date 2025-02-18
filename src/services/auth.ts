import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  TAuthResponse,
  updateUserApi
} from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../utils/cookie';

/**
 * @description Установка данных аутентификации.
 * */
const setAuthData = ({ accessToken, refreshToken }: TAuthResponse) => {
  setCookie('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
};

/**
 * @description Регистрация пользователя.
 * */
export const register = createAsyncThunk(
  'auth/register',
  async (data: TRegisterData) => {
    const response = await registerUserApi(data);

    setAuthData(response);

    return response.user;
  }
);

/**
 * @description Вход пользователя.
 * */
export const login = createAsyncThunk(
  'auth/login',
  async (data: TLoginData) => {
    const response = await loginUserApi(data);

    setAuthData(response);

    return response.user;
  }
);

/**
 * @description Получение данных пользователя.
 * */
export const getAuthUser = createAsyncThunk('auth/getAuthUser', () =>
  getUserApi().then(({ user }) => user)
);

/**
 * @description Выход пользователя.
 * */
export const logout = createAsyncThunk('auth/logout', async () => {
  await logoutApi();
  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
});

/**
 * @description Обновление данных пользователя.
 * */
export const updateAuthUser = createAsyncThunk(
  'auth/updateAuthUser',
  (data: Partial<TRegisterData>) => updateUserApi(data).then(({ user }) => user)
);

/**
 * @description Состояние хранилища авторизации.
 * */
interface IAuthState {
  /**
   * @description Пользователь.
   * */
  user: TUser | null;

  /**
   * @description Текст ошибки.
   * */
  errorText?: string;
}

/**
 * @description Изначальное состояние хранилища авторизации.
 * */
const initialState: IAuthState = {
  user: null
};

/**
 * @description Хранилище авторизации.
 * */
export const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Регистрация пользователя.
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.user = null;
        state.errorText = action.error.message;
      });

    // Вход пользователя.
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.user = null;
        state.errorText = action.error.message;
      });

    // Аутентификация пользователя.
    builder.addCase(getAuthUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });

    // Выход пользователя.
    builder.addCase(logout.fulfilled, (state) => {
      state.user = null;
    });

    // Обновление данных пользователя.
    builder.addCase(updateAuthUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
  selectors: {
    getAuthErrorTextSelector: (state) => state.errorText,
    getAuthUserSelector: (state) => state.user
  }
});

export const { getAuthErrorTextSelector, getAuthUserSelector } = auth.selectors;
