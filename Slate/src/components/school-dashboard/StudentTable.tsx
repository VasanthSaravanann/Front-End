import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Student } from "@/types/dashboard";

interface StudentTableProps {
  students: Student[];
  onStudentSelect: (student: Student) => void;
}

export const StudentTable = ({ students, onStudentSelect }: StudentTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.grade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Students</CardTitle>
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search students..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Achievements</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.id}</TableCell>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.grade}</TableCell>
                  <TableCell>{student.achievements.length}</TableCell>
                  <TableCell>
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button
                          variant="secondary"
                          size="sm"
                          className="dark:bg-secondary dark:text-secondary-foreground dark:hover:bg-secondary/80"
                          onClick={() => {
                            setSelectedStudent(student);
                            onStudentSelect(student);
                          }}
                        >
                          View Details
                        </Button>
                      </SheetTrigger>
                      <SheetContent className="w-[400px] sm:w-[540px]">
                        <SheetHeader>
                          <SheetTitle>{student.name}</SheetTitle>
                          <SheetDescription>
                            Student ID: {student.id} | Grade: {student.grade}
                          </SheetDescription>
                        </SheetHeader>
                        <div className="mt-6">
                          <h3 className="text-lg font-semibold mb-4">
                            Achievements
                          </h3>
                          <div className="space-y-4">
                            {student.achievements.map((achievement) => (
                              <Card key={achievement.id}>
                                <CardHeader>
                                  <CardTitle className="text-base">
                                    {achievement.title}
                                  </CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <p className="text-sm text-muted-foreground mb-2">
                                    {achievement.description}
                                  </p>
                                  <div className="flex justify-between text-sm">
                                    <span className="text-primary">
                                      {achievement.type}
                                    </span>
                                    <span>{achievement.date}</span>
                                  </div>
                                </CardContent>
                              </Card>
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
        </div>
      </CardContent>
    </Card>
  );
};