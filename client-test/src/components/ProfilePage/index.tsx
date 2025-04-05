import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext"; // Import useAuth
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, ChevronUp, Code2, Flame, Github, Linkedin, MapPin, School, Sparkles, Trophy, Twitter } from "lucide-react";

export default function ProfilePage() {
  const { username: routeUsername } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth(); // Use the AuthContext to get the logged-in user

  interface ProfileUser {
    leetCode?: { username?: string; solved?: number; rank?: number; rating?: number };
    gfg?: { username?: string; solved?: number; rank?: number; rating?: number };
    codeforces?: { username?: string; solved?: number; rank?: string; rating?: number };
    codechef?: { username?: string; solved?: number; rank?: number; rating?: number };
    avatar?: string;
    name?: string;
    username?: string;
    rank?: number;
    collegeName?: string;
    branch?: string;
    RegistrationNumber?: string;
    otherLinks?: { twitter?: string; linkedin?: string; github?: string };
    solveChallenges?: any[];
    points?: number;
    streak?: number;
  }

  const [profileUser, setProfileUser] = useState<ProfileUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Fetch user details from backend using Axios
  useEffect(() => {
    const fetchProfileUser = async () => {
      setLoading(true);
      setError(null);

      const usernameToFetch = routeUsername || "default"; // Fallback if no username is provided

      try {
        const response = await axios.get(`http://localhost:5000/api/user/${usernameToFetch}`);
        console.log("Fetched user data:", response.data);
        setProfileUser(response.data.user);
      } catch (err) {
        console.error("Error fetching user:", err);
        setError(err.response?.data?.message || "User not found");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileUser();
  }, [routeUsername]);

  useEffect(() => {
    console.log("Updated Profile user data:", profileUser);
  }, [profileUser]);

  // Handle loading and error states
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!profileUser) {
    return <div>No user data available</div>;
  }

  // Static data for now (can be fetched from backend later)
  const problemsSolved = {
    total: 487,
    easy: 204,
    medium: 231,
    hard: 52,
  };

  const [platformSolved, setPlatformSolved] = useState({
    leetcodeTotal: 0,
    codeChefStars: "",
    codeforcesTotal: 0,
    gfgTotal: 0,
  });
  const [rating, setRating] = useState([]);
  const [isLoading, setIsLoading] = useState(true);



  const platforms = [
    { name: "LeetCode", handle: profileUser.leetCode?.username || "codemaster42", rating: profileUser.leetCode?.rating || 0, color: "#FFA116" },
    { name: "GeeksForGeeks", handle: profileUser.gfg?.username || "alex_johnson", rating: profileUser.gfg?.rating || 0, color: "#2F8D46" },
    { name: "CodeForces", handle: profileUser.codeforces?.username || "alexj42", rating: profileUser.codeforces?.rating || 0, color: "#318CE7" },
    { name: "CodeChef", handle: profileUser.codechef?.username || "alexj42", rating: profileUser.codechef?.rating || 0, color: "#745D0B" },
  ];

  interface GetDaysInMonthParams {
    month: number;
    year: number;
  }

  const getDaysInMonth = (month: GetDaysInMonthParams["month"], year: GetDaysInMonthParams["year"]): number => 
    new Date(year, month + 1, 0).getDate();

  interface Contribution {
    date: string;
    count: number;
  }

  const generateContributions = (year: number): Contribution[] => {
    const contributions: Contribution[] = [];
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31);
    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
      const count = Math.random() > 0.6 ? Math.floor(Math.random() * 10) : 0;
      contributions.push({ date: date.toISOString().split("T")[0], count });
    }
    return contributions;
  };

  const contributions = generateContributions(selectedYear);

  const contributionsByMonth = Array.from({ length: 12 }, (_, month) => {
    const daysInMonth = getDaysInMonth(month, selectedYear);
    return contributions
      .filter((contrib) => {
        const contribDate = new Date(contrib.date);
        return contribDate.getMonth() === month && contribDate.getFullYear() === selectedYear;
      })
      .slice(0, daysInMonth);
  });

  const yearOptions = [
    new Date().getFullYear(),
    new Date().getFullYear() - 1,
    new Date().getFullYear() - 2,
  ];

  const getColor = (count) => {
    if (count === 0) return "bg-gray-300";
    if (count <= 3) return "bg-green-200";
    if (count <= 6) return "bg-green-400";
    return "bg-green-500";
  };

  interface StreakParams {
    monthIndex: number;
    dayIndex: number;
    monthContribs: Contribution[];
  }

  const isPartOfStreak = ({ monthIndex, dayIndex, monthContribs }: StreakParams): boolean => {
    const currentDate = new Date(selectedYear, monthIndex, dayIndex + 1);
    const currentContrib = monthContribs.find(
      (c) => c.date === currentDate.toISOString().split("T")[0]
    );
    const currentCount = currentContrib ? currentContrib.count : 0;
    if (currentCount === 0) return false;

    const prevDate = new Date(currentDate);
    prevDate.setDate(prevDate.getDate() - 1);
    const prevContrib = contributions.find(
      (c) => c.date === prevDate.toISOString().split("T")[0]
    );
    const nextDate = new Date(currentDate);
    nextDate.setDate(nextDate.getDate() + 1);
    const nextContrib = contributions.find(
      (c) => c.date === nextDate.toISOString().split("T")[0]
    );

    return ((prevContrib?.count ?? 0) > 0) || ((nextContrib?.count ?? 0) > 0);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Determine if the logged-in user is viewing their own profile
  const isOwnProfile = user?.username === routeUsername;

  return (
    <div className="px-2 sm:px-4 py-3 sm:py-5 space-y-4 sm:space-y-8 min-h-screen">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Sidebar - Profile Details */}
        <motion.div className="md:col-span-2 lg:col-span-1" variants={cardVariants}>
          <div className="flex flex-col items-center rounded-xl border p-2 sm:p-3 shadow-lg">
            <Avatar className="w-24 h-24 sm:w-32 sm:h-32 border-4 border-primary shadow-lg">
              <AvatarImage
                src={profileUser.avatar || "/placeholder.svg?height=128&width=128"}
                alt={profileUser.name || "User"}
              />
              <AvatarFallback className="text-4xl font-bold">
                {profileUser.name?.charAt(0) || "?"}
              </AvatarFallback>
            </Avatar>

            <div className="mt-4 text-center lg:text-left">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-teal-500 bg-clip-text text-transparent">
                {profileUser.name}
              </h1>
              <p className="text-lg text-muted-foreground">@{profileUser.username}</p>

              <div className="mt-2">
                <p className="text-sm mt-1 flex items-center justify-center lg:justify-start text-muted-foreground">
                  <ChevronUp className="h-4 w-4 text-green-500" />
                  Position #{profileUser.rank}
                </p>
              </div>

              <div className="mt-5 space-y-2">
                <p className="text-sm flex items-center gap-1.5">
                  <School className="h-4 w-4 text-muted-foreground" /> {profileUser.collegeName || "Not specified"}
                </p>
                <p className="text-sm flex items-center gap-1.5">
                  <Code2 className="h-4 w-4 text-muted-foreground" /> {profileUser.branch || "Not specified"}
                </p>
                <p className="text-sm flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-muted-foreground" /> {profileUser.RegistrationNumber || "Not specified"}
                </p>
              </div>

              <div className="mt-4 flex justify-center gap-2 sm:gap-3">
                <Button variant="outline" size="icon" asChild>
                  <a href={profileUser.otherLinks?.twitter || "#"} target="_blank" rel="noopener noreferrer">
                    <Twitter className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <a href={profileUser.otherLinks?.linkedin || "#"} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <a href={profileUser.otherLinks?.github || "#"} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                  </a>
                </Button>
              </div>

              {isOwnProfile && (
                <div className="mt-5">
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-blue-500 to-teal-500"
                    onClick={() => navigate("/profile/edit-profile")}
                  >
                    Edit Profile
                  </Button>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Middle Section */}
        <motion.div className="md:col-span-2 lg:col-span-3" variants={cardVariants}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div variants={cardVariants}>
              <Card className="shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Code2 className="mr-2 h-5 w-5 text-blue-500" /> Solved
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-teal-500 bg-clip-text text-transparent">
                    {profileUser.solveChallenges?.length || 0}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={cardVariants}>
              <Card className="shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Trophy className="mr-2 h-5 w-5 text-yellow-500" /> Points
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                    {profileUser.points || 0}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={cardVariants}>
              <Card className="shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Flame className="mr-2 h-5 w-5 text-red-500" /> Streak
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                    {profileUser.streak || 0}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <Card className="mt-6 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Sparkles className="mr-2 h-5 w-5 text-yellow-500" /> Problem Difficulty Breakdown
              </CardTitle>
              <CardDescription>Track your progress across difficulty levels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <motion.div
                  variants={cardVariants}
                  whileHover={{ scale: 1.05 }} 
                  className="text-center p-6 bg-gradient-to-br from-green-100 to-green-200 rounded-lg shadow-lg"
                >
                  <div className="relative w-24 h-24 mx-auto">
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
                      <div className="text-2xl font-bold text-green-600">{problemsSolved.easy}</div>
                    </div>
                  </div>
                  <div className="text-sm text-green-800 mt-2">Easy</div>
                </motion.div>

                <motion.div
                  variants={cardVariants}
                  whileHover={{ scale: 1.05 }} 
                  className="text-center p-6 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-lg shadow-lg"
                >
                  <div className="relative w-24 h-24 mx-auto">
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
                      <div className="text-2xl font-bold text-yellow-600">{problemsSolved.medium}</div>
                    </div>
                  </div>
                  <div className="text-sm text-yellow-800 mt-2">Medium</div>
                </motion.div>

                <motion.div
                  variants={cardVariants}
                  whileHover={{ scale: 1.05 }} 
                  className="text-center p-6 bg-gradient-to-br from-red-100 to-red-200 rounded-lg shadow-lg"
                >
                  <div className="relative w-24 h-24 mx-auto">
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
                      <div className="text-2xl font-bold text-red-600">{problemsSolved.hard}</div>
                    </div>
                  </div>
                  <div className="text-sm text-red-800 mt-2">Hard</div>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Right Section - Coding Platforms */}
        <motion.div className="md:col-span-2 lg:col-span-1" variants={cardVariants}>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Github className="mr-2 h-5 w-5 text-gray-500" /> Coding Platforms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {platforms.map((platform) => (
                  <motion.div
                    key={platform.name}
                    whileHover={{ scale: 1.05 }} // Ensure only animatable values are used
                    className="border-l-4 transition-transform rounded-lg shadow-md"
                    style={{ borderLeftColor: platform.color }}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">{platform.name}</div>
                          <div className="text-sm text-muted-foreground">@{platform.handle}</div>
                        </div>
                        <div className="text-lg font-bold">{platform.rating}</div>
                      </div>
                    </CardContent>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Contributions Map */}
        <div className="md:col-span-4 lg:col-span-5">
          <Card className="mt-6 shadow-lg">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-green-500" /> Contributions
                </CardTitle>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number.parseInt(e.target.value))}
                  className="border rounded-md p-1 text-sm"
                >
                  {yearOptions.map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
              <CardDescription>Your coding activity for {selectedYear}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto pb-2">
                <div className="pb-2">
                  <div className="flex gap-4 text-xs text-muted-foreground text-center">
                    {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month) => (
                      <div key={month} className="flex-1 truncate min-w-[102px]">{month}</div>
                    ))}
                  </div>
                  <div className="flex gap-4 min-w-[900px] mt-2">
                    {contributionsByMonth.map((monthContribs, monthIndex) => {
                      const daysInMonth = getDaysInMonth(monthIndex, selectedYear);
                      const firstDayOfMonth = new Date(selectedYear, monthIndex, 1).getDay();
                      const offset = (firstDayOfMonth + 6) % 7;
                      const totalContributions = monthContribs.reduce(
                        (sum, contrib) => sum + (contrib ? contrib.count : 0),
                        0
                      );
                      const numWeeks = Math.ceil((daysInMonth + offset) / 7);

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
                              const date = new Date(selectedYear, monthIndex, dayIndex + 1);
                              const dayOfWeek = (date.getDay() + 6) % 7;
                              const weekIndex = Math.floor((dayIndex + offset) / 7) + 1;
                              const contrib = monthContribs.find(
                                (c) => c.date === date.toISOString().split("T")[0]
                              );
                              const count = contrib ? contrib.count : 0;
                              const isToday = date.toISOString().split("T")[0] === "2025-04-02"; // Adjusted to current date
                              const inStreak = isPartOfStreak({ monthIndex, dayIndex, monthContribs });

                              return (
                                <motion.div
                                  key={dayIndex}
                                  className={`h-4 w-4 rounded-[2px] ${getColor(count)} ${isToday ? "border-2 border-black" : ""} ${inStreak && count > 0 ? "shadow-[0_0_5px_2px_rgba(0,255,0,0.5)]" : ""}`}
                                  style={{ gridRow: dayOfWeek + 1, gridColumn: weekIndex }}
                                  title={isToday ? `0 submission on ${date.toLocaleString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}` : `${date.toISOString().split("T")[0]}: ${count} contributions`}
                                  whileHover={{ scale: 1.2 }}
                                  transition={{ duration: 0.2 }}
                                />
                              );
                            })}
                          </div>
                          <div className="text-xs text-muted-foreground text-center mt-1">
                            {totalContributions} contributions
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="flex items-center justify-end gap-2 text-xs text-muted-foreground">
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
        </div>
      </motion.div>
      <RatingChart ratingData={rating} />
    </div>
  );
}