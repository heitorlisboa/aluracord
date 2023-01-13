import clsx from 'clsx';

import styles from './Navigations.module.scss';

import { ServerList } from './ServerList';
import { ServerInsideNav } from './ServerInsideNav';

type NavigationsProps = {
  className?: string;
};

export function Navigations({ className }: NavigationsProps) {
  return (
    <div id="navigations" className={clsx(styles.container, className)}>
      <ServerList />
      <ServerInsideNav />
    </div>
  );
}
