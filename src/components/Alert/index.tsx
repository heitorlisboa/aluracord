import React from 'react';

import styles from './Alert.module.scss';

import type { TypeOfAlert } from '@/types';

type AlertProps = TypeOfAlert & React.HTMLAttributes<HTMLDivElement>;

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ type, children }, ref) => {
    return (
      <div className={`${styles.container} ${styles[type]} fade-in`} ref={ref}>
        {children}
      </div>
    );
  }
);

Alert.displayName = 'Alert';

export default Alert;
