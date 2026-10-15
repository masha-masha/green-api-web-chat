import type { ICredentials, NotificationResponse } from '../types/chat';

const getBaseUrl = (idInstance: string): string =>
  `https://api.green-api.com/waInstance${idInstance}`;

export const sendMessageApi = async (
  credentials: ICredentials,
  chatId: string,
  message: string
): Promise<boolean> => {
  const url = `${getBaseUrl(credentials.idInstance)}/sendMessage/${credentials.apiTokenInstance}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chatId, message })
  });
  return response.ok;
};

export const receiveNotificationApi = async (
  credentials: ICredentials
): Promise<NotificationResponse | null> => {
  const url = `${getBaseUrl(credentials.idInstance)}/receiveNotification/${credentials.apiTokenInstance}`;
  const response = await fetch(url);
  if (response.status === 200) {
    return await response.json();
  }
  return null;
};

export const deleteNotificationApi = async (
  credentials: ICredentials,
  receiptId: number
): Promise<boolean> => {
  const url = `${getBaseUrl(credentials.idInstance)}/deleteNotification/${credentials.apiTokenInstance}/${receiptId}`;
  const response = await fetch(url, { method: 'DELETE' });
  return response.ok;
};