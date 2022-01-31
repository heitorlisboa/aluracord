import React from "react";
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

const UserList = React.forwardRef<HTMLDivElement, UserListProps>(
  ({ channel, users }, ref) => {
    return (
      <aside
        className={styles.sidebar}
        aria-label={`Lista de membros para ${channel} (canal)`}
        ref={ref}
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
);

UserList.displayName = "UserList";

export default UserList;
