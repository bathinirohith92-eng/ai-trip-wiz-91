import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Sparkles, Heart, Map, Compass, PartyPopper } from "lucide-react";
import Navbar from "@/components/Navbar";
import DestinationCard from "@/components/DestinationCard";
import TripTypeButton from "@/components/TripTypeButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import heroImage from "@/assets/hero-tropical.jpg";
import europeImg from "@/assets/dest-europe.jpg";
import keralaImg from "@/assets/dest-kerala.jpg";
import baliImg from "@/assets/dest-bali.jpg";
import kashmirImg from "@/assets/dest-kashmir.jpg";
import vietnamImg from "@/assets/dest-vietnam.jpg";

const LandingPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const destinations = [
    { name: "Europe", image: europeImg },
    { name: "Kerala", image: keralaImg },
    { name: "Bali", image: baliImg },
    { name: "Kashmir", image: kashmirImg },
    { name: "Vietnam", image: vietnamImg },
  ];

  const tripTypes = [
    { icon: Sparkles, label: "Easy Book", badge: "NEW" },
    { icon: Heart, label: "Honeymoon" },
    { icon: Map, label: "Pilgrimage" },
    { icon: Compass, label: "Luxury" },
    { icon: PartyPopper, label: "Adventure" },
  ];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/chat?query=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate("/chat");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative h-[70vh] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-serif text-5xl md:text-7xl text-white mb-4 drop-shadow-2xl"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            Kerala Tour Packages
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl md:text-4xl font-bold text-white mb-8 drop-shadow-lg"
          >
            Where Every Experience Counts!
          </motion.h2>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex gap-3 max-w-2xl mx-auto"
          >
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Plan your trip with AI..."
                className="pl-12 h-14 rounded-full text-lg bg-white/95 backdrop-blur border-0 shadow-[var(--shadow-strong)] focus:shadow-[var(--shadow-glow)]"
              />
            </div>
            <Button
              onClick={handleSearch}
              className="h-14 px-8 rounded-full text-lg font-semibold bg-gradient-to-r from-primary to-sunset hover:from-sunset hover:to-primary shadow-[var(--shadow-medium)] hover:shadow-[var(--shadow-glow)] transition-all"
            >
              Search
            </Button>
          </motion.div>

          {/* Trip Types */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-4 mt-8 flex-wrap"
          >
            {tripTypes.map((type, index) => (
              <TripTypeButton
                key={type.label}
                icon={type.icon}
                label={type.label}
                badge={type.badge}
                onClick={() => navigate(`/chat?type=${type.label.toLowerCase()}`)}
              />
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Trending Destinations */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-4xl font-bold mb-3">Top Trending Destinations</h2>
            <p className="text-muted-foreground text-lg">
              Explore the hottest travel spots around the globe.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {destinations.map((dest, index) => (
              <DestinationCard
                key={dest.name}
                name={dest.name}
                image={dest.image}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
