import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Trophy, GraduationCap, Award } from "lucide-react";
import { motion } from "framer-motion";

interface StatsCardsProps {
  stats: {
    title: string;
    value: string | number;
    icon: any;
    trend: string;
    description: string;
  }[];
}

export const StatsCards = ({ stats }: StatsCardsProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-xs text-muted-foreground">
                <span className="text-green-500">{stat.trend}</span>{" "}
                {stat.description}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};