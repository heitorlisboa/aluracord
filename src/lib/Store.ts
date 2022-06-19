import { useState, useEffect, type Dispatch, type SetStateAction } from 'react';
import { createClient } from '@supabase/supabase-js';

import type {
  MessageResponse,
  MessageCreated,
  UserResponse,
  GitHubUserInfo,
} from '@/types';

// The database access
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_KEY as string
);

/**
 * Fetch the database, set up listeners and automatically update the message list
 * @returns The message list state and a boolean of whether the page is loading or not
 */
export function useStore() {
  // Message related states
  const [messages, setMessages] = useState<MessageResponse[]>([]);
  const [newMessage, handleNewMessage] = useState<MessageResponse>();
  const [deletedMessage, handleDeletedMessage] = useState<MessageResponse>();

  // User related states
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [newUser, handleNewUser] = useState<UserResponse>();
  const [deletedUser, handleDeletedUser] = useState<UserResponse>();

  // Load initial data and set up listeners
  /*
    Not all listeners are here yet because some
    features are yet to be implemented
  */
  useEffect(() => {
    // Fetch the messages and users from the database
    fetchMessages(setMessages);
    fetchAllUsers(setUsers);

    // Listen for new and deleted messages
    const messageListener = supabase
      .from('messages')
      .on('INSERT', (payload) => {
        handleNewMessage(payload.new);
      })
      .on('DELETE', (payload) => {
        handleDeletedMessage(payload.old);
      })
      .subscribe();

    // Listen for new and deleted users
    const userListener = supabase
      .from('users')
      .on('INSERT', (payload) => {
        handleNewUser(payload.new);
      })
      .on('DELETE', (payload) => {
        handleDeletedUser(payload.old);
      })
      .subscribe();

    // Cleanup on unmount
    return () => {
      messageListener.unsubscribe();
      userListener.unsubscribe();
    };
  }, []);

  // New message received
  useEffect(() => {
    if (newMessage) setMessages(messages.concat(newMessage));
  }, [newMessage]);

  // Deleted message received
  useEffect(() => {
    if (deletedMessage)
      setMessages(
        messages.filter((message) => message.id !== deletedMessage.id)
      );
  }, [deletedMessage]);

  // New user received
  useEffect(() => {
    if (newUser) {
      setUsers(
        users
          .concat(newUser)
          // Case-insensitive sorting
          .sort((a, b) => a.username.localeCompare(b.username))
      );
    }
  }, [newUser]);

  // Deleted user received
  useEffect(() => {
    if (deletedUser)
      setUsers(users.filter((user) => user.id !== deletedUser.id));
  }, [deletedUser]);

  return {
    messages,
    users,
  };
}

/**
 * Fetch all messages from the database
 * @param setState Optionally pass in a setter to set the state
 * @returns The messages fetched from the database
 */
export async function fetchMessages(
  setState?: Dispatch<SetStateAction<MessageResponse[]>>
) {
  const { body } = await supabase.from('messages').select('*').order('date');
  if (setState) setState(body as MessageResponse[]);
  return body as MessageResponse[];
}

/**
 * Fetch all users from the database
 * @param setState Optionally pass in a setter to set the state
 * @returns The users fetched from the database
 */
export async function fetchAllUsers(
  setState?: Dispatch<SetStateAction<UserResponse[]>>
) {
  const { body } = await supabase.from('users').select('*').order('username');
  if (setState) setState(body as UserResponse[]);
  return body as UserResponse[];
}

/**
 * Fetch the user information from GitHub
 * @param username Username on GitHub
 * @param setState Optionally pass in a setter to set the state
 * @returns The GitHub user information
 */
export async function fetchUserInfo(
  username: string,
  setState?: Dispatch<SetStateAction<any>>
) {
  const res = await fetch(`https://api.github.com/users/${username}`);
  const data: GitHubUserInfo = await res.json();
  if (setState) setState(data);
  return data;
}

/**
 * Insert a new message into the database
 * @param message
 * @returns The message that was added
 */
export async function addMessage(message: MessageCreated) {
  const { body } = await supabase.from('messages').insert(message);
  // This function will check if the user already exists before creating it
  await addUser(message.author);
  await incrementMessageCount(message.author);
  return body as MessageResponse[];
}

/**
 * Delete a message from the database
 * @param message
 * @returns The message that was deleted
 */
export async function deleteMessage(message: MessageResponse) {
  const { body } = await supabase
    .from('messages')
    .delete()
    .match({ id: message.id });
  await decrementMessageCount(message.author);
  await deleteZeroMessagesUsers();
  return body as MessageResponse[];
}

/**
 * Increment the message count from a user
 * @param username The username to increment the count
 */
async function incrementMessageCount(username: string) {
  await supabase.rpc('increment', { row_username: username });
}

/**
 * Decrement the message count from a user
 * @param username The username to decrement the count
 */
async function decrementMessageCount(username: string) {
  await supabase.rpc('decrement', { row_username: username });
}

/**
 * Add a new user into the database
 * @param username
 * @returns The users added (null if none was added)
 */
async function addUser(username: string) {
  const search = await supabase.from('users').select('*').match({ username });
  let body: UserResponse[] | null = null;
  if (search.body && search.body.length === 0) {
    body = (await supabase.from('users').insert({ username })).body;
  }
  return body;
}

/**
 * Delete all users from the database that don't have any messages
 * @returns The users deleted
 */
async function deleteZeroMessagesUsers() {
  const { body } = await supabase
    .from('users')
    .delete()
    .match({ message_count: 0 });
  return body;
}
