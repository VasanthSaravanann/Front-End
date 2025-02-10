import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Star, Trophy, TrendingUp } from "lucide-react";
import AchievementChart from "@/components/AchievementChart";

const StudentDashboard = () => {
  const studentStats = [
    {
      title: "Total Achievements",
      value: "15",
      icon: Trophy,
      description: "Earned this year",
    },
    {
      title: "Current Rank",
      value: "5th",
      icon: Star,
      description: "In your grade",
    },
    {
      title: "Latest Award",
      value: "Gold",
      icon: Award,
      description: "Science Competition",
    },
    {
      title: "Progress",
      value: "+12%",
      icon: TrendingUp,
      description: "From last month",
    },
  ];

  const achievementData = [
    { name: "Academic", value: 8 },
    { name: "Sports", value: 4 },
    { name: "Arts", value: 2 },
    { name: "Leadership", value: 1 },
  ];

  const recentAchievements = [
    {
      title: "Science Project Excellence",
      date: "March 20, 2024",
      description: "Outstanding performance in annual science fair",
      category: "Academic",
    },
    {
      title: "Leadership Award",
      date: "March 15, 2024",
      description: "Recognized for exceptional leadership skills",
      category: "Leadership",
    },
    {
      title: "Perfect Attendance",
      date: "March 1, 2024",
      description: "Maintained 100% attendance record",
      category: "Discipline",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {studentStats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-xs text-muted-foreground">
                  {stat.description}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <AchievementChart 
            data={achievementData} 
            title="Achievement Distribution" 
          />
          <Card>
            <CardHeader>
              <CardTitle>Recent Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAchievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 p-4 rounded-lg bg-muted/50"
                  >
                    <Award className="h-5 w-5 text-primary mt-0.5" />
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{achievement.title}</h4>
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                          {achievement.category}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {achievement.description}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {achievement.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;