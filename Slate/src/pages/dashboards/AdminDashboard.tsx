import { useState } from "react";
import { useData } from "@/contexts/DataContext";
import DashboardLayout from "@/components/DashboardLayout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { School, Users, Award, TrendingUp, Search, Filter } from "lucide-react";
import { School as SchoolType, Student } from "@/types/dashboard";
import { useToast } from "@/components/ui/use-toast";

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSchool, setSelectedSchool] = useState<SchoolType | null>(null);
  const { schools, students, isLoading, error } = useData();
  const { toast } = useToast();

  if (error) {
    toast({
      variant: "destructive",
      title: "Error",
      description: "Failed to fetch data. Please try again later.",
    });
  }

  const stats = [
    {
      title: "Total Schools",
      value: schools.length.toString(),
      icon: School,
      trend: "+2.5%",
      description: "From last month",
    },
    {
      title: "Total Students",
      value: students.length.toString(),
      icon: Users,
      trend: "+5.2%",
      description: "From last month",
    },
    {
      title: "Achievements",
      value: schools.reduce((acc, school) => acc + school.achievements, 0).toString(),
      icon: Award,
      trend: "+12.2%",
      description: "From last month",
    },
    {
      title: "Growth Rate",
      value: "8.5%",
      icon: TrendingUp,
      trend: "+1.2%",
      description: "From last month",
    },
  ];

  const filteredSchools = schools.filter(school =>
    school.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {isLoading ? "Loading..." : stat.value}
                </div>
                <div className="text-xs text-muted-foreground">
                  <span className="text-green-500">{stat.trend}</span>{" "}
                  {stat.description}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 flex-1">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search schools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Sort by Name</DropdownMenuItem>
              <DropdownMenuItem>Sort by Students</DropdownMenuItem>
              <DropdownMenuItem>Sort by Achievements</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Schools Overview</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center h-32">
                <p className="text-muted-foreground">Loading schools data...</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>School Name</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Total Students</TableHead>
                    <TableHead>Total Achievements</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSchools.map((school) => (
                    <TableRow key={school.id}>
                      <TableCell className="font-medium">{school.name}</TableCell>
                      <TableCell>{school.location}</TableCell>
                      <TableCell>{school.totalStudents}</TableCell>
                      <TableCell>{school.achievements}</TableCell>
                      <TableCell>
                        <Sheet>
                          <SheetTrigger asChild>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </SheetTrigger>
                          <SheetContent>
                            <SheetHeader>
                              <SheetTitle>{school.name}</SheetTitle>
                              <SheetDescription>
                                School details and performance metrics
                              </SheetDescription>
                            </SheetHeader>
                            <div className="mt-6 space-y-4">
                              <div>
                                <h4 className="font-semibold mb-2">Location</h4>
                                <p className="text-sm text-muted-foreground">
                                  {school.location}
                                </p>
                              </div>
                              <div>
                                <h4 className="font-semibold mb-2">Students</h4>
                                <p className="text-sm text-muted-foreground">
                                  {school.totalStudents} enrolled students
                                </p>
                              </div>
                              <div>
                                <h4 className="font-semibold mb-2">Achievements</h4>
                                <p className="text-sm text-muted-foreground">
                                  {school.achievements} total achievements
                                </p>
                              </div>
                            </div>
                          </SheetContent>
                        </Sheet>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Student Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center h-32">
                <p className="text-muted-foreground">Loading student data...</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student Name</TableHead>
                    <TableHead>School</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Recent Achievement</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>{student.schoolName}</TableCell>
                      <TableCell>{student.grade}</TableCell>
                      <TableCell>
                        {student.achievements[0]?.title || "No achievements yet"}
                      </TableCell>
                      <TableCell>
                        <Sheet>
                          <SheetTrigger asChild>
                            <Button variant="outline" size="sm">
                              View Profile
                            </Button>
                          </SheetTrigger>
                          <SheetContent>
                            <SheetHeader>
                              <SheetTitle>{student.name}</SheetTitle>
                              <SheetDescription>
                                Student profile and achievements
                              </SheetDescription>
                            </SheetHeader>
                            <div className="mt-6 space-y-4">
                              <div>
                                <h4 className="font-semibold mb-2">School</h4>
                                <p className="text-sm text-muted-foreground">
                                  {student.schoolName}
                                </p>
                              </div>
                              <div>
                                <h4 className="font-semibold mb-2">Grade</h4>
                                <p className="text-sm text-muted-foreground">
                                  {student.grade}
                                </p>
                              </div>
                              <div>
                                <h4 className="font-semibold mb-2">Achievements</h4>
                                {student.achievements.map((achievement) => (
                                  <div
                                    key={achievement.id}
                                    className="bg-muted p-3 rounded-md mb-2"
                                  >
                                    <h5 className="font-medium">{achievement.title}</h5>
                                    <p className="text-sm text-muted-foreground">
                                      {achievement.description}
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                      {new Date(achievement.date).toLocaleDateString()}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </SheetContent>
                        </Sheet>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
