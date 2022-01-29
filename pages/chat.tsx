import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useStore } from "../lib/Store";
import UserContext from "../lib/UserContext";
import type { NextPage } from "next";
import type { CategoriesObject } from "../types";
import styles from "../styles/pages/Chat.module.scss";

import ServerList from "../components/ServerList";
import ServerInsideNav from "../components/ServerInsideNav";
import ServerHeader from "../components/ServerHeader";
import ServerChat from "../components/ServerChat";
import UserList from "../components/UserList";

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

  useEffect(() => {
    if (!currentUser) router.replace("/");
  }, []);

  return (
    <UserContext.Provider value={{ currentUser: currentUser as string }}>
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
      </div>
    </UserContext.Provider>
  );
};

export default Chat;
