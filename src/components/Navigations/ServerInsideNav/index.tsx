import type { FC } from "react";
import type { CategoriesObject } from "../../../types";
import styles from "./ServerInsideNav.module.scss";

import ChannelList from "./ChannelList";

export interface ServerInsideNavProps {
  title: string;
  isHome?: boolean;
  categories: CategoriesObject;
}

const ServerInsideNav: FC<ServerInsideNavProps> = ({
  title,
  isHome,
  categories,
}) => {
  return (
    <nav className={styles.nav} aria-label={isHome ? "Servidor" : "Canais privados"}>
      {!isHome && (
        <>
          <h1 className={styles.title}>{title}</h1>
          {Object.keys(categories).map((categoryName, index) => (
            <ChannelList
              key={index}
              categoryName={categoryName}
              channelList={categories[categoryName]}
            />
          ))}
        </>
      )}
    </nav>
  );
};

export default ServerInsideNav;
