import { useState } from "react";
import type { NextPage } from "next";
import type { CategoriesObject, MessageType } from "../types";
import styles from "../styles/pages/Chat.module.scss";

import ServerList from "../components/ServerList";
import ServerInsideNav from "../components/ServerInsideNav";
import ServerHeader from "../components/ServerHeader";
import ServerChat from "../components/ServerChat";
import UserList from "../components/UserList";

const Chat: NextPage = () => {
  const [isHome, setIsHome] = useState(false);
  const [isDirectMessage, setIsDirectMessage] = useState(false);
  const [serverTitle, setServerTitle] = useState("Servidor de {username}");
  const [channelName, setChannelName] = useState("Geral");
  const [categories, setCategories] = useState<CategoriesObject>({
    "Canais de texto": ["Geral"],
  });
  const [messageList, setMessageList] = useState<MessageType[]>([
    {
      author: {
        login: "heitorlisboa",
        username: "Heitor Lisboa",
        profilePic: "https://github.com/heitorlisboa.png",
      },
      date: new Date(1),
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, odio?",
    },
    {
      author: {
        login: "heitorlisboa",
        username: "Heitor Lisboa",
        profilePic: "https://github.com/heitorlisboa.png",
      },
      date: new Date(2),
      content:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id, ab.",
    },
  ]);

  function sendMessage(message: MessageType) {
    setMessageList([...messageList, message]);
  }

  function deleteMessage(authorLogin: string, messageDate: Date) {
    const newMessageList = messageList.filter((message) => {
      if (
        !(
          message.author.login === authorLogin &&
          message.date.toISOString() === messageDate.toISOString()
        )
      )
        return message;
    });

    setMessageList(newMessageList);
  }

  return (
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
          <ServerChat
            channel={channelName}
            messages={messageList}
            sendMessage={sendMessage}
            deleteMessage={deleteMessage}
          />
        )}

        {!isDirectMessage && <UserList channel={channelName} />}
      </div>
    </div>
  );
};

export default Chat;
