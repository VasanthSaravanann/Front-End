import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { StatsCards } from "@/components/school-dashboard/StatsCards";
import { StudentTable } from "@/components/school-dashboard/StudentTable";
import { Users, Trophy, GraduationCap, Award } from "lucide-react";
import { Student } from "@/types/dashboard";
import { useQuery } from "@tanstack/react-query";

const SchoolDashboard = () => {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  // Mock data - replace with API calls in production
  const { data: students = [] } = useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      // Simulating API call
      return [
        {
          id: 1,
          name: "Yuvanesh",
          grade: "10th",
          achievements: [
            {
              id: 1,
              title: "Science Fair Winner",
              type: "academic",
              date: "2024-02-15",
              description: "First place in annual science fair",
            },
          ],
        },
        {
          id: 2,
          name: "Karthick",
          grade: "11th",
          achievements: [
            {
              id: 2,
              title: "Basketball MVP",
              type: "sports",
              date: "2024-01-20",
              description: "Most Valuable Player in school tournament",
            },
          ],
        },
      ] as Student[];
    },
    initialData: [],
  });

  const stats = [
    {
      title: "Total Students",
      value: students.length,
      icon: Users,
      trend: "+2.5%",
      description: "From last month",
    },
    {
      title: "Total Achievements",
      value: students.reduce((acc, student) => acc + student.achievements.length, 0),
      icon: Trophy,
      trend: "+12.3%",
      description: "From last month",
    },
    {
      title: "Average Grade",
      value: "A-",
      icon: GraduationCap,
      trend: "+4.5%",
      description: "From last semester",
    },
    {
      title: "Awards",
      value: "15",
      icon: Award,
      trend: "+8.4%",
      description: "From last month",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <StatsCards stats={stats} />
        <StudentTable
          students={students}
          onStudentSelect={setSelectedStudent}
        />
      </div>
    </DashboardLayout>
  );
};

export default SchoolDashboard;