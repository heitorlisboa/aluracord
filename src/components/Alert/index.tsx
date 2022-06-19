import { forwardRef, type HTMLAttributes } from 'react';

import styles from './Alert.module.scss';

import type { TypeOfAlert } from '@/types';

type AlertProps = TypeOfAlert & HTMLAttributes<HTMLDivElement>;

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ type, children }, ref) => {
    return (
      <div className={`${styles.container} ${styles[type]} fade-in`} ref={ref}>
        {children}
      </div>
    );
  }
);

Alert.displayName = 'Alert';
