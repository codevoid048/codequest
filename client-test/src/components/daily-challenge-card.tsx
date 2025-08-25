import { useState, useMemo, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Clock, Award, Flame } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import axios from "axios"
export function DailyChallengeCard() {
  interface challenge {
    id: number;
    date: string;
    title: string;
    categories: string[];
    difficulty: "Easy" | "Medium" | "Hard";
    platform: "LeetCode" | "GFG" | "CodeChef";
    status: "Solved" | "Unsolved";
    description: string;
    problemUrl?: string;
    points: number;
  }

  const [problemsList, setProblemsList] = useState<challenge[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/challenges`);

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
            points: challenge.points,
          }));
          setProblemsList(data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Failed to fetch problems", error);
      }
    };
    fetchProblems();

  }, []);
  const dailyProblem = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize time to midnight

    const todayProblem = problemsList.find((problem) => {
      const problemDate = new Date(problem.date);
      problemDate.setHours(0, 0, 0, 0); // Normalize problem date
      return problemDate.getTime() === today.getTime();
    });

    return todayProblem || problemsList[0]; // Default to first problem if no match found
  }, [problemsList]);
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-3xl"
    >
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <Card className="overflow-hidden border-2 transition-all duration-300 hover:border-primary/50 hover:shadow-lg w-full">
          <CardHeader className="bg-muted/50 pb-4 mt-0">
            <div className="flex flex-row items-center gap-3 flex-wrap mt-3">
              <Badge
                variant="outline"
                className="bg-primary/10 text-primary w-fit flex items-center gap-2"
              >
                <Clock className="h-5 w-5" />
                <span className="text-sm sm:text-base">Daily Challenge</span>
              </Badge>

              <span
                className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium flex items-center gap-2 w-fit ${getDifficultyStyle(
                  dailyProblem?.difficulty
                )}`}
              >
                {getDifficultyIcon(dailyProblem?.difficulty)}
                {dailyProblem?.difficulty}
              </span>
            </div>


            <CardTitle className="text-xl sm:text-2xl mt-2 break-words">
              {dailyProblem?.title}
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">{dailyProblem?.date}</CardDescription>
          </CardHeader>

          <CardContent className="pt-0">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {dailyProblem?.categories.map((cat) => (
                  <Badge
                    key={cat}
                    variant="secondary"
                    className="text-xs sm:text-sm py-1 px-2 bg-secondary dark:bg-muted text-secondary-foreground dark:text-muted-foreground"
                  >
                    {cat}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>

          <CardFooter className="bg-muted/30 flex flex-col sm:flex-row gap-3 sm:gap-0 sm:justify-between sm:items-center">
            <p className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
              Solve this challenge to earn {dailyProblem?.points} points
            </p>

            <Button asChild className="group w-full sm:w-auto">
              <a href={dailyProblem?.problemUrl} target="_blank" rel="noopener noreferrer">
                Solve Challenge
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
              </a>
            </Button>
          </CardFooter>
        </Card>
      )}
    </motion.div>
  );
}

export default DailyChallengeCard;