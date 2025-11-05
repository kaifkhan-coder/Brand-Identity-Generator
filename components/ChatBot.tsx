
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';

interface ChatBotProps {
  history: ChatMessage[];
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatBot: React.FC<ChatBotProps> = ({ history, onSendMessage, isLoading }) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history, isLoading]);

  const handleSend = () => {
    if (input.trim() && !isLoading) {
      onSendMessage(input);
      setInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 flex flex-col h-[calc(100vh-320px)] min-h-[400px]">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-xl font-semibold text-white text-center">Brand Strategy Assistant</h2>
      </div>
      <div className="flex-grow p-4 overflow-y-auto">
        {history.map((msg, index) => (
          <div key={index} className={`flex mb-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                msg.role === 'user'
                  ? 'bg-indigo-600 text-white rounded-br-none'
                  : 'bg-gray-700 text-gray-200 rounded-bl-none'
              }`}
            >
              {msg.parts[0].text}
            </div>
          </div>
        ))}
        {isLoading && (
            <div className="flex justify-start mb-4">
                <div className="max-w-xs lg:max-w-md px-4 py-2 rounded-lg bg-gray-700 text-gray-200 rounded-bl-none">
                    <div className="flex items-center justify-center gap-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    </div>
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t border-gray-700 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask a question..."
          className="flex-grow bg-gray-900 border border-gray-600 rounded-full py-2 px-4 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-gray-200"
          disabled={isLoading}
        />
        <button
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          className="bg-indigo-600 text-white rounded-full p-2 hover:bg-indigo-700 disabled:bg-indigo-800 disabled:cursor-not-allowed transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
