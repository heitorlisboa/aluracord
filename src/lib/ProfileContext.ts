import { createContext, type RefObject } from 'react';

export type ClickProfileHandler = (
  username: string,
  buttonRef?: RefObject<HTMLButtonElement>
) => void;

export type ClickOutProfileHandler = () => void;

export type ProfileContextType = {
  handleClickIn: ClickProfileHandler;
  handleClickOut: ClickOutProfileHandler;
};

export const ProfileContext = createContext<ProfileContextType | null>(null);
