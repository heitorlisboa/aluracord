import styles from './ChannelList.module.scss';

import { Channel } from '../Channel';

type ChannelListProps = {
  categoryName: string;
  channelList: string[];
};

export function ChannelList({ categoryName, channelList }: ChannelListProps) {
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
}
