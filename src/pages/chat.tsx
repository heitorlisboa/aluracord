import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';

import styles from '@/styles/pages/Chat.module.scss';

import { useStore } from '@/lib/Store';
import { useProfile } from '@/lib/Profile';
import { UserContext } from '@/lib/UserContext';
import { ProfileContext } from '@/lib/ProfileContext';
import { MobileContext } from '@/lib/MobileContext';

import { ServerHeader } from '@/components/ServerHeader';
import { ServerChat } from '@/components/ServerChat';
import { UserList } from '@/components/UserList';
import { ProfileCard } from '@/components/ProfileCard';
import { Navigations } from '@/components/Navigations';

const channelName = 'Geral';

export default function ChatPage() {
  const router = useRouter();
  const currentUser = router.query.username;
  const { messages, users } = useStore();
  const profile = useProfile();
  const { containerRef } = useContext(MobileContext);

  useEffect(() => {
    if (!currentUser) router.replace('/');
  }, []);

  return (
    <UserContext.Provider value={{ currentUser: currentUser as string }}>
      <ProfileContext.Provider
        value={{
          handleClickIn: profile.handleClickIn,
          handleClickOut: profile.handleClickOut,
        }}
      >
        <div className={styles.primaryContainer} ref={containerRef}>
          <Navigations />
          <div className={styles.secondaryContainer}>
            <ServerHeader channel={channelName} />

            <ServerChat channel={channelName} messages={messages} />

            <UserList channel={channelName} users={users} />
          </div>
          {profile.isVisible && (
            <ProfileCard userInfo={profile.userInfo} ref={profile.ref} />
          )}
        </div>
      </ProfileContext.Provider>
    </UserContext.Provider>
  );
}
