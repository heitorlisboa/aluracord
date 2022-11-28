import * as Dialog from '@radix-ui/react-dialog';

import styles from './UserCard.module.scss';

import { ProfileDialog } from '@/components/ProfileDialog';

type UserCardProps = {
  username: string;
  onClickHandler: () => void;
};

export function UserCard({ username, onClickHandler }: UserCardProps) {
  return (
    <li className={styles.card}>
      <Dialog.Root>
        <Dialog.Trigger
          aria-roledescription="Abre o perfil do usuário"
          onClick={onClickHandler}
        >
          <img
            className={styles.avatar}
            src={`https://github.com/${username}.png`}
            alt={`Foto de perfil de ${username}`}
          />
          <span className={styles.username}>{username}</span>
        </Dialog.Trigger>

        <ProfileDialog username={username} />
      </Dialog.Root>
    </li>
  );
}
