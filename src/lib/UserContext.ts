import { createContext } from 'react';

import type { UserContextType } from '@/types';

export const UserContext = createContext<UserContextType | null>(null);
