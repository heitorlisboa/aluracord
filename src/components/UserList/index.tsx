import React, { useContext } from "react";
import MobileContext from "../../lib/MobileContext";
import useOutsideListener from "../../lib/OutsideListener";
import type { FC, RefObject } from "react";
import type { MobileContextInterface, UserResponse } from "../../types";
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

const UserList = React.forwardRef<HTMLDivElement, UserListProps>(
  ({ channel, users }, ref) => {
    const context = useContext(MobileContext) as MobileContextInterface;

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

    useOutsideListener(ref as RefObject<HTMLDivElement>, handleCloseUserList);

    return (
      <aside
        className={styles.sidebar}
        aria-label={`Lista de membros para ${channel} (canal)`}
        ref={ref}
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
);

UserList.displayName = "UserList";

export default UserList;
