import type { RefObject } from 'react';

export type MessageCreated = {
  author: string;
  date: string;
  content: string;
};

export type MessageResponse = {
  id: number;
} & MessageCreated;

export type UserResponse = {
  id: number;
  username: string;
  message_count: number;
};

export type UserContextType = {
  currentUser: string;
};

export type GitHubUserInfo = {
  name: string;
  login: string;
  location: string;
  bio: string;
  html_url: string;
  avatar_url: string;
  twitter_username: string | null;
  blog: string | null;
};

export type ClickProfileHandler = (
  username: string,
  buttonRef?: RefObject<HTMLButtonElement>
) => void;

export type ClickOutProfileHandler = () => void;

export type ProfileContextType = {
  handleClickIn: ClickProfileHandler;
  handleClickOut: ClickOutProfileHandler;
};

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
