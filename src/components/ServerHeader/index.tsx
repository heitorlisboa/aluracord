import * as Dialog from '@radix-ui/react-dialog';
import clsx from 'clsx';

import styles from './ServerHeader.module.scss';

import type { UserResponse } from '@/types';

import { Navigations } from '../Navigations';
import { UserList } from '../UserList';

type ServerHeaderProps = {
  channel: string;
  users: UserResponse[];
};

export function ServerHeader({ channel, users }: ServerHeaderProps) {
  return (
    <section className={styles.header} aria-label="Cabeçalho do canal">
      <Dialog.Root>
        <Dialog.Trigger className={styles.mobileMenuButton}>
          <span className="sr-only">Menu</span>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className={styles.dialogOverlay} />
          <div className={styles.dialogContentContainer}>
            <Dialog.Content className={styles.dialogContent}>
              <Navigations />
            </Dialog.Content>
          </div>
        </Dialog.Portal>
      </Dialog.Root>

      <h2 className={styles.title}>{channel}</h2>

      <Dialog.Root>
        <Dialog.Trigger className={styles.mobileUserListButton}>
          <span className="sr-only">Lista de usuários</span>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className={styles.dialogOverlay} />
          <div className={styles.dialogContentContainer}>
            <Dialog.Content
              className={clsx(
                styles.dialogContent,
                styles.dialogContentRightSide
              )}
            >
              <UserList
                className={styles.userList}
                channel={channel}
                users={users}
              />
            </Dialog.Content>
          </div>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
}
