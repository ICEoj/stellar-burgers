import { FC } from 'react';
import clsx from 'clsx';

import classes from './not-found-404.module.css';

export const NotFound404: FC = () => (
  <h3 className={clsx(`pb-6 text text_type_main-large`, classes.root)}>
    Страница не найдена. Ошибка 404.
  </h3>
);
