import styles from './ChannelList.module.scss';

import { Channel } from '../Channel';

type ChannelListProps = {
  categoryName: string;
  channelList: string[];
};

export function ChannelList({ categoryName, channelList }: ChannelListProps) {
  return (
    <ul className={styles.list} aria-labelledby="channel-list-title">
      <strong id="channel-list-title" className={styles.title}>
        {categoryName}
      </strong>
      {channelList.map((channelName, index) => (
        <Channel key={index} title={channelName} />
      ))}
    </ul>
  );
}
