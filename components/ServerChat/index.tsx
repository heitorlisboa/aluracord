import React, { useContext, useEffect, useRef, useState } from "react";
import { addMessage } from "../../lib/Store";
import UserContext from "../../lib/UserContext";
import type { FC, ChangeEvent, KeyboardEvent } from "react";
import type { MessageResponse, UserContextInterface } from "../../types";
import styles from "./ServerChat.module.scss";

import Message from "./Message";
import LoadingMessage from "./LoadingMessage";

const ServerChatWrapper = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>(({ children }, ref) => {
  return (
    <div className={styles.chatWrapper}>
      <div className={styles.scroller} ref={ref}>
        <div className={styles.scrollerContent}>{children}</div>
      </div>
    </div>
  );
});

interface ServerChatProps {
  channel: string;
  messages?: MessageResponse[];
  isLoading: boolean;
}

const ServerChat: FC<ServerChatProps> = ({ channel, messages, isLoading }) => {
  const context = useContext(UserContext) as UserContextInterface;
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
      addMessage({
        author: context.currentUser,
        date: new Date().toISOString(),
        content: messageText,
      });
      setMessageText("");
    }
  }

  function adjustChatScroll() {
    const element = scrollerDivRef.current;

    if (element) element.scrollTop = element.scrollHeight;
  }

  function adjustInputHeight() {
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

  useEffect(() => {
    adjustInputHeight();
  }, [messageText]);

  useEffect(() => {
    adjustChatScroll();
  }, [messageText, messages]);

  return (
    <main className={styles.content} aria-label={`${channel} (canal)`}>
      <ServerChatWrapper ref={scrollerDivRef}>
        <ol
          className={styles.scrollerInner}
          aria-label={`Mensagens em ${channel}`}
        >
          {isLoading ? (
            <>
              {Array.from(Array(8).keys()).map((n) => {
                return <LoadingMessage key={n} />;
              })}
            </>
          ) : (
            <>
              {messages?.map((msg, index) => {
                let hideAuthor = false;
                if (index > 0) {
                  const msgTime = new Date(msg.date).getTime();
                  const lastMsg = messages[index - 1];
                  const lastMsgTime = new Date(lastMsg.date).getTime();
                  // getTime() returns the time in milliseconds
                  const timeDiffMinutes = (msgTime - lastMsgTime) / 1000 / 60;
                  if (msg.author === lastMsg.author && timeDiffMinutes < 5) {
                    hideAuthor = true;
                  }
                }
                return (
                  <Message key={msg.id} onlyContent={hideAuthor}>
                    {msg}
                  </Message>
                );
              })}
            </>
          )}
          <div className={styles.scrollerSpacer} />
        </ol>
      </ServerChatWrapper>

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
