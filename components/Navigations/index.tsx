import React, { RefObject, useContext, useRef } from "react";
import MobileContext from "../../lib/MobileContext";
import useOutsideListener from "../../lib/OutsideListener";
import type { ServerInsideNavProps } from "./ServerInsideNav";
import type { MobileContextInterface } from "../../types";
import styles from "./Navigations.module.scss";

import ServerList from "./ServerList";
import ServerInsideNav from "./ServerInsideNav";

interface NavigationsProps extends ServerInsideNavProps {}

const Navigations = React.forwardRef<HTMLDivElement, NavigationsProps>(
  ({ title, categories }, ref) => {
    const context = useContext(MobileContext) as MobileContextInterface;

    function handleCloseMenu() {
      const navigationsElement = context.navigationsRef.current;
      const containerElement = context.containerRef.current;

      if (navigationsElement && containerElement) {
        navigationsElement.classList.remove(context.activeNavigationsClass);
        containerElement.classList.remove(context.disabledContainerClass);
      }
    }

    useOutsideListener(ref as RefObject<HTMLDivElement>, handleCloseMenu);

    return (
      <div className={styles.container} ref={ref}>
        <ServerList />
        <ServerInsideNav title={title} categories={categories} />
      </div>
    );
  }
);

Navigations.displayName = "Navigations";

export default Navigations;
