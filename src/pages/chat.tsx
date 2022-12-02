import { useContext } from 'react';
import { unstable_getServerSession } from 'next-auth';
import type { GetServerSideProps } from 'next';

import styles from '@/styles/pages/Chat.module.scss';

import { useStore } from '@/lib/Store';
import { MobileContext } from '@/lib/MobileContext';
import { UserInfoProvider } from '@/lib/UserInfoContext';

import { ServerHeader } from '@/components/ServerHeader';
import { ServerChat } from '@/components/ServerChat';
import { UserList } from '@/components/UserList';
import { Navigations } from '@/components/Navigations';

import { authOptions } from './api/auth/[...nextauth]';

const channelName = 'Geral';

export default function ChatPage() {
  const { messages, users, isLoadingMessages } = useStore();
  const { containerRef } = useContext(MobileContext);

  return (
    <UserInfoProvider>
      <div className={styles.primaryContainer} ref={containerRef}>
        <Navigations />
        <div className={styles.secondaryContainer}>
          <ServerHeader channel={channelName} />

          <ServerChat
            channel={channelName}
            messages={messages}
            isLoadingMessages={isLoadingMessages}
          />

          <UserList channel={channelName} users={users} />
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
