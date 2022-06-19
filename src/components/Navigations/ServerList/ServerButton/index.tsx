import type { HTMLAttributes } from 'react';

import styles from './ServerButton.module.scss';

type ServerButtonProps = HTMLAttributes<HTMLButtonElement> & {
  src: string;
};

export function ServerButton({ src, ...otherProps }: ServerButtonProps) {
  return (
    <button className={styles.button} {...otherProps}>
      <img src={src} alt="" />
    </button>
  );
}
