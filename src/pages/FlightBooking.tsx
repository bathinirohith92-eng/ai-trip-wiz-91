import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Plane, Calendar, Users, ChevronLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

import flightBanner from "@/assets/flight-banner.jpg";

const FlightBooking = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    from: "",
    to: "",
    departure: "",
    return: "",
    passengers: "1",
    class: "economy",
  });
  const [showResults, setShowResults] = useState(false);

  const mockFlights = [
    {
      id: 1,
      airline: "Air India",
      logo: "✈️",
      departure: "09:30",
      arrival: "12:45",
      duration: "3h 15m",
      price: "₹4,299",
    },
    {
      id: 2,
      airline: "IndiGo",
      logo: "✈️",
      departure: "14:20",
      arrival: "17:35",
      duration: "3h 15m",
      price: "₹3,899",
    },
    {
      id: 3,
      airline: "SpiceJet",
      logo: "✈️",
      departure: "18:00",
      arrival: "21:15",
      duration: "3h 15m",
      price: "₹3,599",
    },
  ];

  const handleSearch = () => {
    setShowResults(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Banner */}
      <section
        className="relative h-[40vh] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${flightBanner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center"
        >
          <Plane className="w-16 h-16 text-white mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Book Your Flight
          </h1>
          <p className="text-white/90 text-lg">Find the best deals across India</p>
        </motion.div>
      </section>

      {/* Search Form */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="mb-6 gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Planner
            </Button>

            <Card className="p-8 shadow-[var(--shadow-strong)] rounded-3xl">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">From</label>
                  <Input
                    placeholder="Delhi"
                    value={searchData.from}
                    onChange={(e) =>
                      setSearchData({ ...searchData, from: e.target.value })
                    }
                    className="rounded-xl"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">To</label>
                  <Input
                    placeholder="Mumbai"
                    value={searchData.to}
                    onChange={(e) =>
                      setSearchData({ ...searchData, to: e.target.value })
                    }
                    className="rounded-xl"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Departure
                  </label>
                  <Input
                    type="date"
                    value={searchData.departure}
                    onChange={(e) =>
                      setSearchData({ ...searchData, departure: e.target.value })
                    }
                    className="rounded-xl"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Return
                  </label>
                  <Input
                    type="date"
                    value={searchData.return}
                    onChange={(e) =>
                      setSearchData({ ...searchData, return: e.target.value })
                    }
                    className="rounded-xl"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    <Users className="w-4 h-4 inline mr-1" />
                    Passengers
                  </label>
                  <Input
                    type="number"
                    min="1"
                    value={searchData.passengers}
                    onChange={(e) =>
                      setSearchData({ ...searchData, passengers: e.target.value })
                    }
                    className="rounded-xl"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Class</label>
                  <select
                    value={searchData.class}
                    onChange={(e) =>
                      setSearchData({ ...searchData, class: e.target.value })
                    }
                    className="w-full h-10 px-3 rounded-xl border border-input bg-background"
                  >
                    <option value="economy">Economy</option>
                    <option value="business">Business</option>
                    <option value="first">First Class</option>
                  </select>
                </div>
              </div>

              <Button
                onClick={handleSearch}
                className="w-full h-12 rounded-xl bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-lg font-semibold shadow-[var(--shadow-medium)]"
              >
                <Search className="w-5 h-5 mr-2" />
                Search Flights
              </Button>
            </Card>
          </motion.div>

          {/* Results */}
          {showResults && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 space-y-4"
            >
              <h2 className="text-2xl font-bold mb-4">Available Flights</h2>
              {mockFlights.map((flight, index) => (
                <motion.div
                  key={flight.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card className="p-6 hover:shadow-[var(--shadow-strong)] transition-all rounded-2xl">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="text-4xl">{flight.logo}</div>
                        <div>
                          <h3 className="font-bold text-lg">{flight.airline}</h3>
                          <p className="text-sm text-muted-foreground">
                            {flight.duration}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <p className="text-2xl font-bold">{flight.departure}</p>
                          <p className="text-sm text-muted-foreground">
                            {searchData.from || "DEL"}
                          </p>
                        </div>
                        <div className="text-muted-foreground">→</div>
                        <div className="text-center">
                          <p className="text-2xl font-bold">{flight.arrival}</p>
                          <p className="text-sm text-muted-foreground">
                            {searchData.to || "BOM"}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">
                          {flight.price}
                        </p>
                        <Button className="mt-2 rounded-xl bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default FlightBooking;
