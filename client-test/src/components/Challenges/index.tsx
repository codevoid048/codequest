/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useMemo, useState } from "react";
import axios from "axios";

import ChallengePopup from "./ChallengePopup";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { postPotdChallenge } from "@/lib/potdchallenge";
import ProblemStatus from "@/lib/solutionStatus";
import { fetchCodeforcesProfile, fetchLeetCodeProfile } from "@/platforms/leetcode";
import { Award, Calendar, CheckCircle, ChevronDown, ChevronUp, Clock, Code, Filter, Flame, Lightbulb, RefreshCw, Search, Tag, } from "lucide-react";
import toast from "react-hot-toast";

interface Challenge {
  id: number;
  date: string;
  title: string;
  categories: string[];
  difficulty: "Easy" | "Medium" | "Hard";
  platform: "LeetCode" | "GFG" | "CodeChef" | "Codeforces";
  status: "Solved" | "Unsolved";
  description: string;
  problemUrl?: string;
  _id: string;
}

type FilterTab = "all" | "solved" | "unsolved";

// Main Challenges component
const Challenges: React.FC = () => {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [countdown, setCountdown] = useState({ hours: "00", minutes: "00", seconds: "00" });
  const [problemsList, setProblemsList] = useState<Challenge[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  type SortOption = "date" | "difficulty" | "status";
  const [sortOption, setSortOption] = useState<SortOption>("date");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSolved, setIsSolved] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const itemsPerPage = 5;
  const { user } = useAuth();

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/challenges");
        if (res.data && Array.isArray(res.data.challenges)) {
          const data = res.data.challenges.map((challenge: any) => {
            const isSolved = user?.solveChallenges?.easy.some((item) => item.challenge === challenge._id) ||
              user?.solveChallenges?.medium.some((item) => item.challenge === challenge._id) ||
              user?.solveChallenges?.hard.some((item) => item.challenge === challenge._id);

            return {
              id: challenge._id,
              date: new Date(challenge.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              }),
              title: challenge.title,
              categories: challenge.category,
              difficulty: challenge.difficulty,
              platform: challenge.platform,
              status: isSolved ? "Solved" : "Unsolved",
              description: challenge.description,
              problemUrl: challenge.problemLink,
              _id: challenge._id,
            };
          });
          setProblemsList(data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Failed to fetch challenges:", error);
      }
    };
    fetchProblems();
  }, [user]);

  // Update countdown timer every second
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

  const dailyProblem = useMemo(() => {
    if (problemsList.length === 0) return null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayProblem = problemsList.find((problem) => {
      const problemDate = new Date(problem.date);
      problemDate.setHours(0, 0, 0, 0);
      return problemDate.getTime() === today.getTime();
    });

    return todayProblem || problemsList[0];
  }, [problemsList]);

  const uniqueCategories = useMemo(() => [...new Set(problemsList.flatMap((p) => p.categories))], [problemsList]);

  const difficultyLevels = ["Easy", "Medium", "Hard"];

  // Filter and sort problems based on user selections
  const filteredProblems = useMemo(() => {
    const today = new Date();
    today.setDate(today.getDate() - 1);
    today.setHours(0, 0, 0, 0);
    const result = problemsList.filter((problem) => {
      const problemDate = new Date(problem.date);
      problemDate.setHours(0, 0, 0, 0);

      const isPastOrToday = problemDate <= today;
      const matchesTab = activeTab === "all" || problem.status.toLowerCase() === activeTab;
      const matchesDifficulty = selectedDifficulties.length === 0 || selectedDifficulties.includes(problem.difficulty);
      const matchesCategory =
        selectedCategories.length === 0 || problem.categories.some((cat: string) => selectedCategories.includes(cat));
      const matchesSearch =
        !searchTerm ||
        problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        problem.description.toLowerCase().includes(searchTerm.toLowerCase());
      return isPastOrToday && matchesTab && matchesDifficulty && matchesCategory && matchesSearch;
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

  // Toggle difficulty filter
  const toggleDifficulty = (difficulty: string) => {
    setSelectedDifficulties((prev) =>
      prev.includes(difficulty)
        ? prev.filter((d) => d !== difficulty)
        : [...prev, difficulty]
    );
  };

  // Toggle category filter
  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const checkIfProblemSolved = async () => {
    try {
      console.log("called");
      const dateOnly = new Intl.DateTimeFormat("en-IN", {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      }).format(new Date()).split('/').reverse().join('-');
      if (dailyProblem?.platform === "LeetCode") {
        const leetCodeData = await fetchLeetCodeProfile(`${user?.leetCode?.username}`);
        if (leetCodeData?.recentSubmissionList) {
          const solvedProblem = leetCodeData.recentSubmissionList.find((submission: { title: string; timestamp: string; statusDisplay: string }) => {
            const submissionDate = new Date(parseInt(submission.timestamp) * 1000).toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" }).split('/').reverse().join('-');
            const today = new Date().toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" }).split('/').reverse().join('-');
            return submission.title === dailyProblem?.title && submission.statusDisplay === "Accepted" && submissionDate === today;
          });

          if (solvedProblem) {
            setIsSolved(true);
            postPotdChallenge(user?.username,dailyProblem?._id,dailyProblem?.difficulty);
            localStorage.setItem('potdSolvedDate',dateOnly); // Store today's date
            return true;
          }
          else {
            toast.error("You haven't solved today's problem yet!");
            return false;
          }
        }
      } else if (dailyProblem?.platform === "Codeforces") {
        const codeforcesData = await fetchCodeforcesProfile(`${user?.codeforces?.username}`);
        console.log("called codeforces api", codeforcesData);
        if (codeforcesData?.result) {
          const solvedProblem = codeforcesData.result.find((submission: { creationTimeSeconds: number; problem: { name: string }; verdict: string }) => {
            const submissionDate = new Date(submission.creationTimeSeconds * 1000).toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" }).split('/').reverse().join('-');
            const today = new Date().toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" }).split('/').reverse().join('-');
            return submission.problem.name === dailyProblem?.title && submission.verdict === "OK" &&
              submissionDate === today;
          });

          if (solvedProblem) {
            setIsSolved(true);
            postPotdChallenge(user?.username, dailyProblem?._id, dailyProblem?.difficulty);
            console.log("potd posted successfully");
            localStorage.setItem('potdSolvedDate', dateOnly);
            return true;
          }
          else {
            toast.error("You haven't solved today's problem yet!");
            return false;
          }
        }
      }
    } catch (error) {
      console.error("Error checking challenge status:", error);
    }
  };


  const checkPotdSolved = async () => {
    setIsRefreshing(true);
    try {
      const today = new Intl.DateTimeFormat("en-IN", {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      }).format(new Date()).split('/').reverse().join('-');  
      const storedDate = localStorage.getItem('potdSolvedDate');
      console.log("checkPotdSolved",today);
      if (storedDate === today) {
        toast.success("You have already solved today's problem!");
        setIsSolved(true);
        setIsRefreshing(false);
      } else {
        toast.loading("Checking if you solved today's problem...", { id: "potd-check" });
        await checkIfProblemSolved();
        setIsRefreshing(false);
      }
    } catch (error) {
      console.error("Error checking POTD solved:", error);
    }
  }


  // Styling for difficulty levels
  const getDifficultyStyle = (difficulty: string) => {
    return (
      {
        Easy: "text-emerald-400 bg-emerald-900/50 dark:text-emerald-600 dark:bg-emerald-100",
        Medium: "text-amber-400 bg-amber-900/50 dark:text-amber-600 dark:bg-amber-100",
        Hard: "text-rose-400 bg-rose-900/50 dark:text-rose-600 dark:bg-rose-100",
      }[difficulty] || ""
    );
  };

  // Icons for difficulty levels
  const getDifficultyIcon = (difficulty: string) => {
    return (
      {
        Easy: <Award className="h-4 w-4 text-emerald-400 dark:text-emerald-600" />,
        Medium: <Flame className="h-4 w-4 text-amber-400 dark:text-amber-600" />,
        Hard: <Lightbulb className="h-4 w-4 text-rose-400 dark:text-rose-600" />,
      }[difficulty] || null
    );
  };

  // Open challenge link in a new tab
  const openProblemLink = (url?: string) => url && window.open(url, "_blank");

  // Mark popup as shown for today
  const markPopupShownToday = (problemId: number) => {
    const key = `popup_shown_${problemId}_${new Date().toLocaleDateString("en-GB", { timeZone: "Asia/Kolkata" })}`;
    localStorage.setItem(key, "true");
  };

  return (
    <div className="w-full max-w-[1040px] mx-auto px-4 py-5 space-y-8 min-h-screen">
      {/* Daily Challenge Section */}
      <Card className="rounded-xl overflow-hidden shadow-lg border-1">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center">
              <div className="mr-3 bg-primary/20 dark:bg-primary/30 p-2 rounded-full">
                <Flame className="h-6 w-6 text-primary animate-pulse" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-200 dark:text-gray-800 tracking-tight">
                Daily Challenge
              </h2>
            </div>
            {user ? (
              <div className="flex items-center gap-4 mx-auto sm:mx-0">
                {/* Streak with light bulb icon */}
                <div className="flex items-center gap-2 bg-secondary/50 dark:bg-muted/50 px-3 py-1 rounded-lg">
                  <Lightbulb className="h-5 w-5 text-yellow-500 animate-pulse" />
                  <span className="font-semibold">{user?.streak} day streak</span>
                </div>

                {/* POTD Solved counter */}
                <div className="flex items-center gap-2 bg-secondary/50 dark:bg-muted/50 px-3 py-1 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="font-semibold">{user?.solveChallenges?.easy?.length + user?.solveChallenges?.medium?.length + user?.solveChallenges?.hard?.length} solved</span>
                </div>
              </div>
            ) : null}
            <div className="flex items-center gap-1 text-base sm:text-lg font-mono bg-secondary/60 dark:bg-muted/60 px-3 py-2 rounded-lg">
              <Clock className="h-5 w-5 mr-2 text-primary" />
              <span className="bg-card text-gray-200 dark:text-foreground px-3 py-1 rounded shadow-sm">
                {countdown.hours}
              </span>
              <span className="text-gray-400 dark:text-muted-foreground px-1">:</span>
              <span className="bg-card text-gray-200 dark:text-foreground px-3 py-1 rounded shadow-sm">
                {countdown.minutes}
              </span>
              <span className="text-gray-400 dark:text-muted-foreground px-1">:</span>
              <span className="bg-card text-gray-200 dark:text-foreground px-3 py-1 rounded shadow-sm">
                {countdown.seconds}
              </span>
            </div>
          </div>
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div
              className="mt-6 bg-gray-800 dark:bg-muted rounded-xl p-4 sm:p-6 cursor-pointer"
              onClick={() => openProblemLink(dailyProblem?.problemUrl)}
            >
              <div className="flex flex-col sm:flex-row justify-between gap-6">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center text-sm text-gray-400 dark:text-gray-600">
                    <Calendar className="h-4 w-4 mr-2 text-gray-400 dark:text-gray-600" />
                    {dailyProblem?.date}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-200 dark:text-gray-800 line-clamp-1">
                    {dailyProblem?.title}
                  </h3>
                  <p className="text-gray-400 dark:text-gray-600 text-sm line-clamp-2">
                    {dailyProblem?.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {dailyProblem?.categories.map((cat: boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | Key | null | undefined) => (
                      <Badge
                        key={String(cat)}
                        variant="secondary"
                        className="text-xs py-1 px-2 bg-secondary dark:bg-white text-gray-300 dark:text-gray-700 rounded-full"
                      >
                        {cat}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-4 justify-center">
                  {isSolved ? (
                    <Button className="bg-green-600 hover:bg-green-700 text-white border-0 shadow-md hover:shadow-lg transition-all duration-300 px-6 py-2 rounded-full">
                      Solved
                    </Button>
                  ) : (
                    <Button
                      className="bg-primary hover:bg-primary/90 text-white border-0 shadow-md hover:shadow-lg transition-all duration-300 px-6 py-2 rounded-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        openProblemLink(dailyProblem?.problemUrl);
                      }}
                    >
                      Solve Now
                    </Button>
                  )}
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      checkPotdSolved();
                    }}
                    className="bg-primary/20 hover:bg-primary/30 text-primary border-0 shadow-md hover:shadow-lg transition-all duration-300 rounded-full flex items-center gap-2"
                    disabled={isRefreshing}
                  >
                    <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                    Check Status
                  </Button>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-700 dark:border-gray-300 flex flex-wrap gap-3 text-sm">
                <span className="flex items-center gap-2 bg-secondary dark:bg-white px-2 py-1 rounded-full text-gray-300 dark:text-gray-700">
                  <Code className="h-4 w-4 text-primary" />
                  {dailyProblem?.platform}
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Filters and Challenges List */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters Sidebar */}
        <div className="lg:w-1/4 w-full">
          <div className="lg:hidden mb-4">
            <Button
              variant="outline"
              className="w-full flex justify-between items-center text-sm py-2 px-4 border-border text-foreground"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <span className="flex items-center">
                <Filter className="h-4 w-4 mr-2" /> Filters
              </span>
              {isFilterOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
          <Card className={`shadow-lg border-0 bg-card ${isFilterOpen ? "block" : "hidden lg:block"}`}>
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4 flex items-center text-foreground">
                  <Flame className="h-5 w-5 mr-2 text-amber-400 dark:text-amber-900" /> Difficulty
                </h3>
                <div className="flex flex-col gap-3">
                  {difficultyLevels.map((level) => (
                    <div key={level} className="flex items-center gap-3">
                      <button
                        onClick={() => toggleDifficulty(level)}
                        className={`flex h-5 w-5 items-center justify-center rounded-md border ${selectedDifficulties.includes(level) ? "bg-primary border-primary" : "border-border"
                          }`}
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
                            className="h-3 w-3 text-primary-foreground"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        )}
                      </button>
                      <label
                        htmlFor={level}
                        className="text-sm font-medium flex items-center gap-2 cursor-pointer text-foreground"
                        onClick={() => toggleDifficulty(level)}
                      >
                        {getDifficultyIcon(level)}
                        <span>{level}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-t border-border pt-6">
                <h3 className="text-lg font-medium mb-4 flex items-center text-foreground">
                  <Tag className="h-5 w-5 mr-2 text-primary" /> Categories
                </h3>
                <div className="flex flex-col gap-3">
                  {uniqueCategories.map((cat) => (
                    <div key={cat} className="flex items-center gap-3">
                      <button
                        onClick={() => toggleCategory(cat)}
                        className={`flex h-5 w-5 items-center justify-center rounded-md border ${selectedCategories.includes(cat) ? "bg-primary border-primary" : "border-border"
                          }`}
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
                            className="h-3 w-3 text-primary-foreground"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        )}
                      </button>
                      <label
                        htmlFor={cat}
                        className="text-sm font-medium cursor-pointer text-foreground"
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

        {/* Challenges List */}
        <div className="lg:w-3/4 w-full">
          <div className="space-y-4 mb-6">
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6">
              {["all", "solved", "unsolved"].map((tab) => (
                <Button
                  key={tab}
                  variant={activeTab === tab ? "default" : "outline"}
                  onClick={() => setActiveTab(tab as FilterTab)}
                  className={`text-sm py-2 px-4 w-full sm:w-auto transition-all duration-300 ${activeTab === tab
                    ? "bg-primary hover:bg-primary/90 text-primary-foreground border-0 shadow-md"
                    : "border-border hover:border-primary text-foreground"
                    }`}
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
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors duration-200" />
                <Input
                  className="pl-10 w-full text-sm border-border focus:border-primary transition-all duration-200 text-foreground bg-card"
                  placeholder="Search problems..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-60">
              <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                <p className="text-muted-foreground">Loading problems...</p>
              </div>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {currentItems.length > 0 ? (
                  currentItems.map((problem, index) => (
                    <Card
                      key={problem.id}
                      className="border-1 cursor-pointer bg-card overflow-hidden"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <CardContent>
                        <div className="flex flex-col sm:flex-row justify-between gap-6">
                          <div className="space-y-2 flex-1">
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Calendar className="h-3 w-3 mr-1" /> {problem.date}
                            </div>
                            <h3 className="text-lg font-bold text-foreground">{problem.title}</h3>
                            <p className="text-muted-foreground text-sm line-clamp-1">{problem.description}</p>
                            <div className="flex flex-wrap gap-1.5">
                              {problem.categories.map((cat: boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | Key | null | undefined) => (
                                <Badge
                                  key={String(cat)}
                                  variant="secondary"
                                  className="text-xs py-0.5 px-2 bg-secondary dark:bg-muted text-secondary-foreground dark:text-muted-foreground"
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
                              <span className="flex items-center gap-1.5 bg-secondary dark:bg-muted px-2 py-1 rounded-full text-secondary-foreground dark:text-muted-foreground">
                                <Code className="h-3 w-3 text-primary" />
                                {problem.platform}
                              </span>
                            </div>
                          </div>
                          <ProblemStatus
                            problem={{
                              id: problem.id.toString(),
                              status: problem.status as "Solved" | "Unsolved",
                              createdAt: new Date(problem.date),
                              title: problem.title,
                              description: problem.description,
                              problemUrl: problem.problemUrl
                            }}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card className="shadow-lg border-0 bg-card">
                    <CardContent className="p-12 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <Search className="h-12 w-12 text-muted-foreground" />
                        <p className="text-muted-foreground text-lg">No problems found</p>
                        <p className="text-muted-foreground text-sm">Try adjusting your filters</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {totalPages > 1 && (
                <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="text-sm py-2 px-6 w-full sm:w-auto border-border hover:border-primary disabled:opacity-50 text-foreground"
                  >

                    <ChevronDown className="h-4 w-4 rotate-90 ml-2" />
                    Previous
                  </Button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        onClick={() => setCurrentPage(page)}
                        className={`w-8 h-8 p-0 ${currentPage === page ? "bg-primary text-primary-foreground" : "border-border text-foreground"
                          }`}
                      >
                        {page}
                      </Button>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="text-sm py-2 px-6 w-full sm:w-auto border-border hover:border-primary disabled:opacity-50 text-foreground"
                  >
                    Next
                    <ChevronUp className="h-4 w-4 rotate-90 mr-2" />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {showPopup && (
        <ChallengePopup
          userStreak={user?.streak || 0}
          onClose={() => {
            setShowPopup(false);
            if (dailyProblem) markPopupShownToday(dailyProblem.id);
          }}
        />
      )}
    </div>
  );
};

export default Challenges;
