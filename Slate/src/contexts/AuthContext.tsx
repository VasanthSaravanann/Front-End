import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

type Role = "admin" | "school" | "parent" | "student";

interface User {
  username: string;
  role: Role | null;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  selectRole: (role: Role) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Load user from localStorage on initial mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedSession = sessionStorage.getItem("session");
    
    if (storedUser || storedSession) {
      const userData = JSON.parse(storedUser || storedSession || "null");
      setUser(userData);
      
      // Redirect to appropriate dashboard if user has a role
      if (userData?.role) {
        navigate(`/${userData.role}-dashboard`);
      }
    }
  }, [navigate]);

  const login = async (username: string, password: string) => {
    try {
      // Simulate API call validation
      if (username && password) {
        const newUser = { username, role: null };
        setUser(newUser);
        
        // Store in both localStorage and sessionStorage for persistence
        localStorage.setItem("user", JSON.stringify(newUser));
        sessionStorage.setItem("session", JSON.stringify(newUser));
        
        toast({
          title: "Login Successful",
          description: "Please select your role to continue.",
        });
        
        navigate("/select-role");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Please check your credentials and try again.",
      });
    }
  };

  const selectRole = (role: Role) => {
    if (user) {
      const updatedUser = { ...user, role };
      setUser(updatedUser);
      
      // Update both storage types
      localStorage.setItem("user", JSON.stringify(updatedUser));
      sessionStorage.setItem("session", JSON.stringify(updatedUser));
      
      navigate(`/${role}-dashboard`);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    sessionStorage.removeItem("session");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, selectRole, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};