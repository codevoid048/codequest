import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Code, Menu, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTheme } from "../../context/ThemeContext";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Import the AuthContext

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  
  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mounted check to avoid hydration errors
  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/challenges", label: "Challenges" },
    { href: "/leaderboard", label: "Leaderboard" },
    { href: "/about", label: "About" },
  ];

  // Function to render user avatar or initial
  const renderUserAvatar = () => {
    if (user?.profilePicture) {
      return (
        <img
          src={user.profilePicture}
          alt="Profile"
          className="w-8 h-8 rounded-full"
        />
      );
    } else {
      // Display first letter of username with blue background
      const initial = user?.username ? user.username.charAt(0).toUpperCase() : "U";
      return (
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          <span className="text-primary-foreground font-medium text-sm">{initial}</span>
        </div>
      );
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 px-20 ${
        isScrolled ? "bg-background/80 backdrop-blur-md border-b" : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        {/* Logo & Desktop Navigation */}
        <div className="flex items-center gap-6 md:gap-8 lg:gap-10">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 5 }}
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
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === item.href ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Desktop Auth & Theme Toggle */}
        <div className="hidden md:flex items-center gap-2">
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

          {!isAuthenticated ? (
            <>
              <Button variant="outline" asChild>
                <Link to="/login">Log In</Link>
              </Button>
              <Button asChild>
                <Link to="/register">Sign Up</Link>
              </Button>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/profile">
                {renderUserAvatar()}
              </Link>
              <Button onClick={logout} variant="outline">
                Logout
              </Button>
              <Link to={`/profile/${user?.username}`}>
                <img
                  src="/default-profile.png"
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
              </Link>
            </>
          )}
        </div>

        {/* Mobile Controls */}
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
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      location.pathname === item.href ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              {/* Mobile Auth */}
              <div className="flex flex-col gap-2 mt-4">
                {!isAuthenticated ? (
                  <>
                    <Button variant="outline" asChild className="w-full">
                      <Link to="/login">Log In</Link>
                    </Button>
                    <Button asChild className="w-full">
                      <Link to="/register">Sign Up</Link>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button onClick={logout} variant="outline" className="w-full">
                      Logout
                    </Button>
                    <Link to={`/profile/${user?.username}`}>
                      <img
                        src="/default-profile.png"
                        alt="Profile"
                        className="w-8 h-8 rounded-full"
                      />
                    </Link>
                  </>
                )}
              </div>

              {/* Mobile Theme Toggle */}
              {mounted && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="mt-4 cursor-pointer group"
                >
                  <div className="transition-transform duration-400 group-active:rotate-360">
                    {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                  </div>
                  <span className="sr-only">Toggle theme</span>
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}