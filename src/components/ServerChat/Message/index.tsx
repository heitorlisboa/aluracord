import { useContext, useRef } from 'react';

import styles from './Message.module.scss';

import { deleteMessage } from '@/lib/Store';
import { UserContext, type UserContextType } from '@/lib/UserContext';
import { ProfileContext, type ProfileContextType } from '@/lib/ProfileContext';
import { linkToHTMLAnchor } from '@/utils/linkToHTMLAnchor';
import type { MessageResponse } from '@/types';

type MessageProps = {
  children: MessageResponse;
  onlyContent?: boolean;
};

export function Message({ children: message, onlyContent }: MessageProps) {
  const { currentUser } = useContext(UserContext) as UserContextType;
  const { handleClickIn } = useContext(ProfileContext) as ProfileContextType;
  const profileButtonRef = useRef<HTMLButtonElement>(null);

  const dateTimeFormatter = new Intl.DateTimeFormat([], {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  const timeFormatter = new Intl.DateTimeFormat([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  const convertedDate = new Date(message.date);

  function handleClickDelete() {
    deleteMessage(message);
  }

  return (
    <li
      className={styles.message}
      aria-roledescription="Mensagem"
      aria-setsize={-1}
    >
      {onlyContent ? (
        <>
          <div className={styles.timeStampTooltip}>
            <time
              dateTime={convertedDate.toISOString()}
              aria-label={timeFormatter.format(convertedDate)}
            >
              {timeFormatter.format(convertedDate)}
            </time>
          </div>
        </>
      ) : (
        <>
          <img
            className={styles.avatar}
            aria-hidden
            src={`https://github.com/${message.author}.png`}
            alt=""
            onClick={() => handleClickIn(message.author)}
          />
          <h2
            className={styles.header}
            aria-labelledby={`message-username-${message.id}`}
            // Usar esse id no contexto do reply
            aria-describedby={`message-context-${message.id}`}
          >
            <button
              aria-expanded="false"
              onClick={() => handleClickIn(message.author, profileButtonRef)}
              ref={profileButtonRef}
            >
              <span
                id={`message-username-${message.id}`}
                className={styles.username}
              >
                {message.author}
              </span>
            </button>
            <span>
              <time
                className={styles.timeStamp}
                dateTime={convertedDate.toISOString()}
                aria-label={dateTimeFormatter.format(convertedDate)}
              >
                {dateTimeFormatter.format(convertedDate)}
              </time>
            </span>
          </h2>
        </>
      )}

      <div className={styles.content}>{linkToHTMLAnchor(message.content)}</div>

      {message.author === currentUser && (
        <div className={styles.buttons} aria-label="Ações de mensagem">
          <button onClick={handleClickDelete} aria-label="Deletar">
            <img src="/icons/delete-icon.svg" alt="" />
          </button>
        </div>
      )}
    </li>
  );
}
