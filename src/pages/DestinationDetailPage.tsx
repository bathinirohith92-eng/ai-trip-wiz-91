import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight, Sparkles, Plane, Car, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const destinationData: Record<string, any> = {
  singapore: {
    name: "Singapore",
    subtitle: "Southeast Asia, Singapore",
    description: "Singapore is known for its modern skyline, diverse food scene, and vibrant culture, making it a popular destination for both business and leisure travelers.",
    temperature: "30°c",
    aqi: "34",
    images: [
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1200&q=80",
      "https://images.unsplash.com/photo-1508964942454-1a56651d54ac?w=1200&q=80",
      "https://images.unsplash.com/photo-1496939376851-89342e90adcd?w=1200&q=80",
    ],
    popularFor: [
      { icon: "💎", label: "Luxurious Hotels" },
      { icon: "🍜", label: "Hawker Centers" },
      { icon: "🌳", label: "Orchard Road" },
      { icon: "🏖️", label: "Marina Bay Sands" },
      { icon: "🏮", label: "Chinatown" },
      { icon: "🌺", label: "Gardens by the Bay" },
    ],
    tripDuration: "3-4 days",
    tripDescription: "A 3-4 day trip to Singapore allows you to explore the iconic Marina Bay Sands, visit the beautiful Gardens by the Bay, experience the vibrant culture in Chinatown, and indulge in the delicious street food at hawker centers.",
    costLevel: "Moderately expensive",
    bestTime: "November - March",
    weather: [
      { month: "Jan", temp: "23/31°c", icon: "⛅", aqi: 19 },
      { month: "Feb", temp: "23/30°c", icon: "🌧️", aqi: 23 },
      { month: "Mar", temp: "22/30°c", icon: "⛅", aqi: 22 },
      { month: "Apr", temp: "23/31°c", icon: "⛅", aqi: 27 },
      { month: "May", temp: "25/32°c", icon: "🌧️", aqi: 21 },
      { month: "Jun", temp: "24/31°c", icon: "⛅", aqi: 20 },
      { month: "Jul", temp: "24/32°c", icon: "🌧️", aqi: 21 },
      { month: "Aug", temp: "24/32°c", icon: "⛅", aqi: 25 },
      { month: "Sep", temp: "24/33°c", icon: "🌧️", aqi: 30 },
      { month: "Oct", temp: "24/33°c", icon: "🌧️", aqi: 40 },
      { month: "Nov", temp: "24/31°c", icon: "⛅", aqi: 23 },
      { month: "Dec", temp: "24/28°c", icon: "⛅", aqi: 16 },
    ],
    thingsToDo: [
      {
        id: 1,
        title: "Night Safari Exploration: Discover nocturnal wildlife 🌙",
        image: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=600&q=80",
      },
      {
        id: 2,
        title: "Gardens by the Bay: Marvel at futuristic gardens 🌿",
        image: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?w=600&q=80",
      },
      {
        id: 3,
        title: "Hawker Centre Dining: Indulge in local flavors 🥘",
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80",
      },
      {
        id: 4,
        title: "Chinatown Exploration: Immerse in cultural charm 🏮",
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80",
      },
    ],
    howToReach: [
      {
        type: "flight",
        label: "Fastest",
        title: "Fly to Singapore Changi Airport",
        from: "Chennai International Airport (MAA)",
        to: "Singapore Changi Airport (SIN)",
        duration: "7h 7m",
        price: "₹9,136 - 19,327",
      },
      {
        type: "car",
        label: "",
        title: "Drive 6231 km",
        from: "Chennai",
        to: "Singapore",
        duration: "3d 13h 35m",
        price: "₹99,713",
      },
      {
        type: "flight",
        label: "Cheapest",
        title: "Fly to Senai International Airport",
        from: "Chennai International Airport (MAA)",
        to: "Senai International Airport (JHB)",
        duration: "10h 54m",
        price: "₹9,217 - 20,236",
      },
    ],
  },
};

const DestinationDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const destination = destinationData[id || "singapore"];

  if (!destination) {
    return <div>Destination not found</div>;
  }

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "places", label: "Places to Stay" },
    { id: "things", label: "Things to do" },
    { id: "reach", label: "How to Reach" },
    { id: "more", label: "More" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border h-14 flex items-center px-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/holiday")}
          className="mr-4"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
      </header>

      <main className="pt-14">
        {/* Hero Carousel */}
        <div className="relative h-[500px] bg-black">
          <div className="relative h-full">
            <img
              src={destination.images[currentImageIndex]}
              alt={destination.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            
            {/* Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="container mx-auto">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-white text-5xl font-bold mb-2">
                      {destination.name}, <span className="font-normal">{destination.subtitle}</span>
                    </h1>
                    <p className="text-white/90 text-lg max-w-2xl">{destination.description}</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl px-4 py-2 text-white">
                      <div className="text-2xl font-bold">{destination.temperature}</div>
                    </div>
                    <div className="bg-green-500/90 backdrop-blur-md rounded-2xl px-4 py-2 text-white">
                      <div className="text-xs">AQI</div>
                      <div className="text-xl font-bold">{destination.aqi}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Carousel Controls */}
            <button
              onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? destination.images.length - 1 : prev - 1))}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => setCurrentImageIndex((prev) => (prev === destination.images.length - 1 ? 0 : prev + 1))}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Pagination Dots */}
            <div className="absolute bottom-24 left-8 flex gap-2">
              {destination.images.map((_: any, index: number) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`h-1 rounded-full transition-all ${
                    index === currentImageIndex ? "w-8 bg-white" : "w-6 bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="sticky top-14 z-40 bg-background border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div className="flex gap-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 text-sm font-medium transition-colors relative ${
                      activeTab === tab.id ? "text-primary" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="tab-indicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                      />
                    )}
                  </button>
                ))}
              </div>
              <Button className="gap-2">
                <Sparkles className="w-4 h-4" />
                Create trip with AI
              </Button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Weather Section */}
          <div className="mb-12 bg-card rounded-3xl border border-border p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Weather in {destination.name}</h2>
              <div className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                💡 Best time to visit {destination.bestTime}
              </div>
            </div>
            <div className="grid grid-cols-12 gap-4">
              {destination.weather.map((month: any) => (
                <div key={month.month} className="flex flex-col items-center">
                  <div className="text-sm font-medium mb-2">{month.month}</div>
                  <div className="text-2xl mb-2">{month.icon}</div>
                  <div className="text-xs text-muted-foreground mb-1">{month.temp}</div>
                  <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    AQI {month.aqi}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Popular For & Trip Duration */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-card rounded-3xl border border-border p-6">
              <h3 className="text-xl font-bold mb-4">{destination.name} is popular for</h3>
              <div className="grid grid-cols-3 gap-4">
                {destination.popularFor.map((item: any, index: number) => (
                  <div key={index} className="flex flex-col items-center text-center gap-2">
                    <div className="text-3xl">{item.icon}</div>
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-card rounded-3xl border border-border p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2">Usual trip duration</h3>
                  <p className="text-3xl font-bold text-primary mb-3">{destination.tripDuration}</p>
                  <p className="text-sm text-muted-foreground">{destination.tripDescription}</p>
                </div>
                <div className="bg-amber-50 rounded-2xl p-4 text-center">
                  <div className="text-3xl mb-2">💰</div>
                  <p className="text-xs text-amber-800 font-medium">{destination.costLevel}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Things To Do */}
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-6">Things To Do</h2>
            <h3 className="text-xl text-muted-foreground mb-6">Ideas To Plan Your Trip</h3>
            <Carousel className="w-full">
              <CarouselContent className="-ml-4">
                {destination.thingsToDo.map((activity: any) => (
                  <CarouselItem key={activity.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <div className="relative overflow-hidden rounded-3xl h-80 group cursor-pointer">
                      <img
                        src={activity.image}
                        alt={activity.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h4 className="text-white text-xl font-bold">{activity.title}</h4>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0" />
              <CarouselNext className="right-0" />
            </Carousel>
          </div>

          {/* How To Reach */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-4xl font-bold">How To Reach {destination.name}</h2>
              <button className="text-sm font-medium text-muted-foreground">
                From <span className="text-foreground font-semibold">Chennai</span> ▼
              </button>
            </div>
            <div className="space-y-4">
              {destination.howToReach.map((option: any, index: number) => (
                <div
                  key={index}
                  className="bg-card rounded-2xl border border-border p-6 hover:shadow-[var(--shadow-medium)] transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        option.type === "flight" ? "bg-blue-100" : "bg-gray-100"
                      }`}>
                        {option.type === "flight" ? (
                          <Plane className="w-6 h-6 text-blue-600" />
                        ) : (
                          <Car className="w-6 h-6 text-gray-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {option.label && (
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              option.label === "Fastest" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
                            }`}>
                              {option.label}
                            </span>
                          )}
                        </div>
                        <h4 className="font-semibold text-lg mb-1">{option.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {option.from} • {option.to} • {option.duration}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary mb-1">{option.price}</div>
                      <Button variant="secondary" className="bg-primary text-white hover:bg-primary/90">
                        {option.type === "flight" ? "Book now" : "View details"}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DestinationDetailPage;
