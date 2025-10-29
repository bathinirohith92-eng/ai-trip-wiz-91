import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Send, Sparkles, Plus } from "lucide-react";
import Navbar from "@/components/Navbar";
import ChatMessage from "@/components/ChatMessage";
import ItineraryCard from "@/components/ItineraryCard";
import SuccessModal from "@/components/SuccessModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getConversations, saveConversation, savePlan, type Conversation, type Message } from "@/lib/localStorage";

const ChatPage = () => {
  const [searchParams] = useSearchParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [showItineraries, setShowItineraries] = useState(false);
  const [showEnhance, setShowEnhance] = useState(false);
  const [enhanceInput, setEnhanceInput] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Hot queries
  const hotQueries = [
    "Plan a 5-day trip to Bali",
    "Romantic honeymoon in Kerala",
    "Adventure tour in Vietnam",
    "Luxury Europe vacation",
    "Budget-friendly Kashmir trip",
  ];

  // Follow-up questions
  const [followUpQuestions, setFollowUpQuestions] = useState<string[]>([]);

  useEffect(() => {
    // Load conversations
    setConversations(getConversations().slice(0, 2));

    // Check for query params
    const destination = searchParams.get("destination");
    const query = searchParams.get("query");
    const type = searchParams.get("type");

    if (destination || query || type) {
      const initialQuery = destination || query || `Plan a ${type} trip`;
      handleSendMessage(initialQuery);
    } else {
      // Add welcome message
      addAssistantMessage(
        "Hello! 👋 I'm your AI travel assistant. I can help you plan the perfect trip! Tell me:\n\n• Where would you like to go?\n• How many days?\n• What's your budget?\n• Any specific interests (adventure, culture, relaxation, etc.)?"
      );
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addUserMessage = (content: string) => {
    const message: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, message]);
  };

  const addAssistantMessage = (content: string) => {
    const message: Message = {
      id: Date.now().toString(),
      role: "assistant",
      content,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, message]);
  };

  const handleSendMessage = (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText) return;

    addUserMessage(messageText);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      addAssistantMessage(
        "Great! I'm analyzing your preferences... Let me create some amazing itineraries for you!"
      );
      
      // Show itineraries after a delay
      setTimeout(() => {
        setShowItineraries(true);
        addAssistantMessage(
          "Here are 3 personalized itineraries I've created for you! Each one offers a unique experience. Take a look and let me know which one interests you the most."
        );
        
        // Set follow-up questions
        setFollowUpQuestions([
          "Can you add more cultural experiences?",
          "What about food recommendations?",
          "Are there any adventure activities?",
        ]);
      }, 1500);
    }, 1000);
  };

  const handleEnhancePlan = () => {
    if (!enhanceInput.trim()) return;
    
    addUserMessage(`Enhance my plan: ${enhanceInput}`);
    setEnhanceInput("");
    setShowEnhance(false);
    
    setTimeout(() => {
      addAssistantMessage(
        "Perfect! I've updated your itinerary with your preferences. Check out the enhanced plans above!"
      );
      setShowItineraries(true);
    }, 1000);
  };

  const handleFinalizePlan = () => {
    // Save to localStorage
    const conversation: Conversation = {
      id: Date.now().toString(),
      title: messages[0]?.content.slice(0, 50) || "Travel Plan",
      messages,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    saveConversation(conversation);

    addAssistantMessage("✅ Plan saved successfully.");
    setShowSuccess(true);
    setShowItineraries(false);
  };

  const mockItineraries = [
    {
      title: "Cultural Explorer",
      days: 5,
      budget: "$800-$1200",
      highlights: [
        "Visit ancient temples and historical sites",
        "Traditional cooking class experience",
        "Local market tour and shopping",
      ],
    },
    {
      title: "Adventure Seeker",
      days: 5,
      budget: "$1000-$1500",
      highlights: [
        "Hiking and trekking adventures",
        "Water sports and beach activities",
        "Wildlife safari experience",
      ],
    },
    {
      title: "Relaxation Retreat",
      days: 5,
      budget: "$1200-$1800",
      highlights: [
        "Luxury spa and wellness treatments",
        "Beachfront resort stay",
        "Sunset cruise and fine dining",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-16 h-screen flex">
        {/* Main Chat Area - 70% */}
        <div className="flex-1 flex flex-col">
          {/* Recent Conversations - Top Center */}
          {conversations.length > 0 && (
            <div className="border-b border-border bg-muted/30 px-6 py-4">
              <div className="flex items-center gap-3 justify-center flex-wrap">
                <span className="text-sm text-muted-foreground font-medium">Recent:</span>
                {conversations.map((conv) => (
                  <motion.button
                    key={conv.id}
                    whileHover={{ scale: 1.02 }}
                    className="px-4 py-2 bg-card rounded-xl shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)] transition-all text-sm max-w-xs truncate"
                    onClick={() => {
                      setMessages(conv.messages);
                      setShowItineraries(false);
                    }}
                  >
                    {conv.title}
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-4xl mx-auto">
              {messages.map((message) => (
                <ChatMessage key={message.id} role={message.role} content={message.content} />
              ))}

              {/* Itinerary Cards */}
              {showItineraries && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="my-8"
                >
                  <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
                    {mockItineraries.map((itinerary, index) => (
                      <ItineraryCard
                        key={index}
                        {...itinerary}
                        onViewDetails={() => {
                          addAssistantMessage(
                            `Great choice! The ${itinerary.title} plan includes:\n\n${itinerary.highlights.map((h, i) => `${i + 1}. ${h}`).join("\n")}\n\nWould you like to enhance this plan or finalize it?`
                          );
                        }}
                      />
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 justify-center mt-6">
                    <Button
                      onClick={() => setShowEnhance(!showEnhance)}
                      variant="outline"
                      className="rounded-xl"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Enhance Plan
                    </Button>
                    <Button
                      onClick={handleFinalizePlan}
                      className="rounded-xl bg-gradient-to-r from-primary to-sunset hover:from-sunset hover:to-primary"
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Finalize Plan
                    </Button>
                  </div>

                  {/* Enhance Input */}
                  {showEnhance && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-4 flex gap-2"
                    >
                      <Input
                        value={enhanceInput}
                        onChange={(e) => setEnhanceInput(e.target.value)}
                        placeholder="Add custom places or preferences..."
                        className="rounded-xl"
                      />
                      <Button onClick={handleEnhancePlan} className="rounded-xl">
                        Add
                      </Button>
                    </motion.div>
                  )}
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Follow-up Questions */}
          {followUpQuestions.length > 0 && (
            <div className="border-t border-border px-6 py-3 bg-muted/30">
              <div className="max-w-4xl mx-auto flex gap-2 flex-wrap">
                {followUpQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleSendMessage(question)}
                    className="rounded-full shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)]"
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="border-t border-border p-6 bg-card">
            <div className="max-w-4xl mx-auto flex gap-3">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Type your message..."
                className="resize-none rounded-2xl"
                rows={2}
              />
              <Button
                onClick={() => handleSendMessage()}
                className="rounded-2xl px-8 bg-gradient-to-r from-primary to-sunset hover:from-sunset hover:to-primary shadow-[var(--shadow-medium)]"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Hot Queries Sidebar - 30% */}
        <div className="w-[30%] border-l border-border bg-muted/30 p-6 overflow-y-auto">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Hot Queries
          </h3>
          <div className="space-y-3">
            {hotQueries.map((query, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02, x: 4 }}
                onClick={() => handleSendMessage(query)}
                className="w-full text-left p-4 bg-card rounded-2xl shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)] transition-all"
              >
                <p className="text-sm">{query}</p>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <SuccessModal isOpen={showSuccess} onClose={() => setShowSuccess(false)} />
    </div>
  );
};

export default ChatPage;
