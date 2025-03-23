import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Code, Menu, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTheme } from "../../context/ThemeContext";
import { cn } from "@/lib/utils"; // Import the cn function
import { Link } from "react-router-dom";

// Define the props for the Motion component
interface MotionProps {
    children: React.ReactNode;
    className?: string;
}

// Motion component replacement
const Motion: React.FC<MotionProps> = ({ children, className }) => {
    return <div className={className}>{children}</div>;
};

// Define the type for navigation items
interface NavItem {
    href: string;
    label: string;
}

export function Navbar() {
    const [currentPath, setCurrentPath] = useState<string>(window.location.pathname);
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const [mounted, setMounted] = useState<boolean>(false);
    const { theme, setTheme } = useTheme();
    const isDarkMode = theme === "dark"; // Define the isDarkMode variable

    useEffect(() => {
        setMounted(true);

        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Update current path when location changes
    useEffect(() => {
        const handlePathChange = () => {
            setCurrentPath(window.location.pathname);
        };

        window.addEventListener('popstate', handlePathChange);
        return () => window.removeEventListener('popstate', handlePathChange);
    }, []);

    const navItems: NavItem[] = [
        { href: "/", label: "Home" },
        { href: "/challenges", label: "Challenges" },
        { href: "/leaderboard", label: "Leaderboard" },
        { href: "/learn", label: "Learn" },
    ];

    return (
        <header
            className={`sticky top-0 z-50 px-20 w-full transition-all duration-200 ${isScrolled ? "bg-background/80 backdrop-blur-md border-b" : "bg-transparent"
                }`}
        >
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-6 md:gap-8 lg:gap-10">
                    <a href="/" className="flex items-center space-x-2">
                        <Motion
                            className="animate-wiggle"
                        >
                            <Code className="h-6 w-6 text-primary" />
                        </Motion>
                        <span className="font-bold text-xl">CodeQuest</span>
                    </a>

                    <nav className="hidden md:flex gap-6">
                        {navItems.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                className={`text-sm font-medium transition-colors hover:text-primary ${currentPath === item.href ? "text-primary" : "text-muted-foreground"
                                    }`}
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>
                </div>

                <div className="flex items-center gap-2">
                {mounted && (
  <Button
    variant="ghost"
    size="icon"
    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    className="mr-2 cursor-pointer group"
  >
    <div className="transition-transform duration-400 group-active:rotate-360">
      {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </div>
    <span className="sr-only">Toggle theme</span>
  </Button>
)}
                     
                    <div className="hidden md:flex gap-4">
                        <Link to="/login">
                            Log In
                        </Link>
                        <Link to="/register">
                            Sign Up
                        </Link>
                    </div>

                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right">
                            <div className="flex flex-col gap-6 pt-6">
                                <a href="/" className="flex items-center space-x-2">
                                    <Code className="h-6 w-6 text-primary" />
                                    <span className="font-bold text-xl">CodeQuest</span>
                                </a>

                                <nav className="flex flex-col gap-4">
                                    {navItems.map((item) => (
                                        <a
                                            key={item.href}
                                            href={item.href}
                                            className={`text-sm font-medium transition-colors hover:text-primary ${currentPath === item.href ? "text-primary" : "text-muted-foreground"
                                                }`}
                                        >
                                            {item.label}
                                        </a>
                                    ))}
                                </nav>

                                <div className="flex flex-col gap-2 mt-4">
                                    <Link to="/login" className="w-full">
                                        Log In
                                    </Link>
                                    <Link to="/register" className="w-full">
                                        Sign Up
                                    </Link>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}