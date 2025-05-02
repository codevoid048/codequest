/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import axios from "axios";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import {
  Award,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Crown,
  Medal,
  Search,
  Trophy,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

// Number of users per page - match with backend limit
const USERS_PER_PAGE = 10;

export default function Leaderboard() {
  const [users, setUsers] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [updatedUser, setUpdatedUser] = useState<number | null>(null);
  const [hoveredUser, setHoveredUser] = useState<number | null>(null);
  const confettiRef = useRef(null);
  const controls = useAnimationControls();
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  // Search states
  const [searchTerm, setSearchTerm] = useState("");
  
  const [isSearching, setIsSearching] = useState(false);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [usernameHovered, setUsernameHovered] = useState<number | null>(null);
  
  // Total pages based on total users, not filtered users
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);

  // Add loading state
  const [isLoading, setIsLoading] = useState(false);

  // Fetch leaderboard data
  useEffect(() => {
    let isMounted = true;
    const fetchLeaderboard = async () => {
      setIsLoading(true);
      try { 
        console.log('Fetching data for page:', currentPage);
        const res = await axios.get(`http://localhost:5000/api/leaderboard?page=${currentPage}`);
        console.log('API Response:', res.data);
        
        if (!isMounted) return;
        
        const { leaderboard, currentPage: page, totalPages } = res.data;
        
        if (!leaderboard || !Array.isArray(leaderboard)) {
          console.error('Invalid leaderboard data received:', leaderboard);
          return;
        }
        
        // Sort users by points in descending order and add rank
        const sortedUsers = leaderboard
          .map((user: any) => ({ ...user, id: user._id || Math.random().toString(36).substr(2, 9) }))
          .map((user: any, index: number) => ({
            ...user,
            rank: (page - 1) * USERS_PER_PAGE + index + 1
          }));
        
        setUsers(sortedUsers);
        
        // If search term is present, apply filtering
        if (searchTerm.trim() !== "") {
          const filtered = sortedUsers.filter(user => 
            user?.username?.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setFilteredUsers(filtered);
        } else {
          setFilteredUsers(sortedUsers);
        }
        
        setTotalPages(totalPages);
        setTotalUsers((totalPages * USERS_PER_PAGE) || 0);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
        // Show error state
        setUsers([]);
        setFilteredUsers([]);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
    
    fetchLeaderboard();
    
    return () => {
      isMounted = false;
    };
  }, [currentPage, searchTerm]);

  // Filter users when search term changes
  // This is now handled directly in the fetch to avoid overriding the pagination
  
  // Add this at the top of your component to handle debounced search
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // Use a debounce effect to prevent too many re-renders
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      // Reset to page 1 when search term changes
      if (searchTerm !== debouncedSearchTerm) {
        setCurrentPage(1);
      }
    }, 300); // 300ms delay

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Reset search
  const clearSearch = () => {
    setSearchTerm("");
    setIsSearching(false);
    if (searchInputRef.current) {
      searchInputRef.current.blur();
    }
  };

  // Get rank icon based on position
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Award className="h-5 w-5 text-amber-700" />;
      default:
        return (
          <div className="h-5 w-5 flex items-center justify-center font-bold">
            {rank}
          </div>
        );
    }
  };

  // Pagination functions
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages && !isLoading) {
      setCurrentPage(page);
      // When using search, we need to reset filtered users
      if (searchTerm) {
        setFilteredUsers([]);
      }
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1 && !isLoading) {
      setCurrentPage(prevPage => prevPage - 1);
      // When using search, we need to reset filtered users
      if (searchTerm) {
        setFilteredUsers([]);
      }
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages && !isLoading) {
      setCurrentPage(prevPage => prevPage + 1);
      // When using search, we need to reset filtered users
      if (searchTerm) {
        setFilteredUsers([]);
      }
    }
  };

  // Get page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      // If we have less pages than max to show, display all
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always include first page
      pages.push(1);

      // Calculate middle pages
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      // Adjust if at boundaries
      if (currentPage <= 2) {
        endPage = 4;
      } else if (currentPage >= totalPages - 1) {
        startPage = totalPages - 3;
      }

      // Add ellipsis if needed
      if (startPage > 2) {
        pages.push("...");
      }

      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      // Add ellipsis if needed
      if (endPage < totalPages - 1) {
        pages.push("...");
      }

      // Always include last page
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div
      className={cn(
        "min-h-screen transition-all duration-500 px-20 bg-background text-foreground",
        isDarkMode ? "dark" : "",
        "bg-grid-pattern"
      )}
    >
      <div className="container mx-auto p-1 px-4 relative mt-6">
        {/* Background decorative elements */}
        <div className="absolute top-20 right-20 opacity-5">
          <motion.div
            animate={{
              rotate: [0, 10, 0, -10, 0],
              scale: [1, 1.05, 1, 0.95, 1],
            }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 10 }}
          >
            <Zap className="h-30 w-30" />
          </motion.div>
        </div>
        <motion.div></motion.div>
        

        {/* Confetti container for first place */}
        <div
          ref={confettiRef}
          className="absolute inset-0 pointer-events-none overflow-hidden"
        ></div>

        {/* Header */}
        <div className="relative z-10 mb-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="text-center md:text-left">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{
                    rotate: [0, 5, 0, -5, 0],
                    y: [0, -5, 0, -5, 0],
                  }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 5 }}
                >
                  <Trophy className="h-10 w-10 text-yellow-500" />
                </motion.div>
                <h1 className="text-4xl font-bold">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-ring">
                    CodeQuest
                  </span>
                  <span className="ml-2 text-foreground">Leaderboard</span>
                </h1>
              </div>
              <p className="text-muted-foreground mt-2 text-lg">
                Top problem solvers competing for glory
              </p>
            </div>
            
            {/* Search Bar */}
            <div className="mt-6 md:mt-0 md:ml-auto">
              <div className="relative flex items-center rounded-xl transition-all duration-300 w-76
                border border-gray-700 dark:border-indigo-300
                shadow-md shadow-indigo-700/30 dark:shadow-indigo-200/30
                bg-gray-800 dark:bg-white
                hover:border-indigo-500 dark:hover:border-indigo-400
                hover:shadow-lg hover:shadow-indigo-500/30 dark:hover:shadow-indigo-300/30">

                <div className="pl-1">
                  <Search className="h-4 w-4 text-white dark:text-indigo-500 ml-2" />
                </div>

                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search for coders..."
                  value={searchTerm}
                  onChange={(e) => {
                    // Safely update search term
                    const value = e.target.value;
                    setSearchTerm(value);
                    setIsSearching(value.trim() !== "");
                  }}
                  className="flex-1 bg-transparent py-3 px-3 outline-none transition-all duration-300
                    text-sm text-white dark:text-gray-800 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                />

                {searchTerm && (
                  <button
                    onClick={clearSearch}
                    className="mr-3 p-1.5 rounded-full bg-indigo-600 dark:bg-indigo-500 transition-colors duration-300
                      hover:bg-indigo-500 dark:hover:bg-indigo-600"
                  >
                    <X className="h-3.5 w-3.5 text-white dark:text-white" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Decorative line */}
          <div className="w-full h-1 bg-gradient-to-r from-transparent via-indigo-600 to-transparent mt-6 opacity-70 dark:via-indigo-400"></div>

          {/* Search results status with animated appearance */}
          <AnimatePresence>
            {searchTerm && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: 0.1 }}
                className="text-center text-sm mt-3 font-medium bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400"
              >
                {filteredUsers.length === 0 
                  ? "No coders found" 
                  : filteredUsers.length === 1 
                    ? "1 coder found" 
                    : `${filteredUsers.length} coders found`}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Loading indicator */}
        {isLoading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center items-center py-8"
          >
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </motion.div>
        )}

        {/* Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-4" // Added margin-top to reduce the gap
        >
          <Card
            className={cn(
              "overflow-hidden border-none shadow-xl transition-all duration-300 mt-0",
              isDarkMode
                ? "bg-card/80 backdrop-blur-sm border-border/30"
                : "bg-card/90 backdrop-blur-sm"
            )}
          >
            {/* Table header */}
            <div
              className={cn(
                "grid grid-cols-15 p-4 font-medium border-b rounded-t-md ",
                isDarkMode
                  ? "text-primary border-border bg-muted/30"
                  : "text-primary border-border bg-muted/50"
              )}
            >
              <div className="col-span-1 text-center">Rank</div>
              <div className="col-span-5 ml-5">Coder</div>
              <div className="col-span-3 text-center">Points</div>
              <div className="col-span-3 text-center">Problems</div>
              <div className="col-span-3 text-center">Streak</div>
            </div>

            {/* Empty state */}
            <AnimatePresence>
              {!isLoading && filteredUsers.length === 0 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-12 text-center"
                >
                  <motion.div 
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1, rotate: [0, -3, 3, -2, 0] }}
                    transition={{ duration: 0.5 }}
                    className="inline-block mb-3 text-muted-foreground"
                  >
                    <Search className="h-12 w-12 mx-auto" />
                  </motion.div>
                  <h3 className="text-lg font-medium">No coders found</h3>
                  <p className="text-muted-foreground mt-1">Try a different search term</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Table body */}
            <div
              className={cn(
                "divide-y rounded-b-md",
                isDarkMode ? "divide-border/20" : "divide-border/70"
              )}
            >
              <AnimatePresence>
                {filteredUsers.map((user, index) => {
                  const isTop3 = user.rank <= 3;
                  const isUpdated = user.id === updatedUser;
                  const isHovered = user.id === hoveredUser;
                  const isUsernameHovered = user.id === usernameHovered;
                  const isSearchMatch = searchTerm && user.username && user.username.toLowerCase().includes(searchTerm.toLowerCase());

                  return (
                    <motion.div
                      key={`${user.id}-${currentPage}`} // Add currentPage to key to force re-render on page change
                      initial={{ opacity: 0, x: -20 }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        backgroundColor: isUpdated
                          ? isDarkMode
                            ? "rgba(var(--primary), 0.2)"
                            : "rgba(var(--primary), 0.1)"
                          : "transparent",
                        scale: isUsernameHovered ? 1.03 : 1,
                      }}
                      exit={{ opacity: 0, x: 20 }}
                      layout
                      transition={{ duration: 0.4, type: "spring" }}
                      className={cn(
                        "grid grid-cols-15 p-4 items-center relative overflow-hidden",
                        isTop3
                          ? isDarkMode
                            ? "bg-muted/30"
                            : "bg-muted/80"
                          : "",
                        "transition-all duration-300 cursor-pointer",
                        isHovered &&
                          (isDarkMode
                            ? "bg-accent/40 -translate-y-1 shadow-lg shadow-accent/20"
                            : "bg-accent/80 -translate-y-1 shadow-lg"),
                        isHovered ? "text-blue-500" : "",
                        isSearchMatch ? (isDarkMode ? "bg-primary/10" : "bg-primary/5") : ""
                      )}
                      onMouseEnter={() => setHoveredUser(user.id)}
                      onMouseLeave={() => setHoveredUser(null)}
                    >
                      {/* Rank indicator */}
                      <div className="col-span-1 flex justify-center">
                        <motion.div
                          className={cn(
                            "flex items-center justify-center w-8 h-8 rounded-full",
                            user.rank === 1
                              ? isDarkMode
                                ? "bg-chart-1/30"
                                : "bg-chart-1/20"
                              : user.rank === 2
                                ? isDarkMode
                                  ? "bg-chart-2/30"
                                  : "bg-chart-2/20"
                                : user.rank === 3
                                  ? isDarkMode
                                    ? "bg-chart-3/30"
                                    : "bg-chart-3/20"
                                  : isDarkMode
                                    ? "bg-muted/30"
                                    : "bg-muted/20"
                          )}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          {getRankIcon(user.rank)}
                        </motion.div>
                      </div>
                      
                      {/* Username with special styling for top 3 */}
                      <Link to={`/profile/${user.username}`} className="col-span-5 flex items-center gap-3">
                        {isTop3 && (
                          <motion.div
                            animate={{ rotate: [0, 5, 0, -5, 0] }}
                            transition={{
                              repeat: Number.POSITIVE_INFINITY,
                              duration: 2,
                              repeatType: "loop",
                            }}
                          ></motion.div>
                        )}
                        <motion.span
                          className={cn(
                            "font-medium ml-4 relative inline-block",
                            isTop3 ? "text-lg ml-0" : "",
                            user.rank === 1
                              ? "text-chart-1 font-bold"
                              : user.rank === 2
                                ? "text-chart-2 font-bold"
                                : user.rank === 3
                                  ? "text-chart-3 font-bold"
                                  : "",
                            isUsernameHovered || isHovered
                              ? "text-blue-500"
                              : "" // Change text to blue on hover
                          )}
                          onMouseEnter={() => setUsernameHovered(user.id)}
                          onMouseLeave={() => setUsernameHovered(null)}
                          whileHover={{
                            scale: 1.15,
                            textShadow: isDarkMode
                              ? "0 0 8px rgba(59, 130, 246, 0.8)"
                              : "0 0 8px rgba(59, 130, 246, 0.5)",
                          }}
                        >
                          {user.username}
                        </motion.span>
                      </Link>

                      {/* Points with animation */}
                      <motion.div
                        className="col-span-3 text-center font-semibold"
                        key={`points-${user.id}-${user.points}`}
                        initial={{ scale: 1 }}
                        animate={{
                          scale: isUpdated ? [1, 1.2, 1] : 1,
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="flex items-center justify-center gap-1">
                          {isUpdated && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              className={
                                isHovered ? "text-blue-500" : "text-chart-4"
                              }
                            >
                              <ChevronUp className="h-4 w-4" />
                            </motion.div>
                          )}
                          <div
                            className={cn(
                              "transition-all duration-300",
                              isUsernameHovered || isHovered
                                ? "text-blue-500"
                                : "",
                              isUpdated && !isHovered ? "text-chart-4" : ""
                            )}
                          >
                            {user.points}
                          </div>
                        </div>
                      </motion.div>

                      {/* Problems solved */}
                      <div className="col-span-3 text-center">
                        <div
                          className={cn(
                            "flex items-center justify-center gap-2 transition-all duration-300",
                            isUsernameHovered || isHovered
                              ? "text-blue-500"
                              : "" // Change text to blue when row is hovered
                          )}
                        >
                          {user.solveChallenges ? user.solveChallenges.total : 0}
                        </div>
                      </div>

                      {/* Streak column */}
                      <div className="col-span-3 text-center">
                        <div
                          className={cn(
                            "flex items-center justify-center gap-2 transition-all duration-300",
                            isUsernameHovered || isHovered
                              ? "text-blue-500"
                              : ""
                          )}
                        >
                          <span>{user.streak}</span>
                        </div>
                      </div>

                      {/* Decorative elements for top 3 */}
                      {isTop3 && (
                        <div
                          className={cn(
                            "absolute left-0 top-0 h-full w-1",
                            user.rank === 1
                              ? "bg-gradient-to-b from-chart-1 to-chart-1/60"
                              : user.rank === 2
                                ? "bg-gradient-to-b from-chart-2 to-chart-2/60"
                                : "bg-gradient-to-b from-chart-3 to-chart-3/60"
                          )}
                        ></div>
                      )}

                      {/* Search match highlight */}
                      {isSearchMatch && !isHovered && (
                        <motion.div
                          className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-primary to-ring"
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}

                      {/* Hover effect overlay */}
                      {isHovered && (
                        <motion.div
                          className={cn(
                            "absolute inset-0 pointer-events-none",
                            isDarkMode
                              ? "bg-gradient-to-r from-accent/0 via-accent/5 to-accent/0"
                              : "bg-gradient-to-r from-accent/0 via-accent/30 to-accent/0"
                          )}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}

                      {/* Right border highlight on hover */}
                      {isHovered && (
                        <motion.div
                          className={cn(
                            "absolute right-0 top-0 h-full w-1",
                            isDarkMode
                              ? "bg-gradient-to-b from-primary/50 to-ring/50"
                              : "bg-gradient-to-b from-primary to-ring"
                          )}
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: 1 }}
                          exit={{ scaleY: 0 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}

                      {/* Animated highlight for updated user */}
                      {isUpdated && (
                        <motion.div
                          className={cn(
                            "absolute inset-0 pointer-events-none",
                            isDarkMode ? "bg-primary/10" : "bg-primary/5"
                          )}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Pagination Footer */}
            {!isLoading && filteredUsers.length > 0 && (
              <div
                className={cn(
                  "p-4 border-t flex justify-between items-center",
                  isDarkMode ? "border-border/20" : "border-border"
                )}
              >
                {/* Page info */}
                <div className="text-sm text-muted-foreground ml-8">
                  {searchTerm 
                    ? `Showing ${Math.min(USERS_PER_PAGE, filteredUsers.length)} of ${filteredUsers.length} ${filteredUsers.length === 1 ? 'result' : 'results'}`
                    : `Page ${currentPage} of ${totalPages}`
                  }
                </div>

                {/* Pagination controls */}
                <div className="flex justify-center items-center gap-2">
                  <button
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1 || isLoading}
                    className={cn(
                      "p-2 rounded-full transition-colors",
                      currentPage === 1 || isLoading
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-primary hover:bg-primary/10"
                    )}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>

                  {getPageNumbers().map((page, index) => (
                    <button
                      key={index}
                      onClick={() => typeof page === 'number' && goToPage(page)}
                      className={cn(
                        "px-3 py-1 rounded-md transition-colors",
                        page === currentPage
                          ? "bg-primary text-primary-foreground"
                          : typeof page === 'number' 
                            ? "text-primary hover:bg-primary/10" 
                            : "text-muted-foreground"
                      )}
                      disabled={page === "..." || isLoading}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages || isLoading}
                    className={cn(
                      "p-2 rounded-full transition-colors",
                      currentPage === totalPages || isLoading
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-primary hover:bg-primary/10"
                    )}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

// Optimized highlight search match function
function highlightSearchMatch(text: string, searchTerm: string) {
  if (!searchTerm || !text) return <>{text}</>;

  try {
    const parts = text.split(new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));

    return (
      <>
        {parts.map((part, index) => {
          if (typeof part === "string" && part.toLowerCase() === searchTerm.toLowerCase()) {
            return (
              <span key={index} className="bg-primary/40 font-bold rounded px-1">
                {part}
              </span>
            );
          }
          return <span key={index}>{part}</span>;
        })}
      </>
    );
  } catch (error) {
    console.error("Error highlighting text:", error);
    return <>{text}</>; // Fallback to regular text
  }
}