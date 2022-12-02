import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from 'react';
import { useSession } from 'next-auth/react';

import { fetchUserInfoFromSession } from '@/lib/Store';
import type { GitHubUserInfo } from '@/types';

type UserInfoContextData = GitHubUserInfo | null;

const UserInfoContext = createContext<UserInfoContextData>(null);

export function UserInfoProvider({ children }: PropsWithChildren) {
  const { data: session } = useSession();
  const [githubUserInfo, setGithubUserInfo] =
    useState<UserInfoContextData>(null);

  useEffect(() => {
    async function updateGithubUserInfoState() {
      const userInfo = await fetchUserInfoFromSession(session);
      if (userInfo) setGithubUserInfo(userInfo);
    }

    updateGithubUserInfoState();
  }, [session]);

  return (
    <UserInfoContext.Provider value={githubUserInfo}>
      {children}
    </UserInfoContext.Provider>
  );
}

export function useUserInfo() {
  return useContext(UserInfoContext);
}
