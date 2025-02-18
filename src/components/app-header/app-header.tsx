import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { getAuthUserSelector } from '../../services/auth';

export const AppHeader: FC = () => {
  const user = useSelector(getAuthUserSelector);

  return <AppHeaderUI userName={user?.name} />;
};
