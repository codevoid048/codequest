"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import ProblemStatus from '@/lib/solutionStatus'
import axios from "axios";
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
  RefreshCw,
  Lightbulb,
  Search,
  Tag,
} from "lucide-react";
import type React from "react";
import { useEffect, useMemo, useState } from "react";
import { fetchLeetCodeProfile, fetchCodeforcesProfile, slovedChallenges } from "@/platforms/leetcode";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import { postPotdChallenge, solvedChallenges, streak  } from "@/lib/potdchallenge";
interface User {
  leetCode?: { username?: string; solved?: number; rank?: number; rating?: number }
  gfg?: { username?: string; solved?: number; rank?: number; rating?: number }
  codeforces?: { username?: string; solved?: number; rank?: string; rating?: number }
  codechef?: { username?: string; solved?: number; rank?: number; rating?: number }
  profilePicture?: string
  name?: string
  username?: string
  rank?: number
  collegeName?: string
  branch?: string
  RegistrationNumber?: string
  otherLinks?: { platform: string; url: string }[]
  solveChallenges?: Array<unknown>
  potdSolved?: Array<unknown>
  points?: number
  streak?: number
}

// interface User {
//   leetCode?: { username?: string; solved?: number; rank?: number; rating?: number }
//   gfg?: { username?: string; solved?: number; rank?: number; rating?: number }
//   codeforces?: { username?: string; solved?: number; rank?: string; rating?: number }
//   codechef?: { username?: string; solved?: number; rank?: number; rating?: number }
//   profilePicture?: string
//   name?: string
//   username?: string
//   rank?: number
//   collegeName?: string
//   branch?: string
//   RegistrationNumber?: string
//   otherLinks?: { platform: string; url: string }[]
//   solveChallenges?: Array<unknown>
//   potdSolved?: Array<unknown>
//   points?: number
//   streak?: number
// }

interface challenge {
  id: number;
  date: string;
  title: string;
  categories: string[];
  difficulty: "Easy" | "Medium" | "Hard";
  platform: "LeetCode" | "GFG" | "CodeChef" | "Codeforces";
  status: "Solved" | "Unsolved";
  description: string;
  problemUrl?: string;
}

interface ProblemStatusProps {
  problem: {
    id: string;
    status: string;
    createdAt: Date;
  };
  markSolved: (id: string) => void;
  viewSolution: (id: string) => void;
}

// const { user } = useAuth();




type FilterTab = "all" | "solved" | "unsolved";
type SortOption = "date" | "difficulty" | "status";

const Challenges: React.FC = () => {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [countdown, setCountdown] = useState({ hours: "00", minutes: "00", seconds: "00" });
  const [problemsList, setProblemsList] = useState<challenge[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("date");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSolved, setIsSolved] = useState(false);
  const [User, setUser] = useState<User | null>(null);
  const itemsPerPage = 5;
  const { user } = useAuth() ;


  function convertTimestampToDate(timestamp: number) {
    const date = new Date(timestamp * 1000); 
    return date.toISOString().replace("T", " ").split(".")[0] + " UTC";
}

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/challenges');
        if (res.data && Array.isArray(res.data.challenges)) {
          const data = res.data.challenges.map((challenge: any) => ({
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
            status: "Unsolved",
            description: challenge.description,
            problemUrl: challenge.problemLink,
          }));
          setProblemsList(data);
          // console.log("Problems List:", problemsList);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Failed to fetch problems", error);
      }
    };
    fetchProblems();
    // console.log("user",user);

  }, []);
  
  useEffect(() => {
      const updatePlatforms = async () => {
        console.log("updated platforms");
        const leetcode = await axios.post('http://localhost:5000/platforms/leetcode',{username:"saiganeshambati"});
        const codeforces = await axios.post('http://localhost:5000/platforms/codeforces',{username:"saiganeshambati000"});
        const codechef = await axios.post('http://localhost:5000/platforms/codechef',{username:"saiganesh999"});
        const gfg = await axios.post('http://localhost:5000/platforms/gfg',{username:"saiganeshafb97"});
        toast.success("Data updated successfully");
      }
    const fetchUserData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/profile/getUser", {
          params: {
            userId: user?._id, // sending only the userId
          },
        });
        console.log("Complete user data:", res.data);
        setUser(res.data.user); // or setUserData if you rename the state
      } catch (error) {
        console.error("Failed to fetch complete user data", error);
      }
    };
  
    if (user) {
      fetchUserData();
      updatePlatforms();
    }
  }, [user]);

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

  // const dailyProblem = useMemo(
  //   () => problemsList[new Date().getDate() % (problemsList.length || 1)] || problemsList[0],
  //   [problemsList]
  // );
  const dailyProblem = useMemo(() => {
    if (problemsList.length === 0) return null; // Handle empty list

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize time to midnight
  
    const todayProblem = problemsList.find((problem) => {
      const problemDate = new Date(problem.date);
      problemDate.setHours(0, 0, 0, 0);
      return problemDate.getTime() === today.getTime();
    });

    return todayProblem || problemsList[0]; // Default to first problem if no match found
  }, [problemsList]);

  // console.log("dailyProblem",dailyProblem);

  const uniqueCategories = useMemo(() => [...new Set(problemsList.flatMap((p) => p.categories))], [problemsList]);
  const difficultyLevels = ["Easy", "Medium", "Hard"];

  const filteredProblems = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const result = problemsList.filter((problem) => {
      const problemDate = new Date(problem.date);
      problemDate.setHours(0, 0, 0, 0); // Normalize time

      const isPastOrToday = problemDate <= today;
      const matchesTab = activeTab === "all" || problem.status.toLowerCase() === activeTab;
      const matchesDifficulty = selectedDifficulties.length === 0 || selectedDifficulties.includes(problem.difficulty);
      const matchesCategory =
        selectedCategories.length === 0 || problem.categories.some((cat) => selectedCategories.includes(cat));
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

  useEffect(() => {
    console.log(User?.leetCode?.username)
    const checkIfProblemSolved = async () => {
      try {
        if(dailyProblem?.platform === "LeetCode"){
        const leetCodeData = await fetchLeetCodeProfile(`${User?.leetCode?.username}`);
        if (leetCodeData?.recentSubmissionList) {
          const solvedProblem = leetCodeData.recentSubmissionList.find((submission: { title: string; timestamp: string ;statusDisplay:string}) => {
            const submissionDate = new Date(parseInt(submission.timestamp) * 1000).toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" }).split('/').reverse().join('-');
            const today = new Date().toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" }).split('/').reverse().join('-');
            
            return submission.title === dailyProblem?.title && submission.statusDisplay === "Accepted" && submissionDate === today;
          });

          
          if (solvedProblem) {
            setIsSolved(true);
            postPotdChallenge();
            streak();
            solvedChallenges(user?.username);
            return;
          }
        }
      }
      else if(dailyProblem?.platform === "Codeforces"){
        const codeforcesData = await fetchCodeforcesProfile(`${User?.codeforces?.username}`);
        if (codeforcesData?.result) {
          const solvedProblem = codeforcesData.result.find((submission: { creationTimeSeconds: number; problem: { name: string } ;verdict:string}) => {
            const submissionDate = new Date(submission.creationTimeSeconds * 1000).toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" }).split('/').reverse().join('-');
  
            const today = new Date().toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" }).split('/').reverse().join('-');
            return submission.problem.name === dailyProblem?.title && submission.verdict === "OK" && 
              submissionDate === today;
          });

          if (solvedProblem) {
            setIsSolved(true);
            postPotdChallenge();
            streak();
            solvedChallenges();
            return;
          }
        }
      }
      } catch (error) {
        console.error("Error checking problem status:", error);
      }
    };

    checkIfProblemSolved();
  }, [dailyProblem]);

  const handleRerender = () => {
    window.location.reload();
  };

  return (
    <div className="w-full max-w-[1040px] mx-auto px-4 py-5 space-y-8 min-h-screen">
      {/* Problem of the Day Section */}
      <Card className="border-1 shadow-xl bg-card rounded-xl overflow-hidden relative">
        <CardContent className="p-1 sm:p-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center">
              <div className="mr-3 bg-primary/10 dark:bg-primary/20 p-2 rounded-lg">
                <Flame className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                Daily Challenge
              </h2>
            </div>
            <Button
              variant="outline"
              className="flex items-center gap-2 text-sm py-2 px-4 border-border text-foreground"
              onClick={handleRerender}
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
            {/* New components: Streak and POTD Solved */}
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
                <span className="font-semibold">{user?.potdSolved?.length} solved</span>
              </div>
            </div>
          ) : null}

            <div className="flex items-center gap-1 text-base sm:text-lg font-mono bg-secondary dark:bg-muted px-3 py-2 rounded-lg">
              <Clock className="h-5 w-5 mr-2 text-primary" />
              <span className="bg-card text-foreground px-3 py-1 rounded shadow-sm">
                {countdown.hours}
              </span>
              <span className="text-muted-foreground px-1">:</span>
              <span className="bg-card text-foreground px-3 py-1 rounded shadow-sm">
                {countdown.minutes}
              </span>
              <span className="text-muted-foreground px-1">:</span>
              <span className="bg-card text-foreground px-3 py-1 rounded shadow-sm">
                {countdown.seconds}
              </span>
            </div>
          </div>
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <Card
              className="border-1 cursor-pointer hover:shadow-lg bg-card rounded-xl overflow-hidden mt-4"
              onClick={() => openProblemLink(dailyProblem?.problemUrl)}
            >
              <CardContent>
                <div className="flex flex-col sm:flex-row justify-between gap-6">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2" />
                      {dailyProblem?.date}  
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                      {dailyProblem?.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      {dailyProblem?.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {dailyProblem?.categories.map((cat) => (
                        <Badge
                          key={cat}
                          variant="secondary"
                          className="text-xs py-1 px-2 bg-secondary dark:bg-muted text-secondary-foreground dark:text-muted-foreground"
                        >
                          {cat}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 justify-center">
                    {isSolved ? (
                      <Button className="bg-green-600 hover:bg-green-700 text-primary-foreground border-0 shadow-md hover:shadow-lg transition-all duration-300 px-6">
                        Solved
                      </Button>
                    ) : (
                      <Button className="bg-primary hover:bg-primary/90 text-primary-foreground border-0 shadow-md hover:shadow-lg transition-all duration-300 px-6">
                        Solve Now
                      </Button>
                    )}
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-border flex flex-wrap gap-4 text-sm">
                  {/* <span
                    className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 ${getDifficultyStyle(
                      dailyProblem?.difficulty
                    )}`}
                  >
                    {getDifficultyIcon(dailyProblem?.difficulty)}
                    {dailyProblem?.difficulty}
                  </span> */}
                  <span className="flex items-center gap-2 bg-secondary dark:bg-muted px-3 py-1 rounded-full text-secondary-foreground dark:text-muted-foreground">
                    <Code className="h-4 w-4 text-primary" />
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
              className="w-full flex justify-between items-center text-sm py-2 px-4 border-border text-foreground"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <span className="flex items-center">
                <Filter className="h-4 w-4 mr-2" /> Filters
              </span>
              {isFilterOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
          <Card
            className={`shadow-lg border-0 bg-card ${isFilterOpen ? "block" : "hidden lg:block"}`}
          >
            <CardContent className="p-6 space-y-6 ">
              <div>
                <h3 className="text-lg font-medium mb-4 flex items-center text-foreground">
                  <Flame className="h-5 w-5 mr-2 text-amber-400 dark:text-amber-900" /> Difficulty
                </h3>
                <div className="flex flex-col gap-3">
                  {difficultyLevels.map((level) => (
                    <div key={level} className="flex items-center gap-3">
                      <button
                        onClick={() => toggleDifficulty(level)}
                        className={`flex h-5 w-5 items-center justify-center rounded-md border ${selectedDifficulties.includes(level)
                          ? "bg-primary border-primary"
                          : "border-border"
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
                        className={`flex h-5 w-5 items-center justify-center rounded-md border ${selectedCategories.includes(cat)
                          ? "bg-primary border-primary"
                          : "border-border"
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

        {/* Problems Listing */}
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

          {/* Problems Display */}
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
                      onClick={() => openProblemLink(problem.problemUrl)}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <CardContent>
                        <div className="flex flex-col sm:flex-row justify-between gap-6">
                          <div className="space-y-2 flex-1">
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Calendar className="h-3 w-3 mr-1" /> {problem.date}
                            </div>
                            <h3 className="text-lg font-bold text-foreground">
                              {problem.title}
                            </h3>
                            <p className="text-muted-foreground text-sm line-clamp-1">
                              {problem.description}
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {problem.categories.map((cat) => (
                                <Badge
                                  key={cat}
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
                              id: problem.id,
                              status: problem.status as "Solved" | "Unsolved",
                              createdAt: new Date(problem.date)
                            }}
                            markSolved={markSolved}
                            viewSolution={(id) => {
                              // Implement your view solution logic
                              // console.log(`Viewing solution for problem ${id}`);
                            }}
                          />

                          {/* <div className="flex flex-col gap-2 self-start sm:self-center min-w-[100px]">
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
                                className="text-xs py-1 px-2 w-full border-primary hover:bg-primary/10 hover:text-primary transition-colors duration-200 text-foreground"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  markSolved(problem.id);
                                }}
                              >
                                Mark Solved
                              </Button>
                            )}
                          </div> */}
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

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="text-sm py-2 px-6 w-full sm:w-auto border-border hover:border-primary disabled:opacity-50 text-foreground"
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
                        className={`w-8 h-8 p-0 ${currentPage === page
                          ? "bg-primary text-primary-foreground"
                          : "border-border text-foreground"
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