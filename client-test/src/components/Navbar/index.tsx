<<<<<<< HEAD
import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Code, Menu, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTheme } from "../../context/ThemeContext";
import { cn } from "@/lib/utils"; // Import the cn function
import { Link } from "react-router-dom";
=======
"use client"
>>>>>>> dfdf4f25667d182921bd646bb40fdb1aa2edd671

import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { Code, Menu, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useTheme } from "@/context/ThemeContext"

export function Navbar() {
<<<<<<< HEAD
    const [currentPath, setCurrentPath] = useState<string>(window.location.pathname);
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const [mounted, setMounted] = useState<boolean>(false);
    const { theme, setTheme } = useTheme();
    const isDarkMode = theme === "dark"; // Define the isDarkMode variable
=======
    const location = useLocation()
    const [isScrolled, setIsScrolled] = useState(false)
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
>>>>>>> dfdf4f25667d182921bd646bb40fdb1aa2edd671

    useEffect(() => {
        setMounted(true)

        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const navItems = [
        { href: "/", label: "Home" },
        { href: "/challenges", label: "Challenges" },
        { href: "/leaderboard", label: "Leaderboard" },
        { href: "/about", label: "About" },
    ]

    return (
        <header
            className={`sticky top-0 z-50 w-full transition-all duration-200 px-20 ${isScrolled ? "bg-background/80 backdrop-blur-md border-b" : "bg-transparent"
                }`}
        >
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-6 md:gap-8 lg:gap-10">
                    <Link to="/" className="flex items-center space-x-2">
                        <motion.div
                            initial={{ rotate: 0 }}
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatDelay: 5 }}
                        >
                            <Code className="h-6 w-6 text-primary" />
                        </motion.div>
                        <span className="font-bold text-xl">CodeQuest</span>
                    </Link>

                    <nav className="hidden md:flex gap-6">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                to={item.href}
                                className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === item.href ? "text-primary" : "text-muted-foreground"
                                    }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="flex items-center gap-2">
<<<<<<< HEAD
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
=======
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

                    <div className="hidden md:flex gap-2">
                        <Button variant="outline" asChild>
                            <Link to="/login">Log In</Link>
                        </Button>
                        <Button asChild>
                            <Link to="/register">Sign Up</Link>
                        </Button>
>>>>>>> dfdf4f25667d182921bd646bb40fdb1aa2edd671
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
                                <Link to="/" className="flex items-center space-x-2">
                                    <Code className="h-6 w-6 text-primary" />
                                    <span className="font-bold text-xl">CodeQuest</span>
                                </Link>

                                <nav className="flex flex-col gap-4">
                                    {navItems.map((item) => (
                                        <Link
                                            key={item.href}
                                            to={item.href}
                                            className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === item.href ? "text-primary" : "text-muted-foreground"
                                                }`}
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </nav>

                                <div className="flex flex-col gap-2 mt-4">
                                    <Button variant="outline" asChild className="w-full">
                                        <Link to="/login">Log In</Link>
                                    </Button>
                                    <Button asChild className="w-full">
                                        <Link to="/register">Sign Up</Link>
                                    </Button>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
}