import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ParticlesBackground } from "@/components/particles-background";
import { useState } from "react";
import axios from "axios";
import { toast } from 'react-hot-toast';
import { Eye, EyeOff } from "lucide-react"; // Import Eye icons


interface FormData {
    name: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export default function RegisterPage() {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [otp, setOtp] = useState<string>(""); // State for OTP input
    const [isOtpSent, setIsOtpSent] = useState<boolean>(false); // Track if OTP is sent
    const [error, setError] = useState<string>("");
    const [tempUserData, setTempUserData] = useState<FormData | null>(null); // State for temporary user data
    const [showPassword, setShowPassword] = useState(false); // State for password visibility
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for confirm password visibility

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const navigate = useNavigate();

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle OTP input changes
    const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOtp(e.target.value);
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const usernameRegex = /^[a-z][a-z0-9_]*$/;
        setError("");

        if (!formData.name || !formData.email || !formData.password) {
            toast.error("All fields are required");
            setError("All fields are required");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            setError("Passwords do not match");
            return;
        }

        if (!usernameRegex.test(formData.username)) {
            toast.error("Username must start with letters and contain only lowercase letters, numbers, and underscores");
            setError("Username must start with letters and contain only lowercase letters, numbers, and underscores");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/api/auth/register", {
                name: formData.name.trim(),
                username: formData.username.trim().toLowerCase(),
                email: formData.email.trim().toLowerCase(),
                password: formData.password,
            }, { headers: { "Content-Type": "application/json" } });

            toast.success(response.data.message);
            setTempUserData(response.data.tempUserData); // Store temporary user data
            setIsOtpSent(true); // Show OTP input form
        } catch (err: any) {
            console.error("Registration error:", err);
            if (err.response) {
                toast.error(err.response.data.error);
                setError(err.response.data.error || "Something went wrong. Please try again.");
            } else if (err.request) {
                toast.error("No response from server. Check if backend is running");
                setError("No response from server. Check if backend is running.");
            } else {
                toast.error("Network error: " + err.message);
                setError("Network error: " + err.message);
            }
        }
    };

    // Handle OTP verification
    const handleOtpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!tempUserData) {
            toast.error("Temporary user data is missing. Please try registering again.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/api/auth/verify", {
                email: tempUserData.email,
                otp,
                tempUserData, // Send temporary user data for verification
            });

            toast.success(response.data.message);
            navigate("/login");
        } catch (err: any) {
            console.error("OTP verification error:", err);
            if (err.response) {
                toast.error(err.response.data.error);
                setError(err.response.data.error || "Invalid OTP. Please try again.");
            } else {
                toast.error("Network error: " + err.message);
                setError("Network error: " + err.message);
            }
        }
    };

    return (
        <div className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center py-12">
            <ParticlesBackground />
            <Card className="w-full max-w-md mx-4 shadow-lg">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">
                        {isOtpSent ? "Verify Your Email" : "Create an account"}
                    </CardTitle>
                    <CardDescription>
                        {isOtpSent ? "Enter the OTP sent to your email" : "Enter your information to get started with CodeQuest"}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {!isOtpSent ? (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Your name</Label>
                                <Input name="name" id="name" placeholder="Your name" value={formData.name} onChange={handleChange} required />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="username">Username</Label>
                                <Input name="username" id="username" placeholder="username" value={formData.username} onChange={handleChange} required />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input name="email" id="email" type="email" placeholder="your Email" value={formData.email} onChange={handleChange} required />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                {/* <Input name="password" id="password" type="password" value={formData.password} onChange={handleChange} required /> */}
                                <div className="relative">
                                    <Input name="password" id="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleChange} required />
                                    <Button type="button" variant="ghost" size="icon"
                                        className="absolute right-0 top-0 h-full px-3 py-2 text-gray-400 hover:text-gray-600"
                                        onClick={togglePasswordVisibility}
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm password</Label>
                                {/* <Input name="confirmPassword" id="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} required /> */}
                                <div className="relative">
                                    <Input name="confirmPassword" id="confirmPassword" type={showConfirmPassword ? "text" : "password"} value={formData.confirmPassword} onChange={handleChange} required />
                                    <Button type="button" variant="ghost" size="icon"
                                        className="absolute right-0 top-0 h-full px-3 py-2 text-gray-400 hover:text-gray-600"
                                        onClick={toggleConfirmPasswordVisibility}
                                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                                    >
                                        {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </Button>
                                </div>
                            </div>

                            {error && <p className="text-red-500 text-sm">{error}</p>}

                            <Button type="submit" className="w-full">Create Account</Button>
                        </form>
                    ) : (
                        <form onSubmit={handleOtpSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="otp">Enter OTP</Label>
                                <Input name="otp" id="otp" placeholder="6-digit OTP" value={otp} onChange={handleOtpChange} required />
                            </div>
                            {error && <p className="text-red-500 text-sm">{error}</p>}
                            <Button type="submit" className="w-full">Verify Email</Button>
                        </form>
                    )}
                </CardContent>
                {!isOtpSent && (
                    <>
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Button variant="outline" className="w-full" onClick={() => window.location.href = "http://localhost:5000/api/auth/google"}>
                                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                                    <path
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        fill="#4285F4"
                                    />
                                    <path
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        fill="#34A853"
                                    />
                                    <path
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        fill="#FBBC05"
                                    />
                                    <path
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        fill="#EA4335"
                                    />
                                    <path d="M1 1h22v22H1z" fill="none" />
                                </svg>
                                Google
                            </Button>
                            <Button variant="outline" className="w-full" onClick={() => window.location.href = "http://localhost:5000/api/auth/github"}>
                                <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.49.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.603-3.369-1.34-3.369-1.34-.454-1.154-1.109-1.461-1.109-1.461-.906-.62.069-.607.069-.607 1.002.07 1.53 1.03 1.53 1.03.89 1.525 2.34 1.085 2.91.829.091-.645.348-1.085.634-1.335-2.22-.253-4.555-1.11-4.555-4.945 0-1.091.39-1.984 1.03-2.683-.103-.254-.447-1.275.098-2.656 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.505.338 1.909-1.294 2.748-1.025 2.748-1.025.547 1.381.203 2.402.1 2.656.64.699 1.028 1.592 1.028 2.683 0 3.845-2.337 4.69-4.563 4.938.357.308.678.919.678 1.852 0 1.337-.012 2.418-.012 2.745 0 .268.18.58.688.481A10.002 10.002 0 0 0 22 12c0-5.523-4.477-10-10-10z" />
                                </svg>
                                GitHub
                            </Button>
                        </div>
                    </>
                )}
                <CardFooter className="flex flex-col space-y-4">
                    <div className="text-sm text-center text-muted-foreground">
                        Already have an account? <Link to="/login" className="text-primary hover:underline">Sign in</Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
