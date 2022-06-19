import { createContext } from 'react';

import type { ProfileContextType } from '@/types';

export const ProfileContext = createContext<ProfileContextType | null>(null);
