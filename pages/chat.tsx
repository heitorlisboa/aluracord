import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useStore } from "../lib/Store";
import { useProfile } from "../lib/Profile";
import UserContext from "../lib/UserContext";
import ProfileContext from "../lib/ProfileContext";
import MobileContext from "../lib/MobileContext";
import type { NextPage } from "next";
import type { CategoriesObject } from "../types";

import styles from "../styles/pages/Chat.module.scss";
import navStyles from "../components/Navigations/Navigations.module.scss";
import userListStyles from "../components/UserList/UserList.module.scss";

import ServerHeader from "../components/ServerHeader";
import ServerChat from "../components/ServerChat";
import UserList from "../components/UserList";
import ProfileCard from "../components/ProfileCard";
import Navigations from "../components/Navigations";

const Chat: NextPage = () => {
  const router = useRouter();
  const currentUser = router.query.username;
  const [isHome, setIsHome] = useState(false);
  const [isDirectMessage, setIsDirectMessage] = useState(false);
  const [serverTitle, setServerTitle] = useState("Servidor");
  const [channelName, setChannelName] = useState("Geral");
  const [categories, setCategories] = useState<CategoriesObject>({
    "Canais de texto": ["Geral"],
  });
  const primaryContainerRef = useRef<HTMLDivElement>(null);
  const navigationsRef = useRef<HTMLDivElement>(null);
  const userListRef = useRef<HTMLDivElement>(null);
  const { messages, users } = useStore();
  const profile = useProfile();

  useEffect(() => {
    if (!currentUser) router.replace("/");
  }, []);

  return (
    <UserContext.Provider value={{ currentUser: currentUser as string }}>
      <ProfileContext.Provider
        value={{
          handleClickIn: profile.handleClickIn,
          handleClickOut: profile.handleClickOut,
        }}
      >
        <MobileContext.Provider
          value={{
            containerRef: primaryContainerRef,
            disabledContainerClass: styles.disabled,
            navigationsRef: navigationsRef,
            activeNavigationsClass: navStyles.active,
            userListRef: userListRef,
            activeUserListClass: userListStyles.active,
          }}
        >
          <div className={styles.primaryContainer} ref={primaryContainerRef}>
            <Navigations
              title={serverTitle}
              categories={categories}
              ref={navigationsRef}
            />
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
              {!isHome && (
                <UserList
                  channel={channelName}
                  users={users}
                  ref={userListRef}
                />
              )}
            </div>
            {profile.isVisible && (
              <ProfileCard
                userInfo={profile.userInfo}
                isLoading={profile.isLoading}
              />
            )}
          </div>
        </MobileContext.Provider>
      </ProfileContext.Provider>
    </UserContext.Provider>
  );
};

export default Chat;
