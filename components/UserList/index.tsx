import { FC } from "react";
import styles from "./UserList.module.scss";

interface UserListProps {
  channel?: string;
}

const UserList: FC<UserListProps> = ({ channel }) => {
  return (
    <aside
      className={styles.userList}
      aria-label={
        channel ? `Lista de membros para ${channel} (canal)` : "Atividade dos amigos"
      }
    ></aside>
  );
};

export default UserList;
