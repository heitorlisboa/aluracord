import type { RefObject } from "react";

export interface ObjectOfLists<T> {
  [key: string]: T[];
}

export type CategoriesObject = ObjectOfLists<string>;

export interface MessageCreated {
  author: string;
  date: string;
  content: string;
}

export interface MessageResponse extends MessageCreated {
  id: number;
}

export interface UserResponse {
  id: number;
  username: string;
  message_count: number;
}

export interface UserContextInterface {
  currentUser: string;
}

export interface GitHubUserInfo {
  name: string;
  login: string;
  location: string;
  bio: string;
  html_url: string;
  avatar_url: string;
  twitter_username: string | null;
  blog: string | null;
}

export type ClickProfileHandler = (username: string) => void;

export type ClickOutProfileHandler = () => void;

export interface ProfileContextInterface {
  handleClickIn: ClickProfileHandler;
  handleClickOut: ClickOutProfileHandler;
}

export interface MobileContextInterface {
  containerRef: RefObject<HTMLDivElement>;
  disabledContainerClass: string;
  navigationsRef: RefObject<HTMLDivElement>;
  activeNavigationsClass: string;
}
