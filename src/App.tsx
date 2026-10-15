import React from 'react';
import { useChatLogic } from './hooks/useChatLogic';

import { AuthForm } from './components/AuthForm/AuthForm';
import { ChatHeader } from './components/ChatHeader/ChatHeader';
import { MessageList } from './components/MessageList/MessageList';
import { MessageInput } from './components/MessageInput/MessageInput';


export const App: React.FC = () => {
  const {
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
  } = useChatLogic();

  if (!isAuthorized) {
    return <AuthForm credentials={credentials} setCredentials={setCredentials} onLogin={handleLogin} />;
  }

  return (
    <div className="container">
      <ChatHeader
        activeChatId={activeChatId}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        onStartChat={handleStartChat}
        onCloseChat={handleCloseChat}
        onLogout={handleLogout}
      />
      <MessageList activeChatId={activeChatId} messages={messages} />
      <MessageInput
        activeChatId={activeChatId}
        messageText={messageText}
        setMessageText={setMessageText}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default App;
