import { motion } from "framer-motion";
import { Sparkles, CloudSun, Utensils, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";

const WhyChooseSection = () => {
  const benefits = [
    {
      icon: Sparkles,
      title: "AI-Powered Customization",
      description: "Get personalized itineraries tailored to your preferences and travel style",
      color: "from-primary/20 to-primary/5",
    },
    {
      icon: CloudSun,
      title: "Real-Time Sync",
      description: "Weather updates and hotel availability synced in real-time for seamless planning",
      color: "from-secondary/20 to-secondary/5",
    },
    {
      icon: Utensils,
      title: "Local Experiences",
      description: "Discover authentic local cuisine and hidden cultural gems off the beaten path",
      color: "from-accent/20 to-accent/5",
    },
    {
      icon: Calendar,
      title: "Festival Highlights",
      description: "Never miss local festivals and cultural events happening during your visit",
      color: "from-tropical/20 to-tropical/5",
    },
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-3">
            Why Choose Indian Tour Planner?
          </h2>
          <p className="text-muted-foreground text-lg">
            Your intelligent companion for discovering incredible India
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={`p-6 h-full rounded-3xl shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)] transition-all hover:scale-105 bg-gradient-to-br ${benefit.color}`}
              >
                <div className="mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                    <benefit.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {benefit.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
