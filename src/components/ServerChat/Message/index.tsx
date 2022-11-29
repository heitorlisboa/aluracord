import { useContext, useRef } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

import styles from './Message.module.scss';

import { deleteMessage } from '@/lib/Store';
import { UserContext, type UserContextType } from '@/lib/UserContext';
import { linkToHTMLAnchor } from '@/utils/linkToHTMLAnchor';
import type { MessageResponse } from '@/types';

import { ProfileDialog } from '@/components/ProfileDialog';

type MessageProps = {
  children: MessageResponse;
  onlyContent?: boolean;
};

export function Message({ children: message, onlyContent }: MessageProps) {
  const { currentUser } = useContext(UserContext) as UserContextType;
  const profileDialogButtonTriggerRef = useRef<HTMLButtonElement>(null);

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

  function handleRedirectFocus() {
    /* Since when the user closes Radix UI dialog, it automatically focuses the
    first `Dialog.Trigger` within its `Dialog.Root`, and in this case the first
    `Dialog.Trigger` is not intended to be focused nor should it be accessible
    by screen readers, so I need to redirect focus to the element that is
    intended to receive focus and is accessible by screen readers */
    profileDialogButtonTriggerRef.current?.focus();
  }

  function handleClickDelete() {
    deleteMessage(message);
  }

  return (
    <div className={styles.message} aria-roledescription="Mensagem">
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
        <Dialog.Root>
          <Dialog.Trigger
            asChild
            tabIndex={-1}
            aria-hidden
            onFocus={handleRedirectFocus}
          >
            <img
              className={styles.avatar}
              src={`https://github.com/${message.author}.png`}
              alt=""
            />
          </Dialog.Trigger>
          <h3
            className={styles.header}
            aria-labelledby={`message-username-${message.id}`}
            // Usar esse id no contexto do reply
            aria-describedby={`message-context-${message.id}`}
          >
            <Dialog.Trigger
              aria-roledescription="Abre o perfil do usuário"
              ref={profileDialogButtonTriggerRef}
            >
              <span
                id={`message-username-${message.id}`}
                className={styles.username}
              >
                {message.author}
              </span>
            </Dialog.Trigger>
            <span>
              <time
                className={styles.timeStamp}
                dateTime={convertedDate.toISOString()}
                aria-label={dateTimeFormatter.format(convertedDate)}
              >
                {dateTimeFormatter.format(convertedDate)}
              </time>
            </span>
          </h3>

          <ProfileDialog username={message.author} />
        </Dialog.Root>
      )}

      <div className={styles.content}>{linkToHTMLAnchor(message.content)}</div>

      {message.author === currentUser && (
        <div className={styles.buttons} aria-label="Ações de mensagem">
          <button onClick={handleClickDelete} aria-label="Deletar">
            <img src="/icons/delete-icon.svg" alt="" />
          </button>
        </div>
      )}
    </div>
  );
}
