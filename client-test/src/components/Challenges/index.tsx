"use client"

import type React from "react"
import { useState, useMemo, useEffect } from "react"
import { Calendar, CheckCircle, ExternalLink, Tag, Search } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

interface Problem {
  id: number
  date: string
  title: string
  categories: string[]
  difficulty: "Easy" | "Medium" | "Hard"
  platform: "LeetCode" | "GFG" | "CodeChef"
  status: "Solved" | "Unsolved"
  description: string
  submissions?: number
  successRate?: string
  problemUrl?: string
}

type TabType = "all" | "solved" | "unsolved"
type SortType = "date" | "difficulty" | "status"

const Challenges: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [timeLeft, setTimeLeft] = useState({ hours: "00", minutes: "00", seconds: "00" })
  const [problems, setProblems] = useState<Problem[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<SortType>("date")
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const problemsPerPage = 5

  useEffect(() => {
    const fetchProblems = async () => {
      setIsLoading(true)
      await new Promise(resolve => setTimeout(resolve, 1000))
      setProblems([
        {
          id: 1,
          date: "2025-03-22",
          title: "Stickler Thief II",
          categories: ["Dynamic Programming", "Arrays", "Algorithms"],
          difficulty: "Medium",
          platform: "GFG",
          status: "Unsolved",
          description: "Find the maximum possible stolen value from houses...",
          submissions: 10000,
          successRate: "53.76%",
          problemUrl: "https://www.geeksforgeeks.org/stickler-thief/"
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
          submissions: 245000,
          successRate: "37.98%",
          problemUrl: "https://leetcode.com/problems/two-sum/"
        },
        // ... (rest of your problems)
      ])
      setIsLoading(false)
    }
    fetchProblems()
  }, [])

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date()
      const midnight = new Date(now)
      midnight.setHours(24, 0, 0, 0)

      const timeDiff = midnight.getTime() - now.getTime()
      if (timeDiff <= 0) {
        midnight.setDate(midnight.getDate() + 1)
      }

      const hours = Math.floor(timeDiff / (1000 * 60 * 60))
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000)

      setTimeLeft({
        hours: hours.toString().padStart(2, "0"),
        minutes: minutes.toString().padStart(2, "0"),
        seconds: seconds.toString().padStart(2, "0")
      })
    }

    updateTimer()
    const timer = setInterval(updateTimer, 1000)
    return () => clearInterval(timer)
  }, [])

  const todayProblem = useMemo(() => {
    const dayIndex = new Date().getDate() % (problems.length || 1)
    return problems[dayIndex] || problems[0]
  }, [problems])

  const allCategories = useMemo(() => [...new Set(problems.flatMap((p) => p.categories))], [problems])
  const difficulties = ["Easy", "Medium", "Hard"]

  const filteredProblems = useMemo(() => {
    let filtered = problems.filter((problem) => {
      const matchesTab = activeTab === "all" || problem.status.toLowerCase() === activeTab
      const matchesDifficulty = selectedDifficulty.length === 0 || selectedDifficulty.includes(problem.difficulty)
      const matchesCategories = selectedCategories.length === 0 || problem.categories.some((cat) => selectedCategories.includes(cat))
      const matchesSearch = !searchQuery || 
        problem.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        problem.description.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesTab && matchesDifficulty && matchesCategories && matchesSearch
    })

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        case "difficulty":
          const difficultyOrder = { "Easy": 1, "Medium": 2, "Hard": 3 }
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
        case "status":
          return a.status.localeCompare(b.status)
        default:
          return 0
      }
    })

    return filtered
  }, [problems, activeTab, selectedDifficulty, selectedCategories, searchQuery, sortBy])

  const indexOfLastProblem = currentPage * problemsPerPage
  const indexOfFirstProblem = indexOfLastProblem - problemsPerPage
  const currentProblems = filteredProblems.slice(indexOfFirstProblem, indexOfLastProblem)
  const totalPages = Math.ceil(filteredProblems.length / problemsPerPage)

  const toggleDifficulty = (difficulty: string) => {
    setSelectedDifficulty((prev) =>
      prev.includes(difficulty) ? prev.filter((d) => d !== difficulty) : [...prev, difficulty]
    )
  }

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    )
  }

  const markAsSolved = (problemId: number) => {
    setProblems(prev =>
      prev.map(problem =>
        problem.id === problemId ? { ...problem, status: "Solved" } : problem
      )
    )
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "text-emerald-500 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30"
      case "Medium":
        return "text-amber-500 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30"
      case "Hard":
        return "text-rose-500 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30"
      default:
        return ""
    }
  }

  const handleProblemClick = (url?: string) => {
    if (url) {
      window.open(url, "_blank")
    }
  }

  return (
    <div className="max-w-[100rem] mx-auto px-8 py-12 space-y-12">
      <Card className="bg-background border shadow-sm">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h2 className="text-3xl font-bold">Problem Of The Day</h2>
            </div>
            <div className="flex items-center gap-3 text-2xl font-mono mt-3 md:mt-0">
              <span className="bg-muted px-3 py-1.5 rounded">{timeLeft.hours}</span>
              <span>:</span>
              <span className="bg-muted px-3 py-1.5 rounded">{timeLeft.minutes}</span>
              <span>:</span>
              <span className="bg-muted px-3 py-1.5 rounded">{timeLeft.seconds}</span>
            </div>
          </div>
          {isLoading ? (
            <CardContent className="p-6 text-center">Loading...</CardContent>
          ) : (
            <Card 
              className="mt-6 border cursor-pointer" 
              onClick={() => handleProblemClick(todayProblem?.problemUrl)}
            >
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center text-base text-muted-foreground">
                      <Calendar className="h-5 w-5 mr-2" />
                      {new Date().toISOString().split('T')[0]}
                    </div>
                    <h3 className="text-2xl font-bold">{todayProblem?.title || "Loading..."}</h3>
                    <div className="flex flex-wrap gap-2">
                      {todayProblem?.categories.map((category) => (
                        <Badge key={category} variant="secondary" className="font-normal text-sm py-1 px-2">
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button className="self-start text-lg py-5 px-6">Solve Problem</Button>
                </div>
                <div className="mt-6 pt-6 border-t flex items-center gap-6 text-base">
                  <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${getDifficultyColor(todayProblem?.difficulty || "")}`}>
                    {todayProblem?.difficulty || ""}
                  </span>
                  <span className="flex items-center gap-2">
                    <Tag className="h-5 w-5" />
                    {todayProblem?.platform || ""}
                  </span>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <Card>
            <CardContent className="p-8 space-y-8">
              <div>
                <h3 className="text-lg font-medium mb-4">Difficulty</h3>
                <div className="flex flex-col gap-3">
                  {difficulties.map((difficulty) => (
                    <Button
                      key={difficulty}
                      variant={selectedDifficulty.includes(difficulty) ? "default" : "outline"}
                      onClick={() => toggleDifficulty(difficulty)}
                      className={`text-base py-5 ${
                        difficulty === "Easy"
                          ? "border-emerald-500/50"
                          : difficulty === "Medium"
                            ? "border-amber-500/50"
                            : "border-rose-500/50"
                      }`}
                    >
                      {difficulty}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Categories</h3>
                <div className="flex flex-col gap-3">
                  {allCategories.map((category) => (
                    <Badge
                      key={category}
                      variant={selectedCategories.includes(category) ? "default" : "outline"}
                      className="cursor-pointer px-4 py-2 text-base"
                      onClick={() => toggleCategory(category)}
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:w-2/3">
          <div className="flex flex-col sm:flex-row gap-3 mb-6 items-start sm:items-center justify-between">
            <div className="flex gap-3">
              {["all", "solved", "unsolved"].map((tab) => (
                <Button
                  key={tab}
                  variant={activeTab === tab ? "default" : "outline"}
                  onClick={() => setActiveTab(tab as TabType)}
                  className="text-base py-5 px-6"
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </Button>
              ))}
            </div>
            <div className="flex gap-3 items-center mt-3 sm:mt-0">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  className="pl-10 w-full"
                  placeholder="Search problems..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortType)}
                className="w-40 p-2 border rounded bg-background text-foreground"
              >
                <option value="date">Sort by Date</option>
                <option value="difficulty">Sort by Difficulty</option>
                <option value="status">Sort by Status</option>
              </select>
            </div>
          </div>
          
          {isLoading ? (
            <Card>
              <CardContent className="p-6 text-center">Loading problems...</CardContent>
            </Card>
          ) : (
            <>
              <div className="space-y-6">
                {currentProblems.length > 0 ? (
                  currentProblems.map((problem) => (
                    <Card 
                      key={problem.id} 
                      className="border cursor-pointer" // Added transition for smoothness
                      onClick={() => handleProblemClick(problem.problemUrl)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="space-y-3 flex-1">
                            <div className="flex items-center text-base text-muted-foreground">
                              <Calendar className="h-5 w-5 mr-2" />
                              {problem.date}
                            </div>
                            <h3 className="text-xl font-bold text-foreground">{problem.title}</h3> {/* Ensure text color is foreground */}
                            <div className="flex flex-wrap gap-2">
                              {problem.categories.map((category) => (
                                <Badge key={category} variant="secondary" className="text-sm font-normal py-1 px-2">
                                  {category}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex items-center gap-4 text-base">
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(problem.difficulty)}`}>
                                {problem.difficulty}
                              </span>
                              <span className="flex items-center gap-2 text-foreground"> {/* Ensure platform text is readable */}
                                <Tag className="h-5 w-5" />
                                {problem.platform}
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-col gap-3 self-center min-w-[120px]">
                            {problem.status === "Solved" ? (
                              <Badge 
                                variant="outline" 
                                className="bg-emerald-500/10 text-emerald-500 text-base py-1 px-3 w-full text-center"
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Solved
                              </Badge>
                            ) : (
                              <Button 
                                size="sm" 
                                variant="outline"
                                className="text-base py-4 px-5 w-full"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  markAsSolved(problem.id)
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
                  <Card>
                    <CardContent className="p-6 text-center text-muted-foreground">
                      No problems match your search or filters
                    </CardContent>
                  </Card>
                )}
              </div>

              {totalPages > 1 && (
                <div className="mt-6 flex justify-center gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <span className="self-center">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
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
  )
}

export default Challenges