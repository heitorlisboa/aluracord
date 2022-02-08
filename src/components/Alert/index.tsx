import React from "react";
import type { TypeOfAlert } from "../../types";
import styles from "./Alert.module.scss";

type AlertProps = TypeOfAlert & React.HTMLAttributes<HTMLDivElement>;

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ type, children }, ref) => {
    return (
      <div className={`${styles.container} ${styles[type]} fade-in`} ref={ref}>
        {children}
      </div>
    );
  }
);

Alert.displayName = "Alert";

export default Alert;
