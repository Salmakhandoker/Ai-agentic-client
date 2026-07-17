import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { MessageSquare, X, Send, Sparkles, User, Brain, AlertCircle } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AiChatConciergeProps {
  activeListingId?: string;
}

export const AiChatConcierge: React.FC<AiChatConciergeProps> = ({ activeListingId }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Welcome to Aetheria! I am your AI Concierge. I understand your page context and can answer questions, generate custom itineraries, or recommend adventures. What would you like to explore?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [suggestedPrompts, setSuggestedPrompts] = useState<string[]>([
    'How do recommendations work?',
    'What adventures do you have?',
    'Help me plan a trip'
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Adjust suggested prompts when page changes
  useEffect(() => {
    if (location.pathname.includes('/explore')) {
      setSuggestedPrompts([
        'How do I filter by price?',
        'Show me the highest rated trip',
        'Tell me about Kyoto walk'
      ]);
    } else if (activeListingId) {
      setSuggestedPrompts([
        'How much does this trip cost?',
        'What is the difficulty rating?',
        'Can you generate an itinerary for this?'
      ]);
    } else if (location.pathname.includes('/items/manage')) {
      setSuggestedPrompts([
        'Explain listings distribution',
        'How do I add a new package?',
        'Show reviews analytics'
      ]);
    } else {
      setSuggestedPrompts([
        'How do recommendations work?',
        'Tell me about Aetheria',
        'Show me budget adventures'
      ]);
    }
  }, [location.pathname, activeListingId]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const chatHistory = [...messages, userMsg];
      const response = await axios.post('/ai/chat', {
        messages: chatHistory,
        currentUrl: window.location.href,
        activeListingId: activeListingId || null
      });

      const { content, suggestedPrompts: nextPrompts } = response.data;

      // Simulate streaming word-by-word or typing delay
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'assistant', content }]);
        if (nextPrompts && nextPrompts.length > 0) {
          setSuggestedPrompts(nextPrompts);
        }
        setIsTyping(false);
      }, 1000);

    } catch (error) {
      console.error('Chat error:', error);
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: "I encountered a slight turbulence in my connection. Let me try that again!" }
      ]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend(input);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full gradient-bg shadow-xl hover:shadow-primary/30 flex items-center justify-center text-white transform hover:scale-110 active:scale-95 transition-all cursor-pointer border border-primary/20 relative group"
        >
          <MessageSquare className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          {/* Tooltip */}
          <div className="absolute right-16 bg-slateCustom-900 border border-slate-700 text-slate-100 text-xs px-3 py-2 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
            Chat with AI Concierge
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[380px] h-[550px] max-w-[calc(100vw-2rem)] rounded-2xl glass-panel shadow-2xl flex flex-col border border-slate-800 animate-in fade-in slide-in-from-bottom-6 duration-300">
          {/* Header */}
          <div className="p-4 border-b border-slate-800 flex items-center justify-between gradient-bg rounded-t-2xl">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm tracking-wide flex items-center gap-1.5">
                  Aetheria Concierge
                  <Sparkles className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300 animate-pulse" />
                </h4>
                <p className="text-white/70 text-[10px]">Context-Aware Travel Assistant</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white focus:outline-none hover:bg-white/10 p-1.5 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Message List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-start space-x-2 ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-sm ${msg.role === 'user' ? 'bg-primary text-slateCustom-900' : 'bg-slateCustom-800 text-primary'}`}>
                  {msg.role === 'user' ? <User className="w-4 h-4" /> : <Brain className="w-4 h-4" />}
                </div>
                <div
                  className={`p-3 rounded-xl text-sm leading-relaxed max-w-[75%] border shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-primary/10 text-primary border-primary/20 rounded-tr-none'
                      : 'bg-slateCustom-800 text-slate-200 border-slate-700/50 rounded-tl-none'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-start space-x-2">
                <div className="w-8 h-8 rounded-lg bg-slateCustom-800 text-primary flex items-center justify-center shrink-0">
                  <Brain className="w-4 h-4" />
                </div>
                <div className="p-3 bg-slateCustom-800 text-slate-400 border border-slate-700/50 rounded-xl rounded-tl-none flex items-center space-x-1">
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Recommended Prompt Chips */}
          <div className="px-4 pb-2 pt-1 flex flex-wrap gap-1.5 border-t border-slate-800/40 bg-slateCustom-900/30">
            {suggestedPrompts.slice(0, 3).map((prompt, index) => (
              <button
                key={index}
                onClick={() => handleSend(prompt)}
                className="text-xs text-slate-300 hover:text-primary bg-slateCustom-800 hover:bg-slateCustom-800/80 border border-slate-700 hover:border-primary/30 px-2.5 py-1.5 rounded-lg transition-all text-left shrink-0 cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Footer Input */}
          <div className="p-3 border-t border-slate-800 bg-slateCustom-900/50 rounded-b-2xl flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask about prices, itinerary, packing..."
              className="flex-1 bg-slateCustom-800 text-slate-100 text-sm px-4 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-primary placeholder-slate-500"
            />
            <button
              onClick={() => handleSend(input)}
              className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center text-white hover:opacity-95 shadow-md active:scale-95 transition-all cursor-pointer shrink-0"
            >
              <Send className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
