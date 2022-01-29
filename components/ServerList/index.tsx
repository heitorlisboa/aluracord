import type { FC } from "react";
import styles from "./ServerList.module.scss";

import ServerButton from "./ServerButton";

interface ServerListProps {
  serverList?: any[];
}

function Separator() {
  return <div className={styles.separator} />;
}

const ServerList: FC<ServerListProps> = () => {
  return (
    <nav className={styles.nav} aria-label="Barra lateral dos servidores">
      <ServerButton src="/img/user-icon.jpg" aria-label="Início" />
      <Separator />
      <ul className={styles.serverList} aria-label="Lista de servidores">
        <li>
          <ServerButton src="/img/user-icon.jpg" aria-label="Servidor 1" />
        </li>
        <li>
          <ServerButton src="/img/user-icon.jpg" aria-label="Servidor 2" />
        </li>
        <li>
          <ServerButton src="/img/user-icon.jpg" aria-label="Servidor 3" />
        </li>
        <li>
          <ServerButton src="/img/user-icon.jpg" aria-label="Servidor 4" />
        </li>
        <li>
          <ServerButton src="/img/user-icon.jpg" aria-label="Servidor 5" />
        </li>
      </ul>
    </nav>
  );
};

export default ServerList;
