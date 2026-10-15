import React from 'react';
import styles from './styles.module.css';

interface ChatHeaderProps {
  activeChatId: string;
  phoneNumber: string;
  setPhoneNumber: (val: string) => void;
  onStartChat: (e: React.SyntheticEvent) => void;
  onCloseChat: () => void;
  onLogout: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  activeChatId,
  phoneNumber,
  setPhoneNumber,
  onStartChat,
  onCloseChat,
  onLogout
}) => {
  return (
    <div className={styles.header}>
      {!activeChatId ? (
        <form onSubmit={onStartChat} className={styles.form}>
          <input
            className={styles.input}
            placeholder="Введите номер получателя (напр. 79991234567)"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <button className={styles.button} type="submit">Открыть чат</button>
          <button className={styles.logoutButton} type="button" onClick={onLogout}>Выйти</button>
        </form>
      ) : (
        <div className={styles.activeChatInfo}>
          <div className={styles.chatTitle}>
            Чат с: {activeChatId.replace('@c.us', '')}
          </div>
          <div className={styles.actions}>
            <button className={styles.closeChatButton} type="button" onClick={onCloseChat}>
              Сменить чат
            </button>
            <button className={styles.logoutButton} type="button" onClick={onLogout}>
              Выйти
            </button>
          </div>
        </div>
      )}
    </div>
  );
};