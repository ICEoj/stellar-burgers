import {
  burgerConstructor,
  addIngredient,
  initialState,
  moveIngredient,
  removeIngredient,
  IBurgerConstructorState
} from '../burger-constructor';
import { TConstructorIngredient, TIngredient } from '@utils-types';

describe('burgerConstructor', () => {
  const mockedIngredient: TIngredient = {
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

  const mockedConstructorIngredient: TConstructorIngredient = {
    ...mockedIngredient,
    id: '1'
  };

  it('Добавление ингредиента', () => {
    const addState = burgerConstructor.reducer(
      initialState,
      addIngredient(mockedIngredient)
    );

    const { id, ...expected } = addState.ingredients[0];

    expect(expected).toEqual(mockedIngredient);
  });

  it('Удаление ингредиента', () => {
    const initialState: IBurgerConstructorState = {
      bun: null,
      ingredients: [mockedConstructorIngredient]
    };

    const expected = burgerConstructor.reducer(
      initialState,
      removeIngredient('1')
    );

    const actual = {
      ...initialState,
      ingredients: []
    };

    expect(expected).toEqual(actual);
  });

  it('Изменение порядка ингредиентов', () => {
    const ingredient1 = mockedConstructorIngredient;
    const ingredient2 = { ...mockedConstructorIngredient, _id: '2', id: '2' };

    const initialState: IBurgerConstructorState = {
      bun: null,
      ingredients: [ingredient1, ingredient2]
    };

    const expected = burgerConstructor.reducer(
      initialState,
      moveIngredient(ingredient2.id, 'up')
    );

    expect(expected.ingredients[0]).toEqual(ingredient2);
    expect(expected.ingredients[1]).toEqual(ingredient1);
  });
});
