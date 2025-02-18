import { FC } from 'react';

import { useSelector } from '../../services/store';
import { useNavigate, useParams } from 'react-router-dom';
import { IngredientDetailsUI, Preloader } from '@ui';
import { Modal } from '@components';

export const IngredientDetails: FC = () => {
  const { ingredientId } = useParams();

  const navigate = useNavigate();

  const ingredientData = useSelector((state) =>
    state.dictionaries.ingredients.find(({ _id }) => _id === ingredientId)
  );

  if (!ingredientData) return <Preloader />;

  return (
    <Modal title='' onClose={() => navigate(-1)}>
      <IngredientDetailsUI ingredientData={ingredientData} />
    </Modal>
  );
};
