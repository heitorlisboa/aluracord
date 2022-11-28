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

export type GitHubUserInfo = {
  name: string | null;
  login: string;
  location: string;
  bio: string;
  html_url: string;
  avatar_url: string;
  twitter_username: string | null;
  blog: string | null;
};
