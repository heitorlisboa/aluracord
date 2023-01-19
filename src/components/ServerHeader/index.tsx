import { signOut } from 'next-auth/react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

import styles from './ServerHeader.module.scss';

import type { UserResponse } from '@/types';

import { Dialog } from '../Dialog';
import { Navigations } from '../Navigations';
import { UserList } from '../UserList';

type ServerHeaderProps = {
  channel: string;
  users: UserResponse[];
};

export function ServerHeader({ channel, users }: ServerHeaderProps) {
  return (
    <section className={styles.header} aria-label="Cabeçalho do canal">
      <Dialog.Root
        trigger={
          <Dialog.Trigger className={styles.mobileMenuButton}>
            <span className="sr-only">Menu</span>
          </Dialog.Trigger>
        }
        content={
          <motion.div
            className={styles.dialogContentContainer}
            initial={{ translateX: '-100%' }}
            animate={{ translateX: '0%' }}
            exit={{ translateX: '-100%' }}
            transition={{ type: 'tween' }}
          >
            <Dialog.Content className={styles.dialogContent}>
              <Navigations />
            </Dialog.Content>
          </motion.div>
        }
      />

      <h2 className={styles.title}>{channel}</h2>

      <button className={styles.signOutButton} onClick={() => signOut()}>
        Sair
      </button>

      <Dialog.Root
        trigger={
          <Dialog.Trigger className={styles.mobileUserListButton}>
            <span className="sr-only">Lista de usuários</span>
          </Dialog.Trigger>
        }
        content={
          <motion.div
            className={styles.dialogContentContainer}
            initial={{ translateX: '100%' }}
            animate={{ translateX: '0%' }}
            exit={{ translateX: '100%' }}
            transition={{ type: 'tween' }}
          >
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
          </motion.div>
        }
      />
    </section>
  );
}
