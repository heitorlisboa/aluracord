import styles from './Channel.module.scss';

type ChannelProps = {
  title: string;
};

export function Channel({ title }: ChannelProps) {
  return (
    <li className={styles.channel}>
      <a href="#">{title}</a>
    </li>
  );
}
