import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import type { Dispatch, SetStateAction } from "react";
import type {
  MessageResponse,
  MessageCreated,
  UserResponse,
  GitHubUserInfo,
} from "../types";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_KEY as string
);

/**
 * Fetch the database, set up listeners and automatically update the message list
 * @returns The message list state and a boolean of whether the page is loading or not
 */
export const useStore = () => {
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
      .from("messages")
      .on("INSERT", (payload) => {
        handleNewMessage(payload.new);
      })
      .on("DELETE", (payload) => {
        handleDeletedMessage(payload.old);
      })
      .subscribe();

    // Listen for new and deleted users
    const userListener = supabase
      .from("users")
      .on("INSERT", (payload) => {
        handleNewUser(payload.new);
      })
      .on("DELETE", (payload) => {
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
};

/**
 * Fetch all messages from the database
 * @param setState Optionally pass in a setter to set the state
 * @returns The messages fetched from the database
 */
export const fetchMessages = async (
  setState?: Dispatch<SetStateAction<MessageResponse[]>>
) => {
  let { body } = await supabase.from("messages").select("*").order("date");
  if (setState) setState(body as MessageResponse[]);
  return body as MessageResponse[];
};

export const fetchAllUsers = async (
  setState?: Dispatch<SetStateAction<UserResponse[]>>
) => {
  let { body } = await supabase.from("users").select("*").order("username");
  if (setState) setState(body as UserResponse[]);
  return body as UserResponse[];
};

/**
 * Fetch the user information from GitHub
 * @param username Username on GitHub
 * @param setState Optionally pass in a setter to set the state
 * @returns The GitHub user information
 */
export const fetchUserInfo = async (
  username: string,
  setState?: Dispatch<SetStateAction<any>>
) => {
  let res = await fetch(`https://api.github.com/users/${username}`);
  let data: GitHubUserInfo = await res.json();
  if (setState) setState(data);
  return data;
};

/**
 * Insert a new message into the database
 * @param message
 * @returns The message that was added
 */
export const addMessage = async (message: MessageCreated) => {
  let { body } = await supabase.from("messages").insert(message);
  await addUser(message.author);
  await incrementMessageCount(message.author);
  return body as MessageResponse[];
};

/**
 * Delete a message from the database
 * @param message
 * @returns The message that was deleted
 */
export const deleteMessage = async (message: MessageResponse) => {
  let { body } = await supabase
    .from("messages")
    .delete()
    .match({ id: message.id });
  await decrementMessageCount(message.author);
  await deleteZeroMessagesUsers();
  return body as MessageResponse[];
};

const incrementMessageCount = async (username: string) => {
  await supabase.rpc("increment", { row_username: username });
};

const decrementMessageCount = async (username: string) => {
  await supabase.rpc("decrement", { row_username: username });
};

const addUser = async (username: string) => {
  let search = await supabase.from("users").select("*").match({ username });
  let body: UserResponse[] | null = null;
  if (search.body && search.body.length === 0) {
    body = (await supabase.from("users").insert({ username })).body;
  }
  return body;
};

const deleteZeroMessagesUsers = async () => {
  let { body } = await supabase
    .from("users")
    .delete()
    .match({ message_count: 0 });
  return body;
};
