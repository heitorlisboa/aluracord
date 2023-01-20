import { unstable_getServerSession } from 'next-auth';
import type { GetServerSideProps } from 'next';

import styles from '@/styles/pages/Chat.module.scss';

import { useStore } from '@/lib/Store';
import { UserInfoProvider } from '@/lib/UserInfoContext';

import { ServerHeader } from '@/components/ServerHeader';
import { ServerChat } from '@/components/ServerChat';
import { UserList } from '@/components/UserList';
import { Navigations } from '@/components/Navigations';

import { authOptions } from './api/auth/[...nextauth]';

const channelName = 'Geral';

export default function ChatPage() {
  const { messages, users, isLoadingMessages } = useStore();

  return (
    <UserInfoProvider>
      <div className={styles.primaryContainer}>
        <div className={styles.backdrop} />
        <Navigations className={styles.desktopOnlyMenu} />
        <div className={styles.secondaryContainer}>
          <ServerHeader channel={channelName} users={users} />

          <ServerChat
            channel={channelName}
            messages={messages}
            isLoadingMessages={isLoadingMessages}
          />

          <UserList
            className={styles.desktopOnlyMenu}
            channel={channelName}
            users={users}
          />
        </div>
      </div>
    </UserInfoProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
