import React from 'react';
import styles from "./styles.module.css";
import type { ICredentials } from '../../types/chat';

interface AuthFormProps {
  credentials: ICredentials;
  setCredentials: React.Dispatch<React.SetStateAction<ICredentials>>;
  onLogin: (e: React.SyntheticEvent) => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ credentials, setCredentials, onLogin }) => {
  return (
    <div className={styles.authWrapper}>
      <form className={styles.authCard} onSubmit={onLogin}>
        <h2 className={styles.title}>GREEN-API WhatsApp</h2>
        <input
          className={styles.input}
          placeholder="idInstance (напр. 1101000000)"
          value={credentials.idInstance}
          onChange={(e) => setCredentials({ ...credentials, idInstance: e.target.value })}
          required
        />
        <input
          className={styles.input}
          type="password"
          placeholder="apiTokenInstance"
          value={credentials.apiTokenInstance}
          onChange={(e) => setCredentials({ ...credentials, apiTokenInstance: e.target.value })}
          required
        />
        <button className={styles.button} type="submit">Войти в систему</button>
      </form>
    </div>
  );
};
