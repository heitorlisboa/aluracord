import styles from './LoadingMessage.module.scss';

export function LoadingMessage() {
  return (
    <div className={styles.message} aria-hidden="true">
      <div className={styles.avatar} />
      <div className={styles.header} />
      <div className={styles.content} />
    </div>
  );
}
