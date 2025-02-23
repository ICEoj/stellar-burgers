import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getOrders, getOrdersSelector } from '../../services/orders';
import { Outlet } from 'react-router-dom';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  const orders = useSelector(getOrdersSelector);

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  return (
    <>
      <ProfileOrdersUI orders={orders} />
      <Outlet />
    </>
  );
};
