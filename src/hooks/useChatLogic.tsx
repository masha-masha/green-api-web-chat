import { useState, useEffect } from 'react';
import type { ICredentials, IMessage } from '../types/chat';
import { formatToWhatsAppId } from '../utils/formatters';
import { sendMessageApi, receiveNotificationApi, deleteNotificationApi } from '../api/greenApi';

export const useChatLogic = () => {

  const [credentials, setCredentials] = useState<ICredentials>(() => {
    const saved = localStorage.getItem('green_api_credentials');
    return saved ? JSON.parse(saved) : { idInstance: '', apiTokenInstance: '' };
  });

  const [isAuthorized, setIsAuthorized] = useState<boolean>(() => {
    return !!localStorage.getItem('green_api_credentials');
  });

  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [activeChatId, setActiveChatId] = useState<string>('');
  const [messageText, setMessageText] = useState<string>('');
  const [messages, setMessages] = useState<IMessage[]>([]);

  const handleLogin = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (credentials.idInstance.trim() && credentials.apiTokenInstance.trim()) {
      localStorage.setItem('green_api_credentials', JSON.stringify(credentials));
      setIsAuthorized(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('green_api_credentials');
    setIsAuthorized(false);
    setMessages([]);
    setActiveChatId('');
  };

  const handleStartChat = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!phoneNumber.trim()) return;
    const formattedId = formatToWhatsAppId(phoneNumber);
    setActiveChatId(formattedId);
  };

  const handleCloseChat = () => {
    setActiveChatId('');
    setPhoneNumber('');
  };

  const handleSendMessage = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!messageText.trim() || !activeChatId) return;

    const ok = await sendMessageApi(credentials, activeChatId, messageText);
    if (ok) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: messageText,
          sender: 'me',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setMessageText('');
    } else {
      alert('Ошибка при отправке сообщения.');
    }
  };

  useEffect(() => {
    if (!isAuthorized) return;

    let isSubscribed = true;

    const pollNotifications = async () => {
      try {
        const data = await receiveNotificationApi(credentials);

        if (data && data.receiptId) {
          const { receiptId, body } = data;

          if (body.typeWebhook === 'incomingMessageReceived') {
            const senderChatId = body.senderData?.chatId || 'unknown';
            const text =
              body.messageData?.textMessageData?.textMessage ||
              body.messageData?.extendedTextMessageData?.text ||
              '[Медиасообщение / Неподдерживаемый формат]';

            setMessages((prev) => [
              ...prev,
              {
                id: body.idMessage || Date.now().toString(),
                text: text,
                sender: senderChatId,
                timestamp: body.timestamp
                  ? new Date(body.timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                  : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              }
            ]);
          }

          await deleteNotificationApi(credentials, receiptId);
        }
      } catch (error) {
        console.error('Ошибка Polling:', error);
        await new Promise((resolve) => setTimeout(resolve, 5000));
      } finally {
        if (isSubscribed) {
          setTimeout(pollNotifications, 2000);
        }
      }
    };

    pollNotifications();

    return () => {
      isSubscribed = false;
    };
  }, [isAuthorized, credentials]);

  return {
    credentials,
    setCredentials,
    isAuthorized,
    phoneNumber,
    setPhoneNumber,
    activeChatId,
    messageText,
    setMessageText,
    messages,
    handleLogin,
    handleLogout,
    handleStartChat,
    handleCloseChat,
    handleSendMessage,
  };
};