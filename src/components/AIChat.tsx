import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Sparkles, Trash2, Loader2, Volume2, Mic } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, Button } from '../components/UI';
import { useAuth } from '../context/AuthContext';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AIChat() {
  const { profile } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: `Hello ${profile?.displayName}! I'm your AI Academic Assistant. How can I help you today? You can ask me to explain a concept, help with homework, or quiz you on a topic.` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          history: messages.map(m => ({
            role: m.role === 'user' ? 'user' : 'model',
            parts: [{ text: m.content }]
          }))
        })
      });

      const data = await response.json();
      if (data.text) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.text }]);
      } else {
        throw new Error('No response from AI');
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I'm having trouble connecting right now. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([{ role: 'assistant', content: `Chat cleared. How can I help you now, ${profile?.displayName}?` }]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-160px)]">
      <Card className="flex-1 flex flex-col overflow-hidden border-none shadow-md">
        {/* Chat Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-pink-600 rounded-xl flex items-center justify-center">
              <Sparkles className="text-white w-6 h-6" />
            </div>
            <div>
              <h2 className="font-bold text-slate-900">AI Student Assistant</h2>
              <p className="text-xs text-emerald-600 flex items-center gap-1 font-medium">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                Always online to help
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={clearChat} title="Clear conversation">
            <Trash2 className="w-4 h-4 text-slate-400 hover:text-red-500 transition-colors" />
          </Button>
        </div>

        {/* Messages Container */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50"
        >
          {messages.map((message, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-3 max-w-[85%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center shadow-sm ${
                  message.role === 'user' ? 'bg-slate-200' : 'bg-pink-600'
                }`}>
                  {message.role === 'user' ? <User className="w-4 h-4 text-slate-600" /> : <Bot className="w-4 h-4 text-white" />}
                </div>
                <div className={`p-4 rounded-2xl shadow-sm border ${
                  message.role === 'user' 
                    ? 'bg-white border-slate-200 rounded-tr-none' 
                    : 'bg-pink-50 border-pink-100 rounded-tl-none text-slate-800'
                }`}>
                  <div className="prose prose-sm prose-slate max-w-none">
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                  </div>
                  {message.role === 'assistant' && (
                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-pink-100/50">
                      <button className="text-pink-400 hover:text-pink-600 transition-colors">
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex gap-3 max-w-[85%]">
                <div className="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center bg-pink-600">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="p-4 rounded-2xl bg-pink-50 border border-pink-100 rounded-tl-none flex items-center gap-2">
                  <Loader2 className="w-4 h-4 text-pink-600 animate-spin" />
                  <span className="text-sm font-medium text-pink-600">Assistant is thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t border-slate-100 bg-white">
          <div className="flex items-end gap-2 max-w-4xl mx-auto relative">
            <div className="flex-1 relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Ask me anything..."
                rows={1}
                className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all resize-none max-h-40"
                style={{ height: 'auto' }}
              />
              <button className="absolute right-3 bottom-3 p-1.5 text-slate-400 hover:text-pink-600 transition-colors">
                <Mic className="w-4 h-4" />
              </button>
            </div>
            <Button 
              onClick={handleSend} 
              disabled={!input.trim() || isLoading}
              className="h-[46px] w-[46px] p-0 rounded-xl shrink-0"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
          <p className="text-[10px] text-center text-slate-400 mt-2 font-medium">AI can make mistakes. Verify important information.</p>
        </div>
      </Card>
    </div>
  );
}
