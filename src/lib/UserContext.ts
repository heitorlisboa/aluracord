import { createContext } from 'react';

export type UserContextType = {
  currentUser: string;
};

export const UserContext = createContext<UserContextType | null>(null);
