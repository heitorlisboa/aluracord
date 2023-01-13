import { type PropsWithChildren } from 'react';
import clsx from 'clsx';

import styles from './UserList.module.scss';

import type { UserResponse } from '@/types';

import { UserCard } from './UserCard';

type UserListWrapperProps = PropsWithChildren<unknown>;

function UserListWrapper({ children }: UserListWrapperProps) {
  return (
    <div className={styles.listWrapper}>
      <div className={styles.scroller}>{children}</div>
    </div>
  );
}

type UserListProps = {
  className?: string;
  channel: string;
  users: UserResponse[];
};

export function UserList({ className, channel, users }: UserListProps) {
  return (
    <aside
      id="user-list"
      className={clsx(styles.sidebar, className)}
      aria-label={`Lista de membros para ${channel} (canal)`}
    >
      <UserListWrapper>
        <ul className={styles.scrollerInner} aria-label="Membros">
          {users.map((user) => (
            <UserCard key={user.id} username={user.username} />
          ))}
        </ul>
      </UserListWrapper>
    </aside>
  );
}
