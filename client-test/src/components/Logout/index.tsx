import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LogoutPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const logoutUser = async () => {
            try {
                const response = await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });
                console.log("Logout response:", response.data); 
                navigate("/login");
            } catch (error) {
                console.error("Logout failed:", error.response ? error.response.data : error);
            }
        };
        logoutUser();
    }, [navigate]);

    return (
        <div className="flex min-h-screen items-center justify-center">
            <Card className="w-full max-w-md p-6 shadow-lg">
                <CardHeader>
                    <CardTitle className="text-center">Logging Out...</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                    <p>You are being logged out. Please wait...</p>
                    <Button className="mt-4" onClick={() => navigate("/login")}>Go to Login</Button>
                </CardContent>
            </Card>
        </div>
    );
}
