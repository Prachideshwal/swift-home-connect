
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, Send, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { sendChatMessage } from '@/lib/api';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', content: 'Hello! How can I help you with our home services today?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!inputMessage.trim()) return;
    
    // Add user message
    setMessages((prev) => [...prev, { type: 'user', content: inputMessage }]);
    setIsLoading(true);
    
    try {
      // Get response from chatbot API
      const response = await sendChatMessage(inputMessage);
      
      // Add bot response with a slight delay to simulate typing
      setTimeout(() => {
        setMessages((prev) => [...prev, { type: 'bot', content: response }]);
        setIsLoading(false);
      }, 500);
      
    } catch (error) {
      console.error('Failed to get chatbot response:', error);
      setMessages((prev) => [
        ...prev, 
        { 
          type: 'bot', 
          content: 'Sorry, I encountered an error. Please try again later.' 
        }
      ]);
      setIsLoading(false);
    }
    
    // Clear input
    setInputMessage('');
  };
  
  return (
    <>
      {/* Chat button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-brand-blue text-white rounded-full p-4 shadow-lg hover:bg-brand-blue/90 transition-colors z-20"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
      
      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 sm:w-96 bg-white rounded-lg shadow-xl z-50 flex flex-col border">
          {/* Header */}
          <div className="bg-brand-blue text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-medium">Swift Home Connect Support</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0 text-white hover:bg-brand-blue/90"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto max-h-80">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-3 ${
                  message.type === 'user' ? 'flex justify-end' : 'flex justify-start'
                }`}
              >
                <div
                  className={`p-3 rounded-lg max-w-[80%] ${
                    message.type === 'user'
                      ? 'bg-brand-blue text-white rounded-br-none'
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start mb-3">
                <div className="bg-gray-100 rounded-lg rounded-bl-none p-3 flex space-x-1">
                  <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-0"></div>
                  <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                  <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-300"></div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input */}
          <div className="p-3 border-t">
            <form onSubmit={handleSendMessage} className="flex space-x-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1"
                disabled={isLoading}
              />
              <Button 
                type="submit" 
                size="icon" 
                disabled={isLoading || !inputMessage.trim()}
                className="bg-brand-blue hover:bg-brand-blue/90"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
