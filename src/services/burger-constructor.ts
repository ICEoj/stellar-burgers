import { createAction, createSlice, PrepareAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { v4 } from 'uuid';

/**
 * @description Состояние хранилища конструктора бургера.
 */
export interface IBurgerConstructorState {
  /**
   * @description Выбранная булка бургера.
   * */
  bun: TConstructorIngredient | null;
  /**
   * @description Ингредиенты бургера.
   * */
  ingredients: TConstructorIngredient[];
}

/**
 * @description Изначальное состояние хранилища конструктора бургера.
 * */
export const initialState: IBurgerConstructorState = {
  bun: null,
  ingredients: []
};

/**
 * @description Добавление ингредиента в хранилище конструктора бургера.
 * */
export const addIngredient = createAction<
  PrepareAction<TConstructorIngredient>
>('burgerConstructor/addIngredient', (data: TIngredient) => ({
  payload: {
    ...data,
    id: v4()
  }
}));

/**
 * @description Удаление ингредиента из хранилища конструктора бургера.
 */
export const removeIngredient = createAction(
  'burgerConstructor/removeIngredient',
  (ingredientId: string) => ({
    payload: ingredientId
  })
);

/**
 * @description Перемещение ингредиента в хранилище конструктора бургера.
 * */
export const moveIngredient = createAction(
  'burgerConstructor/moveIngredient',
  (ingredientId: string, direction: 'up' | 'down') => ({
    payload: {
      ingredientId,
      direction
    }
  })
);

/**
 * @description Хранилище конструктора бургера.
 * */
export const burgerConstructor = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    resetBurgerConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  },
  extraReducers: (builder) => {
    // Добавление ингредиента в хранилище конструктора бургера.
    builder.addCase(addIngredient, (state, action) => {
      if (action.payload.type === 'bun') state.bun = action.payload;
      else state.ingredients.push(action.payload);
    });

    // Удаление ингредиента из хранилища конструктора бургера.
    builder.addCase(removeIngredient, (state, action) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    });

    // Перемещение ингредиента в хранилище конструктора бургера.
    builder.addCase(moveIngredient, (state, action) => {
      const { ingredientId, direction } = action.payload;
      const ingredientIndex = state.ingredients.findIndex(
        (ingredient) => ingredient.id === ingredientId
      );

      if (ingredientIndex === -1) return;

      const ingredient = state.ingredients[ingredientIndex];
      state.ingredients.splice(ingredientIndex, 1);

      // Перемещение ингредиента вверх.
      if (direction === 'up')
        state.ingredients.splice(ingredientIndex - 1, 0, ingredient);

      // Перемещение ингредиента вниз.
      if (direction === 'down')
        state.ingredients.splice(ingredientIndex + 1, 0, ingredient);
    });
  },
  selectors: {
    getBurgerConstructorSelector: (state) => state
  }
});

/**
 * @description Селекторы хранилища конструктора бургера.
 * */
export const { getBurgerConstructorSelector } = burgerConstructor.selectors;

export const { resetBurgerConstructor } = burgerConstructor.actions;
