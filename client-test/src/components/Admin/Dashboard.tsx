"use client"
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { Calendar, Code2, GraduationCap, Users } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAdminStore } from "@/context/AdminContext"
import { useEffect, useState } from "react"

// Define chart data interfaces
interface UserWeeklyData {
  name: string;
  users: number;
}

// Add User interface to include createdAt and other used properties
interface User {
  createdAt: string;
  isAffiliate?: boolean;
  collegeName?: string;
  // Add other properties as needed
}

interface ProblemDifficultyData {
  name: string;
  value: number;
  color: string;
}

interface CollegeData {
  name: string;
  users: number;
}

interface TodayChallenge {
  title: string;
  solved: number;
  attempted: number;
  category: string;
  difficulty: string;
  description: string;
}

export default function Dashboard() {
  const { users, challenges, fetchUsers, fetchChallenges } = useAdminStore();
  const [collegeData, setCollegeData] = useState<CollegeData[]>([]);
  const [problemDifficultyData, setProblemDifficultyData] = useState<ProblemDifficultyData[]>([]);
  const [userWeeklyData, setUserWeeklyData] = useState<UserWeeklyData[]>([]);
  const [todayChallenge, setTodayChallenge] = useState<TodayChallenge>({
    title: "",
    solved: 0,
    attempted: 0,
    category: "",
    difficulty: "",
    description: ""
  });
  const potdSolvedData = [
    { name: "Solved", users: todayChallenge.solved },
    { name: "Attempted", users: todayChallenge.attempted }
  ];

  // Fetch data when component mounts
  useEffect(() => {
    fetchUsers();
    fetchChallenges();
  }, [fetchUsers, fetchChallenges]);

  // Calculate weekly user registration data from actual database
  useEffect(() => {
    if (users.length > 0) {
      console.log("Processing weekly user data...", users);

      // Get the last 7 days
      const today = new Date();
      const weeklyData: UserWeeklyData[] = [];

      // Create array for last 7 days
      for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);

        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const dateString = date.toISOString().split('T')[0]; // YYYY-MM-DD format

        // Count users registered on this specific day
        const usersOnThisDay = users.filter(user => {
          if (!user.createdAt) return false;

          const userDate = new Date(user.createdAt);
          const userDateString = userDate.toISOString().split('T')[0];

          return userDateString === dateString;
        }).length;

        weeklyData.push({
          name: dayName,
          users: usersOnThisDay
        });
      }

      console.log("Weekly user data calculated:", weeklyData);
      setUserWeeklyData(weeklyData);
    }
  }, [users]);

  // Count number of affiliates
  const affiliatesCount = users.filter(user => user.isAffiliate === true).length;

  // Updated college data processing function
  useEffect(() => {
    if (users.length > 0) {
      // Create college distribution data
      const collegeDistribution: Record<string, number> = {};
      console.log(users, "users data in dashboard")

      users.forEach(user => {
        if (user.collegeName) {
          if (collegeDistribution[user.collegeName]) {
            collegeDistribution[user.collegeName]++;
          } else {
            collegeDistribution[user.collegeName] = 1;
          }
        } else {
          // Handle users without college data
          if (collegeDistribution["Unspecified"]) {
            collegeDistribution["Unspecified"]++;
          } else {
            collegeDistribution["Unspecified"] = 1;
          }
        }
      });

      const collegeChartData = Object.keys(collegeDistribution)
        .map(college => ({
          name: college,
          users: collegeDistribution[college]
        }))
        .sort((a, b) => b.users - a.users); // Sort by number of users

      setCollegeData(collegeChartData);
    }
  }, [users]);

  // Calculate challenge difficulty distribution from actual database
  useEffect(() => {
    if (challenges.length > 0) {
      console.log("Processing challenge difficulty data...", challenges);

      const difficultyCount: Record<string, number> = {
        Easy: 0,
        Medium: 0,
        Hard: 0
      };

      challenges.forEach(challenge => {
        if (challenge.difficulty) {
          // Make sure we only count valid difficulties
          const difficulty = challenge.difficulty.trim();
          if (difficultyCount[difficulty] !== undefined) {
            difficultyCount[difficulty]++;
          } else {
            // Handle case variations (easy, EASY, etc.)
            const normalizedDifficulty = difficulty.charAt(0).toUpperCase() + difficulty.slice(1).toLowerCase();
            if (difficultyCount[normalizedDifficulty] !== undefined) {
              difficultyCount[normalizedDifficulty]++;
            }
          }
        }
      });

      const difficultyData: ProblemDifficultyData[] = [
        { name: "Easy", value: difficultyCount.Easy, color: '#10b981' }, // Green
        { name: "Medium", value: difficultyCount.Medium, color: '#f59e0b' }, // Amber
        { name: "Hard", value: difficultyCount.Hard, color: '#ef4444' } // Red
      ];

      console.log("Difficulty distribution calculated:", difficultyData);
      setProblemDifficultyData(difficultyData);

      // Set today's challenge data
      const latestChallenge = challenges[0];
      if (latestChallenge) {
        const solvedCount = latestChallenge.solvedUsers?.length || 0;

        setTodayChallenge({
          title: latestChallenge.title || "No title available",
          solved: solvedCount,
          attempted: solvedCount > 0 ? solvedCount + Math.round(solvedCount * 0.3) : 0,
          category: Array.isArray(latestChallenge.category)
            ? latestChallenge.category.join(' ')
            : latestChallenge.category || "Not specified",
          difficulty: latestChallenge.difficulty || "Medium",
          description: latestChallenge.description || "No description available for this problem."
        });
      }
    }
  }, [challenges]);

  // Calculate number of unique colleges
  const uniqueCollegesCount = collegeData.length;

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <h1 className="text-xl font-semibold">Coding Club Admin Dashboard</h1>
      </header>
      <main className="flex-1 space-y-4 p-4 md:p-6">
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Problems Posted</CardTitle>
              <Code2 className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{challenges.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Colleges</CardTitle>
              <GraduationCap className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{uniqueCollegesCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Affiliates</CardTitle>
              <GraduationCap className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{affiliatesCount}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="md:col-span-4">
                <CardHeader>
                  <CardTitle>Weekly User Registrations</CardTitle>
                  <CardDescription>New user registrations over the past 7 days</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={userWeeklyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis allowDecimals={false} />
                      <Tooltip
                        formatter={(value: number) => [`${value} users`, 'New Registrations']}
                        labelFormatter={(label: string) => `Day: ${label}`}
                        contentStyle={{ backgroundColor: 'black', color: 'white' }} // Add this line
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="users"
                        stroke="#416cc2"
                        strokeWidth={3}
                        activeDot={{ r: 8 }}
                        name="New Users"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              <Card className="md:col-span-3">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-primary mb-1">
                    Today's POTD Stats
                  </CardTitle>

                  <CardDescription className="text-sm font-semibold text-white dark:text-black">
                    Problem of the Day:
                    <span className="text-muted-foreground dark:text-muted-foreground"> {todayChallenge.title}</span>
                  </CardDescription>
                  <CardDescription className="text-sm font-semibold text-white dark:text-black">
                    Category:
                    <span className="text-muted-foreground dark:text-muted-foreground"> {todayChallenge.category}</span>
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  {/* Problem Description Section */}
                  <div className="mb-4">
                    <div className="text-sm font-semibold text-white dark:text-black">Problem Description:</div>
                    <p className="mt-1 text-sm text-muted-foreground dark:text-muted-foreground">
                      {todayChallenge.description}
                    </p>
                  </div>

                  <div className="space-y-4">
                    {/* Difficulty Section */}
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium text-white dark:text-black">Difficulty:</span>
                      <div className="ml-auto font-medium">{todayChallenge.difficulty}</div>
                    </div>

                    {/* Solved Section */}
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium text-white dark:text-black">Solved:</span>
                      <div className="ml-auto font-medium">{todayChallenge.solved} users</div>
                    </div>

                    {/* Progress Bar */}
                    <div className="pt-4">
                      <div className="relative h-4 w-full overflow-hidden rounded-full bg-secondary">
                        <div
                          className="h-full bg-primary"
                          style={{
                            width: todayChallenge.attempted > 0
                              ? `${(todayChallenge.solved / todayChallenge.attempted) * 100}%`
                              : '0%'
                          }}
                        />
                      </div>
                      <div className="mt-2 text-xs text-center text-muted-foreground dark:text-black">
                        {todayChallenge.attempted > 0
                          ? Math.round((todayChallenge.solved / todayChallenge.attempted) * 100)
                          : 0}% success rate
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="md:col-span-3">
                <CardHeader>
                  <CardTitle>Problem Difficulty Distribution</CardTitle>
                  <CardDescription>Breakdown of problems by difficulty level from database</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={problemDifficultyData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent, value }) =>
                          value > 0 ? `${name}: ${(percent * 100).toFixed(0)}%` : ''
                        }
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {problemDifficultyData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value: number, name: string) => [`${value}`, `${name}`]}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                  {/* Show total count */}
                  <div className="mt-2 text-center text-sm text-muted-foreground">
                    Total Problems: {problemDifficultyData.reduce((sum, item) => sum + item.value, 0)}
                  </div>
                </CardContent>
              </Card>
              <Card className="md:col-span-4">
                <CardHeader>
                  <CardTitle>Users by College</CardTitle>
                  <CardDescription>Distribution of users across all colleges</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={collegeData as { name: string; users: number }[]}
                      layout="vertical"
                      margin={{ left: 50, right: 30, top: 20, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={true} />
                      <XAxis
                        type="number"
                        domain={[0, (dataMax: number) => Math.ceil(dataMax * 1.2)]} // Add 20% padding to max value
                        allowDecimals={false} // Ensure only whole numbers
                        axisLine={{ stroke: '#666' }}
                        tick={{ fill: '#888', fontSize: 12 }}
                      />
                      <YAxis
                        type="category"
                        dataKey="name"
                        width={140}
                        axisLine={{ stroke: '#666' }}
                        tick={{ fill: '#888', fontSize: 12 }}
                        tickFormatter={(value: string) => value.length > 20 ? `${value.substring(0, 18)}...` : value}
                      />
                      <Tooltip
                        formatter={(value: number) => [`${value} users`, 'Users']}
                        labelFormatter={(label: string) => `College: ${label}`}
                        contentStyle={{ backgroundColor: '#fff', borderRadius: '6px', border: '1px solid #ccc' }}
                      />
                      <Bar
                        dataKey="users"
                        fill="#8884d8"
                        maxBarSize={25}
                        radius={[0, 4, 4, 0]}
                        label={{
                          position: 'right',
                          fill: '#666',
                          fontSize: 12,
                          formatter: (value: { users: number }) => value.users
                        }}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="analytics" className="space-y-4">
            {/* POTD Solved Graph */}
            <Card>
              <CardHeader>
                <CardTitle>POTD Solved Count</CardTitle>
                <CardDescription>
                  How many users solved today&rsquo;s challenge
                </CardDescription>
              </CardHeader>

              <CardContent>
                {todayChallenge.solved === 0 ? (
                  <p className="text-center text-muted-foreground">
                    No one has solved today&rsquo;s problem yet.
                  </p>
                ) : (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={potdSolvedData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis allowDecimals={false} />
                      <Tooltip formatter={(v: number) => [`${v} users`, "Solved"]} />
                      <Legend />
                      <Bar dataKey="users" fill="#38bdf8" maxBarSize={80} />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>
            {/* (Optional) keep or remove the placeholder card you had before) */}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}