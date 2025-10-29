import { motion } from "framer-motion";
import { MapPin, Clock, DollarSign, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ItineraryCardProps {
  title: string;
  days: number;
  budget: string;
  highlights: string[];
  rating?: number;
  onViewDetails: () => void;
}

const ItineraryCard = ({
  title,
  days,
  budget,
  highlights,
  rating = 4.5,
  onViewDetails,
}: ItineraryCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4 }}
      className="flex-shrink-0 w-80"
    >
      <Card className="p-6 shadow-[var(--shadow-medium)] hover:shadow-[var(--shadow-strong)] transition-all border-2 hover:border-primary/20 rounded-3xl bg-gradient-to-br from-card to-card/50">
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-xl font-bold line-clamp-2">{title}</h3>
            <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-full">
              <Star className="w-4 h-4 text-primary fill-primary" />
              <span className="text-sm font-semibold">{rating}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{days} Days</span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="w-4 h-4" />
              <span>{budget}</span>
            </div>
          </div>
        </div>

        {/* Highlights */}
        <div className="mb-4 space-y-2">
          {highlights.slice(0, 3).map((highlight, index) => (
            <div key={index} className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-sm line-clamp-1">{highlight}</span>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <Button
          onClick={onViewDetails}
          className="w-full rounded-xl bg-gradient-to-r from-primary to-sunset hover:from-sunset hover:to-primary shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)]"
        >
          View Detailed Plan
        </Button>
      </Card>
    </motion.div>
  );
};

export default ItineraryCard;
