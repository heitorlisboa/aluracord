import { createRef } from "react";
import isInList from "../utils/isInList";
import type { Dispatch, SetStateAction } from "react";
import type { AlertCreated, AlertInterface } from "../types";

export default function addAlert(
  alert: AlertCreated,
  alertList: AlertInterface[],
  setter: Dispatch<SetStateAction<AlertInterface[]>>
) {
  const ref = createRef<HTMLDivElement>();
  const newAlert: AlertInterface = {
    type: alert.type,
    message: alert.message,
    ref: ref,
  };

  if (!isInList<AlertInterface>(newAlert, alertList)) {
    const timeout = 5 * 1000; // 5 seconds
    setter([...alertList, newAlert]);

    setTimeout(() => {
      ref.current?.classList.add("fade-out");
    }, timeout);

    setTimeout(() => {
      setter((prevState) =>
        prevState.filter(
          (alert) =>
            alert.type !== newAlert.type && alert.message !== newAlert.message
        )
      );
    }, timeout + 450);
  }
}
