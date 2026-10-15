import React from "react";
import styles from "./styles.module.css";

interface MessageInputProps {
 activeChatId: string;
 messageText: string;
 setMessageText: (val: string) => void;
 onSendMessage: (e: React.SyntheticEvent) => void;
}

export const MessageInput: React.FC<MessageInputProps> = ({
 activeChatId,
 messageText,
 setMessageText,
 onSendMessage,
}) => {
 return (
  <form onSubmit={onSendMessage} className={styles.footer}>
   <input
    className={styles.input}
    placeholder={
     activeChatId ? "Введите сообщение..." : "Сначала откройте чат сверху"
    }
    value={messageText}
    onChange={(e) => setMessageText(e.target.value)}
    disabled={!activeChatId}
   />
   <button className={styles.button} type="submit" disabled={!activeChatId}>
    Отправить
   </button>
  </form>
 );
};
