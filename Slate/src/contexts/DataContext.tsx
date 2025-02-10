import React, { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { School, Student } from "@/types/dashboard";

interface DataContextType {
  schools: School[];
  students: Student[];
  isLoading: boolean;
  error: Error | null;
}

const DataContext = createContext<DataContextType | null>(null);

// Mock API calls
const fetchSchools = async (): Promise<School[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return [
    { id: 1, name: "Springfield Elementary", location: "Springfield", totalStudents: 450, achievements: 890 },
    { id: 2, name: "Central High School", location: "Central City", totalStudents: 780, achievements: 1200 },
    { id: 3, name: "West Middle School", location: "West Town", totalStudents: 560, achievements: 950 },
  ];
};

const fetchStudents = async (): Promise<Student[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return [
    {
      id: 1,
      name: "John Doe",
      grade: "10th",
      schoolId: 1,
      schoolName: "Springfield Elementary",
      achievements: [
        {
          id: 1,
          title: "Math Olympics Gold",
          description: "First place in state mathematics competition",
          date: "2024-02-15",
          type: "academic"
        }
      ]
    },
    {
      id: 2,
      name: "Jane Smith",
      grade: "11th",
      schoolId: 2,
      schoolName: "Central High School",
      achievements: [
        {
          id: 2,
          title: "Science Fair Winner",
          description: "Best Project in Regional Science Fair",
          date: "2024-01-20",
          type: "academic"
        }
      ]
    }
  ];
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { 
    data: schools = [], 
    isLoading: isSchoolsLoading,
    error: schoolsError 
  } = useQuery({
    queryKey: ['schools'],
    queryFn: fetchSchools,
  });

  const { 
    data: students = [], 
    isLoading: isStudentsLoading,
    error: studentsError 
  } = useQuery({
    queryKey: ['students'],
    queryFn: fetchStudents,
  });

  const value = {
    schools,
    students,
    isLoading: isSchoolsLoading || isStudentsLoading,
    error: schoolsError || studentsError,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};