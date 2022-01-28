import { useLayoutEffect, useRef, useState } from "react";
import type { FC, ChangeEvent, KeyboardEvent } from "react";
import type { MessageDeleter, MessageSender, MessageType } from "../../types";
import styles from "./ServerChat.module.scss";

import Message from "./Message";

interface ServerChatProps {
  channel: string;
  messages?: MessageType[];
  sendMessage: MessageSender;
  deleteMessage: MessageDeleter;
}

const ServerChat: FC<ServerChatProps> = ({
  channel,
  messages,
  sendMessage,
  deleteMessage,
}) => {
  const messageInputRef = useRef<HTMLTextAreaElement>(null);
  const scrollerDivRef = useRef<HTMLDivElement>(null);
  const [messageText, setMessageText] = useState("");

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setMessageText(event.target.value);
  }

  function handleKeyPress(event: KeyboardEvent) {
    const keyPressed = event.key;

    if (keyPressed === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage({
        author: {
          login: "heitorlisboa",
          username: "Heitor Lisboa",
          profilePic: "https://github.com/heitorlisboa.png",
        },
        date: new Date(),
        content: messageText,
      });
      setMessageText("");
    }
  }

  function adjustScroll() {
    const element = scrollerDivRef.current;

    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  }

  function adjustHeight() {
    const element = messageInputRef.current;

    if (element) {
      /*
        Since the element has a min-height it will auto adjust
        to it when the height is set to 0. This is useful because
        when the user erases the text on the textarea, the scrollHeight
        will remain the same until it is resized, that means that if
        this line of code wasn't here, the textarea wouldn't ever
        readjust to it's default height.
      */
      element.style.height = "0px";
      element.style.height = element.scrollHeight + "px";
    }
  }

  useLayoutEffect(() => {
    adjustScroll();
    adjustHeight();
  }, [messageText]);

  return (
    <main className={styles.content} aria-label={`${channel} (canal)`}>
      <div className={styles.chatWrapper}>
        <div className={styles.scroller} ref={scrollerDivRef}>
          <div className={styles.scrollerContent}>
            <ol
              className={styles.scrollerInner}
              aria-label={`Mensagens em ${channel}`}
            >
              {messages?.map((msg, index) => {
                let hideAuthor = false;
                if (index > 0) {
                  const lastMsg = messages[index - 1];
                  // getTime() returns the time in milliseconds
                  const timeDiffMinutes =
                    (msg.date.getTime() - lastMsg.date.getTime()) / 1000 / 60;

                  if (
                    msg.author.login === lastMsg.author.login &&
                    timeDiffMinutes < 5
                  ) {
                    hideAuthor = true;
                  }
                }
                return (
                  <Message
                    key={index}
                    author={msg.author}
                    date={msg.date}
                    onlyContent={hideAuthor}
                    deleteMessage={deleteMessage}
                  >
                    {msg.content}
                  </Message>
                );
              })}
              <div className={styles.scrollerSpacer} />
            </ol>
          </div>
        </div>
      </div>
      <form className={styles.form}>
        <textarea
          className={styles.messageInput}
          name="message"
          placeholder={`Conversar em ${channel}`}
          ref={messageInputRef}
          value={messageText}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
      </form>
    </main>
  );
};

export default ServerChat;
