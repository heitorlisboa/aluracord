import { useContext } from "react";
import { deleteMessage } from "../../../lib/Store";
import UserContext from "../../../lib/UserContext";
import ProfileContext from "../../../lib/ProfileContext";
import linkToHTMLAnchor from "../../../utils/linkToHTMLAnchor";

import type { FC } from "react";
import type {
  MessageResponse,
  ProfileContextInterface,
  UserContextInterface,
} from "../../../types";

import styles from "./Message.module.scss";

interface MessageProps {
  children: MessageResponse;
  onlyContent?: boolean;
}

const Message: FC<MessageProps> = ({ children: message, onlyContent }) => {
  const { currentUser } = useContext(UserContext) as UserContextInterface;
  const { handleClickIn } = useContext(
    ProfileContext
  ) as ProfileContextInterface;

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
            src={`https://github.com/${message.author}.png`}
            alt={`Foto de perfil de ${message.author}`}
            onClick={() => handleClickIn(message.author)}
          />
          <h2
            className={styles.header}
            aria-labelledby={`message-username-${message.id}`}
          >
            <button
              aria-description="Abre o perfil do usuário"
              onClick={() => handleClickIn(message.author)}
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
            <img src="/svg/delete-icon.svg" alt="" />
          </button>
        </div>
      )}
    </li>
  );
};

export default Message;
