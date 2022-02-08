import { useContext } from "react";
import MobileContext from "../../lib/MobileContext";
import type { FC } from "react";
import styles from "./ServerHeader.module.scss";

interface ServerHeaderProps {
  channel?: string;
}

const ServerHeader: FC<ServerHeaderProps> = ({ channel }) => {
  const context = useContext(MobileContext);

  function handleOpenMenu() {
    const navigationsElement = context.navigationsRef.current;
    const navigationsButton = context.navigationsButtonRef.current;
    const containerElement = context.containerRef.current;

    const elementsAreValid =
      navigationsElement && navigationsButton && containerElement;

    if (elementsAreValid) {
      navigationsElement.classList.add(context.activeNavigationsClass);
      navigationsElement.tabIndex = -1;
      navigationsElement.focus();
      navigationsElement.removeAttribute("tabindex");
      navigationsButton.ariaExpanded = "true";
      containerElement.classList.add(context.disabledContainerClass);
    }
  }

  function handleOpenUserList() {
    const userListElement = context.userListRef.current;
    const userListButton = context.userListButtonRef.current;
    const containerElement = context.containerRef.current;

    const elementsAreValid =
      userListElement && userListButton && containerElement;

    if (elementsAreValid) {
      userListElement.classList.add(context.activeUserListClass);
      userListElement.tabIndex = -1;
      userListElement.focus();
      userListElement.removeAttribute("tabindex");
      userListButton.ariaExpanded = "true";
      containerElement.classList.add(context.disabledContainerClass);
    }
  }

  return (
    <section
      className={styles.header}
      aria-label="Cabeçalho do canal"
      ref={context.headerRef}
    >
      <button
        className={styles.mobileMenuButton}
        onClick={handleOpenMenu}
        ref={context.navigationsButtonRef}
        aria-controls="navigations"
        aria-expanded="false"
      >
        <span className="sr-only">Menu</span>
      </button>
      <h3 className={styles.title}>{channel}</h3>
      <button
        className={styles.mobileUserListButton}
        onClick={handleOpenUserList}
        ref={context.userListButtonRef}
        aria-controls="user-list"
        aria-expanded="false"
      >
        <span className="sr-only">Lista de usuários</span>
      </button>
    </section>
  );
};

export default ServerHeader;
