import { useAuth } from "../contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { School, Users, User, GraduationCap } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const roles = [
  { 
    id: "admin" as const, 
    title: "Admin", 
    icon: Users, 
    description: "Manage schools, students, and system-wide settings",
    color: "bg-blue-500 dark:bg-blue-600"
  },
  { 
    id: "school" as const, 
    title: "School", 
    icon: School, 
    description: "Manage students and track achievements",
    color: "bg-green-500 dark:bg-green-600"
  },
  { 
    id: "parent" as const, 
    title: "Parent", 
    icon: User, 
    description: "View your child's progress and achievements",
    color: "bg-purple-500 dark:bg-purple-600"
  },
  { 
    id: "student" as const, 
    title: "Student", 
    icon: GraduationCap, 
    description: "Access your achievements and learning materials",
    color: "bg-orange-500 dark:bg-orange-600"
  },
];

const RoleSelection = () => {
  const { selectRole } = useAuth();
  const { toast } = useToast();

  const handleRoleSelect = (roleId: typeof roles[number]["id"]) => {
    selectRole(roleId);
    toast({
      title: "Role Selected",
      description: `You've selected the ${roleId} role. Redirecting to dashboard...`,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4 dark:from-background dark:to-background">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8 space-y-2 animate-fade-in">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">Welcome to Slate</h1>
          <p className="text-muted-foreground text-lg">
            Select your role to continue to your personalized dashboard
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roles.map((role, index) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group"
            >
              <Card
                className="p-6 cursor-pointer transition-all duration-200 hover:shadow-lg dark:hover:shadow-2xl dark:shadow-none dark:bg-card/50 dark:hover:bg-card/80 dark:border-border/50 hover:border-primary"
                onClick={() => handleRoleSelect(role.id)}
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-xl ${role.color} bg-opacity-10 dark:bg-opacity-20 group-hover:bg-opacity-20 dark:group-hover:bg-opacity-30 transition-colors`}>
                    <role.icon className={`w-8 h-8 text-foreground`} />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold tracking-tight mb-1 text-foreground">
                      {role.title}
                    </h2>
                    <p className="text-muted-foreground text-sm">
                      {role.description}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;