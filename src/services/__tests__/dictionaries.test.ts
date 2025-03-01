import { getIngredients } from '../dictionaries';
import { TIngredient } from '@utils-types';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '../store';

const ingredient: TIngredient = {
  _id: '1',
  name: 'Краторная булка N-200i',
  type: 'main',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
};

jest.mock('@api', () => ({
  getIngredientsApi: jest.fn(() => Promise.resolve([ingredient]))
}));

describe('dictionaries', () => {
  let store = configureStore({
    reducer: rootReducer
  });

  beforeEach(() => {
    store = configureStore({
      reducer: rootReducer
    });
  });

  it('Получение всех ингредиентов', async () => {
    await store.dispatch(getIngredients());

    const { dictionaries } = store.getState();

    expect(dictionaries.ingredients).toEqual([ingredient]);
    expect(dictionaries.isLoading).toBeFalsy();
  });
});
