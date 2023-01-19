import { createContext, useContext, type PropsWithChildren } from 'react';
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';

import { fetchUserInfoFromSession } from '@/lib/Store';
import type { GitHubUserInfo } from '@/types';

type UserInfoContextData = GitHubUserInfo | null;

const UserInfoContext = createContext<UserInfoContextData>(null);

export function UserInfoProvider({ children }: PropsWithChildren) {
  const { data: session } = useSession();
  const { data: githubUserInfo } = useQuery({
    queryKey: ['current-user', session],
    queryFn: () => fetchUserInfoFromSession(session),
    initialData: null,
  });

  return (
    <UserInfoContext.Provider value={githubUserInfo}>
      {children}
    </UserInfoContext.Provider>
  );
}

export function useUserInfo() {
  return useContext(UserInfoContext);
}
