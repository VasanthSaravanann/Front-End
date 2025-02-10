import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4 dark:from-background/50 dark:to-muted/50">
      <Card className="w-full max-w-md p-8 animate-fade-in glass-morphism dark:bg-black/40 dark:backdrop-blur-2xl">
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-semibold tracking-tight dark:text-gradient">Welcome back</h1>
            <p className="text-muted-foreground dark:text-white/60">Enter your credentials to continue</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full dark:bg-black/30 dark:border-white/10 dark:placeholder:text-white/30 dark:text-white"
                required
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full dark:bg-black/30 dark:border-white/10 dark:placeholder:text-white/30 dark:text-white"
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full dark:bg-white/10 dark:text-white dark:hover:bg-white/20 transition-colors"
            >
              Sign in
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default Login;