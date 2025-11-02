import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import FilterDropdown, { FilterState } from "@/components/FilterDropdown";
import HolidayChat from "@/components/HolidayChat";
import { Search, Filter, Plane, Building } from "lucide-react";
import { Input } from "@/components/ui/input";


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
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<FilterState>({
    categories: [],
    budget: "",
    travelTime: "",
    weather: [],
  });
  const navigate = useNavigate();

  const handleApplyFilters = (filters: FilterState) => {
    setAppliedFilters(filters);
    // Filter logic would be implemented here
  };

  const handleDestinationClick = (destinationId: string) => {
    navigate(`/destination/${destinationId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="flex gap-6">
            {/* Left Section - Cards */}
            <div className="flex-1">
              {/* Search Bar */}
              <div className="mb-6 flex gap-3">
                <div className="flex-1 relative">
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search destinations..."
                    className="w-full pr-10"
                  />
                  <Search className="w-5 h-5 text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2" />
                </div>
                <button
                  onClick={() => setIsFilterOpen(true)}
                  className="w-12 h-10 flex items-center justify-center bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                >
                  <Filter className="w-5 h-5" />
                </button>
              </div>

              {/* Destination Cards - 4 per row */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                {destinations.map((destination, index) => (
                  <motion.div
                    key={destination.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleDestinationClick(destination.id)}
                    className="group cursor-pointer"
                  >
                    <div className="relative overflow-hidden rounded-2xl shadow-[var(--shadow-medium)] hover:shadow-[var(--shadow-strong)] transition-all duration-300">
                      <div className="aspect-[3/4] relative overflow-hidden">
                        <img
                          src={destination.image}
                          alt={destination.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                        
                        {/* Destination Info Overlay */}
                        <div className="absolute inset-x-0 bottom-0 p-4">
                          <h3 className="text-white text-lg font-bold mb-1">{destination.name}</h3>
                          <p className="text-white/70 text-xs tracking-wider mb-3">{destination.subtitle}</p>
                          
                          {/* Price Info */}
                          <div className="flex items-center gap-3 text-xs">
                            <div className="flex items-center gap-1">
                              <Plane className="w-3 h-3 text-white/80" />
                              <span className="text-white font-semibold">{destination.flightPrice}</span>
                            </div>
                            <div className="w-px h-3 bg-white/30" />
                            <div className="flex items-center gap-1">
                              <Building className="w-3 h-3 text-white/80" />
                              <span className="text-white font-semibold">{destination.hotelPrice}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Section - Chat (35%) */}
            <div className="w-[35%] hidden lg:block">
              <div className="sticky top-24 h-[calc(100vh-7rem)]">
                <HolidayChat />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Filter Dropdown */}
      <FilterDropdown
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApplyFilters={handleApplyFilters}
      />
    </div>
  );
};

export default HolidayPage;
