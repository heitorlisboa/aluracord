import styles from './UserCard.module.scss';

import { Dialog } from '@/components/Dialog';
import { ProfileDialog } from '@/components/ProfileDialog';

type UserCardProps = {
  username: string;
};

export function UserCard({ username }: UserCardProps) {
  return (
    <li className={styles.card}>
      <Dialog.Root
        trigger={
          <Dialog.Trigger aria-roledescription="Abre o perfil do usuário">
            <img
              className={styles.avatar}
              src={`https://github.com/${username}.png`}
              alt={`Foto de perfil de ${username}`}
            />
            <span className={styles.username}>{username}</span>
          </Dialog.Trigger>
        }
        content={<ProfileDialog username={username} />}
      />
    </li>
  );
}
