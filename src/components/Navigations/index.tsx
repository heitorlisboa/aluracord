import { useContext } from 'react';

import styles from './Navigations.module.scss';

import { MobileContext } from '@/lib/MobileContext';
import { useOutsideListener } from '@/lib/OutsideListener';

import { ServerList } from './ServerList';
import { ServerInsideNav } from './ServerInsideNav';
import type { ServerInsideNavProps } from './ServerInsideNav';

type NavigationsProps = ServerInsideNavProps;

export function Navigations({ title, categories }: NavigationsProps) {
  const context = useContext(MobileContext);

  function handleCloseMenu() {
    const navigationsElement = context.navigationsRef.current;
    const elementIsActive = navigationsElement?.classList.contains(
      context.activeNavigationsClass
    );
    if (!elementIsActive) return;

    const navigationsButton = context.navigationsButtonRef.current;
    const containerElement = context.containerRef.current;

    const otherElement = context.userListRef.current;
    const otherElementIsActive = otherElement?.classList.contains(
      context.activeUserListClass
    );

    const elementsAreValid =
      navigationsElement && navigationsButton && containerElement;

    if (elementsAreValid && !otherElementIsActive) {
      navigationsElement.classList.remove(context.activeNavigationsClass);
      navigationsButton.ariaExpanded = 'false';
      containerElement.classList.remove(context.disabledContainerClass);
    }
  }

  useOutsideListener(context.navigationsRef, handleCloseMenu);

  return (
    <div
      id="navigations"
      className={styles.container}
      ref={context.navigationsRef}
    >
      <ServerList />
      <ServerInsideNav title={title} categories={categories} />
    </div>
  );
}
