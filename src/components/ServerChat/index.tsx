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
  isLoadingMessages: boolean;
};

export function ServerChat({
  channel,
  messages,
  isLoadingMessages,
}: ServerChatProps) {
  const scrollerDivRef = useRef<HTMLDivElement>(null);

  function scrollToBottom() {
    const scroller = scrollerDivRef.current;

    if (scroller) scroller.scrollTop = scroller.scrollHeight;
  }

  const scrollWasOnBottomBeforeRerender = (() => {
    const scroller = scrollerDivRef.current;
    if (scroller) {
      const scrollBottom = scroller.scrollTop + scroller.offsetHeight;

      if (scrollBottom === scroller.scrollHeight) {
        return true;
      }
    }
    return false;
  })();

  // Scrolling to the bottom of the chat on first render
  useEffect(() => {
    scrollToBottom();
  }, []);

  /* Scrolling to the bottom of the chat every time there is a rerender (caused
  by updating the messages) and the scroll was on the bottom of the chat before
  that rerender */
  useEffect(() => {
    if (scrollWasOnBottomBeforeRerender) scrollToBottom();
  });

  return (
    <main className={styles.content} aria-label={`${channel} (canal)`}>
      <ServerChatWrapper ref={scrollerDivRef}>
        <div
          className={styles.scrollerInner}
          aria-label={`Mensagens em ${channel}`}
        >
          {isLoadingMessages ? (
            <>
              {Array.from(Array(8).keys()).map((n) => {
                return <LoadingMessage key={n} />;
              })}
            </>
          ) : (
            <>
              {messages.map((currentMessage, index) => {
                let hideAuthor = false;
                if (index > 0) {
                  const msgTime = new Date(currentMessage.date).getTime();
                  const previousMessage = messages[index - 1];
                  const previousMessageTime = new Date(
                    previousMessage.date
                  ).getTime();
                  // Converting from milliseconds to minutes
                  const timeDifferenceInMinutes =
                    (msgTime - previousMessageTime) / 1000 / 60;
                  const previousMessageHasSameAuthor =
                    currentMessage.author === previousMessage.author;
                  if (
                    previousMessageHasSameAuthor &&
                    timeDifferenceInMinutes < 5
                  ) {
                    hideAuthor = true;
                  }
                }
                return (
                  <Message
                    key={currentMessage.id}
                    message={currentMessage}
                    onlyContent={hideAuthor}
                  />
                );
              })}
            </>
          )}
          <div className={styles.scrollerSpacer} />
        </div>
      </ServerChatWrapper>
      <MessageInput channel={channel} />
    </main>
  );
}
