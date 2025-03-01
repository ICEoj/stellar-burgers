import {
  dictionaries,
  getIngredients,
  IDictionariesState
} from '../dictionaries';
import { TIngredient } from '@utils-types';

describe('dictionaries', () => {
  it('Получение всех ингредиентов', async () => {
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

    const action = {
      type: getIngredients.fulfilled.type,
      payload: [ingredient]
    };

    const initialState: IDictionariesState = {
      ingredients: [],
      isLoading: false
    };

    const expected = dictionaries.reducer(initialState, action);

    const actual = {
      ...initialState,
      ingredients: [ingredient]
    };

    expect(expected).toEqual(actual);
    expect(expected.isLoading).toBeFalsy();
  });
});
