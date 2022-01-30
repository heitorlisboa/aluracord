import type { FC } from "react";
import styles from "./ServerButton.module.scss";

interface ServerButtonProps extends React.HTMLProps<HTMLDivElement> {
  src: string;
}

const ServerButton: FC<ServerButtonProps> = ({ src, ...otherProps }) => {
  return (
    <div className={styles.button} {...otherProps}>
      <img src={src} alt="" />
    </div>
  );
};

export default ServerButton
