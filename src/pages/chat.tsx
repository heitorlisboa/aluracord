import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';

import styles from '@/styles/pages/Chat.module.scss';

import { useStore } from '@/lib/Store';
import { UserContext } from '@/lib/UserContext';
import { MobileContext } from '@/lib/MobileContext';

import { ServerHeader } from '@/components/ServerHeader';
import { ServerChat } from '@/components/ServerChat';
import { UserList } from '@/components/UserList';
import { Navigations } from '@/components/Navigations';

const channelName = 'Geral';

export default function ChatPage() {
  const router = useRouter();
  const currentUser = router.query.username;
  const { messages, users, isLoadingMessages } = useStore();
  const { containerRef } = useContext(MobileContext);

  useEffect(() => {
    if (!currentUser) router.replace('/');
  }, []);

  return (
    <UserContext.Provider value={{ currentUser: currentUser as string }}>
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
    </UserContext.Provider>
  );
}
