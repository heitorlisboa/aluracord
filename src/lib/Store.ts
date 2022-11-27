import { useState, useEffect, type Dispatch, type SetStateAction } from 'react';
import { createClient, type PostgrestResponse } from '@supabase/supabase-js';

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
  // States
  const [messages, setMessages] = useState<MessageResponse[]>([]);
  const [users, setUsers] = useState<UserResponse[]>([]);

  // Load initial data and set up listeners
  useEffect(() => {
    function handleNewMessage(newMessage: MessageResponse) {
      setMessages((prevState) => prevState.concat(newMessage));
    }

    function handleDeletedMessage(deletedMessage: MessageResponse) {
      setMessages((prevState) =>
        prevState.filter((message) => message.id !== deletedMessage.id)
      );
    }

    function handleNewUser(newUser: UserResponse) {
      setUsers((prevState) =>
        prevState
          .concat(newUser)
          // Case-insensitive sorting
          .sort((a, b) => a.username.localeCompare(b.username))
      );
    }

    function handleDeletedUser(deletedUser: UserResponse) {
      setUsers((prevState) =>
        prevState.filter((user) => user.id !== deletedUser.id)
      );
    }

    // Fetch the messages and users from the database
    fetchMessages(setMessages);
    fetchAllUsers(setUsers);

    // Listen for new and deleted messages
    const messageListener = supabase
      .channel('public:messages')
      .on<MessageResponse>(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload) => {
          handleNewMessage(payload.new);
        }
      )
      .on<MessageResponse>(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'messages' },
        (payload) => {
          handleDeletedMessage(payload.old as MessageResponse);
        }
      )
      .subscribe();

    // Listen for new and deleted users
    const userListener = supabase
      .channel('public:users')
      .on<UserResponse>(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'users' },
        (payload) => {
          handleNewUser(payload.new);
        }
      )
      .on<UserResponse>(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'users' },
        (payload) => {
          handleDeletedUser(payload.old as UserResponse);
        }
      )
      .subscribe();

    // Cleanup on unmount
    return () => {
      messageListener.unsubscribe();
      userListener.unsubscribe();
    };
  }, []);

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
  const messagesSelect: PostgrestResponse<MessageResponse> = await supabase
    .from('messages')
    .select('*')
    .order('date');
  const data = messagesSelect.data ?? [];

  if (setState) setState(data);

  return data;
}

/**
 * Fetch all users from the database
 * @param setState Optionally pass in a setter to set the state
 * @returns The users fetched from the database
 */
export async function fetchAllUsers(
  setState?: Dispatch<SetStateAction<UserResponse[]>>
) {
  const usersSelect: PostgrestResponse<UserResponse> = await supabase
    .from('users')
    .select('*')
    .order('username');
  const data = usersSelect.data ?? [];

  if (setState) setState(data);

  return data;
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
 * @param message The message you want to add
 */
export async function addMessage(message: MessageCreated) {
  await supabase.from('messages').insert(message);
  // This function will check if the user already exists before creating it
  await addUser(message.author);
  await incrementMessageCount(message.author);
}

/**
 * Delete a message from the database
 * @param message The message you want to delete
 */
export async function deleteMessage(message: MessageResponse) {
  await supabase.from('messages').delete().match({ id: message.id });
  await decrementMessageCount(message.author);
  await deleteZeroMessagesUsers();
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
 * @param username The username you want to add
 */
async function addUser(username: string) {
  const usersSelect: PostgrestResponse<UserResponse> = await supabase
    .from('users')
    .select('*')
    .match({ username });

  const userAlreadyExists = usersSelect.data && usersSelect.data.length > 0;
  if (!userAlreadyExists) {
    await supabase.from('users').insert({ username });
  }
}

/**
 * Delete all users from the database that don't have any messages
 */
async function deleteZeroMessagesUsers() {
  await supabase.from('users').delete().match({ message_count: 0 });
}
