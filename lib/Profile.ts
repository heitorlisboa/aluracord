import { useState } from "react";
import { fetchUser } from "./Store";
import type {
  ClickOutProfileHandler,
  ClickProfileHandler,
  GitHubUserInfo,
} from "../types";

export const useProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [userInfo, setUserInfo] = useState<GitHubUserInfo>();

  const handleClickIn: ClickProfileHandler = (username) => {
    setIsLoading(true);
    setIsVisible(true);
    fetchUser(username, setUserInfo).then(() => {
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
