import { createContext } from 'react';
import type { ProfileContextInterface } from '../types';

const ProfileContext = createContext<ProfileContextInterface | null>(null);

export default ProfileContext;
