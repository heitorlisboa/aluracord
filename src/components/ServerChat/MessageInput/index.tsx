import { useRef, useState, useEffect } from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';

import styles from './MessageInput.module.scss';

import { addMessage } from '@/lib/Store';
import { useUserInfo } from '@/lib/UserInfoContext';

type MessageInputProps = {
  channel: string;
};

export function MessageInput({ channel }: MessageInputProps) {
  const userInfo = useUserInfo();
  const messageInputRef = useRef<HTMLTextAreaElement>(null);
  const [messageText, setMessageText] = useState('');

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setMessageText(event.target.value);
  }

  function handleKeyDown(event: KeyboardEvent) {
    const keyPressed = event.key;
    const trimmedMessage = messageText.trim();

    if (keyPressed === 'Enter' && !event.shiftKey) {
      event.preventDefault();

      const username = userInfo?.login;

      if (trimmedMessage && username) {
        addMessage({
          author: username,
          date: new Date().toISOString(),
          content: messageText.trim(),
        });
        setMessageText('');
      }
    }
  }

  function adjustInputHeight() {
    const element = messageInputRef.current;

    if (element) {
      /*
        Since the element has a min-height it will auto adjust
        to it when the height is set to 0. This is useful because
        when the user erases the text on the textarea, the scrollHeight
        will remain the same until it is resized, that means that if
        this line of code wasn't here, the textarea wouldn't ever
        readjust to it's default height.
      */
      element.style.height = '0px';
      element.style.height = element.scrollHeight + 'px';
    }
  }

  useEffect(() => {
    adjustInputHeight();
  }, [messageText]);

  return (
    <form className={styles.form}>
      <textarea
        className={styles.input}
        name="message"
        placeholder={`Conversar em ${channel}`}
        aria-label={`Conversar em ${channel}`}
        aria-multiline={true}
        ref={messageInputRef}
        value={messageText}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </form>
  );
}
