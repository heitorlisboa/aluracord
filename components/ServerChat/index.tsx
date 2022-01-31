import React, { useEffect, useRef } from "react";
import type { FC } from "react";
import type { MessageResponse } from "../../types";
import styles from "./ServerChat.module.scss";

import Message from "./Message";
import LoadingMessage from "./LoadingMessage";
import MessageInput from "./MessageInput";

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

ServerChatWrapper.displayName = "ServerChatWrapper";

interface ServerChatProps {
  channel: string;
  messages?: MessageResponse[];
}

const ServerChat: FC<ServerChatProps> = ({ channel, messages }) => {
  const scrollerDivRef = useRef<HTMLDivElement>(null);

  function adjustChatScroll() {
    const element = scrollerDivRef.current;

    if (element) element.scrollTop = element.scrollHeight;
  }

  useEffect(() => {
    adjustChatScroll();
  }, [messages]);

  return (
    <main className={styles.content} aria-label={`${channel} (canal)`}>
      <ServerChatWrapper ref={scrollerDivRef}>
        <ol
          className={styles.scrollerInner}
          aria-label={`Mensagens em ${channel}`}
        >
          {messages && messages.length > 0 ? (
            <>
              {messages.map((msg, index) => {
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
          ) : (
            <>
              {Array.from(Array(8).keys()).map((n) => {
                return <LoadingMessage key={n} />;
              })}
            </>
          )}
          <div className={styles.scrollerSpacer} />
        </ol>
      </ServerChatWrapper>
      <MessageInput channel={channel} />
    </main>
  );
};

export default ServerChat;
