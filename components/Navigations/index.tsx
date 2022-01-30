import { FC, useRef } from "react";
import type { ServerInsideNavProps } from "./ServerInsideNav";
import styles from "./Navigations.module.scss";

import ServerList from "./ServerList";
import ServerInsideNav from "./ServerInsideNav";

interface NavigationsProps extends ServerInsideNavProps {}

const Navigations: FC<NavigationsProps> = ({ title, categories }) => {
  return (
    <div className={styles.container}>
      <ServerList />
      <ServerInsideNav title={title} categories={categories} />
    </div>
  );
};

export default Navigations;
