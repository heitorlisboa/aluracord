import { useContext } from "react";
import { deleteMessage } from "../../../lib/Store";
import UserContext from "../../../lib/UserContext";
import type { FC } from "react";
import type { MessageResponse, UserContextInterface } from "../../../types";
import styles from "./Message.module.scss";

interface MessageProps {
  children: MessageResponse;
  onlyContent?: boolean;
}

const Message: FC<MessageProps> = ({ children: message, onlyContent }) => {
  const context = useContext(UserContext) as UserContextInterface;

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

  const convertedDate = new Date(message.date);

  function handleClickDelete() {
    deleteMessage(message.id);
  }

  return (
    <li className={styles.message} aria-roledescription="Mensagem">
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
            src={`https://github.com/${message.author}.png`}
            alt={`Foto de perfil de ${message.author}`}
          />
          <h2
            className={styles.header}
            aria-labelledby={`message-username-${message.id}`}
          >
            <span id={`message-username-${message.id}`}>{message.author}</span>
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

      <div className={styles.content}>{message.content}</div>
      {message.author === context.currentUser && (
        <div className={styles.buttons} aria-label="Ações de mensagem">
          <img
            src="/delete-icon.svg"
            alt="Deletar"
            onClick={handleClickDelete}
          />
        </div>
      )}
    </li>
  );
};

export default Message;
