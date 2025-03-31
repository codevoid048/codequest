import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Code, Menu, Moon, Sun, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTheme } from "@/context/ThemeContext";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export function Sidebar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "/codingclubadmin", label: "Home" },
    { href: "/codingclubadmin/leaderboard", label: "Leaderboard" },
    { href: "/codingclubadmin/users", label: "Users" },
    { href: "/codingclubadmin/challenges", label: "Challenges" },
    { href: "/codingclubadmin/addchallenge", label: "Add Challenge" },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full p-6">
      <Link to="/codingclubadmin" className="flex items-center space-x-2 mb-8">
        <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 5 }}>
          <Code className="h-6 w-6 text-primary" />
        </motion.div>
        <span className="font-bold text-xl">Admin CodeQuest</span>
      </Link>
      <nav className="flex flex-col gap-4 flex-1">
        {navItems.map((item) => (
          <Link key={item.href} to={item.href} className={`text-sm font-medium hover:text-primary ${location.pathname === item.href ? "text-primary" : "text-muted-foreground"}`} onClick={() => setIsOpen(false)}>
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="flex flex-col gap-4 mt-auto">
        <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
        {!isAuthenticated ? (
          <div className="flex flex-col gap-2">
            <Button variant="outline" asChild>
              <Link to="/login">Log In</Link>
            </Button>
            <Button asChild>
              <Link to="/register">Sign Up</Link>
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <Button onClick={logout} variant="outline">Logout</Button>
            <Link to="/profile">
              <img src="/default-profile.png" alt="Profile" className="w-8 h-8 rounded-full mx-auto" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      <aside className={`hidden md:block fixed top-0 left-0 h-full w-64 z-50 border-r ${isScrolled ? "bg-background/80 backdrop-blur-md shadow-lg" : "bg-background"}`}>
        <SidebarContent />
      </aside>
      <div className="md:hidden sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center space-x-2">
            <Code className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">CodeQuest</span>
          </Link>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <SidebarContent />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  );
}
