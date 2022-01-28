import { FC } from "react";
import styles from "./ServerHeader.module.scss";

interface ServerHeaderProps {
  channel?: string;
}

const ServerHeader: FC<ServerHeaderProps> = ({ channel }) => {
  return (
    <section className={styles.header} aria-label="Cabeçalho do canal">
      <h3 className={styles.title}>{channel}</h3>
    </section>
  );
};

export default ServerHeader;
