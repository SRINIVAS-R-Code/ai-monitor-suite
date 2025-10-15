import { useState } from "react";
import { Bot, Send, Mic, MicOff, MessageCircle, Sparkles } from "lucide-react";

interface AIAssistantProps {
  className?: string;
}

interface Message {
  id: number;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const AIAssistant = ({ className = "" }: AIAssistantProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "assistant",
      content: "Hello! I'm your AI assistant. How can I help you with your attendance and wellness today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isListening, setIsListening] = useState(false);

  const quickSuggestions = [
    "Check my attendance today",
    "Show wellness insights",
    "Schedule a break reminder",
    "View system status",
    "Analyze my productivity",
    "Help with wellness goals"
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      type: "user",
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        type: "assistant",
        content: generateAIResponse(inputMessage),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes("attendance")) {
      return "Based on your records, you've been present for 22 out of 26 working days this month. Your attendance rate is 92%, which is excellent! Would you like me to show you your detailed attendance history?";
    }

    if (lowerMessage.includes("wellness") || lowerMessage.includes("health")) {
      return "Your wellness metrics look good today! Energy level is at 85%, focus is strong at 78%, stress levels are low at 20%, and sleep quality is excellent at 92%. I recommend taking a 5-minute break in about 2 hours to maintain optimal productivity.";
    }

    if (lowerMessage.includes("break") || lowerMessage.includes("reminder")) {
      return "I'll set a reminder for you to take a break. Based on your work patterns, I suggest breaks at 11 AM and 3 PM. Would you like me to schedule these reminders?";
    }

    if (lowerMessage.includes("system") || lowerMessage.includes("status")) {
      return "All systems are operational! AI engine is running at 98.5% accuracy, all 12 cameras are online, database connection is stable, and face recognition is performing well at 94.2% accuracy.";
    }

    if (lowerMessage.includes("productivity") || lowerMessage.includes("analyze")) {
      return "Your productivity analysis shows strong performance! You've completed 15 tasks this week with an average of 8.2 hours worked daily. Your efficiency score is 86%, and you're in the top 15% of the team. Keep up the great work!";
    }

    if (lowerMessage.includes("goals") || lowerMessage.includes("wellness goals")) {
      return "Based on your wellness data, I recommend these goals: 1) Maintain 8+ hours of sleep nightly, 2) Take regular breaks every 2 hours, 3) Keep stress levels below 30%, 4) Aim for 8+ hours of work daily. You're already doing great on most of these!";
    }

    return "I'm here to help with your attendance tracking, wellness monitoring, productivity analysis, and system status. You can ask me about your daily attendance, wellness metrics, schedule reminders, productivity insights, or check system status. What would you like to know?";
  };

  const handleQuickSuggestion = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  const toggleVoiceInput = () => {
    setIsListening(!isListening);
    // In a real implementation, this would integrate with Web Speech API
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-50 ${
          isOpen ? 'rotate-45' : ''
        }`}
      >
        <Bot className="h-6 w-6" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className={`fixed bottom-24 right-6 w-96 bg-card border border-border rounded-xl shadow-2xl z-40 ${className}`}>
          {/* Header */}
          <div className="p-4 border-b border-border bg-gradient-to-r from-primary/5 to-primary/10 rounded-t-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                <Bot className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">AI Assistant</h3>
                <p className="text-xs text-muted-foreground">Always here to help</p>
              </div>
              <div className="ml-auto flex items-center gap-1">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                <span className="text-xs text-muted-foreground">Online</span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Suggestions */}
          {messages.length === 1 && (
            <div className="px-4 pb-2">
              <p className="text-xs text-muted-foreground mb-2">Quick suggestions:</p>
              <div className="flex flex-wrap gap-2">
                {quickSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickSuggestion(suggestion)}
                    className="text-xs px-3 py-1 bg-muted/50 hover:bg-muted rounded-full transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask me anything..."
                className="flex-1 px-3 py-2 text-sm bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <button
                onClick={toggleVoiceInput}
                className={`p-2 rounded-lg transition-colors ${
                  isListening
                    ? 'bg-destructive text-destructive-foreground animate-pulse'
                    : 'bg-muted hover:bg-muted/80'
                }`}
              >
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </button>
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;