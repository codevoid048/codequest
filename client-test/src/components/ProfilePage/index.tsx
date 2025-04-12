"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import axios from "axios"
import { motion } from "framer-motion"
import { useAuth } from "@/context/AuthContext"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import ProfileSkeleton from "@/components/profile-skeleton"
import { usePartialRendering } from "@/lib/use-partial-rendering"
import {
  Calendar,
  ChevronUp,
  Code2,
  Flame,
  Github,
  Linkedin,
  MapPin,
  School,
  Sparkles,
  Trophy,
  Twitter,
} from "lucide-react"

export default function ProfilePage() {
  const { username: routeUsername } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { username: routeUsername } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()

  interface ProfileUser {
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
    points?: number
    streak?: number
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
    points?: number
    streak?: number
  }

  const [profileUser, setProfileUser] = useState<ProfileUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

  // Partial rendering states
  const { isReady: sidebarReady } = usePartialRendering(200)
  const { isReady: statsReady } = usePartialRendering(400)
  const { isReady: difficultyReady } = usePartialRendering(600)
  const { isReady: contributionsReady } = usePartialRendering(800)

  // Fetch user details from backend using Axios
  useEffect(() => {
    const fetchProfileUser = async () => {
      setLoading(true)
      setError(null)
      setLoading(true)
      setError(null)

      const usernameToFetch = routeUsername || user?.username || "default" // Fallback if no username is provided
      const usernameToFetch = routeUsername || user?.username || "default" // Fallback if no username is provided

      try {
        const response = await axios.get(`http://localhost:5000/api/user/${usernameToFetch}`)
        console.log("Fetched user data:", response.data)
        setProfileUser(response.data.user)
      } catch (err: any) {
        console.error("Error fetching user:", err)
        setError(err.response?.data?.message || "User not found")
        const response = await axios.get(`http://localhost:5000/api/user/${usernameToFetch}`)
        console.log("Fetched user data:", response.data)
        setProfileUser(response.data.user)
      } catch (err: any) {
        console.error("Error fetching user:", err)
        setError(err.response?.data?.message || "User not found")
      } finally {
        setLoading(false)
        setLoading(false)
      }
    }
    }

    fetchProfileUser()
  }, [routeUsername, user?.username])
    fetchProfileUser()
  }, [routeUsername, user?.username])

  // Handle loading and error states
  if (loading) {
    return <ProfileSkeleton />
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="text-2xl font-bold text-red-500 mb-2">Error</div>
        <div className="text-muted-foreground text-center">{error}</div>
        <Button className="mt-4" onClick={() => navigate("/")}>
          Go Home
        </Button>
      </div>
    )
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="text-2xl font-bold text-red-500 mb-2">Error</div>
        <div className="text-muted-foreground text-center">{error}</div>
        <Button className="mt-4" onClick={() => navigate("/")}>
          Go Home
        </Button>
      </div>
    )
  }

  if (!profileUser) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="text-2xl font-bold mb-2">No User Data</div>
        <div className="text-muted-foreground text-center">No user data available</div>
        <Button className="mt-4" onClick={() => navigate("/")}>
          Go Home
        </Button>
      </div>
    )
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="text-2xl font-bold mb-2">No User Data</div>
        <div className="text-muted-foreground text-center">No user data available</div>
        <Button className="mt-4" onClick={() => navigate("/")}>
          Go Home
        </Button>
      </div>
    )
  }

  // Static data for now (can be fetched from backend later)
  const problemsSolved = {
    total: profileUser.solveChallenges?.length || 0,
    easy: Math.floor((profileUser.solveChallenges?.length || 0) * 0.4),
    medium: Math.floor((profileUser.solveChallenges?.length || 0) * 0.5),
    hard: Math.floor((profileUser.solveChallenges?.length || 0) * 0.1),
  }

  const platforms = [
    {
      name: "LeetCode",
      handle: profileUser.leetCode?.username || "-",
      rating: profileUser.leetCode?.rating || 0,
      color: "#FFA116",
    },
    {
      name: "GeeksForGeeks",
      handle: profileUser.gfg?.username || "-",
      rating: profileUser.gfg?.rating || 0,
      color: "#2F8D46",
    },
    {
      name: "CodeForces",
      handle: profileUser.codeforces?.username || "-",
      rating: profileUser.codeforces?.rating || 0,
      color: "#318CE7",
    },
    {
      name: "CodeChef",
      handle: profileUser.codechef?.username || "-",
      rating: profileUser.codechef?.rating || 0,
      color: "#745D0B",
    },
  ]
    {
      name: "LeetCode",
      handle: profileUser.leetCode?.username || "-",
      rating: profileUser.leetCode?.rating || 0,
      color: "#FFA116",
    },
    {
      name: "GeeksForGeeks",
      handle: profileUser.gfg?.username || "-",
      rating: profileUser.gfg?.rating || 0,
      color: "#2F8D46",
    },
    {
      name: "CodeForces",
      handle: profileUser.codeforces?.username || "-",
      rating: profileUser.codeforces?.rating || 0,
      color: "#318CE7",
    },
    {
      name: "CodeChef",
      handle: profileUser.codechef?.username || "-",
      rating: profileUser.codechef?.rating || 0,
      color: "#745D0B",
    },
  ]

  interface GetDaysInMonthParams {
    month: number
    year: number
    month: number
    year: number
  }

  const getDaysInMonth = (month: GetDaysInMonthParams["month"], year: GetDaysInMonthParams["year"]): number =>
    new Date(year, month + 1, 0).getDate()
  const getDaysInMonth = (month: GetDaysInMonthParams["month"], year: GetDaysInMonthParams["year"]): number =>
    new Date(year, month + 1, 0).getDate()

  interface Contribution {
    date: string
    count: number
    date: string
    count: number
  }

  const generateContributions = (year: number): Contribution[] => {
    const contributions: Contribution[] = []
    const startDate = new Date(year, 0, 1)
    const endDate = new Date(year, 11, 31)
    const contributions: Contribution[] = []
    const startDate = new Date(year, 0, 1)
    const endDate = new Date(year, 11, 31)
    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
      const count = Math.random() > 0.6 ? Math.floor(Math.random() * 10) : 0
      contributions.push({ date: date.toISOString().split("T")[0], count })
      const count = Math.random() > 0.6 ? Math.floor(Math.random() * 10) : 0
      contributions.push({ date: date.toISOString().split("T")[0], count })
    }
    return contributions
  }
    return contributions
  }

  const contributions = generateContributions(selectedYear)
  const contributions = generateContributions(selectedYear)

  const contributionsByMonth = Array.from({ length: 12 }, (_, month) => {
    const daysInMonth = getDaysInMonth(month, selectedYear)
    const daysInMonth = getDaysInMonth(month, selectedYear)
    return contributions
      .filter((contrib) => {
        const contribDate = new Date(contrib.date)
        return contribDate.getMonth() === month && contribDate.getFullYear() === selectedYear
        const contribDate = new Date(contrib.date)
        return contribDate.getMonth() === month && contribDate.getFullYear() === selectedYear
      })
      .slice(0, daysInMonth)
  })
      .slice(0, daysInMonth)
  })

  const yearOptions = [new Date().getFullYear(), new Date().getFullYear() - 1, new Date().getFullYear() - 2]
  const yearOptions = [new Date().getFullYear(), new Date().getFullYear() - 1, new Date().getFullYear() - 2]

  const getColor = (count: number): string => {
    if (count === 0) return "bg-gray-300"
    if (count <= 3) return "bg-green-200"
    if (count <= 6) return "bg-green-400"
    return "bg-green-500"
  }
  const getColor = (count: number): string => {
    if (count === 0) return "bg-gray-300"
    if (count <= 3) return "bg-green-200"
    if (count <= 6) return "bg-green-400"
    return "bg-green-500"
  }

  interface StreakParams {
    monthIndex: number
    dayIndex: number
    monthContribs: Contribution[]
    monthIndex: number
    dayIndex: number
    monthContribs: Contribution[]
  }

  const isPartOfStreak = ({ monthIndex, dayIndex, monthContribs }: StreakParams): boolean => {
    const currentDate = new Date(selectedYear, monthIndex, dayIndex + 1)
    const currentContrib = monthContribs.find((c) => c.date === currentDate.toISOString().split("T")[0])
    const currentCount = currentContrib ? currentContrib.count : 0
    if (currentCount === 0) return false
    const currentDate = new Date(selectedYear, monthIndex, dayIndex + 1)
    const currentContrib = monthContribs.find((c) => c.date === currentDate.toISOString().split("T")[0])
    const currentCount = currentContrib ? currentContrib.count : 0
    if (currentCount === 0) return false

    const prevDate = new Date(currentDate)
    prevDate.setDate(prevDate.getDate() - 1)
    const prevContrib = contributions.find((c) => c.date === prevDate.toISOString().split("T")[0])
    const nextDate = new Date(currentDate)
    nextDate.setDate(nextDate.getDate() + 1)
    const nextContrib = contributions.find((c) => c.date === nextDate.toISOString().split("T")[0])
    const prevDate = new Date(currentDate)
    prevDate.setDate(prevDate.getDate() - 1)
    const prevContrib = contributions.find((c) => c.date === prevDate.toISOString().split("T")[0])
    const nextDate = new Date(currentDate)
    nextDate.setDate(nextDate.getDate() + 1)
    const nextContrib = contributions.find((c) => c.date === nextDate.toISOString().split("T")[0])

    return (prevContrib?.count ?? 0) > 0 || (nextContrib?.count ?? 0) > 0
  }
    return (prevContrib?.count ?? 0) > 0 || (nextContrib?.count ?? 0) > 0
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
  }
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  }
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  }

  // Determine if the logged-in user is viewing their own profile
  const isOwnProfile = user?.username === routeUsername

  // Find social links from otherLinks array
  const findSocialLink = (platform: string) => {
    if (!profileUser.otherLinks) return null
    const link = profileUser.otherLinks.find((link) => link.platform.toLowerCase() === platform.toLowerCase())
    return link ? link.url : null
  }

  const twitterLink = findSocialLink("twitter")
  const linkedinLink = findSocialLink("linkedin")
  const githubLink = findSocialLink("github")
  const isOwnProfile = user?.username === routeUsername

  // Find social links from otherLinks array
  const findSocialLink = (platform: string) => {
    if (!profileUser.otherLinks) return null
    const link = profileUser.otherLinks.find((link) => link.platform.toLowerCase() === platform.toLowerCase())
    return link ? link.url : null
  }

  const twitterLink = findSocialLink("twitter")
  const linkedinLink = findSocialLink("linkedin")
  const githubLink = findSocialLink("github")

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-4 gap-6"
        className="grid grid-cols-1 lg:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Sidebar - Profile Details */}
        <motion.div className="lg:col-span-1" variants={cardVariants}>
          {sidebarReady ? (
            <Card className="overflow-hidden shadow-lg border-0">
              <div className="h-24 bg-gradient-to-r from-purple-500 to-cyan-500"></div>
              <div className="px-6 pb-6 -mt-12">
                <Avatar className="w-24 h-24 border-4 border-white shadow-xl mx-auto">
                  <AvatarImage
                    src={profileUser.profilePicture || "/placeholder.svg?height=128&width=128"}
                    alt={profileUser.name || "User"}
                  />
                  <AvatarFallback className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-cyan-500">
                    {profileUser.name?.charAt(0) || "?"}
                  </AvatarFallback>
                </Avatar>

                <div className="mt-4 text-center">
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent">
                    {profileUser.name}
                  </h1>
                  <p className="text-lg text-muted-foreground">@{profileUser.username}</p>

                  <div className="mt-2">
                    <p className="text-sm flex items-center justify-center text-muted-foreground">
                      <ChevronUp className="h-4 w-4 text-green-500 mr-1" />
                      Position #{profileUser.rank || "N/A"}
                    </p>
                  </div>

                  <div className="mt-5 space-y-3">
                    {profileUser.collegeName && (
                      <p className="text-sm flex items-center gap-2 justify-center">
                        <School className="h-4 w-4 text-purple-500" /> {profileUser.collegeName}
                      </p>
                    )}
                    {profileUser.branch && (
                      <p className="text-sm flex items-center gap-2 justify-center">
                        <Code2 className="h-4 w-4 text-cyan-500" /> {profileUser.branch}
                      </p>
                    )}
                    {profileUser.RegistrationNumber && (
                      <p className="text-sm flex items-center gap-2 justify-center">
                        <MapPin className="h-4 w-4 text-pink-500" /> {profileUser.RegistrationNumber}
                      </p>
                    )}
                  </div>

                  <div className="mt-6 flex justify-center gap-3">
                    {twitterLink && (
                      <Button variant="outline" size="icon" className="rounded-full" asChild>
                        <Link to={twitterLink} target="_blank" rel="noopener noreferrer">
                          <Twitter className="h-4 w-4 text-sky-500" />
                        </Link>
                      </Button>
                    )}
                    {linkedinLink && (
                      <Button variant="outline" size="icon" className="rounded-full" asChild>
                        <Link to={linkedinLink} target="_blank" rel="noopener noreferrer">
                          <Linkedin className="h-4 w-4 text-blue-600" />
                        </Link>
                      </Button>
                    )}
                    {githubLink && (
                      <Button variant="outline" size="icon" className="rounded-full" asChild>
                        <Link to={githubLink} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                  </div>

                  {isOwnProfile && (
                    <div className="mt-6">
                      <Button
                        className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600"
                        onClick={() => navigate("/profile/edit-profile")}
                      >
                        Edit Profile
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ) : (
            <div className="h-[450px] bg-muted animate-pulse rounded-lg"></div>
          )}

          {/* Coding Platforms */}
          <motion.div variants={cardVariants} className="mt-6">
            {sidebarReady ? (
              <Card className="shadow-lg border-0">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <Github className="mr-2 h-5 w-5 text-gray-500" /> Coding Platforms
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {platforms.map((platform) => (
                    <motion.div
                      key={platform.name}
                      whileHover={{ scale: 1.02 }}
                      className="border-l-4 rounded-lg shadow-sm p-3"
                      style={{ borderLeftColor: platform.color }}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">{platform.name}</div>
                          <div className="text-sm text-muted-foreground">@{platform.handle}</div>
                        </div>
                        <div className="text-lg font-bold" style={{ color: platform.color }}>
                          {platform.rating}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            ) : (
              <div className="h-[300px] bg-muted animate-pulse rounded-lg mt-6"></div>
            )}
          </motion.div>
        </motion.div>

        {/* Main Content */}
        <motion.div className="lg:col-span-3" variants={cardVariants}>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {statsReady ? (
              <>
                <motion.div variants={cardVariants} whileHover={{ y: -5 }}>
                  <Card className="shadow-lg border-0 overflow-hidden">
                    <div className="h-1 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                    <CardContent className="pt-6">
                      <div className="flex items-center">
                        <div className="bg-blue-100 p-3 rounded-lg mr-4">
                          <Code2 className="h-6 w-6 text-blue-500" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Problems Solved</p>
                          <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                            {problemsSolved.total}
                          </h3>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={cardVariants} whileHover={{ y: -5 }}>
                  <Card className="shadow-lg border-0 overflow-hidden">
                    <div className="h-1 bg-gradient-to-r from-amber-500 to-orange-500"></div>
                    <CardContent className="pt-6">
                      <div className="flex items-center">
                        <div className="bg-amber-100 p-3 rounded-lg mr-4">
                          <Trophy className="h-6 w-6 text-amber-500" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Total Points</p>
                          <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                            {profileUser.points || 0}
                          </h3>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={cardVariants} whileHover={{ y: -5 }}>
                  <Card className="shadow-lg border-0 overflow-hidden">
                    <div className="h-1 bg-gradient-to-r from-red-500 to-pink-500"></div>
                    <CardContent className="pt-6">
                      <div className="flex items-center">
                        <div className="bg-red-100 p-3 rounded-lg mr-4">
                          <Flame className="h-6 w-6 text-red-500" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Current Streak</p>
                          <h3 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                            {profileUser.streak || 0}
                          </h3>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </>
            ) : (
              <>
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-[100px] bg-muted animate-pulse rounded-lg"></div>
                ))}
              </>
            )}
          </div>

          {/* Problem Difficulty Breakdown */}
          <motion.div variants={cardVariants} className="mt-6">
            {difficultyReady ? (
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Sparkles className="mr-2 h-5 w-5 text-amber-500" /> Problem Difficulty Breakdown
                  </CardTitle>
                  <CardDescription>Track your progress across difficulty levels</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <motion.div
                      variants={cardVariants}
                      whileHover={{ scale: 1.03 }}
                      className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-sm"
                    >
                      <div className="relative w-28 h-28 mx-auto">
                        <svg className="w-full h-full" viewBox="0 0 36 36">
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#E5E7EB"
                            strokeWidth="3"
                          />
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#10B981"
                            strokeWidth="3"
                            strokeDasharray={`${(problemsSolved.easy / 300) * 100}, 100`}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-3xl font-bold text-green-600">{problemsSolved.easy}</div>
                        </div>
                      </div>
                      <div className="text-sm font-medium text-green-800 mt-3">Easy</div>
                    </motion.div>

                    <motion.div
                      variants={cardVariants}
                      whileHover={{ scale: 1.03 }}
                      className="text-center p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl shadow-sm"
                    >
                      <div className="relative w-28 h-28 mx-auto">
                        <svg className="w-full h-full" viewBox="0 0 36 36">
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#E5E7EB"
                            strokeWidth="3"
                          />
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#F59E0B"
                            strokeWidth="3"
                            strokeDasharray={`${(problemsSolved.medium / 300) * 100}, 100`}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-3xl font-bold text-yellow-600">{problemsSolved.medium}</div>
                        </div>
                      </div>
                      <div className="text-sm font-medium text-yellow-800 mt-3">Medium</div>
                    </motion.div>

                    <motion.div
                      variants={cardVariants}
                      whileHover={{ scale: 1.03 }}
                      className="text-center p-6 bg-gradient-to-br from-red-50 to-red-100 rounded-xl shadow-sm"
                    >
                      <div className="relative w-28 h-28 mx-auto">
                        <svg className="w-full h-full" viewBox="0 0 36 36">
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#E5E7EB"
                            strokeWidth="3"
                          />
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#EF4444"
                            strokeWidth="3"
                            strokeDasharray={`${(problemsSolved.hard / 100) * 100}, 100`}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-3xl font-bold text-red-600">{problemsSolved.hard}</div>
                        </div>
                      </div>
                      <div className="text-sm font-medium text-red-800 mt-3">Hard</div>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="h-[300px] bg-muted animate-pulse rounded-lg mt-6"></div>
            )}
          </motion.div>

          {/* Contributions Map */}
          <motion.div variants={cardVariants} className="mt-6">
            {contributionsReady ? (
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center">
                      <Calendar className="mr-2 h-5 w-5 text-green-500" /> Contributions
                    </CardTitle>
                    <select
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(Number.parseInt(e.target.value))}
                      className="border rounded-md p-2 text-sm bg-background"
                    >
                      {yearOptions.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                  <CardDescription>Your coding activity for {selectedYear}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto pb-4">
                    <div className="min-w-[950px]">
                      <div className="flex gap-4 text-xs text-muted-foreground text-center mb-2">
                        {[
                          "January",
                          "February",
                          "March",
                          "April",
                          "May",
                          "June",
                          "July",
                          "August",
                          "September",
                          "October",
                          "November",
                          "December",
                        ].map((month) => (
                          <div key={month} className="flex-1 truncate">
                            {month}
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-4">
                        {contributionsByMonth.map((monthContribs, monthIndex) => {
                          const daysInMonth = getDaysInMonth(monthIndex, selectedYear)
                          const firstDayOfMonth = new Date(selectedYear, monthIndex, 1).getDay()
                          const offset = (firstDayOfMonth + 6) % 7
                          const totalContributions = monthContribs.reduce(
                            (sum, contrib) => sum + (contrib ? contrib.count : 0),
                            0,
                          )
                          const numWeeks = Math.ceil((daysInMonth + offset) / 7)

                          return (
                            <div key={monthIndex} className="flex-1">
                              <div
                                className="grid gap-1"
                                style={{
                                  gridTemplateColumns: `repeat(${numWeeks}, 1fr)`,
                                  gridTemplateRows: "repeat(7, 1fr)",
                                }}
                              >
                                {Array.from({ length: daysInMonth }).map((_, dayIndex) => {
                                  const date = new Date(selectedYear, monthIndex, dayIndex + 1)
                                  const dayOfWeek = (date.getDay() + 6) % 7
                                  const weekIndex = Math.floor((dayIndex + offset) / 7) + 1
                                  const contrib = monthContribs.find((c) => c.date === date.toISOString().split("T")[0])
                                  const count = contrib ? contrib.count : 0
                                  const isToday =
                                    date.toISOString().split("T")[0] === new Date().toISOString().split("T")[0]
                                  const inStreak = isPartOfStreak({ monthIndex, dayIndex, monthContribs })

                                  return (
                                    <motion.div
                                      key={dayIndex}
                                      className={`h-4 w-4 rounded-sm ${getColor(count)} ${
                                        isToday ? "ring-2 ring-black dark:ring-white" : ""
                                      } ${inStreak && count > 0 ? "shadow-[0_0_5px_2px_rgba(34,197,94,0.5)]" : ""}`}
                                      style={{ gridRow: dayOfWeek + 1, gridColumn: weekIndex }}
                                      title={`${date.toLocaleDateString()}: ${count} contributions`}
                                      whileHover={{ scale: 1.5, zIndex: 10 }}
                                      transition={{ duration: 0.2 }}
                                    />
                                  )
                                })}
                              </div>
                              <div className="text-xs text-muted-foreground text-center mt-1">
                                {totalContributions} contributions
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                    <div className="flex items-center justify-end gap-2 text-xs text-muted-foreground mt-4">
                      <span>Less</span>
                      <div className="h-3 w-3 rounded-sm bg-gray-300"></div>
                      <div className="h-3 w-3 rounded-sm bg-green-200"></div>
                      <div className="h-3 w-3 rounded-sm bg-green-400"></div>
                      <div className="h-3 w-3 rounded-sm bg-green-500"></div>
                      <span>More</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="h-[400px] bg-muted animate-pulse rounded-lg mt-6"></div>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
      <RatingChart ratingData={rating} />
    </div>
  )
  )
}



