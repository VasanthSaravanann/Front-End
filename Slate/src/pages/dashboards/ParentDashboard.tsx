import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Award, Star, TrendingUp } from "lucide-react";

const ParentDashboard = () => {
  const childStats = [
    {
      title: "Current Grade",
      value: "10th",
      icon: GraduationCap,
      description: "Academic Year 2024",
    },
    {
      title: "Achievements",
      value: "15",
      icon: Award,
      description: "Total awards earned",
    },
    {
      title: "Performance",
      value: "A+",
      icon: Star,
      description: "Current semester",
    },
    {
      title: "Progress",
      value: "+15%",
      icon: TrendingUp,
      description: "From last semester",
    },
  ];

  const achievements = [
    {
      title: "Science Fair Winner",
      date: "March 15, 2024",
      description: "First place in the annual science fair competition",
    },
    {
      title: "Math Olympiad",
      date: "February 28, 2024",
      description: "Silver medal in regional mathematics competition",
    },
    {
      title: "Perfect Attendance",
      date: "January 30, 2024",
      description: "100% attendance record for the semester",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {childStats.map((stat, index) => (
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
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Recent Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 p-4 rounded-lg bg-muted/50"
                  >
                    <Award className="h-5 w-5 text-primary mt-0.5" />
                    <div className="space-y-1">
                      <h4 className="font-semibold">{achievement.title}</h4>
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

export default ParentDashboard;