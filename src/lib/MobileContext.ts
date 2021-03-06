import { createContext, createRef } from 'react';

import chatPageStyles from '@/styles/pages/Chat.module.scss';
import navStyles from '@/components/Navigations/Navigations.module.scss';
import userListStyles from '@/components/UserList/UserList.module.scss';

import type { MobileContextType } from '@/types';

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
