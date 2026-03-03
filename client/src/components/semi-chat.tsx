import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { usePerspective } from '@/hooks/use-perspective';
import { usePerspectiveTheme } from '@/hooks/use-perspective-theme';

interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface SemiChatProps {
  className?: string;
}

export function SemiChat({ className = '' }: SemiChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Get perspective-aware colors
  const { currentPerspective } = usePerspective();
  const { getThemeColor } = usePerspectiveTheme();
  
  // Semi should be pink by default, but can adapt to perspective
  const chatColor = getThemeColor('primary') || 'var(--brand-pink)';

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleMinimize = () => {
    setIsOpen(false);
    setIsMinimized(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  const handleToggleChat = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      content: inputValue.trim(),
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Use local endpoint which will call the public Semi API
      const response = await fetch('/api/semi/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          question: userMessage.content
        })
      });

      const data = await response.json();

      if (data.success && data.content) {
        const semiMessage: ChatMessage = {
          id: `semi-${Date.now()}`,
          content: data.content,
          isUser: false,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, semiMessage]);
      } else {
        throw new Error(data.error || 'Failed to get response');
      }
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        content: 'Sorry, I\'m having trouble connecting right now. Please try again in a moment.',
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Show chat button if not open (whether minimized or first time)
  const showButton = !isOpen;

  return (
    <div className={`fixed z-50 ${className}`}>
      {/* Chat Button */}
      {showButton && (
        <Button
          onClick={handleToggleChat}
          className="rounded-full w-14 h-14 text-white shadow-lg hover:shadow-xl transition-all duration-200"
          style={{
            backgroundColor: chatColor,
            borderColor: chatColor
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = `color-mix(in srgb, ${chatColor} 85%, black 15%)`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = chatColor;
          }}
          data-testid="button-open-semi-chat"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="w-80 sm:w-96 h-96 sm:h-[32rem] flex flex-col shadow-2xl border-2">
          <CardHeader 
            className="pb-3 text-white rounded-t-lg"
            style={{ backgroundColor: chatColor }}
          >
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold">Chat with Semi (;-])</CardTitle>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleMinimize}
                  className="text-white p-1 h-8 w-8"
                  style={{
                    backgroundColor: 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = `color-mix(in srgb, ${chatColor} 70%, black 30%)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                  data-testid="button-minimize-chat"
                >
                  —
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClose}
                  className="text-white p-1 h-8 w-8"
                  style={{
                    backgroundColor: 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = `color-mix(in srgb, ${chatColor} 70%, black 30%)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                  data-testid="button-close-chat"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <p className="text-white/80 text-sm">
              Ask me about CHB products, philosophy, or technical capabilities. 
              <br />
              <span className="text-white/60 text-xs">Don't share private information.</span>
            </p>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages Area */}
            <ScrollArea className="flex-1 p-4 max-h-64 sm:max-h-80">
              {messages.length === 0 && (
                <div className="text-center text-gray-500 mt-8">
                  <MessageCircle 
                    className="w-12 h-12 mx-auto mb-3" 
                    style={{ color: chatColor }}
                  />
                  <p className="text-sm">
                    Hi! I'm Semi, your AI assistant for CHB.
                    <br />
                    Ask me anything about our products or philosophy!
                  </p>
                </div>
              )}
              
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-4 ${message.isUser ? 'text-right' : 'text-left'}`}
                >
                  <div
                    className={`inline-block max-w-[80%] p-3 rounded-lg text-sm ${
                      message.isUser
                        ? 'text-white rounded-br-none'
                        : 'bg-gray-100 text-gray-800 rounded-bl-none'
                    }`}
                    style={message.isUser ? {
                      backgroundColor: chatColor
                    } : {}}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    <p className={`text-xs mt-1 opacity-70 ${
                      message.isUser ? 'text-white/70' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="text-left mb-4">
                  <div className="inline-block bg-gray-100 p-3 rounded-lg rounded-bl-none">
                    <Loader2 
                      className="w-4 h-4 animate-spin" 
                      style={{ color: chatColor }}
                    />
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </ScrollArea>
            
            {/* Input Area */}
            <div className="p-4 border-t bg-background rounded-b-lg">
              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me about CHB..."
                  disabled={isLoading}
                  className="flex-1"
                  data-testid="input-chat-message"
                />
                <Button
                  onClick={sendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  size="sm"
                  className="text-white"
                  style={{
                    backgroundColor: chatColor,
                    borderColor: chatColor
                  }}
                  onMouseEnter={(e) => {
                    if (!e.currentTarget.disabled) {
                      e.currentTarget.style.backgroundColor = `color-mix(in srgb, ${chatColor} 85%, black 15%)`;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!e.currentTarget.disabled) {
                      e.currentTarget.style.backgroundColor = chatColor;
                    }
                  }}
                  data-testid="button-send-message"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}