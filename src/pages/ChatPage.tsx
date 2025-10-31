import { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Send, Sparkles, Loader2, ArrowLeft, User, Heart, Scale, Map } from "lucide-react";
import ChatMessage from "@/components/ChatMessage";
import ItineraryCard from "@/components/ItineraryCard";
import ItineraryDetailSheet from "@/components/ItineraryDetailSheet";
import SuccessModal from "@/components/SuccessModal";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { getConversations, saveConversation, type Conversation, type Message } from "@/lib/localStorage";

const ChatPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [showItineraries, setShowItineraries] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [awaitingFollowUp, setAwaitingFollowUp] = useState(false);
  const [followUpStep, setFollowUpStep] = useState(0);
  const [tripData, setTripData] = useState({ destination: "", duration: "", type: "", budget: "" });
  const [selectedItinerary, setSelectedItinerary] = useState<number | null>(null);
  const [showDetailSheet, setShowDetailSheet] = useState(false);
  const [likedPlans, setLikedPlans] = useState<number[]>([]);
  const [comparePlans, setComparePlans] = useState<number[]>([]);
  const [trendingScores, setTrendingScores] = useState<Record<string, number>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Hot queries - Indian destinations with scores
  const baseHotQueries = [
    "5-day adventure in Leh Ladakh",
    "Romantic week in Goa beaches",
    "Cultural tour of Rajasthan",
    "Spiritual journey to Varanasi",
    "Beach paradise in Andaman",
  ];

  // Sort queries by score
  const hotQueries = [...baseHotQueries].sort((a, b) => 
    (trendingScores[b] || 0) - (trendingScores[a] || 0)
  );

  // Follow-up questions
  const [followUpQuestions, setFollowUpQuestions] = useState<string[]>([]);

  const loadingMessages = [
    "Translating user language → English",
    "Started planning",
    "Finding the best places",
    "Checking weather",
    "Stitching the plans",
    "Translating back to user language",
    "Perfect plans found!"
  ];

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
        
        // Show loading and generate itineraries with dynamic messages
        setTimeout(() => {
          setIsLoading(true);
          setLoadingStep(0);
          
          // Cycle through loading messages
          const interval = setInterval(() => {
            setLoadingStep(prev => {
              if (prev < loadingMessages.length - 1) {
                return prev + 1;
              }
              return prev;
            });
          }, 2000);
          
          setTimeout(() => {
            clearInterval(interval);
            setIsLoading(false);
            setShowItineraries(true);
            addAssistantMessage(
              "Here are 3 personalized itineraries I've created for you! Each one offers a unique experience."
            );
            
            setFollowUpQuestions([
              "Can you add more cultural experiences?",
              "What about food recommendations?",
              "Are there any adventure activities?",
              "Tell me about local cuisine",
              "What are the best photo spots?"
            ]);
          }, 14000);
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

  const handleTrendingClick = (query: string) => {
    setInput(query);
    setTrendingScores(prev => ({
      ...prev,
      [query]: (prev[query] || 0) + 1
    }));
  };

  const handleLikePlan = (index: number) => {
    setLikedPlans(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const handleComparePlan = (index: number) => {
    setComparePlans(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const openMapView = () => {
    window.open('/map', '_blank');
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
      {/* Simple Header with Back Button and Profile */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-between px-6 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back</span>
          </Button>
          
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-semibold">Anish</span>
          </div>
        </div>
      </div>
      
      <div className="pt-20 h-screen flex">
        {/* Main Chat Area - 70% */}
        <div className="flex-1 flex flex-col">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-4xl mx-auto">
              {messages.map((message) => (
                <ChatMessage key={message.id} role={message.role} content={message.content} />
              ))}

              {/* Loading Animation with Steps */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-3 text-primary my-4"
                >
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <motion.span 
                    key={loadingStep}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-sm font-medium"
                  >
                    {loadingMessages[loadingStep]}
                  </motion.span>
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
                        isLiked={likedPlans.includes(index)}
                        isCompared={comparePlans.includes(index)}
                        onLike={() => handleLikePlan(index)}
                        onCompare={() => handleComparePlan(index)}
                        onViewDetails={() => {
                          setSelectedItinerary(index);
                          setShowDetailSheet(true);
                        }}
                        onEnhance={handleEnhancePlan}
                        onFinalize={() => handleFinalizePlan(index)}
                      />
                    ))}
                  </div>
                  
                  {/* View on Map Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 flex justify-center"
                  >
                    <Button
                      onClick={openMapView}
                      className="rounded-full px-6 py-6 bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-lg"
                    >
                      <Map className="w-5 h-5 mr-2" />
                      View on Map
                    </Button>
                  </motion.div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Follow-up Questions - Horizontal Scroll */}
          {followUpQuestions.length > 0 && (
            <div className="border-t border-border px-6 py-3 bg-muted/20">
              <div className="max-w-4xl mx-auto overflow-x-auto hide-scrollbar">
                <div className="flex gap-2 min-w-max pb-1">
                  {followUpQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleSendMessage(question)}
                      className="rounded-full shadow-sm hover:shadow-md whitespace-nowrap"
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Input Area - Compact */}
          <div className="border-t border-border p-4 bg-card">
            <div className="max-w-4xl mx-auto flex gap-3 items-end">
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
                className="resize-none rounded-xl h-12 py-3"
                rows={1}
              />
              <Button
                onClick={() => handleSendMessage()}
                className="rounded-xl px-6 h-12 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Right Sidebar - 30% Split */}
        <div className="w-[30%] border-l border-border bg-muted/20 overflow-y-auto h-full flex flex-col">
          {/* Top Half - Action Buttons */}
          <div className="p-6 border-b border-border">
            <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              Quick Actions
            </h3>
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start rounded-xl"
                onClick={() => {/* TODO: Show liked plans */}}
              >
                <Heart className="w-4 h-4 mr-2" />
                Liked Plans ({likedPlans.length})
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start rounded-xl"
                onClick={() => {/* TODO: Show compare */}}
              >
                <Scale className="w-4 h-4 mr-2" />
                Compare Plans ({comparePlans.length})
              </Button>
            </div>
            
            {/* Chat History */}
            {conversations.length > 0 && (
              <>
                <h4 className="text-xs font-semibold mt-6 mb-3 text-muted-foreground">Recent Chats</h4>
                <div className="space-y-2">
                  {conversations.slice(0, 2).map((conv) => (
                    <motion.button
                      key={conv.id}
                      whileHover={{ scale: 1.01 }}
                      className="w-full text-left p-2.5 bg-card rounded-lg shadow-sm hover:shadow-md transition-all text-xs truncate"
                      onClick={() => {
                        setMessages(conv.messages);
                        setShowItineraries(false);
                      }}
                    >
                      {conv.title}
                    </motion.button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Bottom Half - Trending Queries */}
          <div className="flex-1 p-6">
            <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              Trending Queries
            </h3>
            <div className="space-y-2">
              {hotQueries.map((query, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.01, x: 2 }}
                  onClick={() => handleTrendingClick(query)}
                  className="w-full text-left p-2.5 bg-card rounded-lg shadow-sm hover:shadow-md transition-all text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span>{query}</span>
                    {trendingScores[query] && (
                      <span className="text-[10px] text-muted-foreground">
                        {trendingScores[query]}
                      </span>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
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
