import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { useStore } from '../lib/Store';
import { useProfile } from '../lib/Profile';
import UserContext from '../lib/UserContext';
import ProfileContext from '../lib/ProfileContext';
import MobileContext from '../lib/MobileContext';
import type { NextPage } from 'next';
import type { CategoriesObject } from '../types';

import styles from '../styles/pages/Chat.module.scss';

import ServerHeader from '../components/ServerHeader';
import ServerChat from '../components/ServerChat';
import UserList from '../components/UserList';
import ProfileCard from '../components/ProfileCard';
import Navigations from '../components/Navigations';

const Chat: NextPage = () => {
  const router = useRouter();
  const currentUser = router.query.username;
  const [isHome, setIsHome] = useState(false);
  const [isDirectMessage, setIsDirectMessage] = useState(false);
  const [serverTitle, setServerTitle] = useState('Servidor');
  const [channelName, setChannelName] = useState('Geral');
  const [categories, setCategories] = useState<CategoriesObject>({
    'Canais de texto': ['Geral'],
  });
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
          <Navigations title={serverTitle} categories={categories} />
          <div className={styles.secondaryContainer}>
            <ServerHeader channel={channelName} />
            {isHome && !isDirectMessage && (
              <main aria-label="Amigos">
                <ul aria-label="Lista de amigos"></ul>
              </main>
            )}
            {(!isHome || (isHome && isDirectMessage)) && (
              <ServerChat channel={channelName} messages={messages} />
            )}
            {!isHome && <UserList channel={channelName} users={users} />}
          </div>
          {profile.isVisible && (
            <ProfileCard userInfo={profile.userInfo} ref={profile.ref} />
          )}
        </div>
      </ProfileContext.Provider>
    </UserContext.Provider>
  );
};

export default Chat;
