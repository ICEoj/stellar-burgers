import { OrderInfo as OrderInfoComponent } from '@components';
import { useDispatch } from '../../services/store';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getOrder, resetOrder } from '../../services/orders';
import classes from './order-info.module.css';

export const OrderInfo = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    id && dispatch(getOrder(Number(id)));

    return () => {
      dispatch(resetOrder());
    };
  }, []);

  return (
    <div className={classes.root}>
      <OrderInfoComponent />
    </div>
  );
};
