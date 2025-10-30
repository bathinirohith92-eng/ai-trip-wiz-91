import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DayPlan {
  day: number;
  date: string;
  morning: string;
  afternoon: string;
  evening: string;
}

interface ItineraryDetailSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  days: number;
  budget: string;
  dayPlans: DayPlan[];
}

const ItineraryDetailSheet = ({
  isOpen,
  onClose,
  title,
  days,
  budget,
  dayPlans,
}: ItineraryDetailSheetProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Sheet */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full md:w-[600px] bg-background shadow-2xl z-50 overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-primary to-secondary p-6 text-white">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{title}</h2>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{days} Days</span>
                    </div>
                    <div className="flex items-center gap-1 font-semibold">
                      <span>Budget: {budget}</span>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={onClose}
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Day-wise Plans */}
            <div className="p-6 space-y-6">
              {dayPlans.map((plan) => (
                <div
                  key={plan.day}
                  className="bg-card rounded-2xl p-5 shadow-[var(--shadow-medium)] border border-border"
                >
                  <div className="flex items-center gap-2 mb-4 pb-3 border-b">
                    <Calendar className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-bold">Day {plan.day}</h3>
                    <span className="text-sm text-muted-foreground ml-auto">{plan.date}</span>
                  </div>

                  <div className="space-y-4">
                    {/* Morning */}
                    <div className="flex gap-3">
                      <div className="flex-shrink-0">
                        <div className="w-20 px-2 py-1 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 rounded-lg text-xs font-semibold text-center">
                          Morning
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm leading-relaxed">{plan.morning}</p>
                      </div>
                    </div>

                    {/* Afternoon */}
                    <div className="flex gap-3">
                      <div className="flex-shrink-0">
                        <div className="w-20 px-2 py-1 bg-orange-500/10 text-orange-600 dark:text-orange-400 rounded-lg text-xs font-semibold text-center">
                          Afternoon
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm leading-relaxed">{plan.afternoon}</p>
                      </div>
                    </div>

                    {/* Evening */}
                    <div className="flex gap-3">
                      <div className="flex-shrink-0">
                        <div className="w-20 px-2 py-1 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-lg text-xs font-semibold text-center">
                          Evening
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm leading-relaxed">{plan.evening}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ItineraryDetailSheet;
