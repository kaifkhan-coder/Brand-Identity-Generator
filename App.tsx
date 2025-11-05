
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { BrandIdentity, ChatMessage, GeminiChat } from './types';
import { generateBrandIdentity, createChat, sendChatMessage } from './services/geminiService';
import BrandInput from './components/BrandInput';
import BrandDashboard from './components/BrandDashboard';
import ChatBot from './components/ChatBot';

const App: React.FC = () => {
  const [mission, setMission] = useState<string>('');
  const [brandIdentity, setBrandIdentity] = useState<BrandIdentity | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isChatLoading, setIsChatLoading] = useState<boolean>(false);
  const chatRef = useRef<GeminiChat | null>(null);

  useEffect(() => {
    if (brandIdentity?.typography) {
      const headerFontLink = document.createElement('link');
      headerFontLink.href = brandIdentity.typography.headerFont.googleFontUrl;
      headerFontLink.rel = 'stylesheet';
      document.head.appendChild(headerFontLink);

      const bodyFontLink = document.createElement('link');
      bodyFontLink.href = brandIdentity.typography.bodyFont.googleFontUrl;
      bodyFontLink.rel = 'stylesheet';
      document.head.appendChild(bodyFontLink);

      return () => {
        document.head.removeChild(headerFontLink);
        document.head.removeChild(bodyFontLink);
      };
    }
  }, [brandIdentity]);
  
  const handleGenerate = useCallback(async () => {
    if (!mission.trim()) {
      setError('Please enter a company mission or description.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setBrandIdentity(null);
    try {
      const result = await generateBrandIdentity(mission);
      setBrandIdentity(result);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [mission]);

  const handleSendMessage = useCallback(async (message: string) => {
    if (!chatRef.current) {
        chatRef.current = createChat();
    }

    setIsChatLoading(true);
    setChatHistory(prev => [...prev, { role: 'user', parts: [{ text: message }] }]);

    try {
        const response = await sendChatMessage(chatRef.current, message);
        setChatHistory(prev => [...prev, { role: 'model', parts: [{ text: response.text }] }]);
    } catch (err) {
        console.error("Chat error:", err);
        setChatHistory(prev => [...prev, { role: 'model', parts: [{ text: "Sorry, I encountered an error. Please try again." }] }]);
    } finally {
        setIsChatLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <header className="bg-gray-800/50 backdrop-blur-sm p-4 border-b border-gray-700 sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">
          Brand Identity Generator
        </h1>
      </header>
      
      <main className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6 max-w-screen-2xl mx-auto">
        <aside className="lg:col-span-1 xl:col-span-1 flex flex-col gap-6 h-full">
            <BrandInput 
                mission={mission}
                setMission={setMission}
                onGenerate={handleGenerate}
                isLoading={isLoading}
            />
            <ChatBot
                history={chatHistory}
                onSendMessage={handleSendMessage}
                isLoading={isChatLoading}
            />
        </aside>

        <section className="lg:col-span-2 xl:col-span-3">
             <BrandDashboard
                brandIdentity={brandIdentity}
                isLoading={isLoading}
                error={error}
            />
        </section>
      </main>
    </div>
  );
};

export default App;
