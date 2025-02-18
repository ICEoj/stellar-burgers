import { useDispatch } from '../../services/store';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader } from '@components';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { getAuthUser } from '../../services/auth';
import { getIngredients } from '../../services/dictionaries';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAuthUser());
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Outlet />
    </div>
  );
};

export default App;
