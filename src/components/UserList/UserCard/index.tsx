import { useContext, useRef } from 'react';

import styles from './UserCard.module.scss';

import { ProfileContext } from '@/lib/ProfileContext';

import type { ProfileContextType } from '@/types';

type UserCardProps = {
  username: string;
  onClickHandler: () => void;
};

export function UserCard({ username, onClickHandler }: UserCardProps) {
  const { handleClickIn } = useContext(ProfileContext) as ProfileContextType;

  const profileButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <li className={styles.card}>
      <button
        aria-roledescription="Abre o perfil do usuário"
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
}
