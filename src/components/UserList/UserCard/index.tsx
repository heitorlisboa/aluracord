import { useContext, useRef } from "react";
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

  const profileButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <li className={styles.card}>
      <button
        aria-description="Abre o perfil do usuário"
        aria-expanded="false"
        onClick={() => {
          onClickHandler();
          handleClickIn(username, profileButtonRef);
        }}
        ref={profileButtonRef}
      >
        <img
          className={styles.avatar}
          src={`https://github.com/${username}.png`}
          alt={`Foto de perfil de ${username}`}
        />
        <span className={styles.username}>{username}</span>
      </button>
    </li>
  );
};

export default UserCard;
