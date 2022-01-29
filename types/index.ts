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

export interface UserContextInterface {
  currentUser: string;
}
