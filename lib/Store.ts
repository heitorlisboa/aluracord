import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { createClient } from "@supabase/supabase-js";
import { MessageCreated, MessageResponse } from "../types";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_KEY as string
);

/**
 * Fetch the database, set up listeners and automatically update the message list
 * @returns The message list state and a boolean of whether the page is loading or not
 */
export const useStore = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState<MessageResponse[]>([]);
  const [newMessage, handleNewMessage] = useState<MessageResponse>();
  const [deletedMessage, handleDeletedMessage] = useState<MessageResponse>();

  // Load initial data and set up listeners
  /*
    Not all listeners are here yet because some
    features are yet to be implemented
  */
  useEffect(() => {
    // Fetch the messages from the database
    fetchMessages(setMessages).then(() => {
      setIsLoading(false);
    });

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

    // Cleanup on unmount
    return () => {
      messageListener.unsubscribe();
    };
  }, []);

  // New message received
  useEffect(() => {
    if (newMessage) {
      setMessages(messages.concat(newMessage));
    }
  }, [newMessage]);

  // Deleted message received
  useEffect(() => {
    if (deletedMessage)
      setMessages(
        messages.filter((message) => message.id !== deletedMessage.id)
      );
  }, [deletedMessage]);

  return {
    messages,
    isLoading,
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

/**
 * Insert a new message into the database
 * @param message
 * @returns The message that was added
 */
export const addMessage = async (message: MessageCreated) => {
  let { body } = await supabase.from("messages").insert(message);
  return body as MessageResponse[];
};

/**
 * Delete a message from the database
 * @param message
 * @returns The message that was deleted
 */
export const deleteMessage = async (id: number) => {
  let { body } = await supabase.from("messages").delete().match({ id: id });
  return body as MessageResponse[];
};
