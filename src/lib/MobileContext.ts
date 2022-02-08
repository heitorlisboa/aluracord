import { createContext, createRef } from "react";
import type { MobileContextInterface } from "../types";

import chatPageStyles from "../styles/pages/Chat.module.scss";
import navStyles from "../components/Navigations/Navigations.module.scss";
import userListStyles from "../components/UserList/UserList.module.scss";

const MobileContext = createContext<MobileContextInterface>({
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

export default MobileContext;
