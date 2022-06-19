import { useContext, type PropsWithChildren } from 'react';

import styles from './UserList.module.scss';

import { MobileContext } from '@/lib/MobileContext';
import { useOutsideListener } from '@/lib/OutsideListener';

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
  channel: string;
  users: UserResponse[];
};

export function UserList({ channel, users }: UserListProps) {
  const context = useContext(MobileContext);

  function handleCloseUserList() {
    const userListElement = context.userListRef.current;
    const elementIsActive = userListElement?.classList.contains(
      context.activeUserListClass
    );
    if (!elementIsActive) return;

    const userListButton = context.userListButtonRef.current;
    const containerElement = context.containerRef.current;

    const otherElement = context.navigationsRef.current;
    const otherElementIsActive = otherElement?.classList.value.includes(
      context.activeNavigationsClass
    );

    const elementsAreValid =
      userListElement && userListButton && containerElement;

    if (elementsAreValid && !otherElementIsActive) {
      userListElement.classList.remove(context.activeUserListClass);
      userListButton.ariaExpanded = 'false';
      containerElement.classList.remove(context.disabledContainerClass);
    }
  }

  useOutsideListener(context.userListRef, handleCloseUserList);

  return (
    <aside
      id="user-list"
      className={styles.sidebar}
      aria-label={`Lista de membros para ${channel} (canal)`}
      ref={context.userListRef}
    >
      <UserListWrapper>
        <ul className={styles.scrollerInner} aria-label="Membros">
          {users.map((user) => (
            <UserCard
              key={user.id}
              username={user.username}
              onClickHandler={handleCloseUserList}
            />
          ))}
        </ul>
      </UserListWrapper>
    </aside>
  );
}
