import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Church, Landmark, TreePine, UtensilsCrossed, Sparkles, Building, ShoppingBag, Waves, Mountain, Trees, Globe, Moon, TrendingUp, Plane } from "lucide-react";

const categories = [
  { id: "all", label: "All", icon: Building },
  { id: "religious", label: "Religious", icon: Church },
  { id: "cultural", label: "Cultural", icon: Landmark },
  { id: "nature", label: "Nature", icon: TreePine },
  { id: "food", label: "Food", icon: UtensilsCrossed },
  { id: "festivals", label: "Festivals", icon: Sparkles },
  { id: "historical", label: "Historical", icon: Building },
  { id: "shopping", label: "Shopping", icon: ShoppingBag },
  { id: "beaches", label: "Beaches", icon: Waves },
  { id: "mountains", label: "Mountains", icon: Mountain },
  { id: "outdoors", label: "Outdoors", icon: Trees },
  { id: "nightlife", label: "Nightlife", icon: Moon },
];

const filters = [
  { id: "trending", label: "Trending", icon: TrendingUp },
  { id: "visa-free", label: "Visa Free", icon: Globe },
  { id: "e-visa", label: "E-Visa", icon: Globe },
  { id: "visa-arrival", label: "Visa On Arrival", icon: Globe },
];

const destinations = [
  {
    id: "singapore",
    name: "Singapore",
    subtitle: "SOUTHEAST ASIA · SINGAPORE",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80",
    flightPrice: "₹15K",
    hotelPrice: "₹4,000/night",
  },
  {
    id: "bangkok",
    name: "Bangkok",
    subtitle: "BANGKOK · THAILAND",
    image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&q=80",
    flightPrice: "₹22K",
    hotelPrice: "₹5,200/night",
  },
  {
    id: "dubai",
    name: "Dubai",
    subtitle: "DUBAI · UNITED ARAB EMIRATES",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
    flightPrice: "₹21K",
    hotelPrice: "₹5,000/night",
  },
  {
    id: "doha",
    name: "Doha",
    subtitle: "DOHA · QATAR",
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&q=80",
    flightPrice: "₹18K",
    hotelPrice: "₹4,500/night",
  },
  {
    id: "phuket",
    name: "Phuket",
    subtitle: "PHUKET PROVINCE · THAILAND",
    image: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=800&q=80",
    flightPrice: "₹24K",
    hotelPrice: "₹3,800/night",
  },
  {
    id: "pattaya",
    name: "Pattaya",
    subtitle: "CHONBURI · THAILAND",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
    flightPrice: "₹23K",
    hotelPrice: "₹4,200/night",
  },
];

const HolidayPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedFilters, setSelectedFilters] = useState<string[]>(["trending"]);
  const navigate = useNavigate();

  const toggleFilter = (filterId: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filterId) ? prev.filter((id) => id !== filterId) : [...prev, filterId]
    );
  };

  const handleDestinationClick = (destinationId: string) => {
    navigate(`/destination/${destinationId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Category Filters */}
          <div className="mb-6 overflow-x-auto hide-scrollbar">
            <div className="flex gap-8 pb-2 min-w-max">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex flex-col items-center gap-2 transition-colors ${
                      selectedCategory === category.id
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                    <span className="text-sm font-medium whitespace-nowrap">{category.label}</span>
                    {selectedCategory === category.id && (
                      <motion.div
                        layoutId="category-indicator"
                        className="h-0.5 w-full bg-primary rounded-full"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Filters */}
          <div className="mb-8 flex gap-3 flex-wrap">
            {filters.map((filter) => {
              const Icon = filter.icon;
              const isSelected = selectedFilters.includes(filter.id);
              return (
                <button
                  key={filter.id}
                  onClick={() => toggleFilter(filter.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${
                    isSelected
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background border-border hover:border-primary"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{filter.label}</span>
                </button>
              );
            })}
          </div>

          {/* Destination Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((destination, index) => (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleDestinationClick(destination.id)}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-3xl shadow-[var(--shadow-medium)] hover:shadow-[var(--shadow-strong)] transition-all duration-300">
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    
                    {/* Destination Info Overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <h3 className="text-white text-3xl font-bold mb-1">{destination.name}</h3>
                      <p className="text-white/80 text-sm tracking-wider mb-4">{destination.subtitle}</p>
                    </div>
                  </div>
                  
                  {/* Price Info */}
                  <div className="bg-background border border-border rounded-b-3xl p-4 flex items-center justify-center gap-6">
                    <div className="flex items-center gap-2 text-sm">
                      <Plane className="w-4 h-4 text-primary" />
                      <span className="font-semibold">{destination.flightPrice}</span>
                    </div>
                    <div className="w-px h-4 bg-border" />
                    <div className="flex items-center gap-2 text-sm">
                      <Building className="w-4 h-4 text-primary" />
                      <span className="font-semibold">{destination.hotelPrice}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default HolidayPage;
