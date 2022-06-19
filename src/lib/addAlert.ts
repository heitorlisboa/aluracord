import { createRef, type Dispatch, type SetStateAction } from 'react';

import { isInList } from '@/utils/isInList';

import type { AlertCreated, AlertType } from '@/types';

export function addAlert(
  alert: AlertCreated,
  alertList: AlertType[],
  setter: Dispatch<SetStateAction<AlertType[]>>
) {
  const ref = createRef<HTMLDivElement>();
  const newAlert: AlertType = {
    type: alert.type,
    message: alert.message,
    ref: ref,
  };

  if (!isInList<AlertType>(newAlert, alertList)) {
    const timeout = 5 * 1000; // 5 seconds
    setter([...alertList, newAlert]);

    setTimeout(() => {
      ref.current?.classList.add('fade-out');
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
