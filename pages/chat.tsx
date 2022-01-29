import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useStore } from "../lib/Store";
import { useProfile } from "../lib/Profile";
import UserContext from "../lib/UserContext";
import ProfileContext from "../lib/ProfileContext";
import type { NextPage } from "next";
import type { CategoriesObject } from "../types";
import styles from "../styles/pages/Chat.module.scss";

import ServerList from "../components/ServerList";
import ServerInsideNav from "../components/ServerInsideNav";
import ServerHeader from "../components/ServerHeader";
import ServerChat from "../components/ServerChat";
import UserList from "../components/UserList";
import ProfileCard from "../components/ProfileCard";

const Chat: NextPage = () => {
  const router = useRouter();
  const currentUser = router.query.username;
  const [isHome, setIsHome] = useState(false);
  const [isDirectMessage, setIsDirectMessage] = useState(false);
  const [serverTitle, setServerTitle] = useState(`Servidor de ${currentUser}`);
  const [channelName, setChannelName] = useState("Geral");
  const [categories, setCategories] = useState<CategoriesObject>({
    "Canais de texto": ["Geral"],
  });
  const { messages } = useStore();
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
        <div className={styles.primaryContainer}>
          <ServerList />
          <ServerInsideNav title={serverTitle} categories={categories} />
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
            {!isDirectMessage && <UserList channel={channelName} />}
          </div>
          {profile.isVisible && (
            <ProfileCard
              userInfo={profile.userInfo}
              isLoading={profile.isLoading}
            />
          )}
        </div>
      </ProfileContext.Provider>
    </UserContext.Provider>
  );
};

export default Chat;
