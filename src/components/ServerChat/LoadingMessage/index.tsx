import styles from './LoadingMessage.module.scss';

export function LoadingMessage() {
  return (
    <li className={styles.message} aria-hidden="true">
      <div className={styles.avatar} />
      <div className={styles.header} />
      <div className={styles.content} />
    </li>
  );
}
