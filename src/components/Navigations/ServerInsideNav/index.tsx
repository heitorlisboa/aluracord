import styles from './ServerInsideNav.module.scss';

import { ChannelList } from './ChannelList';

const serverTitle = 'Servidor';
const channelList = ['Geral'];

export function ServerInsideNav() {
  return (
    <nav className={styles.nav} aria-label={'Servidor'}>
      <h1 className={styles.title}>{serverTitle}</h1>
      <ChannelList categoryName={'Canais de texto'} channelList={channelList} />
    </nav>
  );
}
