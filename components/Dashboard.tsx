import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User as UserIcon, Loader2, Sparkles, TrendingUp, Lightbulb, PenTool } from 'lucide-react';
import { ChatMessage } from '../types';
import { sendMessageToAI } from '../services/geminiService';
import { GenerateContentResponse } from '@google/genai';
import { SUGGESTED_PROMPTS } from '../constants';

const Dashboard: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Hello! I am your BizGenius AI. I'm ready to help you grow your business, create marketing strategies, or brainstorm the next big idea. Where should we start?",
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: text,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Temporary placeholder for streaming response
      const botMsgId = (Date.now() + 1).toString();
      setMessages(prev => [...prev, {
        id: botMsgId,
        role: 'model',
        text: '',
        timestamp: Date.now()
      }]);

      const stream = await sendMessageToAI(text);
      
      let fullText = '';
      
      for await (const chunk of stream) {
        const c = chunk as GenerateContentResponse;
        if (c.text) {
          fullText += c.text;
          setMessages(prev => 
            prev.map(msg => 
              msg.id === botMsgId 
                ? { ...msg, text: fullText } 
                : msg
            )
          );
        }
      }

    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'model',
        text: "I apologize, but I encountered an error processing your request. Please try again.",
        timestamp: Date.now()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Helper to render Markdown-like formatting simply
  const renderText = (text: string) => {
    return text.split('\n').map((line, i) => (
      <React.Fragment key={i}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 relative">
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-900/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-indigo-900/10 rounded-full blur-[100px]" />
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 scroll-smooth z-10">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-[85%] md:max-w-[75%] gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              
              {/* Avatar */}
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0
                ${msg.role === 'user' ? 'bg-indigo-600' : 'bg-gradient-to-br from-blue-500 to-cyan-500'}
                shadow-lg
              `}>
                {msg.role === 'user' ? <UserIcon size={20} /> : <Bot size={20} />}
              </div>

              {/* Message Bubble */}
              <div className={`
                p-4 rounded-2xl shadow-md text-sm md:text-base leading-relaxed animate-slide-up
                ${msg.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-sm' 
                  : 'bg-slate-800/80 backdrop-blur-sm border border-slate-700 text-slate-100 rounded-tl-sm'}
              `}>
                 <div className="prose prose-invert max-w-none">
                    {/* Basic rendering handling - for full markdown we'd use a library, 
                        but to minimize files/deps we stick to whitespace preservation */}
                    <div style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</div>
                 </div>
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start w-full animate-pulse">
            <div className="flex max-w-[75%] gap-4">
               <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center">
                  <Bot size={20} className="text-slate-500" />
               </div>
               <div className="bg-slate-800/50 p-4 rounded-2xl rounded-tl-sm flex items-center gap-2">
                 <Loader2 size={16} className="animate-spin text-blue-400" />
                 <span className="text-slate-400 text-sm">Thinking strategy...</span>
               </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Suggestions (only if few messages) */}
      {messages.length < 3 && (
        <div className="px-4 md:px-8 pb-4 z-10">
          <p className="text-slate-500 text-xs mb-3 font-medium uppercase tracking-wider">Suggested Actions</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
             {SUGGESTED_PROMPTS.map((prompt, idx) => (
               <button 
                key={idx}
                onClick={() => handleSend(prompt)}
                className="text-left p-3 rounded-xl bg-slate-800/50 hover:bg-slate-700 border border-slate-700/50 transition-all text-sm text-slate-300 hover:text-white flex items-center gap-2 group"
               >
                 <Sparkles size={14} className="text-yellow-500 group-hover:text-yellow-400" />
                 {prompt}
               </button>
             ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 md:p-6 bg-slate-900/90 backdrop-blur-lg border-t border-slate-800 z-20">
        <div className="max-w-4xl mx-auto relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about marketing, branding, or growth strategies..."
            className="w-full bg-slate-950 text-white placeholder-slate-500 rounded-2xl pl-5 pr-14 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 border border-slate-800 resize-none h-[60px] max-h-[120px]"
            style={{ minHeight: '60px' }}
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            className={`
              absolute right-2 top-2 bottom-2 aspect-square rounded-xl flex items-center justify-center transition-all
              ${input.trim() && !isLoading ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20' : 'bg-slate-800 text-slate-600 cursor-not-allowed'}
            `}
          >
            {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
          </button>
        </div>
        <p className="text-center text-xs text-slate-600 mt-2">
          BizGenius AI can make mistakes. Verify important business data.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;