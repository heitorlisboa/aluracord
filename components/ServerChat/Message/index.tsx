import { FC } from "react";
import type { MessageDeleter, MessageHeader } from "../../../types";
import styles from "./Message.module.scss";

interface MessageProps extends MessageHeader {
  children: string;
  onlyContent?: boolean;
  deleteMessage: MessageDeleter;
}

const Message: FC<MessageProps> = ({
  author,
  date,
  children,
  onlyContent,
  deleteMessage,
}) => {
  const dateTimeFormatter = new Intl.DateTimeFormat([], {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const timeFormatter = new Intl.DateTimeFormat([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  function handleClickDelete() {
    deleteMessage(author.login, date);
  }

  return (
    <div className={styles.message} role="article">
      {!onlyContent && (
        <>
          <img
            className={styles.avatar}
            src={author.profilePic}
            alt={`Foto de perfil de ${author.username}`}
          />
          <h2 className={styles.header}>
            <span>{author.username}</span>
            <span>
              <time
                className={styles.timeStamp}
                dateTime={date.toISOString()}
                aria-label={dateTimeFormatter.format(date)}
              >
                {dateTimeFormatter.format(date)}
              </time>
            </span>
          </h2>
        </>
      )}
      {onlyContent && (
        <>
          <div className={styles.timeStampTooltip}>
            <time
              dateTime={date.toISOString()}
              aria-label={timeFormatter.format(date)}
            >
              {timeFormatter.format(date)}
            </time>
          </div>
        </>
      )}
      <div className={styles.content}>{children}</div>
      <div className={styles.buttons} aria-label="Ações de mensagem">
        <img src="/delete-icon.svg" alt="Deletar" onClick={handleClickDelete} />
      </div>
    </div>
  );
};

export default Message;
