"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Award,
  Calendar,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  Code,
  Filter,
  Flame,
  Search,
  Tag,
} from "lucide-react";
import type React from "react";
import { useEffect, useMemo, useState } from "react";

interface Problem {
  id: number;
  date: string;
  title: string;
  categories: string[];
  difficulty: "Easy" | "Medium" | "Hard";
  platform: "LeetCode" | "GFG" | "CodeChef";
  status: "Solved" | "Unsolved";
  description: string;
  problemUrl?: string;
}

type FilterTab = "all" | "solved" | "unsolved";
type SortOption = "date" | "difficulty" | "status";

const Challenges: React.FC = () => {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [countdown, setCountdown] = useState({ hours: "00", minutes: "00", seconds: "00" });
  const [problemsList, setProblemsList] = useState<Problem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("date");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const itemsPerPage = 5;

  useEffect(() => {
    const loadProblems = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setProblemsList([
        {
          id: 1,
          date: "2025-03-22",
          title: "Stickler Thief II",
          categories: ["Dynamic Programming", "Arrays", "Algorithms"],
          difficulty: "Medium",
          platform: "GFG",
          status: "Unsolved",
          description: "Find the maximum possible stolen value from houses...",
          problemUrl: "https://www.geeksforgeeks.org/stickler-thief/",
        },
        {
          id: 2,
          date: "2025-03-21",
          title: "Two Sum",
          categories: ["Arrays", "Hash Table"],
          difficulty: "Easy",
          platform: "LeetCode",
          status: "Solved",
          description: "Find two numbers that sum up to target...",
          problemUrl: "https://leetcode.com/problems/two-sum/",
        },
        {
          id: 3,
          date: "2025-03-20",
          title: "Merge K Sorted Lists",
          categories: ["Linked List", "Heap", "Divide and Conquer"],
          difficulty: "Hard",
          platform: "LeetCode",
          status: "Unsolved",
          description: "Merge k sorted linked lists into one sorted list...",
          problemUrl: "https://leetcode.com/problems/merge-k-sorted-lists/",
        },
        {
          id: 4,
          date: "2025-03-19",
          title: "Maximum Subarray",
          categories: ["Arrays", "Dynamic Programming"],
          difficulty: "Medium",
          platform: "CodeChef",
          status: "Solved",
          description: "Find the contiguous subarray with the largest sum...",
          problemUrl: "https://www.codechef.com/problems/MAXSUB",
        },
      ]);
      setIsLoading(false);
    };
    loadProblems();
  }, []);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const midnight = new Date(now);
      midnight.setHours(24, 0, 0, 0);
      const timeDiff = midnight.getTime() - now.getTime();
      const hours = Math.floor(timeDiff / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
      setCountdown({
        hours: hours.toString().padStart(2, "0"),
        minutes: minutes.toString().padStart(2, "0"),
        seconds: seconds.toString().padStart(2, "0"),
      });
    };
    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  const dailyProblem = useMemo(
    () => problemsList[new Date().getDate() % (problemsList.length || 1)] || problemsList[0],
    [problemsList]
  );
  const uniqueCategories = useMemo(() => [...new Set(problemsList.flatMap((p) => p.categories))], [problemsList]);
  const difficultyLevels = ["Easy", "Medium", "Hard"];

  const filteredProblems = useMemo(() => {
    const result = problemsList.filter((problem) => {
      const matchesTab = activeTab === "all" || problem.status.toLowerCase() === activeTab;
      const matchesDifficulty = selectedDifficulties.length === 0 || selectedDifficulties.includes(problem.difficulty);
      const matchesCategory =
        selectedCategories.length === 0 || problem.categories.some((cat) => selectedCategories.includes(cat));
      const matchesSearch =
        !searchTerm ||
        problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        problem.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesTab && matchesDifficulty && matchesCategory && matchesSearch;
    });

    result.sort((a, b) => {
      switch (sortOption) {
        case "date":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "difficulty":
          return ["Easy", "Medium", "Hard"].indexOf(a.difficulty) - ["Easy", "Medium", "Hard"].indexOf(b.difficulty);
        case "status":
          return a.status.localeCompare(b.status);
        default:
          return 0;
      }
    });

    return result;
  }, [problemsList, activeTab, selectedDifficulties, selectedCategories, searchTerm, sortOption]);

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = filteredProblems.slice(firstItemIndex, lastItemIndex);
  const totalPages = Math.ceil(filteredProblems.length / itemsPerPage);

  const toggleDifficulty = (difficulty: string) => {
    setSelectedDifficulties((prev) =>
      prev.includes(difficulty) ? prev.filter((d) => d !== difficulty) : [...prev, difficulty]
    );
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const markSolved = (id: number) => {
    setProblemsList((prev) => prev.map((p) => (p.id === id ? { ...p, status: "Solved" } : p)));
  };

  const getDifficultyStyle = (difficulty: string) => {
    return {
      Easy: "text-emerald-400 bg-emerald-900/50 dark:text-emerald-600 dark:bg-emerald-100",
      Medium: "text-amber-400 bg-amber-900/50 dark:text-amber-600 dark:bg-amber-100",
      Hard: "text-rose-400 bg-rose-900/50 dark:text-rose-600 dark:bg-rose-100",
    }[difficulty] || "";
  };

  const getDifficultyIcon = (difficulty: string) => {
    return {
      Easy: <Award className="h-4 w-4 text-emerald-400 dark:text-emerald-600" />,
      Medium: <Flame className="h-4 w-4 text-amber-400 dark:text-amber-600" />,
      Hard: <Award className="h-4 w-4 text-rose-400 dark:text-rose-600" />,
    }[difficulty] || null;
  };

  const openProblemLink = (url?: string) => url && window.open(url, "_blank");

  return (
    <div className="w-full max-w-[1040px] mx-auto px-4 py-5 space-y-8 min-h-screen">
      {/* Problem of the Day Section */}
      <Card className="border-0 shadow-xl bg-gray-900 dark:bg-white rounded-xl overflow-hidden">
        <div
          style={{
            background: "#3B82F6", // Fallback
            backgroundColor: "oklch(0.544 0.143 262.88)", // OKLCH color
          }}
        ></div>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div className="flex items-center">
              <div className="mr-3 bg-[#3B82F6]/10 dark:bg-[#3B82F6]/20 p-2 rounded-lg">
                <Flame
                  className="h-6 w-6"
                  style={{
                    color: "#3B82F6",
                    color: "oklch(0.544 0.143 262.88)",
                  }}
                />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-100 dark:text-gray-900">
                Problem of the Day
              </h2>
            </div>
            <div className="flex items-center gap-1 text-base sm:text-lg font-mono bg-gray-800 dark:bg-gray-100 px-3 py-2 rounded-lg">
              <Clock
                className="h-5 w-5 mr-2"
                style={{
                  color: "#3B82F6",
                  color: "oklch(0.544 0.143 262.88)",
                }}
              />
              <span className="bg-gray-900 dark:bg-white text-gray-100 dark:text-gray-900 px-3 py-1 rounded shadow-sm">
                {countdown.hours}
              </span>
              <span className="text-gray-400 dark:text-gray-500 px-1">:</span>
              <span className="bg-gray-900 dark:bg-white text-gray-100 dark:text-gray-900 px-3 py-1 rounded shadow-sm">
                {countdown.minutes}
              </span>
              <span className="text-gray-400 dark:text-gray-500 px-1">:</span>
              <span className="bg-gray-900 dark:bg-white text-gray-100 dark:text-gray-900 px-3 py-1 rounded shadow-sm">
                {countdown.seconds}
              </span>
            </div>
          </div>
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <div
                className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2"
                style={{
                  borderTopColor: "#3B82F6",
                  borderBottomColor: "#3B82F6",
                  borderTopColor: "oklch(0.544 0.143 262.88)",
                  borderBottomColor: "oklch(0.544 0.143 262.88)",
                }}
              ></div>
            </div>
          ) : (
            <Card
              className="border-1 cursor-pointer  bg-gray-900 dark:bg-white rounded-xl overflow-hidden mt-4"
              onClick={() => openProblemLink(dailyProblem?.problemUrl)}
            >
              <CardContent>
                <div className="flex flex-col sm:flex-row justify-between gap-6">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center text-sm text-gray-400 dark:text-gray-500">
                      <Calendar className="h-4 w-4 mr-2" />
                      {new Date().toISOString().split("T")[0]}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-100 dark:text-gray-900">
                      {dailyProblem?.title}
                    </h3>
                    <p className="text-gray-300 dark:text-gray-600 text-sm line-clamp-2">
                      {dailyProblem?.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {dailyProblem?.categories.map((cat) => (
                        <Badge
                          key={cat}
                          variant="secondary"
                          className="text-xs py-1 px-2 bg-gray-800 dark:bg-gray-200 text-gray-200 dark:text-gray-800"
                        >
                          {cat}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 justify-center">
                    <Button
                      className="text-white border-0 shadow-md hover:shadow-lg transition-all duration-300 px-6"
                      style={{
                        background: "#3B82F6",
                        backgroundColor: "oklch(0.544 0.143 262.88)",
                        background: "linear-gradient(to right, #3B82F6, #3B82F6)", // Fallback gradient (same color)
                        background: "linear-gradient(to right, oklch(0.544 0.143 262.88), oklch(0.544 0.143 262.88))",
                        "&:hover": {
                          background: "oklch(0.5 0.143 262.88)", // Slightly darker for hover
                        },
                      }}
                    >
                      Solve Now
                    </Button>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-700 dark:border-gray-200 flex flex-wrap gap-4 text-sm">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 ${getDifficultyStyle(
                      dailyProblem?.difficulty
                    )}`}
                  >
                    {getDifficultyIcon(dailyProblem?.difficulty)}
                    {dailyProblem?.difficulty}
                  </span>
                  <span className="flex items-center gap-2 bg-gray-800 dark:bg-gray-200 px-3 py-1 rounded-full text-gray-200 dark:text-gray-800">
                    <Code
                      className="h-4 w-4"
                      style={{
                        color: "#3B82F6",
                        color: "oklch(0.544 0.143 262.88)",
                      }}
                    />
                    {dailyProblem?.platform}
                  </span>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* Main Content Layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters Panel */}
        <div className="lg:w-1/4 w-full">
          <div className="lg:hidden mb-4">
            <Button
              variant="outline"
              className="w-full flex justify-between items-center text-sm py-2 px-4 border-gray-200 dark:border-gray-700 text-gray-300 dark:text-gray-700"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <span className="flex items-center">
                <Filter className="h-4 w-4 mr-2" /> Filters
              </span>
              {isFilterOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
          <Card
            className={`shadow-lg border-0 bg-gray-900 dark:bg-white ${isFilterOpen ? "block" : "hidden lg:block"}`}
          >
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4 flex items-center text-gray-100 dark:text-gray-900">
                  <Flame className="h-5 w-5 mr-2 text-amber-400 dark:text-amber-900" /> Difficulty
                </h3>
                <div className="flex flex-col gap-3">
                  {difficultyLevels.map((level) => (
                    <div key={level} className="flex items-center gap-3">
                      <button
                        onClick={() => toggleDifficulty(level)}
                        className={`flex h-5 w-5 items-center justify-center rounded-md border ${
                          selectedDifficulties.includes(level)
                            ? "border-none"
                            : "border-gray-300 dark:border-gray-600"
                        }`}
                        style={{
                          backgroundColor: selectedDifficulties.includes(level) ? "oklch(0.544 0.143 262.88)" : "transparent",
                          backgroundColor: selectedDifficulties.includes(level) ? "#3B82F6" : "transparent",
                        }}
                      >
                        {selectedDifficulties.includes(level) && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-3 w-3 text-white"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        )}
                      </button>
                      <label
                        htmlFor={level}
                        className="text-sm font-medium flex items-center gap-2 cursor-pointer text-gray-300 dark:text-gray-700"
                        onClick={() => toggleDifficulty(level)}
                      >
                        {getDifficultyIcon(level)}
                        <span>{level}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h3 className="text-lg font-medium mb-4 flex items-center text-gray-100 dark:text-gray-900">
                  <Tag
                    className="h-5 w-5 mr-2"
                    style={{
                      color: "#3B82F6",
                      color: "oklch(0.544 0.143 262.88)",
                    }}
                  />
                  Categories
                </h3>
                <div className="flex flex-col gap-3">
                  {uniqueCategories.map((cat) => (
                    <div key={cat} className="flex items-center gap-3">
                      <button
                        onClick={() => toggleCategory(cat)}
                        className={`flex h-5 w-5 items-center justify-center rounded-md border ${
                          selectedCategories.includes(cat)
                            ? "border-none"
                            : "border-gray-300 dark:border-gray-600"
                        }`}
                        style={{
                          backgroundColor: selectedCategories.includes(cat) ? "oklch(0.544 0.143 262.88)" : "transparent",
                          backgroundColor: selectedCategories.includes(cat) ? "#3B82F6" : "transparent",
                        }}
                      >
                        {selectedCategories.includes(cat) && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-3 w-3 text-white"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        )}
                      </button>
                      <label
                        htmlFor={cat}
                        className="text-sm font-medium cursor-pointer text-gray-300 dark:text-gray-700"
                        onClick={() => toggleCategory(cat)}
                      >
                        {cat}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Problems Listing */}
        <div className="lg:w-3/4 w-full">
          <div className="space-y-4 mb-6">
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6">
              {["all", "solved", "unsolved"].map((tab) => (
                <Button
                  key={tab}
                  variant={activeTab === tab ? "default" : "outline"}
                  onClick={() => setActiveTab(tab as FilterTab)}
                  className={`text-sm py-2 px-4 w-full sm:w-auto transition-all duration-300 ${
                    activeTab === tab
                      ? "text-white border-0 shadow-md"
                      : "border-gray-700 dark:border-gray-200 text-gray-300 dark:text-gray-700"
                  }`}
                  style={{
                    background: activeTab === tab ? "oklch(0.544 0.143 262.88)" : "transparent",
                    background: activeTab === tab ? "#3B82F6" : "transparent",
                    background: activeTab === tab ? "linear-gradient(to right, #3B82F6, #3B82F6)" : "transparent",
                    background: activeTab === tab ? "linear-gradient(to right, oklch(0.544 0.143 262.88), oklch(0.544 0.143 262.88))" : "transparent",
                    "&:hover": {
                      background: activeTab === tab ? "oklch(0.5 0.143 262.88)" : "transparent",
                      borderColor: activeTab !== tab ? "oklch(0.544 0.143 262.88)" : "transparent",
                    },
                  }}
                >
                  {tab === "all" ? (
                    <span className="flex items-center gap-2">
                      <Code className="h-4 w-4" />
                      All Problems
                    </span>
                  ) : tab === "solved" ? (
                    <span className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Solved
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Unsolved
                    </span>
                  )}
                </Button>
              ))}
              <div className="relative w-full sm:w-64 group">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500 transition-colors duration-200"
                  style={{
                    color: "group-focus-within:oklch(0.544 0.143 262.88)",
                    color: "group-focus-within:#3B82F6",
                  }}
                />
                <Input
                  className="pl-10 w-full text-sm border-gray-200 dark:border-gray-700 transition-all duration-200 text-gray-300 dark:text-gray-700 bg-gray-900 dark:bg-white"
                  style={{
                    borderColor: "focus:oklch(0.544 0.143 262.88)",
                    borderColor: "focus:#3B82F6",
                  }}
                  placeholder="Search problems..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Problems Display */}
          {isLoading ? (
            <div className="flex justify-center items-center h-60">
              <div className="flex flex-col items-center gap-4">
                <div
                  className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2"
                  style={{
                    borderTopColor: "#3B82F6",
                    borderBottomColor: "#3B82F6",
                    borderTopColor: "oklch(0.544 0.143 262.88)",
                    borderBottomColor: "oklch(0.544 0.143 262.88)",
                  }}
                ></div>
                <p className="text-gray-400 dark:text-gray-500">Loading problems...</p>
              </div>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {currentItems.length > 0 ? (
                  currentItems.map((problem, index) => (
                    <Card
                      key={problem.id}
                      className="border-1 cursor-pointer bg-gray-900 dark:bg-white overflow-hidden"
                      onClick={() => openProblemLink(problem.problemUrl)}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <CardContent>
                        <div className="flex flex-col sm:flex-row justify-between gap-6">
                          <div className="space-y-2.5 flex-1">
                            <div className="flex items-center text-xs text-gray-400 dark:text-gray-500">
                              <Calendar className="h-3 w-3 mr-1" /> {problem.date}
                            </div>
                            <h3 className="text-lg font-bold text-gray-100 dark:text-gray-900">
                              {problem.title}
                            </h3>
                            <p className="text-gray-300 dark:text-gray-600 text-sm line-clamp-1">
                              {problem.description}
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {problem.categories.map((cat) => (
                                <Badge
                                  key={cat}
                                  variant="secondary"
                                  className="text-xs py-0.5 px-2 bg-gray-800 dark:bg-gray-200 text-gray-200 dark:text-gray-800"
                                >
                                  {cat}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex flex-wrap gap-3 text-xs">
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 ${getDifficultyStyle(
                                  problem.difficulty
                                )}`}
                              >
                                {getDifficultyIcon(problem.difficulty)}
                                {problem.difficulty}
                              </span>
                              <span className="flex items-center gap-1.5 bg-gray-800 dark:bg-gray-200 px-2 py-1 rounded-full text-gray-200 dark:text-gray-800">
                                <Code
                                  className="h-3 w-3"
                                  style={{
                                    color: "#3B82F6",
                                    color: "oklch(0.544 0.143 262.88)",
                                  }}
                                />
                                {problem.platform}
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2 self-start sm:self-center min-w-[100px]">
                            {problem.status === "Solved" ? (
                              <Badge
                                variant="outline"
                                className="bg-emerald-900/5 dark:bg-emerald-100 text-emerald-400 dark:text-emerald-800 text-xs py-1 px-2 w-full text-center flex items-center justify-center border-emerald-200 dark:border-emerald-800"
                              >
                                <CheckCircle className="h-3 w-3 mr-1" /> Solved
                              </Badge>
                            ) : (
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-xs py-1 px-2 w-full transition-colors duration-200 text-gray-300 dark:text-gray-700"
                                style={{
                                  borderColor: "oklch(0.544 0.143 262.88)",
                                  borderColor: "#3B82F6",
                                  "&:hover": {
                                    backgroundColor: "oklch(0.544 0.143 262.88)/0.1",
                                    color: "oklch(0.544 0.143 262.88)",
                                  },
                                }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  markSolved(problem.id);
                                }}
                              >
                                Mark Solved
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card className="shadow-lg border-0 bg-gray-900 dark:bg-white">
                    <CardContent className="p-12 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <Search className="h-12 w-12 text-gray-300 dark:text-gray-600" />
                        <p className="text-gray-400 dark:text-gray-500 text-lg">No problems found</p>
                        <p className="text-gray-400 dark:text-gray-500 text-sm">Try adjusting your filters</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="text-sm py-2 px-6 w-full sm:w-auto border-gray-200 dark:border-gray-700 disabled:opacity-50 text-gray-300 dark:text-gray-700"
                    style={{
                      "&:hover": {
                        borderColor: "oklch(0.544 0.143 262.88)",
                        borderColor: "#3B82F6",
                      },
                    }}
                  >
                    <ChevronUp className="h-4 w-4 rotate-90 mr-2" />
                    Previous
                  </Button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        onClick={() => setCurrentPage(page)}
                        className={`w-8 h-8 p-0 ${
                          currentPage === page
                            ? "text-white"
                            : "border-gray-200 dark:border-gray-700 text-gray-300 dark:text-gray-700"
                        }`}
                        style={{
                          background: currentPage === page ? "oklch(0.544 0.143 262.88)" : "transparent",
                          background: currentPage === page ? "#3B82F6" : "transparent",
                        }}
                      >
                        {page}
                      </Button>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="text-sm py-2 px-6 w-full sm:w-auto border-gray-200 dark:border-gray-700 disabled:opacity-50 text-gray-300 dark:text-gray-700"
                    style={{
                      "&:hover": {
                        borderColor: "oklch(0.544 0.143 262.88)",
                        borderColor: "#3B82F6",
                      },
                    }}
                  >
                    Next
                    <ChevronDown className="h-4 w-4 rotate-90 ml-2" />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Challenges;