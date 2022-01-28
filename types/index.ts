export interface ObjectOfLists<T> {
  [key: string]: T[];
}

export type CategoriesObject = ObjectOfLists<string>;

export interface MessageHeader {
  author: AuthorType;
  date: Date;
}

export interface MessageType extends MessageHeader {
  content: string;
}

export interface AuthorType {
  login: string;
  username: string;
  profilePic: string;
}

export interface MessageSender {
  (message: MessageType): void;
}

export interface MessageDeleter {
  (authorLogin: string, messageDate: Date): void;
}
