import styles from './ServerInsideNav.module.scss';

import type { CategoriesObject } from '@/types';

import { ChannelList } from './ChannelList';

export type ServerInsideNavProps = {
  title: string;
  isHome?: boolean;
  categories: CategoriesObject;
};

export function ServerInsideNav({
  title,
  isHome,
  categories,
}: ServerInsideNavProps) {
  return (
    <nav
      className={styles.nav}
      aria-label={isHome ? 'Servidor' : 'Canais privados'}
    >
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
}
