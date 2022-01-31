import { useContext } from "react";
import MobileContext from "../../lib/MobileContext";
import type { FC } from "react";
import type { MobileContextInterface } from "../../types";
import styles from "./ServerHeader.module.scss";

interface ServerHeaderProps {
  channel?: string;
}

const ServerHeader: FC<ServerHeaderProps> = ({ channel }) => {
  const context = useContext(MobileContext) as MobileContextInterface;

  function handleOpenMenu() {
    const navigationsElement = context.navigationsRef.current;
    const containerElement = context.containerRef.current;

    if (navigationsElement && containerElement) {
      navigationsElement.classList.add(context.activeNavigationsClass);
      containerElement.classList.add(context.disabledContainerClass);
    }
  }

  function handleOpenUserList() {
    const userListElement = context.userListRef.current;
    const containerElement = context.containerRef.current;

    if (userListElement && containerElement) {
      userListElement.classList.add(context.activeUserListClass);
      containerElement.classList.add(context.disabledContainerClass);
    }
  }

  return (
    <section className={styles.header} aria-label="Cabeçalho do canal">
      <button className={styles.mobileMenuButton} onClick={handleOpenMenu}>
        <span className="sr-only">Menu</span>
      </button>
      <h3 className={styles.title}>{channel}</h3>
      <button
        className={styles.mobileUserListButton}
        onClick={handleOpenUserList}
      >
        <span className="sr-only">Lista de usuários</span>
      </button>
    </section>
  );
};

export default ServerHeader;
