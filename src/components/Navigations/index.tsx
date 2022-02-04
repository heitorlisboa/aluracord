import React, { useContext } from "react";
import MobileContext from "../../lib/MobileContext";
import useOutsideListener from "../../lib/OutsideListener";
import type { ServerInsideNavProps } from "./ServerInsideNav";
import type { FC } from "react";
import styles from "./Navigations.module.scss";

import ServerList from "./ServerList";
import ServerInsideNav from "./ServerInsideNav";

interface NavigationsProps extends ServerInsideNavProps {}

const Navigations: FC<NavigationsProps> = ({ title, categories }) => {
  const context = useContext(MobileContext);

  function handleCloseMenu() {
    const navigationsElement = context.navigationsRef.current;
    const containerElement = context.containerRef.current;

    const otherElement = context.userListRef.current;
    const otherElementIsActive = otherElement?.classList.contains(
      context.activeUserListClass
    );

    if (navigationsElement && containerElement && !otherElementIsActive) {
      navigationsElement.classList.remove(context.activeNavigationsClass);
      containerElement.classList.remove(context.disabledContainerClass);
    }
  }

  useOutsideListener(context.navigationsRef, handleCloseMenu);

  return (
    <div className={styles.container} ref={context.navigationsRef}>
      <ServerList />
      <ServerInsideNav title={title} categories={categories} />
    </div>
  );
};

Navigations.displayName = "Navigations";

export default Navigations;
