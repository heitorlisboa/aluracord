import { useState } from "react";
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
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [userInfo, setUserInfo] = useState<GitHubUserInfo>();

  const handleClickIn: ClickProfileHandler = (username) => {
    setIsLoading(true);
    setIsVisible(true);
    fetchUserInfo(username, setUserInfo).then(() => {
      setIsLoading(false);
    });
  };

  const handleClickOut: ClickOutProfileHandler = () => setIsVisible(false);

  return {
    isVisible,
    isLoading,
    userInfo,
    handleClickIn,
    handleClickOut,
  };
};
