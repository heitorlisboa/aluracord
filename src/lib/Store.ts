import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createClient, type PostgrestResponse } from '@supabase/supabase-js';

import type {
  MessageResponse,
  MessageCreated,
  UserResponse,
  GitHubUserInfo,
} from '@/types';

// The database access
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_KEY as string
);

/**
 * Fetch the database, set up listeners and automatically update the message list
 * @returns The message list state and a boolean of whether the page is loading or not
 */
export function useStore() {
  // Fetch the messages and users from the database
  const { data: messages, isLoading: isLoadingMessages } = useQuery({
    queryKey: ['messages'],
    queryFn: () => fetchMessages(),
  });
  const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetchAllUsers(),
  });

  const queryClient = useQueryClient();

  // Set up listeners
  useEffect(() => {
    // Functions that update its corresponding query data
    function handleNewMessage(newMessage: MessageResponse) {
      queryClient.setQueryData<MessageResponse[]>(['messages'], (oldData) => {
        const newData = (oldData ?? []).concat(newMessage);
        return newData;
      });
    }

    function handleDeletedMessage(deletedMessage: MessageResponse) {
      queryClient.setQueryData<MessageResponse[]>(['messages'], (oldData) => {
        const newData = (oldData ?? []).filter(
          (message) => message.id !== deletedMessage.id
        );
        return newData;
      });
    }

    function handleNewUser(newUser: UserResponse) {
      queryClient.setQueryData<UserResponse[]>(['users'], (oldData) => {
        const newData = (oldData ?? [])
          .concat(newUser)
          // Case-insensitive sorting
          .sort((a, b) => a.username.localeCompare(b.username));
        return newData;
      });
    }

    function handleDeletedUser(deletedUser: UserResponse) {
      queryClient.setQueryData<UserResponse[]>(['users'], (oldData) => {
        const newData = (oldData ?? []).filter(
          (user) => user.id !== deletedUser.id
        );
        return newData;
      });
    }

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
  }, [queryClient]);

  return {
    messages: messages ?? [],
    users: users ?? [],
    isLoadingMessages,
  };
}

/**
 * Fetch all messages from the database
 * @returns The messages fetched from the database
 */
async function fetchMessages() {
  const messagesSelect: PostgrestResponse<MessageResponse> = await supabase
    .from('messages')
    .select('*')
    .order('date');
  const data = messagesSelect.data ?? [];
  return data;
}

/**
 * Fetch all users from the database
 * @returns The users fetched from the database
 */
async function fetchAllUsers() {
  const usersSelect: PostgrestResponse<UserResponse> = await supabase
    .from('users')
    .select('*')
    .order('username');
  const data = usersSelect.data ?? [];
  return data;
}

/**
 * Fetch the user information from GitHub
 * @param username Username on GitHub
 * @returns The GitHub user information
 */
export async function fetchUserInfo(username: string) {
  const res = await fetch(`https://api.github.com/users/${username}`);
  const data: GitHubUserInfo = await res.json();
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
  await deleteUsersWithZeroMessages();
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
async function deleteUsersWithZeroMessages() {
  await supabase.from('users').delete().match({ message_count: 0 });
}
