import type { FC, HTMLAttributes } from "react";
import styles from "./ServerButton.module.scss";

interface ServerButtonProps extends HTMLAttributes<HTMLButtonElement> {
  src: string;
}

const ServerButton: FC<ServerButtonProps> = ({ src, ...otherProps }) => {
  return (
    <button className={styles.button} {...otherProps}>
      <img src={src} alt="" />
    </button>
  );
};

export default ServerButton
