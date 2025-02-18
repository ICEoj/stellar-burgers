import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { getBurgerConstructorSelector } from '../../services/burger-constructor';
import {
  createOrder,
  getCreateOrderSelector,
  resetOrder
} from '../../services/orders';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();

  const constructorItems = useSelector(getBurgerConstructorSelector);

  const { isLoading: orderRequest, order: orderModalData } = useSelector(
    getCreateOrderSelector
  );

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    dispatch(createOrder(constructorItems.ingredients.map(({ id }) => id)));
  };

  const closeOrderModal = () => {
    dispatch(resetOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
