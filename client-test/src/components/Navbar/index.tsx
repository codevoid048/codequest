"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Code, Menu, Moon, Sun, Search, Loader2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useTheme } from "../../context/ThemeContext"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext" // Import the AuthContext
import { useDebounce } from "../../lib/useDebounce"

export function Navbar() {
  const [searchQuery, setSearchQuery] = useState("")
  const debouncedQuery = useDebounce(searchQuery, 300)
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const navigate = useNavigate()
  const [isScrolled, setIsScrolled] = useState<boolean>(false)
  const [mounted, setMounted] = useState<boolean>(false)
  const { theme, setTheme } = useTheme()
  const location = useLocation()
  const { user, isAuthenticated, logout } = useAuth()
  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Mounted check to avoid hydration errors
  useEffect(() => {
    setMounted(true)
  }, [])

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/challenges", label: "Challenges" },
    { href: "/leaderboard", label: "Leaderboard" },
    { href: "/about", label: "About" },
  ]

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!debouncedQuery) {
        setSearchResults([])
        setShowDropdown(false)
        return
      }

      try {
        setLoading(true)
        setShowDropdown(true)

        const res = await fetch(`http://localhost:5000/api/search?q=${debouncedQuery}`, {
          credentials: "include", // if needed
        })
        const data = await res.json()

        // Suppose your API returns { results: [...] }
        // or just an array. Adjust accordingly.
        const results = Array.isArray(data) ? data : data.results
        setSearchResults(results || [])
      } catch (err) {
        console.error("Search error:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchSearchResults()
  }, [debouncedQuery])

  // Update the click outside handler
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (showDropdown && !(event.target as Element).closest(".search-container")) {
        setShowDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [showDropdown])

  const renderResultItem = (item: any, idx: number) => {
    if (item.type === "challenge") {
      return (
        <div
          key={idx}
          className="p-2 hover:bg-muted cursor-pointer"
          onClick={() => {
            navigate(`/challenge/${item.id}`)
            setShowDropdown(false)
          }}
        >
          <p className="font-semibold">{item.title}</p>
          <p className="text-xs text-muted-foreground">
            {item.difficulty} — {item.description?.slice(0, 80)}
          </p>
        </div>
      )
    } else if (item.type === "user") {
      return (
        <div
          key={idx}
          className="p-2 hover:bg-muted cursor-pointer flex items-center gap-2"
          onClick={() => {
            navigate(`/profile/${item.username}`)
            setShowDropdown(false)
          }}
        >
          {item?.profilePicture ? (
            <img src={item.profilePicture || "/placeholder.svg"} alt="Profile" className="w-8 h-8 rounded-full" />
          ) : (
            (() => {
              const initial = item?.username ? item.username.charAt(0).toUpperCase() : "U"
              return (
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-medium text-sm">{initial}</span>
                </div>
              )
            })()
          )}
          {/* <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs">
            {item.name?.charAt(0) || "U"}
          </div> */}
          <div>
            <p className="font-semibold">{item.name}</p>
            <p className="text-xs text-muted-foreground">
              @{item.username} — {item.collegeName}, {item.branch}
            </p>
          </div>
        </div>
      )
    }
    // fallback
    return null
  }
  // Function to render user avatar or initial
  const renderUserAvatar = () => {
    if (user?.profilePicture) {
      return <img src={user.profilePicture || "/placeholder.svg"} alt="Profile" className="w-8 h-8 rounded-full" />
    } else {
      // Display first letter of username with blue background
      const initial = user?.username ? user.username.charAt(0).toUpperCase() : "U"
      return (
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          <span className="text-primary-foreground font-medium text-sm">{initial}</span>
        </div>
      )
    }
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled ? "bg-background/80 backdrop-blur-md border-b" : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between px-4 md:px-6 lg:px-8">
        {/* Logo & Desktop Navigation */}
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
          {/* Search Input */}
          <div className="relative search-container">
            <div className="flex items-center space-x-2 border rounded-md px-3 py-2 bg-card text-foreground">
              <Search className="h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery && setShowDropdown(true)}
                placeholder="Search challenges, users..."
                className="bg-transparent focus:outline-none text-sm w-60"
              />
              {loading && <Loader2 className="h-5 w-5 animate-spin" />}
              {searchQuery && !loading && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-5 w-5 p-0"
                  onClick={() => {
                    setSearchQuery("")
                    setShowDropdown(false)
                  }}
                >
                  <span className="sr-only">Clear search</span>
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Dropdown with animation */}
            <AnimatePresence>
              {showDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.15 }}
                  className="absolute mt-1 w-full bg-card border border-border rounded-md shadow-lg z-50 max-h-80 overflow-y-auto"
                >
                  {searchResults.length > 0
                    ? searchResults.map(renderResultItem)
                    : debouncedQuery.length > 0 &&
                      !loading && <div className="p-4 text-sm text-center text-muted-foreground">No results found</div>}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

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
              <Link to={`/profile/${user?.username}`}>{renderUserAvatar()}</Link>
              <Button onClick={logout} variant="outline">
                Logout
              </Button>
            </div>
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

              {/* Mobile Search */}
              <div className="relative mb-4 search-container">
                <div className="flex items-center space-x-2 border rounded-md px-3 py-2 bg-card text-foreground">
                  <Search className="h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => searchQuery && setShowDropdown(true)}
                    placeholder="Search challenges, users..."
                    className="bg-transparent focus:outline-none text-sm w-full"
                  />
                  {loading && <Loader2 className="h-5 w-5 animate-spin" />}
                  {searchQuery && !loading && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-5 w-5 p-0"
                      onClick={() => {
                        setSearchQuery("")
                        setShowDropdown(false)
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                {/* Mobile Dropdown */}
                <AnimatePresence>
                  {showDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.15 }}
                      className="absolute mt-1 w-full bg-card border border-border rounded-md shadow-lg z-50 max-h-60 overflow-y-auto"
                    >
                      {searchResults.length > 0
                        ? searchResults.map(renderResultItem)
                        : debouncedQuery.length > 0 &&
                          !loading && (
                            <div className="p-4 text-sm text-center text-muted-foreground">No results found</div>
                          )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

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
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      {renderUserAvatar()}
                    </div>
                    <Button onClick={logout} variant="outline" className="w-full">
                      Logout
                    </Button>
                  </div>
                )}
              </div>

              {/* Mobile Theme Toggle */}
              {mounted && (
                <Button
                  variant="outline"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="mt-4 cursor-pointer group flex items-center justify-center gap-2"
                >
                  <div className="transition-transform duration-400 group-active:rotate-360">
                    {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                  </div>
                  <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
