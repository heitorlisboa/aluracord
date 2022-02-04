import { useContext } from "react";
import ProfileContext from "../../../lib/ProfileContext";
import type { FC } from "react";
import type { ProfileContextInterface } from "../../../types";
import styles from "./UserCard.module.scss";

interface UserCardProps {
  username: string;
  onClickHandler: () => void;
}

const UserCard: FC<UserCardProps> = ({ username, onClickHandler }) => {
  const { handleClickIn } = useContext(
    ProfileContext
  ) as ProfileContextInterface;

  return (
    <li
      className={styles.card}
      onClick={() => {
        onClickHandler();
        handleClickIn(username);
      }}
    >
      <img
        className={styles.avatar}
        src={`https://github.com/${username}.png`}
        alt={`Foto de perfil de ${username}`}
      />
      <span className={styles.username}>{username}</span>
    </li>
  );
};

export default UserCard;