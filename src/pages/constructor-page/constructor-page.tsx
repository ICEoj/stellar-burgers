import styles from './constructor-page.module.css';

import { BurgerIngredients } from '@components';
import { BurgerConstructor } from '@components';
import { Preloader } from '@ui';
import { FC } from 'react';
import { useSelector } from '../../services/store';
import { getDictionariesSelector } from '../../services/dictionaries';
import { Outlet } from 'react-router-dom';

export const ConstructorPage: FC = () => {
  const { isLoading } = useSelector(getDictionariesSelector);

  if (isLoading) return <Preloader />;

  return (
    <main className={styles.containerMain}>
      <h1
        className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
      >
        Соберите бургер
      </h1>
      <div className={`${styles.main} pl-5 pr-5`}>
        <BurgerIngredients />
        <BurgerConstructor />
        <Outlet />
      </div>
    </main>
  );
};
