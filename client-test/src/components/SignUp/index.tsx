import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ParticlesBackground } from "@/components/particles-background";
import { useState } from "react";
import axios from "axios";

interface FormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export default function RegisterPage() {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState<string>("");
    const navigate = useNavigate();

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        if (!formData.name || !formData.email || !formData.password) {
            setError("All fields are required");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            console.log("Sending registration data:", formData);

            const response = await axios.post(
                "http://localhost:5000/api/auth/register",
                {
                    name: formData.name.trim(),
                    email: formData.email.trim().toLowerCase(),
                    password: formData.password,
                },
                {
                    headers: { "Content-Type": "application/json" },
                }
            );

            console.log("Registration successful:", response.data);
            navigate("/"); // Redirect on success
        } catch (err: any) {
            console.error("Registration error:", err);

            if (err.response) {
                console.log("Backend Response:", err.response.data);
                setError(err.response.data.error || "Something went wrong. Please try again.");
            } else if (err.request) {
                setError("No response from server. Check if backend is running.");
            } else {
                setError("Network error: " + err.message);
            }
        }
    };

    return (
        <div className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center py-12">
            <ParticlesBackground />
            <Card className="w-full max-w-md mx-4 shadow-lg">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
                    <CardDescription>Enter your information to get started with CodeQuest</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Your name</Label>
                            <Input name="name" id="name" placeholder="John Doe" value={formData.name} onChange={handleChange} required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input name="email" id="email" type="email" placeholder="m@example.com" value={formData.email} onChange={handleChange} required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input name="password" id="password" type="password" value={formData.password} onChange={handleChange} required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm password</Label>
                            <Input name="confirmPassword" id="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} required />
                        </div>

                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        <Button type="submit" className="w-full">Create Account</Button>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                    <div className="text-sm text-center text-muted-foreground">
                        Already have an account? <Link to="/login" className="text-primary hover:underline">Sign in</Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
