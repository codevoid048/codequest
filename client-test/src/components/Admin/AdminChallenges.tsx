import { AnimatePresence, motion } from "framer-motion";
import {
  Calendar,
  ChevronDown,
  Code,
  Filter,
  RefreshCw,
  Search,
  SlidersHorizontal,
  Zap,
} from "lucide-react";
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useAdminStore } from "@/context/AdminContext";

// Interfaces
interface Challenge {
  _id: string;
  title: string;
  createdAt: string;
  category: string[];
  difficulty: "Easy" | "Medium" | "Hard";
  platform: string;
  description: string;
  problemLink: string;
  solvedUsers: string[]; // Array of User ObjectIds
  solvedPercentage?: number;
  solvedUsersCount?: number;
  totalUsers?: number;
}

interface Statistics {
  totalProblems: number;
  averageSolveRate: number;
  topPerformer: string;
  lowestPerformer: string;
}

// Button Component
const Button = memo(
  ({
    children,
    onClick,
    className = "",
    variant = "default",
    disabled = false,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    variant?: "default" | "outline";
    disabled?: boolean;
  }) => {
    const baseStyles =
      "px-4 py-2 rounded-md font-medium transition-all duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500";
    const variantStyles =
      variant === "default"
        ? "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white"
        : "bg-transparent border border-gray-600 dark:border-gray-300 hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-gray-900";
    const disabledStyles = disabled
      ? "opacity-50 cursor-not-allowed"
      : "cursor-pointer";

    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`${baseStyles} ${variantStyles} ${disabledStyles} ${className}`}
        aria-disabled={disabled}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

// Badge Component
const Badge = memo(
  ({
    children,
    className = "",
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}
      role="status"
    >
      {children}
    </span>
  )
);
Badge.displayName = "Badge";

// Input Component
const Input = memo(
  ({
    placeholder,
    value,
    onChange,
    className = "",
  }: {
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
  }) => (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full px-3 py-2 border border-gray-600 dark:border-gray-300 rounded-md bg-gray-800 dark:bg-white text-white dark:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      aria-label={placeholder || "Input field"}
    />
  )
);
Input.displayName = "Input";

// Dropdown Component
const Dropdown = memo(
  ({
    trigger,
    items,
  }: {
    trigger: React.ReactNode;
    items: { label: string; onClick: () => void }[];
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
      <div className="relative" ref={dropdownRef}>
        <div
          onClick={() => setIsOpen(!isOpen)}
          role="button"
          aria-haspopup="true"
          aria-expanded={isOpen}
          tabIndex={0}
        >
          {trigger}
        </div>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-48 bg-gray-800 dark:bg-white rounded-md shadow-lg z-10 border border-gray-700 dark:border-gray-200"
            role="menu"
          >
            <div className="py-1">
              {items.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    item.onClick();
                    setIsOpen(false);
                  }}
                  className="px-4 py-2 text-sm text-gray-200 dark:text-gray-700 hover:bg-gray-700 dark:hover:bg-gray-100 cursor-pointer"
                  role="menuitem"
                  tabIndex={0}
                >
                  {item.label}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    );
  }
);
Dropdown.displayName = "Dropdown";

// Animated Counter Component
const AnimatedCounter = memo(
  ({ value, duration = 0.5 }: { value: number; duration?: number }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      let start = 0;
      const end = value;
      const totalMilSecDur = duration * 1000;
      const incrementTime = totalMilSecDur / (end || 1);
      
      if (end === 0) {
        setCount(0);
        return;
      }
      
      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start >= end) clearInterval(timer);
      }, incrementTime);
      
      return () => clearInterval(timer);
    }, [value, duration]);

    return <span>{count}</span>;
  }
);
AnimatedCounter.displayName = "AnimatedCounter";

// Skeleton Loader Component
const SkeletonLoader = memo(() => (
  <div className="animate-pulse" aria-hidden="true">
    <div className="h-2 bg-gray-700 dark:bg-gray-300 rounded-t-lg w-full"></div>
    <div className="p-6 space-y-4">
      <div className="h-6 bg-gray-700 dark:bg-gray-300 rounded w-3/4"></div>
      <div className="flex justify-between">
        <div className="h-4 bg-gray-700 dark:bg-gray-300 rounded w-1/4"></div>
        <div className="h-4 bg-gray-700 dark:bg-gray-300 rounded w-1/4"></div>
      </div>
    </div>
  </div>
));
SkeletonLoader.displayName = "SkeletonLoader";

// Problem Card Component
const ProblemCard = memo(
  ({ challenge, isToday = false }: { challenge: Challenge; isToday?: boolean }) => {
    const [isLoading, setIsLoading] = useState(false);
    const { fetchChallenges } = useAdminStore();

    const handleUpdatePOTD = useCallback(async () => {
      setIsLoading(true);
      try {
        // In a real implementation, make an API call here
        // Simulation for the demo
        await new Promise(resolve => setTimeout(resolve, 1000));
        await fetchChallenges(); // Refresh challenges after update
      } catch (error) {
        console.error("Error updating POTD:", error);
      } finally {
        setIsLoading(false);
      }
    }, [fetchChallenges]);

    const getDifficultyColor = useCallback((difficulty: string): string => {
      switch (difficulty.toLowerCase()) {
        case "easy":
          return "bg-emerald-500/30 text-emerald-500 border-emerald-500/60 dark:bg-emerald-500/20 dark:border-emerald-500/50";
        case "medium":
          return "bg-amber-500/30 text-amber-500 border-amber-500/60 dark:bg-amber-500/20 dark:border-amber-500/50";
        case "hard":
          return "bg-rose-500/30 text-rose-500 border-rose-500/60 dark:bg-rose-500/20 dark:border-rose-500/50";
        default:
          return "bg-gray-500/30 text-gray-500 border-gray-500/60 dark:bg-gray-500/20 dark:border-gray-500/50";
      }
    }, []);

    const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    };

    return (
      <>
        <div className="overflow-hidden">
          <div className="h-1 rounded-lg overflow-hidden">
            <div
              style={{ width: `${challenge.solvedPercentage}%` }}
              className="h-1 bg-blue-600 dark:bg-blue-500"
              aria-label={`${challenge.solvedPercentage}% solved`}
            />
          </div>
        </div>

        <div className="mb-5 bg-gray-800 dark:bg-white shadow-lg overflow-hidden border border-gray-700 dark:border-gray-200 rounded-lg">
          <div className="p-6 mx-[0.5px] bg-gray-800 dark:bg-white rounded-b-lg">
            {isToday && (
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div className="flex items-center">
                  <Zap className="w-5 h-5 text-yellow-500 mr-2" />
                  <h2 className="text-xl font-bold text-white dark:text-gray-900">
                    Problem of the Day
                  </h2>
                </div>
                <Button onClick={handleUpdatePOTD} disabled={isLoading}>
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white dark:border-gray-900 mr-2"></div>
                      Updating...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Update POTD
                    </div>
                  )}
                </Button>
              </div>
            )}
            {isLoading ? (
              <SkeletonLoader />
            ) : (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white dark:text-gray-900 group-hover:text-blue-500 transition-colors">
                  {challenge.title}
                </h3>

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                  {/* Left Side: Difficulty, Date, and Tags */}
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge className={`${getDifficultyColor(challenge.difficulty)}`}>
                        {challenge.difficulty}
                      </Badge>
                      <span className="text-sm text-gray-400 dark:text-gray-500">
                        {formatDate(challenge.createdAt)}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {Array.isArray(challenge.category) ? (
                        challenge.category.map((tag, index) => (
                          <Badge
                            key={`${tag}-${index}`}
                            className="bg-blue-900/30 dark:bg-blue-100/50 text-blue-400 dark:text-blue-600 border-blue-500/30"
                          >
                            {tag}
                          </Badge>
                        ))
                      ) : (
                        <Badge
                          className="bg-blue-900/30 dark:bg-blue-100/50 text-blue-400 dark:text-blue-600 border-blue-500/30"
                        >
                          {challenge.category}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Right Side: Solved Statistics */}
                  <div className="flex flex-col items-end">
                    <div className="bg-gray-700 dark:bg-gray-100 px-3 py-1 rounded-full">
                      <span className="text-sm font-medium text-white dark:text-gray-900">
                        <AnimatedCounter value={challenge.solvedUsersCount || 0} /> /{" "}
                        {challenge.totalUsers || 0} solved
                      </span>
                    </div>
                    <span className="text-sm font-medium text-blue-400 dark:text-blue-600 mt-1">
                      {challenge.solvedPercentage || 0}%
                    </span>
                  </div>
                </div>
                
                {/* Platform info */}
                <div className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500">
                  <Code className="h-4 w-4" />
                  {challenge.platform}
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
);
ProblemCard.displayName = "ProblemCard";

// Stat Card Component
const StatCard = memo(
  ({
    title,
    value,
    icon,
  }: {
    title: string;
    value: string | number;
    icon: React.ReactNode;
  }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gray-800 dark:bg-white p-6 rounded-lg shadow-md border border-gray-700 dark:border-gray-200 transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400 dark:text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-white dark:text-gray-900 mt-1">
            {typeof value === "number" ? (
              <AnimatedCounter value={value} />
            ) : (
              value
            )}
            {typeof value === "number" && title.includes("Rate") && "%"}
          </p>
        </div>
        <div className="p-3 bg-blue-900/30 dark:bg-blue-100 rounded-full">
          {icon}
        </div>
      </div>
    </motion.div>
  )
);
StatCard.displayName = "StatCard";

// Main AdminChallenges Component
const AdminChallenges: React.FC = () => {
  const { challenges: storeRawChallenges, fetchChallenges, loading: storeLoading } = useAdminStore();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [processedChallenges, setProcessedChallenges] = useState<Challenge[]>([]);
  const [filteredChallenges, setFilteredChallenges] = useState<Challenge[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterDifficulty, setFilterDifficulty] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("date");
  const [statistics, setStatistics] = useState<Statistics>({
    totalProblems: 0,
    averageSolveRate: 0,
    topPerformer: "",
    lowestPerformer: "",
  });

  // Fetch challenge data from the store
  useEffect(() => {
    const loadChallenges = async () => {
      setIsLoading(true);
      try {
        await fetchChallenges();
      } catch (error) {
        console.error("Failed to fetch challenges:", error);
      } finally {
        // Don't set isLoading to false here - let the storeRawChallenges effect handle that
      }
    };

    loadChallenges();
  }, [fetchChallenges]);

  // Process challenges when store data changes
  useEffect(() => {
    if (storeRawChallenges.length > 0) {
      const totalUsers = 100; // Fallback to 100 if count is not available
      
      const processedData = storeRawChallenges.map((challenge) => {
        const solvedUsersCount = challenge.solvedUsers?.length || 0;
        const solvedPercentage = totalUsers > 0 ? Math.round((solvedUsersCount / totalUsers) * 100) : 0;

        // Ensure category is always an array for consistency
        const categoryArray = Array.isArray(challenge.category) 
          ? challenge.category 
          : challenge.category ? [challenge.category] : [];

        return {
          _id: challenge._id,
          title: challenge.title,
          createdAt: challenge.createdAt,
          category: categoryArray,
          difficulty: challenge.difficulty as "Easy" | "Medium" | "Hard",
          platform: challenge.platform || "Unknown",
          description: challenge.description || "",
          problemLink: challenge.problemLink || "#",
          solvedUsers: challenge.solvedUsers || [],
          solvedUsersCount,
          totalUsers,
          solvedPercentage,
        };
      });

      setProcessedChallenges(processedData);
      setFilteredChallenges(processedData);
      calculateStatistics(processedData);
      setIsLoading(false);
    } else if (!storeLoading) {
      // If we're not loading and have no challenges, ensure we're not showing loading state
      setIsLoading(false);
    }
  }, [storeRawChallenges, storeLoading]);

  // Calculate statistics based on challenge data
  const calculateStatistics = useCallback((challengesData: Challenge[]) => {
    if (challengesData.length === 0) return;

    const totalProblems = challengesData.length;

    // Calculate average solve rate
    const totalSolveRate = challengesData.reduce((sum, challenge) => {
      return sum + (challenge.solvedPercentage || 0);
    }, 0);
    const averageSolveRate = totalProblems > 0 ? Math.round(totalSolveRate / totalProblems) : 0;

    // Find category performance
    const categoryPerformance: Record<string, { count: number; totalRate: number }> = {};

    challengesData.forEach((challenge) => {
      const categories = Array.isArray(challenge.category) 
        ? challenge.category 
        : [challenge.category];
        
      categories.forEach((cat) => {
        if (!cat) return; // Skip empty categories
        
        if (!categoryPerformance[cat]) {
          categoryPerformance[cat] = { count: 0, totalRate: 0 };
        }
        categoryPerformance[cat].count += 1;
        categoryPerformance[cat].totalRate += challenge.solvedPercentage || 0;
      });
    });

    let topPerformer = "";
    let topPerformanceRate = 0;
    let lowestPerformer = "";
    let lowestPerformanceRate = 100;

    Object.entries(categoryPerformance).forEach(([category, data]) => {
      if (data.count === 0) return; // Skip if no challenges in this category
      
      const avgRate = data.totalRate / data.count;
      if (avgRate > topPerformanceRate) {
        topPerformanceRate = avgRate;
        topPerformer = category;
      }
      if (avgRate < lowestPerformanceRate && data.count > 1) {
        lowestPerformanceRate = avgRate;
        lowestPerformer = category;
      }
    });

    setStatistics({
      totalProblems,
      averageSolveRate,
      topPerformer,
      lowestPerformer,
    });
  }, []);

  // Get today's challenge
  const todayChallenge = useMemo(() => {
    if (processedChallenges.length === 0) return null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Find challenge created today or the most recent one
    const todaysChallenge = processedChallenges.find((challenge) => {
      const challengeDate = new Date(challenge.createdAt);
      challengeDate.setHours(0, 0, 0, 0);
      return challengeDate.getTime() === today.getTime();
    });

    return todaysChallenge || processedChallenges[0]; // Return today's challenge or the most recent one
  }, [processedChallenges]);

  // Filter and sort challenges
  useEffect(() => {
    let filtered = [...processedChallenges];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (challenge) =>
          challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          challenge.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by difficulty
    if (filterDifficulty !== "all") {
      filtered = filtered.filter(
        (challenge) =>
          challenge.difficulty.toLowerCase() === filterDifficulty.toLowerCase()
      );
    }

    // Sort challenges
    filtered = filtered.sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "title":
          return a.title.localeCompare(b.title);
        case "difficulty": {
          const difficultyOrder = { Easy: 1, Medium: 2, Hard: 3 };
          return (
            difficultyOrder[a.difficulty as keyof typeof difficultyOrder] -
            difficultyOrder[b.difficulty as keyof typeof difficultyOrder]
          );
        }
        case "completion":
          return (b.solvedPercentage || 0) - (a.solvedPercentage || 0);
        default:
          return 0;
      }
    });

    setFilteredChallenges(filtered);
  }, [processedChallenges, searchQuery, filterDifficulty, sortBy]);

  // Handle add new problem navigation
  const handleAddNewProblem = () => {
    // In a real app, you would navigate to a new problem creation page
    console.log("Navigating to add new problem page");
    // Example: router.push('/admin/challenges/new');
  };

  return (
    <div className="container mx-auto p-4 md:p-6">
      <h1 className="text-3xl font-bold text-white dark:text-gray-900 mb-8">
        Challenges Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total Problems"
          value={statistics.totalProblems}
          icon={<Calendar className="h-6 w-6 text-blue-500" />}
        />
        <StatCard
          title="Average Solve Rate"
          value={statistics.averageSolveRate}
          icon={<SlidersHorizontal className="h-6 w-6 text-blue-500" />}
        />
        <StatCard
          title="Top Performer"
          value={statistics.topPerformer || "N/A"}
          icon={<Zap className="h-6 w-6 text-blue-500" />}
        />
        <StatCard
          title="Needs Improvement"
          value={statistics.lowestPerformer || "N/A"}
          icon={<ChevronDown className="h-6 w-6 text-blue-500" />}
        />
      </div>

      {isLoading ? (
        <div className="mb-5 bg-gray-800 dark:bg-white shadow-lg overflow-hidden border border-gray-700 dark:border-gray-200 rounded-lg p-6">
          <SkeletonLoader />
        </div>
      ) : (
        todayChallenge && <ProblemCard challenge={todayChallenge} isToday={true} />
      )}

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search problems..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Dropdown
            trigger={
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                {filterDifficulty === "all"
                  ? "All Difficulties"
                  : filterDifficulty.charAt(0).toUpperCase() + filterDifficulty.slice(1)}
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            }
            items={[
              {
                label: "All Difficulties",
                onClick: () => setFilterDifficulty("all"),
              },
              { label: "Easy", onClick: () => setFilterDifficulty("easy") },
              { label: "Medium", onClick: () => setFilterDifficulty("medium") },
              { label: "Hard", onClick: () => setFilterDifficulty("hard") },
            ]}
          />
          <Dropdown
            trigger={
              <Button variant="outline" className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                {sortBy === "date" ? "Date" : 
                 sortBy === "title" ? "Title" : 
                 sortBy === "difficulty" ? "Difficulty" : "Completion"}
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            }
            items={[
              { label: "Date", onClick: () => setSortBy("date") },
              { label: "Title", onClick: () => setSortBy("title") },
              { label: "Difficulty", onClick: () => setSortBy("difficulty") },
              { label: "Completion", onClick: () => setSortBy("completion") },
            ]}
          />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-white dark:text-gray-900 mb-4 flex items-center">
          <Calendar className="mr-2 h-5 w-5" />
          Previous Problems
          <Badge className="ml-3 bg-blue-600 dark:bg-blue-500 text-white">
            {filteredChallenges.length}
          </Badge>
        </h2>

        <AnimatePresence>
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="mb-5 bg-gray-800 dark:bg-white shadow-lg overflow-hidden border border-gray-700 dark:border-gray-200 rounded-lg p-6">
                  <SkeletonLoader />
                </div>
              ))}
            </div>
          ) : filteredChallenges.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-10 text-gray-400 dark:text-gray-500"
            >
              No problems match your filters
            </motion.div>
          ) : (
            filteredChallenges.map((challenge) => (
              <motion.div
                key={challenge._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ProblemCard challenge={challenge} />
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Add New Problem Button */}
      <div className="fixed bottom-8 right-8">
        <Button className="rounded-full p-4 shadow-lg" onClick={handleAddNewProblem}>
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add New Problem
          </div>
        </Button>
      </div>
    </div>
  );
};

export default AdminChallenges;