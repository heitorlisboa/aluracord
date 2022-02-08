import { useState, useRef } from "react";
import { fetchUserInfo } from "./Store";
import type {
  ClickOutProfileHandler,
  ClickProfileHandler,
  GitHubUserInfo,
} from "../types";

/**
 * Concentrates the profile states, information fetching and profile
 * click handlers in one single place
 * @returns The loading, visibility and user information states,
 * as well as the click in and click out profile handlers
 */
export const useProfile = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [userInfo, setUserInfo] = useState<GitHubUserInfo>();
  const [buttonClicked, setButtonClicked] = useState<HTMLButtonElement>();
  const ref = useRef<HTMLDivElement>(null);

  const handleClickIn: ClickProfileHandler = (username, buttonRef) => {
    setIsVisible(true);
    if (buttonRef && buttonRef.current) {
      setButtonClicked(buttonRef.current);
      buttonRef.current.ariaExpanded = "true";
    }
    fetchUserInfo(username, setUserInfo).then(() => {
      if (ref.current) ref.current.focus();
    });
  };

  const handleClickOut: ClickOutProfileHandler = () => {
    setIsVisible(false);
    setUserInfo(undefined);
    if (buttonClicked) {
      buttonClicked.ariaExpanded = "false";
      setButtonClicked(undefined);
    }
  };

  return {
    isVisible,
    userInfo,
    handleClickIn,
    handleClickOut,
    ref,
  };
};
