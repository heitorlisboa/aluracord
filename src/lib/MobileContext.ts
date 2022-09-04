import { createContext, createRef, type RefObject } from 'react';

import chatPageStyles from '@/styles/pages/Chat.module.scss';
import navStyles from '@/components/Navigations/Navigations.module.scss';
import userListStyles from '@/components/UserList/UserList.module.scss';

export type MobileContextType = {
  containerRef: RefObject<HTMLDivElement>;
  disabledContainerClass: string;
  headerRef: RefObject<HTMLDivElement>;
  navigationsRef: RefObject<HTMLDivElement>;
  activeNavigationsClass: string;
  navigationsButtonRef: RefObject<HTMLButtonElement>;
  userListRef: RefObject<HTMLDivElement>;
  activeUserListClass: string;
  userListButtonRef: RefObject<HTMLButtonElement>;
};

export const MobileContext = createContext<MobileContextType>({
  containerRef: createRef<HTMLDivElement>(),
  disabledContainerClass: chatPageStyles.disabled,
  headerRef: createRef<HTMLDivElement>(),
  navigationsRef: createRef<HTMLDivElement>(),
  activeNavigationsClass: navStyles.active,
  navigationsButtonRef: createRef<HTMLButtonElement>(),
  userListRef: createRef<HTMLDivElement>(),
  activeUserListClass: userListStyles.active,
  userListButtonRef: createRef<HTMLButtonElement>(),
});
