export interface School {
  id: number;
  name: string;
  location: string;
  totalStudents: number;
  achievements: number;
}

export interface Student {
  id: number;
  name: string;
  grade: string;
  schoolId: number;
  schoolName: string;
  achievements: Achievement[];
}

export interface Achievement {
  id: number;
  title: string;
  description: string;
  date: string;
  type: 'academic' | 'sports' | 'arts' | 'other';
}

export interface DashboardStats {
  totalSchools: number;
  totalStudents: number;
  totalAchievements: number;
  growthRate: string;
}