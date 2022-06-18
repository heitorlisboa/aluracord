import { type FC, type RefObject, useContext } from 'react';

import styles from './ServerHeader.module.scss';

import MobileContext from '@/lib/MobileContext';
import temporaryFocus from '@/utils/temporaryFocus';

interface ServerHeaderProps {
  channel?: string;
}

const ServerHeader: FC<ServerHeaderProps> = ({ channel }) => {
  const context = useContext(MobileContext);

  function handleOpen(
    elementRef: RefObject<HTMLDivElement>,
    buttonRef: RefObject<HTMLButtonElement>,
    activeElementClass: string
  ) {
    const element = elementRef.current;
    const button = buttonRef.current;
    const containerElement = context.containerRef.current;

    const elementsAreValid = element && button && containerElement;

    if (elementsAreValid) {
      element.classList.add(activeElementClass);
      temporaryFocus(element);
      button.ariaExpanded = 'true';
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
        onClick={() => {
          handleOpen(
            context.navigationsRef,
            context.navigationsButtonRef,
            context.activeNavigationsClass
          );
        }}
        ref={context.navigationsButtonRef}
        aria-controls="navigations"
        aria-expanded="false"
      >
        <span className="sr-only">Menu</span>
      </button>
      <h3 className={styles.title}>{channel}</h3>
      <button
        className={styles.mobileUserListButton}
        onClick={() => {
          handleOpen(
            context.userListRef,
            context.userListButtonRef,
            context.activeUserListClass
          );
        }}
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
