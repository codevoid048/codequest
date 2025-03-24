"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Calendar, CheckCircle, Search, Tag, ChevronDown, ChevronUp } from "lucide-react";
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

// Main Challenges Component
const Challenges: React.FC = () => {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [countdown, setCountdown] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });
  const [problemsList, setProblemsList] = useState<Problem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("date");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false); // New state for filter toggle
  const itemsPerPage = 5;

  // Fetch Problems Data
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
      ]);
      setIsLoading(false);
    };
    loadProblems();
  }, []);

  // Countdown Timer Logic
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

  // Memoized Computations
  const dailyProblem = useMemo(
    () =>
      problemsList[new Date().getDate() % (problemsList.length || 1)] ||
      problemsList[0],
    [problemsList]
  );
  const uniqueCategories = useMemo(
    () => [...new Set(problemsList.flatMap((p) => p.categories))],
    [problemsList]
  );
  const difficultyLevels = ["Easy", "Medium", "Hard"];

  const filteredProblems = useMemo(() => {
    let result = problemsList.filter((problem) => {
      const matchesTab =
        activeTab === "all" || problem.status.toLowerCase() === activeTab;
      const matchesDifficulty =
        selectedDifficulties.length === 0 ||
        selectedDifficulties.includes(problem.difficulty);
      const matchesCategory =
        selectedCategories.length === 0 ||
        problem.categories.some((cat) => selectedCategories.includes(cat));
      const matchesSearch =
        !searchTerm ||
        problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        problem.description.toLowerCase().includes(searchTerm.toLowerCase());
      return (
        matchesTab && matchesDifficulty && matchesCategory && matchesSearch
      );
    });

    result.sort((a, b) => {
      switch (sortOption) {
        case "date":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "difficulty":
          return (
            ["Easy", "Medium", "Hard"].indexOf(a.difficulty) -
            ["Easy", "Medium", "Hard"].indexOf(b.difficulty)
          );
        case "status":
          return a.status.localeCompare(b.status);
        default:
          return 0;
      }
    });

    return result;
  }, [
    problemsList,
    activeTab,
    selectedDifficulties,
    selectedCategories,
    searchTerm,
    sortOption,
  ]);

  // Pagination Logic
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = filteredProblems.slice(firstItemIndex, lastItemIndex);
  const totalPages = Math.ceil(filteredProblems.length / itemsPerPage);

  // Event Handlers
  const toggleDifficulty = (difficulty: string) => {
    setSelectedDifficulties((prev) =>
      prev.includes(difficulty)
        ? prev.filter((d) => d !== difficulty)
        : [...prev, difficulty]
    );
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const markSolved = (id: number) => {
    setProblemsList((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "Solved" } : p))
    );
  };

  const getDifficultyStyle = (difficulty: string) => {
    return (
      {
        Easy: "text-emerald-500 bg-emerald-50",
        Medium: "text-amber-500 bg-amber-50",
        Hard: "text-rose-500 bg-rose-50",
      }[difficulty] || ""
    );
  };

  const openProblemLink = (url?: string) => url && window.open(url, "_blank");

  // Render Component
  return (
    <div className="w-full max-w-[1040px] mx-auto px-4 py-5 space-y-8 min-h-screen">
      {/* Problem of the Day Section */}
      <Card className="border shadow-lg">
        <CardContent className="p-1sm:p-2">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
            <h2 className="text-xl sm:text-2xl font-bold">Daily Challenge</h2>
            <div className="flex gap-2 text-base sm:text-lg font-mono">
              <span className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-2 py-1 rounded">
                {countdown.hours}
              </span>
              :
              <span className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-2 py-1 rounded">
                {countdown.minutes}
              </span>
              :
              <span className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-2 py-1 rounded">
                {countdown.seconds}
              </span>
            </div>
          </div>
          {isLoading ? (
            <p className="text-center">Loading...</p>
          ) : (
            <Card
              className="border cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => openProblemLink(dailyProblem?.problemUrl)}
            >
              <CardContent className="p-1 sm:p-2">
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <p className="flex items-center text-xs sm:text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-2" />
                      {new Date().toISOString().split("T")[0]}
                    </p>
                    <h3 className="text-lg sm:text-xl font-bold">{dailyProblem?.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      {dailyProblem?.categories.map((cat) => (
                        <Badge
                          key={cat}
                          variant="secondary"
                          className="text-xs py-1 px-2"
                        >
                          {cat}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button className="self-start sm:self-center text-sm py-2 px-4">
                    Solve Now
                  </Button>
                </div>
                <div className="mt-4 pt-4 border-t flex flex-wrap gap-4 text-xs sm:text-sm">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyStyle(
                      dailyProblem?.difficulty
                    )}`}
                  >
                    {dailyProblem?.difficulty}
                  </span>
                  <span className="flex items-center gap-2">
                    <Tag className="h-4 w-4" /> {dailyProblem?.platform}
                  </span>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* Main Content Layout */}
      <div className="flex flex-col lg:flex-row gap-5">
        {/* Filters Panel */}
        <div className="lg:w-1/4 w-full">
          <div className="lg:hidden mb-4">
            <Button
              variant="outline"
              className="w-full flex justify-between items-center text-sm py-2 px-4"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              Filters {isFilterOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
          <Card className={`shadow-lg ${isFilterOpen ? "block" : "hidden lg:block"}`}>
            <CardContent className="p-4 sm:p-6 space-y-6">
              <div>
                <h3 className="text-base sm:text-lg font-medium mb-3">Difficulty</h3>
                <div className="flex flex-col gap-2">
                  {difficultyLevels.map((level) => (
                    <div key={level} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={level}
                        checked={selectedDifficulties.includes(level)}
                        onChange={() => toggleDifficulty(level)}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600"
                      />
                      <label htmlFor={level} className="text-sm font-medium">
                        {level}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-medium mb-3">Categories</h3>
                <div className="flex flex-col gap-2">
                  {uniqueCategories.map((cat) => (
                    <div key={cat} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={cat}
                        checked={selectedCategories.includes(cat)}
                        onChange={() => toggleCategory(cat)}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600"
                      />
                      <label htmlFor={cat} className="text-sm font-medium">
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
                  className="text-sm py-2 px-4 w-full sm:w-auto"
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </Button>
              ))}
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  className="pl-10 w-full text-sm"
                  placeholder="Search problems..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                className="w-full sm:w-40 p-2 border rounded text-sm shadow-sm"
              >
                <option value="date">Sort by Date</option>
                <option value="difficulty">Sort by Difficulty</option>
                <option value="status">Sort by Status</option>
              </select>
            </div>
          </div>

          {/* Problems Display */}
          {isLoading ? (
            <Card className="shadow-lg">
              <CardContent className="p-6 text-center">
                Loading problems...
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="space-y-3">
                {currentItems.length > 0 ? (
                  currentItems.map((problem) => (
                    <Card
                      key={problem.id}
                      className="border cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => openProblemLink(problem.problemUrl)}
                    >
                      <CardContent className="p-1 sm:p-2">
                        <div className="flex flex-col sm:flex-row justify-between gap-4">
                          <div className="space-y-2 flex-1">
                            <p className="flex items-center text-xs text-gray-500">
                              <Calendar className="h-3 w-3 mr-1" />{" "}
                              {problem.date}
                            </p>
                            <h3 className="text-base sm:text-lg font-bold">
                              {problem.title}
                            </h3>
                            <div className="flex flex-wrap gap-1">
                              {problem.categories.map((cat) => (
                                <Badge
                                  key={cat}
                                  variant="secondary"
                                  className="text-xs py-0.5 px-1"
                                >
                                  {cat}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex flex-wrap gap-2 text-xs">
                              <span
                                className={`px-1 py-0.5 rounded-full text-xs font-medium ${getDifficultyStyle(
                                  problem.difficulty
                                )}`}
                              >
                                {problem.difficulty}
                              </span>
                              <span className="flex items-center gap-1">
                                <Tag className="h-3 w-3" /> {problem.platform}
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2 self-start sm:self-center min-w-[90px]">
                            {problem.status === "Solved" ? (
                              <Badge
                                variant="outline"
                                className="bg-emerald-500/10 text-emerald-500 text-xs py-1 px-2 w-full text-center"
                              >
                                <CheckCircle className="h-3 w-3 mr-1" /> Solved
                              </Badge>
                            ) : (
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-xs py-1 px-2 w-full"
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
                  <Card className="shadow-lg">
                    <CardContent className="p-6 text-center text-gray-500">
                      No problems found
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-4">
                  <Button
                    variant="outline"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="text-sm py-2 px-4 w-full sm:w-auto"
                  >
                    Previous
                  </Button>
                  <span className="self-center text-sm">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="text-sm py-2 px-4 w-full sm:w-auto"
                  >
                    Next
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