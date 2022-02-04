import React, { useContext } from "react";
import MobileContext from "../../lib/MobileContext";
import useOutsideListener from "../../lib/OutsideListener";
import type { FC } from "react";
import type { UserResponse } from "../../types";
import styles from "./UserList.module.scss";

import UserCard from "./UserCard";

const UserListWrapper: FC = ({ children }) => (
  <div className={styles.listWrapper}>
    <div className={styles.scroller}>{children}</div>
  </div>
);

interface UserListProps {
  channel: string;
  users: UserResponse[];
}

const UserList: FC<UserListProps> = ({ channel, users }) => {
  const context = useContext(MobileContext);

  function handleCloseUserList() {
    const userListElement = context.userListRef.current;
    const containerElement = context.containerRef.current;

    const otherElement = context.navigationsRef.current;
    const otherElementIsActive = otherElement?.classList.value.includes(
      context.activeNavigationsClass
    );

    if (userListElement && containerElement && !otherElementIsActive) {
      userListElement.classList.remove(context.activeUserListClass);
      containerElement.classList.remove(context.disabledContainerClass);
    }
  }

  useOutsideListener(context.userListRef, handleCloseUserList);

  return (
    <aside
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
};

UserList.displayName = "UserList";

export default UserList;
