import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getOrdersAll, getFeedSelector } from '../../services/feed';
import { Outlet } from 'react-router-dom';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  const { orders } = useSelector(getFeedSelector);

  const handleGetFeeds = useCallback(() => {
    dispatch(getOrdersAll());
  }, []);

  useEffect(handleGetFeeds, []);

  if (!orders.length) return <Preloader />;

  return (
    <>
      <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />
      <Outlet />
    </>
  );
};
