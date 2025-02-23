import { Modal, OrderInfo as OrderInfoComponent } from '@components';
import { useDispatch, useSelector } from '../../services/store';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getCreateOrderSelector,
  getOrder,
  resetOrder
} from '../../services/orders';

export const OrderInfo = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { order, isLoading } = useSelector(getCreateOrderSelector);

  useEffect(() => {
    id && dispatch(getOrder(Number(id)));

    return () => {
      dispatch(resetOrder());
    };
  }, []);

  if (isLoading) return null;

  return (
    <Modal
      title={`#${order?.number && order?.number.toString().padStart(6, '0')}`}
      onClose={() => navigate(-1)}
    >
      <OrderInfoComponent />
    </Modal>
  );
};
