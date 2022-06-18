import type { FC } from 'react';

import styles from './ChannelList.module.scss';

import Channel from '../Channel';

interface ChannelListProps {
  categoryName: string;
  channelList: string[];
}

const ChannelList: FC<ChannelListProps> = ({ categoryName, channelList }) => {
  return (
    <ul
      id={`channel-list_id`}
      className={styles.list}
      aria-labelledby={`channel-list-title_id`}
      aria-roledescription={
        'Categoria de canais. Ao clicar expande ou retrai a lista de canais dessa categoria.'
      }
    >
      <h2
        id={`channel-list-title_id`}
        className={styles.title}
        aria-controls={`channel-list_id`}
        aria-expanded={true}
        role="button"
        tabIndex={0}
      >
        {categoryName}
      </h2>
      {channelList.map((channelName, index) => (
        <Channel key={index} title={channelName} />
      ))}
    </ul>
  );
};

export default ChannelList;
