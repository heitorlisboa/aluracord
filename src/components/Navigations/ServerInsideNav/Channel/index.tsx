import type { FC } from 'react';
import styles from './Channel.module.scss';

interface ChannelProps {
  title: string;
}

const Channel: FC<ChannelProps> = ({ title }) => {
  return (
    <li className={styles.channel}>
      <a href="#">{title}</a>
    </li>
  );
};

export default Channel;
