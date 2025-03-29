import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ParticlesBackground } from "@/components/particles-background";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useAuth } from "@/context/AuthContext";


export default function LoginPage() {
  const { login,user } = useAuth(); // Get the login function from context
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      if (response.status === 200) {
        const { token,user } = response.data;
        login(token, user);
        console.log("Login successful");
        navigate("/"); // Redirect to homepage
      }
    } catch (error: unknown) {
      const err = error as AxiosError;
      console.error("Login error:", err);

      if (err.response) {
        setError((err.response.data as { error?: string })?.error || "Login failed. Please try again.");
      } else {
        setError("Unable to connect to the server. Please try again later.");
      }
    }
  };

  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center py-12">
      <ParticlesBackground />
      <Card className="w-full max-w-md mx-4 shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link to="/forgot-password" className="text-xs text-primary hover:underline">Forgot password?</Link>
            </div>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <Button className="w-full" onClick={handleLogin}>Sign In</Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Buttons for Google/GitHub login can go here */}
          </div>
        </CardContent>
        <CardFooter className="text-center">
          Don’t have an account? <Link to="/register" className="text-primary hover:underline">Sign up</Link>
        </CardFooter>
      </Card>
    </div>
  );
}
