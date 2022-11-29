import { useEffect, useRef, forwardRef, type HTMLProps } from 'react';

import styles from './ServerChat.module.scss';

import type { MessageResponse } from '@/types';

import { Message } from './Message';
import { LoadingMessage } from './LoadingMessage';
import { MessageInput } from './MessageInput';

type ServerChatWrapperProps = HTMLProps<HTMLDivElement>;

const ServerChatWrapper = forwardRef<HTMLDivElement, ServerChatWrapperProps>(
  ({ children }, ref) => {
    return (
      <div className={styles.chatWrapper}>
        <div className={styles.scroller} ref={ref}>
          <div className={styles.scrollerContent}>{children}</div>
        </div>
      </div>
    );
  }
);

ServerChatWrapper.displayName = 'ServerChatWrapper';

type ServerChatProps = {
  channel: string;
  messages: MessageResponse[];
};

export function ServerChat({ channel, messages }: ServerChatProps) {
  const scrollerDivRef = useRef<HTMLDivElement>(null);

  function scrollToBottom() {
    const scroller = scrollerDivRef.current;

    if (scroller) scroller.scrollTop = scroller.scrollHeight;
  }

  const scrollWasOnBottomBeforeRender = (() => {
    const scroller = scrollerDivRef.current;
    if (scroller) {
      const scrollBottom = scroller.scrollTop + scroller.offsetHeight;

      if (scrollBottom === scroller.scrollHeight) {
        return true;
      }
    }
    return false;
  })();

  useEffect(() => {
    const noMessagesOrMessagesAreLoading = messages.length === 0;
    if (noMessagesOrMessagesAreLoading || scrollWasOnBottomBeforeRender)
      scrollToBottom();
  }, [messages, scrollWasOnBottomBeforeRender]);

  return (
    <main className={styles.content} aria-label={`${channel} (canal)`}>
      <ServerChatWrapper ref={scrollerDivRef}>
        <ol
          className={styles.scrollerInner}
          aria-label={`Mensagens em ${channel}`}
        >
          {messages.length > 0 ? (
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
}
