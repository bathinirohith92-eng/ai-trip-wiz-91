import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Send, Sparkles, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import ChatMessage from "@/components/ChatMessage";
import ItineraryCard from "@/components/ItineraryCard";
import ItineraryDetailSheet from "@/components/ItineraryDetailSheet";
import SuccessModal from "@/components/SuccessModal";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { getConversations, saveConversation, type Conversation, type Message } from "@/lib/localStorage";

const ChatPage = () => {
  const [searchParams] = useSearchParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [showItineraries, setShowItineraries] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [awaitingFollowUp, setAwaitingFollowUp] = useState(false);
  const [followUpStep, setFollowUpStep] = useState(0);
  const [tripData, setTripData] = useState({ destination: "", duration: "", type: "", budget: "" });
  const [selectedItinerary, setSelectedItinerary] = useState<number | null>(null);
  const [showDetailSheet, setShowDetailSheet] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Hot queries - Indian destinations
  const hotQueries = [
    "5-day adventure in Leh Ladakh",
    "Romantic week in Goa beaches",
    "Cultural tour of Rajasthan",
    "Spiritual journey to Varanasi",
    "Beach paradise in Andaman",
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

    // If waiting for follow-up answers
    if (awaitingFollowUp) {
      const newTripData = { ...tripData };
      
      if (followUpStep === 0) {
        newTripData.duration = messageText;
        setTripData(newTripData);
        setFollowUpStep(1);
        setTimeout(() => {
          addAssistantMessage("Would you like more cultural, historical, or adventurous experiences?");
        }, 500);
      } else if (followUpStep === 1) {
        newTripData.type = messageText;
        setTripData(newTripData);
        setFollowUpStep(2);
        setTimeout(() => {
          addAssistantMessage("What is your approximate budget range? (e.g., ₹30,000-₹50,000)");
        }, 500);
      } else if (followUpStep === 2) {
        newTripData.budget = messageText;
        setTripData(newTripData);
        setAwaitingFollowUp(false);
        setFollowUpStep(0);
        
        // Show loading and generate itineraries
        setTimeout(() => {
          setIsLoading(true);
          addAssistantMessage("✨ Creating plans and exploring places...");
          
          setTimeout(() => {
            setIsLoading(false);
            setShowItineraries(true);
            addAssistantMessage(
              "Here are 3 personalized itineraries I've created for you! Each one offers a unique experience."
            );
            
            setFollowUpQuestions([
              "Can you add more cultural experiences?",
              "What about food recommendations?",
              "Are there any adventure activities?",
            ]);
          }, 2500);
        }, 500);
      }
    } else {
      // First message - start follow-up flow
      setTripData({ ...tripData, destination: messageText });
      setAwaitingFollowUp(true);
      setFollowUpStep(0);
      
      setTimeout(() => {
        addAssistantMessage(`Great choice! ${messageText} is amazing! 🌟\n\nWhat's your preferred travel duration? (e.g., 5 days, 1 week)`);
      }, 800);
    }
  };

  const handleEnhancePlan = (cardIndex: number, customInput: string) => {
    addUserMessage(`Enhance plan ${cardIndex + 1}: ${customInput}`);
    
    setTimeout(() => {
      setIsLoading(true);
      addAssistantMessage("✨ Updating your itinerary...");
      
      setTimeout(() => {
        setIsLoading(false);
        addAssistantMessage(
          `Perfect! I've updated the ${mockItineraries[cardIndex].title} plan with your preferences.`
        );
      }, 1500);
    }, 500);
  };

  const handleFinalizePlan = (cardIndex: number) => {
    const conversation: Conversation = {
      id: Date.now().toString(),
      title: `${tripData.destination || 'Travel'} - ${mockItineraries[cardIndex].title}`,
      messages,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    saveConversation(conversation);

    addAssistantMessage(`✅ Your ${mockItineraries[cardIndex].title} has been finalized and saved!`);
    setShowSuccess(true);
  };

  const mockItineraries = [
    {
      title: "Cultural Explorer",
      days: 5,
      budget: "₹60,000-₹90,000",
      dayPlans: [
        {
          day: 1,
          date: "Feb 15",
          morning: "Visit Basilica of Bom Jesus and Se Cathedral",
          afternoon: "Explore Old Goa heritage sites",
          evening: "Sunset at Miramar Beach"
        },
        {
          day: 2,
          date: "Feb 16",
          morning: "Tour Fontainhas Latin Quarter",
          afternoon: "Traditional Goan cooking class",
          evening: "Attend Fado music performance"
        },
        {
          day: 3,
          date: "Feb 17",
          morning: "Visit Shantadurga Temple",
          afternoon: "Spice plantation tour",
          evening: "Local market shopping at Anjuna"
        },
        {
          day: 4,
          date: "Feb 18",
          morning: "Explore Chapora Fort",
          afternoon: "Heritage walk through Panjim",
          evening: "River cruise on Mandovi"
        },
        {
          day: 5,
          date: "Feb 19",
          morning: "Visit Cabo de Rama Fort",
          afternoon: "Beach time at Palolem",
          evening: "Farewell dinner with Goan cuisine"
        }
      ]
    },
    {
      title: "Adventure Seeker",
      days: 5,
      budget: "₹75,000-₹1,10,000",
      dayPlans: [
        {
          day: 1,
          date: "Feb 15",
          morning: "Scuba diving at Grande Island",
          afternoon: "Jet skiing at Calangute Beach",
          evening: "Beach volleyball and bonfire"
        },
        {
          day: 2,
          date: "Feb 16",
          morning: "Parasailing at Candolim",
          afternoon: "Kayaking in backwaters",
          evening: "Night trek to Dudhsagar Falls base"
        },
        {
          day: 3,
          date: "Feb 17",
          morning: "Trek to Dudhsagar Waterfall",
          afternoon: "Swimming at natural pools",
          evening: "Wildlife spotting at Bhagwan Mahavir Sanctuary"
        },
        {
          day: 4,
          date: "Feb 18",
          morning: "White water rafting on Mhadei River",
          afternoon: "Rock climbing and rappelling",
          evening: "Beach camping at Agonda"
        },
        {
          day: 5,
          date: "Feb 19",
          morning: "Surfing lessons at Ashwem",
          afternoon: "ATV ride through coastal trails",
          evening: "Sunset cruise with dolphin spotting"
        }
      ]
    },
    {
      title: "Relaxation Retreat",
      days: 5,
      budget: "₹90,000-₹1,35,000",
      dayPlans: [
        {
          day: 1,
          date: "Feb 15",
          morning: "Arrival and resort check-in",
          afternoon: "Ayurvedic spa session",
          evening: "Sunset yoga at beach"
        },
        {
          day: 2,
          date: "Feb 16",
          morning: "Meditation and pranayama",
          afternoon: "Luxury spa treatments",
          evening: "Private beach dinner"
        },
        {
          day: 3,
          date: "Feb 17",
          morning: "Sunrise beach walk",
          afternoon: "Pool relaxation and massage",
          evening: "Fine dining at beachfront restaurant"
        },
        {
          day: 4,
          date: "Feb 18",
          morning: "Couples spa therapy",
          afternoon: "Private yacht cruise",
          evening: "Wine tasting and live music"
        },
        {
          day: 5,
          date: "Feb 19",
          morning: "Farewell yoga session",
          afternoon: "Leisurely beach time",
          evening: "Candlelight dinner by the sea"
        }
      ]
    }
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

              {/* Loading Animation */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-3 text-primary my-4"
                >
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span className="text-sm">Planning your perfect itinerary...</span>
                </motion.div>
              )}

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
                        cardIndex={index}
                        onViewDetails={() => {
                          setSelectedItinerary(index);
                          setShowDetailSheet(true);
                        }}
                        onEnhance={handleEnhancePlan}
                        onFinalize={() => handleFinalizePlan(index)}
                      />
                    ))}
                  </div>
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
                className="rounded-2xl px-8 bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-[var(--shadow-medium)]"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Hot Queries Sidebar - 30% */}
        <div className="w-[30%] border-l border-border bg-muted/30 p-6 overflow-y-auto h-full">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Trending Queries
          </h3>
          <div className="space-y-3">
                {hotQueries.map((query, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02, x: 4 }}
                    onClick={() => {
                      setInput(query);
                      setTimeout(() => handleSendMessage(query), 100);
                    }}
                    className="w-full text-left p-3 bg-card rounded-xl shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)] transition-all text-sm"
                  >
                    {query}
                  </motion.button>
                ))}
          </div>
        </div>
      </div>

      <SuccessModal isOpen={showSuccess} onClose={() => setShowSuccess(false)} />
      
      {selectedItinerary !== null && (
        <ItineraryDetailSheet
          isOpen={showDetailSheet}
          onClose={() => setShowDetailSheet(false)}
          {...mockItineraries[selectedItinerary]}
        />
      )}
    </div>
  );
};

export default ChatPage;
