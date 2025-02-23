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
import { getAuthUserSelector } from '../../services/auth';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const constructorItems = useSelector(getBurgerConstructorSelector);

  const authUser = useSelector(getAuthUserSelector);

  const { isLoading: orderRequest, order: orderModalData } = useSelector(
    getCreateOrderSelector
  );

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!authUser) return navigate('/login');

    dispatch(
      createOrder([
        constructorItems.bun._id,
        ...constructorItems.ingredients.map(({ _id }) => _id),
        constructorItems.bun._id
      ])
    );
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
