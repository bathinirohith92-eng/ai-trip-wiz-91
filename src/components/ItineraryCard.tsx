import { motion } from "framer-motion";
import { Clock, IndianRupee, Sparkles, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface DayPlan {
  day: number;
  morning: string;
  afternoon: string;
  evening: string;
}

interface ItineraryCardProps {
  title: string;
  days: number;
  budget: string;
  dayPlans: DayPlan[];
  onViewDetails: () => void;
  onEnhance: (cardIndex: number, customInput: string) => void;
  onFinalize: () => void;
  cardIndex: number;
}

const ItineraryCard = ({
  title,
  days,
  budget,
  dayPlans,
  onViewDetails,
  onEnhance,
  onFinalize,
  cardIndex,
}: ItineraryCardProps) => {
  const [showEnhanceInput, setShowEnhanceInput] = useState(false);
  const [enhanceText, setEnhanceText] = useState("");

  const handleEnhance = () => {
    if (enhanceText.trim()) {
      onEnhance(cardIndex, enhanceText);
      setEnhanceText("");
      setShowEnhanceInput(false);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05, y: -8 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="flex-shrink-0 w-96"
    >
      <div className="space-y-3">
        <Card className="h-[500px] flex flex-col p-6 shadow-[var(--shadow-medium)] hover:shadow-[var(--shadow-strong)] transition-all border-2 hover:border-primary/30 rounded-3xl bg-gradient-to-br from-card to-card/50">
          {/* Header */}
          <div className="mb-4 pb-4 border-b border-border">
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

          {/* Day Plans - Scrollable */}
          <div className="flex-1 overflow-y-auto mb-4 space-y-3 pr-2 custom-scrollbar">
            {dayPlans.map((plan) => (
              <div key={plan.day} className="bg-muted/30 rounded-xl p-3 space-y-2">
                <div className="font-semibold text-sm text-primary mb-2">Day {plan.day}</div>
                
                <div className="space-y-1.5 text-xs">
                  <div className="flex gap-2">
                    <span className="font-medium text-yellow-600 dark:text-yellow-400 min-w-[60px]">Morning:</span>
                    <span className="text-muted-foreground">{plan.morning}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-orange-600 dark:text-orange-400 min-w-[60px]">Afternoon:</span>
                    <span className="text-muted-foreground">{plan.afternoon}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-purple-600 dark:text-purple-400 min-w-[60px]">Evening:</span>
                    <span className="text-muted-foreground">{plan.evening}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <Button
              onClick={onViewDetails}
              className="w-full rounded-xl bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)] transition-all"
            >
              <Eye className="w-4 h-4 mr-2" />
              View Detailed Plan
            </Button>
            
            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={() => setShowEnhanceInput(!showEnhanceInput)}
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

        {/* Enhance Input - Shows below card */}
        {showEnhanceInput && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="flex gap-2"
          >
            <Input
              value={enhanceText}
              onChange={(e) => setEnhanceText(e.target.value)}
              placeholder="Add custom places or preferences..."
              className="rounded-xl"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleEnhance();
                }
              }}
            />
            <Button onClick={handleEnhance} className="rounded-xl">
              Add
            </Button>
          </motion.div>
        )}
      </div>

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
