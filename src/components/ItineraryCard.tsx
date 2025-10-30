import { motion } from "framer-motion";
import { MapPin, Clock, IndianRupee, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ItineraryCardProps {
  title: string;
  days: number;
  budget: string;
  highlights: string[];
  onViewDetails: () => void;
  onEnhance: () => void;
  onFinalize: () => void;
}

const ItineraryCard = ({
  title,
  days,
  budget,
  highlights,
  onViewDetails,
  onEnhance,
  onFinalize,
}: ItineraryCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05, y: -8 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="flex-shrink-0 w-96"
    >
      <Card className="h-[450px] flex flex-col p-6 shadow-[var(--shadow-medium)] hover:shadow-[var(--shadow-strong)] transition-all border-2 hover:border-primary/30 rounded-3xl bg-gradient-to-br from-card to-card/50">
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-xl font-bold line-clamp-2 mb-3">{title}</h3>
          
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{days} Days</span>
            </div>
            <div className="flex items-center gap-1 font-semibold text-primary">
              <IndianRupee className="w-4 h-4" />
              <span>{budget}</span>
            </div>
          </div>
        </div>

        {/* Highlights - Scrollable */}
        <div className="flex-1 overflow-y-auto mb-4 space-y-2 pr-2 custom-scrollbar">
          {highlights.map((highlight, index) => (
            <div key={index} className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-sm">{highlight}</span>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <Button
            onClick={onViewDetails}
            className="w-full rounded-xl bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)] transition-all"
          >
            View Detailed Plan
          </Button>
          
          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={onEnhance}
              variant="outline"
              className="rounded-xl border-primary/30 hover:bg-primary/10"
            >
              <Sparkles className="w-4 h-4 mr-1" />
              Enhance
            </Button>
            <Button
              onClick={onFinalize}
              variant="outline"
              className="rounded-xl border-secondary/30 hover:bg-secondary/10"
            >
              Finalize Plan
            </Button>
          </div>
        </div>
      </Card>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: hsl(var(--muted));
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: hsl(var(--primary));
          border-radius: 10px;
        }
      `}</style>
    </motion.div>
  );
};

export default ItineraryCard;
