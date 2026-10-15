export interface ICredentials {
  idInstance: string;
  apiTokenInstance: string;
}

export interface IMessage {
  id: string;
  text: string;
  sender: 'me' | string;
  timestamp: string;
}

export interface NotificationResponse {
  receiptId: number;
  body: {
    typeWebhook: string;
    idMessage?: string;
    timestamp?: number;
    senderData?: {
      chatId: string;
    };
    messageData?: {
      textMessageData?: {
        textMessage?: string;
      };
      extendedTextMessageData?: {
        text?: string;
      };
    };
  };
}
