import React, { useRef, useEffect } from 'react';
import type { IMessage } from '../../types/chat';
import styles from './styles.module.css';

interface MessageListProps {
  activeChatId: string;
  messages: IMessage[];
}

export const MessageList: React.FC<MessageListProps> = ({ activeChatId, messages }) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className={styles.messagesContainer}>
      {!activeChatId ? (
        <div className={styles.emptyState}>Введите номер телефона сверху, чтобы начать переписку</div>
      ) : (
        messages
          .filter((m) => m.sender === 'me' || m.sender === activeChatId)
          .map((msg) => {
            const isMe = msg.sender === 'me';
            const bubbleClass = `${styles.messageBubble} ${isMe ? styles.myMessage : styles.otherMessage}`;

            return (
              <div key={msg.id} className={bubbleClass}>
                <div>{msg.text}</div>
                <div className={styles.timestamp}>{msg.timestamp}</div>
              </div>
            );
          })
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};