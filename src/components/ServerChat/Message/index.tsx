import { useRef } from 'react';

import styles from './Message.module.scss';

import { deleteMessage } from '@/lib/Store';
import { useUserInfo } from '@/lib/UserInfoContext';
import { linkToHTMLAnchor } from '@/utils/linkToHTMLAnchor';
import type { MessageResponse } from '@/types';

import { Dialog } from '@/components/Dialog';
import { ProfileDialog } from '@/components/ProfileDialog';

import { DeleteMessageButton } from './DeleteMessageButton';

type MessageProps = {
  message: MessageResponse;
  onlyContent?: boolean;
};

export function Message({ message, onlyContent }: MessageProps) {
  const userInfo = useUserInfo();
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

  function handleDeleteMessage() {
    deleteMessage(message);
  }

  return (
    <div className={styles.message}>
      {onlyContent ? (
        <>
          <div className={styles.timeStampTooltip}>
            <time dateTime={convertedDate.toISOString()}>
              {timeFormatter.format(convertedDate)}
            </time>
          </div>
        </>
      ) : (
        <Dialog.Root
          trigger={
            <>
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
              <h3 className={styles.header}>
                <Dialog.Trigger
                  aria-roledescription="Abre o perfil do usuário"
                  className={styles.usernameButton}
                  ref={profileDialogButtonTriggerRef}
                >
                  <span>{message.author}</span>
                </Dialog.Trigger>
                <span className={styles.timeStamp}>
                  <time dateTime={convertedDate.toISOString()}>
                    {dateTimeFormatter.format(convertedDate)}
                  </time>
                </span>
              </h3>
            </>
          }
          content={<ProfileDialog username={message.author} />}
        />
      )}

      <div className={styles.content}>{linkToHTMLAnchor(message.content)}</div>

      {message.author === userInfo?.login && (
        <div className={styles.buttons} aria-label="Ações de mensagem">
          <DeleteMessageButton onConfirmDelete={handleDeleteMessage} />
        </div>
      )}
    </div>
  );
}
