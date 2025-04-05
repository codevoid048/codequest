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
  Flame,
  Medal,
  Trophy,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";


// Number of users per page
const USERS_PER_PAGE = 8;

export default function Leaderboard() {
  const [users, setUsers] = useState<any[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [updatedUser, setUpdatedUser] = useState<number | null>(null);
  const [hoveredUser, setHoveredUser] = useState<number | null>(null);
  const confettiRef = useRef(null);
  const controls = useAnimationControls();
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [usernameHovered, setUsernameHovered] = useState<number | null>(null);
  // Calculate total pages
  const totalPages = Math.ceil(users.length / USERS_PER_PAGE);

  // Get current users
  const getCurrentUsers = () => {
    const indexOfLastUser = currentPage * USERS_PER_PAGE;
    const indexOfFirstUser = indexOfLastUser - USERS_PER_PAGE;
    return users.slice(indexOfFirstUser, indexOfLastUser);
  };

  // Simulate points update every few seconds
  useEffect(() => {
    const fetchLearderboard=async () => {
    try { 
      const res=await axios.get("http://localhost:5000/api/leaderboard");
      const fetchUsers=res.data.map((user: any) => ({ ...user,id:user._id }));
      setUsers(fetchUsers);
    } catch (error) {
      console.error("Error fetching leaderboard data:", error);
      
    }
    };
    fetchLearderboard();
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    controls.start({
      rotate: [0, 360],
      transition: { duration: 0.7 },
    });
    setTimeout(() => {
      setIsDarkMode(!isDarkMode);
      // Toggle dark class on document
      if (!isDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }, 350);
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
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
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
        "min-h-screen transition-all duration-500 bg-background text-foreground",
        isDarkMode ? "dark" : "",
        "bg-grid-pattern"
      )}
    >
      <div className="container mx-auto py-12 px-4 relative">
        {/* Background decorative elements */}
        <div className="absolute top-20 right-20 opacity-5">
          <motion.div
            animate={{
              rotate: [0, 10, 0, -10, 0],
              scale: [1, 1.05, 1, 0.95, 1],
            }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 10 }}
          >
            <Zap className="h-40 w-40" />
          </motion.div>
        </div>
        <motion.div></motion.div>
        <div className="absolute bottom-20 left-20 opacity-5">
          <motion.div
            animate={{
              rotate: [0, -10, 0, 10, 0],
              scale: [1, 0.95, 1, 1.05, 1],
            }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 12 }}
          >
            <Flame className="h-40 w-40" />
          </motion.div>
        </div>

        {/* Confetti container for first place */}
        <div
          ref={confettiRef}
          className="absolute inset-0 pointer-events-none overflow-hidden"
        ></div>

        {/* Header */}
        <div className="relative z-10 mb-12">
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
          <div className="flex items-center gap-4"></div>

          {/* Decorative line */}
          <div className="w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent mt-6 opacity-70"></div>
        </div>

        {/* Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card
            className={cn(
              "overflow-hidden border-none shadow-xl transition-all duration-300",
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

            {/* Table body */}
            <div
              className={cn(
                "divide-y rounded-b-md",
                isDarkMode ? "divide-border/20" : "divide-border/70"
              )}
            >
              <AnimatePresence>
                {getCurrentUsers().map((user, index) => {
                  const rank = (currentPage - 1) * USERS_PER_PAGE + index + 1;
                  const isTop3 = rank <= 3;
                  const isUpdated = user.id === updatedUser;
                  const isHovered = user.id === hoveredUser;
                  const isUsernameHovered = user.id === usernameHovered;

                  return (
                    <motion.div
                      key={user.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        backgroundColor: isUpdated
                          ? isDarkMode
                            ? "rgba(var(--primary), 0.2)"
                            : "rgba(var(--primary), 0.1)"
                          : "transparent",
                        scale: isUsernameHovered ? 1.03 : 1, // Scale entire row when username is hovered
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
                        isHovered ? "text-blue-500" : "" // Change all text in row to blue when hovered
                      )}
                      onMouseEnter={() => setHoveredUser(user.id)}
                      onMouseLeave={() => setHoveredUser(null)}
                    >
                      {/* Rank indicator */}
                      <div className="col-span-1 flex justify-center">
                        <motion.div
                          className={cn(
                            "flex items-center justify-center w-8 h-8 rounded-full",
                            rank === 1
                              ? isDarkMode
                                ? "bg-chart-1/30"
                                : "bg-chart-1/20"
                              : rank === 2
                              ? isDarkMode
                                ? "bg-chart-2/30"
                                : "bg-chart-2/20"
                              : rank === 3
                              ? isDarkMode
                                ? "bg-chart-3/30"
                                : "bg-chart-3/20"
                              : isDarkMode
                              ? "bg-muted/30"
                              : "bg-muted/20"
                          )}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          {getRankIcon(rank)}
                        </motion.div>
                      </div>

                      {/* Username with special styling for top 3 */}
                      <div className="col-span-5 flex items-center gap-3">
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
                            rank === 1
                              ? "text-chart-1 font-bold"
                              : rank === 2
                              ? "text-chart-2 font-bold"
                              : rank === 3
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
                      </div>

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
                                : "", // Change text to blue when row is hovered
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
                          {user.solveChallenges? user.solveChallenges.length: 0}
                        </div>
                      </div>

                      {/* Streak column */}
                      <div className="col-span-3 text-center">
                        <div
                          className={cn(
                            "flex items-center justify-center gap-2 transition-all duration-300",
                            isUsernameHovered || isHovered
                              ? "text-blue-500"
                              : "" // Change text to blue when row is hovered
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
                            rank === 1
                              ? "bg-gradient-to-b from-chart-1 to-chart-1/60"
                              : rank === 2
                              ? "bg-gradient-to-b from-chart-2 to-chart-2/60"
                              : "bg-gradient-to-b from-chart-3 to-chart-3/60"
                          )}
                        ></div>
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
            <div
              className={cn(
                "p-4 border-t flex justify-between items-center",
                isDarkMode ? "border-border/20 " : "border-border "
              )}
            >
              {/* Page info */}
              <div className="text-sm text-muted-foreground ml-8">
                page {currentPage} of {Math.ceil(users.length / USERS_PER_PAGE)}
              </div>

              {/* Pagination controls */}
              <div className="flex items-center space-x-1">
                {/* Previous button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className={cn(
                    "flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200",
                    currentPage === 1
                      ? "opacity-50 cursor-not-allowed"
                      : isDarkMode
                      ? "hover:bg-accent/50 text-primary"
                      : "hover:bg-accent/80 text-primary"
                  )}
                >
                  <ChevronLeft className="h-4 w-4" />
                </motion.button>

                {/* Page numbers */}
                <div className="flex items-center space-x-1">
                  {getPageNumbers().map((page, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => typeof page === "number" && goToPage(page)}
                      disabled={page === "..."}
                      className={cn(
                        "flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 text-sm font-medium",
                        page === currentPage
                          ? isDarkMode
                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                            : "bg-primary text-primary-foreground shadow-md"
                          : page === "..."
                          ? "cursor-default"
                          : isDarkMode
                          ? "hover:bg-accent/50 text-foreground"
                          : "hover:bg-accent/80 text-foreground",
                        page === currentPage && "transform scale-110"
                      )}
                    >
                      {page}
                    </motion.button>
                  ))}
                </div>

                {/* Next button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className={cn(
                    "flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200",
                    currentPage === totalPages
                      ? "opacity-50 cursor-not-allowed"
                      : isDarkMode
                      ? "hover:bg-accent/50 text-primary"
                      : "hover:bg-accent/80 text-primary"
                  )}
                >
                  <ChevronRight className="h-4 w-4" />
                </motion.button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}