import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Award,
  ChevronUp,
  Code2,
  Github,
  // LineChart,
  ExternalLink,
  Calendar,
} from "lucide-react";

export default function ProfilePage() {
  const user = {
    username: "codemaster42",
    name: "Alex Johnson",
    email: "alex.j@example.com",
    phone: "+1 (555) 123-4567",
    registerNo: "CS2021042",
    college: "Stanford University",
    branch: "Computer Science",
    rank: "Advanced",
    rankPosition: 423,
    joinDate: "March 2023",
    location: "San Francisco, CA",
    bio: "Full-stack developer passionate about algorithms and competitive programming.",
    clubAffiliate: true,
    points: 12450,
    streak: {
      current: 32,
      longest: 58,
    },
    potdSolved: 87,
  };

  const problemsSolved = {
    total: 487,
    unsolved: 213,
    easy: 204,
    medium: 231,
    hard: 52,
  };

  const platforms = [
    {
      name: "LeetCode",
      handle: "codemaster42",
      solved: 312,
      rank: 5423,
      color: "#FFA116",
    },
    {
      name: "CodeForces",
      handle: "alexj42",
      solved: 156,
      rank: 1823,
      color: "#318CE7",
    },
    {
      name: "GeeksForGeeks",
      handle: "alex_johnson",
      solved: 203,
      rank: 732,
      color: "#2F8D46",
    },
    {
      name: "CodeChef",
      handle: "alexj42",
      solved: 89,
      rank: 3421,
      color: "#745D0B",
    },
    {
      name: "HackerRank",
      handle: "alex.johnson",
      solved: 118,
      rank: 2134,
      color: "#00AB5E",
    },
  ];

  // const activities = [
  //   {
  //     action: "Solved",
  //     problem: "Dynamic Programming Challenge",
  //     platform: "LeetCode",
  //     time: "2 hours ago",
  //   },
  //   {
  //     action: "Submitted",
  //     problem: "Graph Traversal Medium",
  //     platform: "CodeForces",
  //     time: "Yesterday",
  //   },
  //   {
  //     action: "Earned badge",
  //     problem: "30 Days of Code",
  //     platform: "HackerRank",
  //     time: "2 days ago",
  //   },
  //   {
  //     action: "Completed contest",
  //     problem: "Weekly Challenge #42",
  //     platform: "CodeChef",
  //     time: "5 days ago",
  //   },
  //   {
  //     action: "Solved",
  //     problem: "Binary Tree Maximum Path Sum",
  //     platform: "LeetCode",
  //     time: "1 week ago",
  //   },
  // ];

  const generateContributions = () => {
    const contributions = [];
    const today = new Date();
    const intensity = [
      "bg-emerald-100",
      "bg-emerald-200",
      "bg-emerald-300",
      "bg-emerald-400",
      "bg-emerald-500",
    ];

    for (let i = 0; i < 365; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - (364 - i));

      const count = Math.random() > 0.6 ? Math.floor(Math.random() * 10) : 0;
      let colorClass = "bg-gray-100";
      if (count > 0) {
        colorClass = intensity[Math.min(Math.floor(count / 2), 4)];
      }

      contributions.push({
        date: date.toISOString().split("T")[0],
        count,
        colorClass,
      });
    }

    return contributions;
  };

  const contributions = generateContributions();
  const contributionsByWeek = [];
  for (let i = 0; i < contributions.length; i += 7) {
    contributionsByWeek.push(contributions.slice(i, i + 7));
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="flex-shrink-0 flex flex-col items-center">
          <Avatar className="w-32 h-32 border-4 border-primary">
            <AvatarImage
              src="/placeholder.svg?height=128&width=128"
              alt={user.name}
            />
            <AvatarFallback className="text-4xl">
              {user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="mt-4 text-center">
            <Badge className="px-3 py-1 text-lg font-semibold bg-primary text-primary-foreground">
              <Award className="mr-1 h-4 w-4" /> Rank: {user.rank}
            </Badge>
            <p className="text-muted-foreground text-sm mt-1 flex items-center justify-center">
              <ChevronUp className="h-4 w-4 text-green-500" />
              Position #{user.rankPosition}
            </p>
          </div>
        </div>

        <div className="flex-grow">
          <h1 className="text-3xl font-bold">{user.name}</h1>
          <p className="text-lg text-muted-foreground">@{user.username}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <p className="text-sm flex items-center">
                <span className="font-medium mr-2">Email:</span> {user.email}
              </p>
              <p className="text-sm flex items-center">
                <span className="font-medium mr-2">Phone:</span> {user.phone}
              </p>
              <p className="text-sm flex items-center">
                <span className="font-medium mr-2">Register No:</span>{" "}
                {user.registerNo}
              </p>
              <p className="text-sm flex items-center">
                <span className="font-medium mr-2">Location:</span>{" "}
                {user.location}
              </p>
            </div>
            <div>
              <p className="text-sm flex items-center">
                <span className="font-medium mr-2">College:</span>{" "}
                {user.college}
              </p>
              <p className="text-sm flex items-center">
                <span className="font-medium mr-2">Branch:</span> {user.branch}
              </p>
              <p className="text-sm flex items-center">
                <span className="font-medium mr-2">Joined:</span>{" "}
                {user.joinDate}
              </p>
              <p className="text-sm flex items-center">
                <span className="font-medium mr-2">Club Affiliate:</span>
                <Badge
                  variant={user.clubAffiliate ? "default" : "outline"} // Adjust variants based on your component
                  className="ml-1"
                >
                  {user.clubAffiliate ? "Yes" : "No"}
                </Badge>
              </p>
            </div>
          </div>

          <p className="mt-4 text-muted-foreground">{user.bio}</p>

          <div className="mt-4 grid gr  id-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-muted rounded-lg p-3 text-center">
              <p className="text-2xl font-bold">{user.points}</p>
              <p className="text-xs text-muted-foreground">Total Points</p>
            </div>
            <div className="bg-muted rounded-lg p-3 text-center">
              <p className="text-2xl font-bold">{user.streak.current}</p>
              <p className="text-xs text-muted-foreground">Current Streak</p>
            </div>
            <div className="bg-muted rounded-lg p-3 text-center">
              <p className="text-2xl font-bold">{problemsSolved.total}</p>
              <p className="text-xs text-muted-foreground">Problems Solved</p>
            </div>
            <div className="bg-muted rounded-lg p-3 text-center">
              <p className="text-2xl font-bold">{user.potdSolved}</p>
              <p className="text-xs text-muted-foreground">POTD Solved</p>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <Button size="sm">Edit Profile</Button>
            <Button size="sm" variant="outline">
              Share Profile
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4 max-w-md mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="platforms">Platforms</TabsTrigger>
          <TabsTrigger value="contributions">Contributions</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Code2 className="mr-2 h-5 w-5" /> Problems Solved
              </CardTitle>
              <CardDescription>
                Track of all your coding challenges across platforms
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold mb-4">
                {problemsSolved.total}
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">
                      Easy ({problemsSolved.easy})
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {Math.round(
                        (problemsSolved.easy / problemsSolved.total) * 100
                      )}
                      %
                    </span>
                  </div>
                  {/* <Progress
                    value={(problemsSolved.easy / problemsSolved.total) * 100}
                    className="h-2"
                  /> */}
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">
                      Medium ({problemsSolved.medium})
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {Math.round(
                        (problemsSolved.medium / problemsSolved.total) * 100
                      )}
                      %
                    </span>
                  </div>
                  {/* <Progress
                    value={(problemsSolved.medium / problemsSolved.total) * 100}
                    className="h-2"
                  /> */}
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">
                      Hard ({problemsSolved.hard})
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {Math.round(
                        (problemsSolved.hard / problemsSolved.total) * 100
                      )}
                      %
                    </span>
                  </div>
                  {/* <Progress
                    value={(problemsSolved.hard / problemsSolved.total) * 100}
                    className="h-2"
                  /> */}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Code2 className="mr-2 h-5 w-5" /> Solved vs Unsolved
              </CardTitle>
              <CardDescription>
                Track your progress across all problems
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center mb-6">
                <div className="w-48 h-48 relative">
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                    <path
                      className="fill-none stroke-muted"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      strokeWidth="2"
                    />
                    <path
                      className="fill-none stroke-primary"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      strokeWidth="2"
                      strokeDasharray={`${Math.round(
                        (problemsSolved.total /
                          (problemsSolved.total + problemsSolved.unsolved)) *
                          100
                      )}, 100`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-3xl font-bold">
                      {Math.round(
                        (problemsSolved.total /
                          (problemsSolved.total + problemsSolved.unsolved)) *
                          100
                      )}
                      %
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Completion
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold">
                    {problemsSolved.total}
                  </div>
                  <div className="text-sm text-muted-foreground">Solved</div>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold">
                    {problemsSolved.unsolved}
                  </div>
                  <div className="text-sm text-muted-foreground">Unsolved</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Github className="mr-2 h-5 w-5" /> Platform Integrations
              </CardTitle>
              <CardDescription>Your connected coding platforms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {platforms.slice(0, 3).map((platform) => (
                  <Card
                    key={platform.name}
                    className="border-l-4"
                    style={{ borderLeftColor: platform.color }}
                  >
                    <CardHeader className="py-3">
                      <CardTitle className="text-base">
                        {platform.name}
                      </CardTitle>
                      <CardDescription className="text-xs">
                        @{platform.handle}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="py-2">
                      <div className="flex justify-between text-sm">
                        <span>Solved: {platform.solved}</span>
                        <span>Rank: #{platform.rank}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Button variant="link" className="mt-4 w-full">
                View All Platforms <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <LineChart className="mr-2 h-5 w-5" /> Recent Activity
              </CardTitle>
              <CardDescription>Your latest coding activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.slice(0, 3).map((activity, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-2 h-2 mt-2 rounded-full bg-primary" />
                    <div>
                      <p className="font-medium">
                        {activity.action}{" "}
                        <span className="font-normal text-muted-foreground">
                          {activity.problem}
                        </span>
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {activity.platform} • {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Button variant="link" className="mt-4 w-full">
                View Full Activity <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card> */}
        </TabsContent>

        <TabsContent value="platforms" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Github className="mr-2 h-5 w-5" /> Coding Platforms
              </CardTitle>
              <CardDescription>
                All your connected coding platform accounts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {platforms.map((platform) => (
                  <Card
                    key={platform.name}
                    className="border-l-4"
                    style={{ borderLeftColor: platform.color }}
                  >
                    <CardHeader>
                      <CardTitle>{platform.name}</CardTitle>
                      <CardDescription>@{platform.handle}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="text-sm font-medium">
                            Problems Solved
                          </div>
                          <div className="text-2xl font-bold">
                            {platform.solved}
                          </div>
                        </div>

                        <div>
                          <div className="text-sm font-medium">Global Rank</div>
                          <div className="text-2xl font-bold">
                            #{platform.rank}
                          </div>
                        </div>

                        <Button size="sm" variant="outline" className="w-full">
                          View Profile <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Button className="mt-6 w-full">Connect New Platform</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contributions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" /> Contribution Activity
              </CardTitle>
              <CardDescription>
                Your daily coding activity over the past year
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <div className="min-w-[900px]">
                  <div className="flex flex-col gap-2">
                    <div className="flex text-xs text-muted-foreground pl-10">
                      {[
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "May",
                        "Jun",
                        "Jul",
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec",
                      ].map((month) => (
                        <div key={month} className="flex-1">
                          {month}
                        </div>
                      ))}
                    </div>

                    <div className="flex">
                      <div className="pr-2 flex flex-col gap-1 text-xs text-muted-foreground">
                        <div className="h-3"></div>
                        {["Mon", "Wed", "Fri"].map((day) => (
                          <div key={day} className="h-3 flex items-center">
                            {day}
                          </div>
                        ))}
                      </div>

                      <div className="flex-1 flex gap-1">
                        {contributionsByWeek.map((week, weekIndex) => (
                          <div key={weekIndex} className="flex flex-col gap-1">
                            {week.map((day, dayIndex) => (
                              <div
                                key={`${weekIndex}-${dayIndex}`}
                                className={`h-3 w-3 rounded-sm ${day.colorClass}`}
                                title={`${day.date}: ${day.count} contributions`}
                              />
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-end gap-2 text-xs text-muted-foreground">
                    <span>Less</span>
                    <div className="h-3 w-3 rounded-sm bg-gray-100"></div>
                    <div className="h-3 w-3 rounded-sm bg-emerald-100"></div>
                    <div className="h-3 w-3 rounded-sm bg-emerald-200"></div>
                    <div className="h-3 w-3 rounded-sm bg-emerald-300"></div>
                    <div className="h-3 w-3 rounded-sm bg-emerald-400"></div>
                    <div className="h-3 w-3 rounded-sm bg-emerald-500"></div>
                    <span>More</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold">487</div>
                  <div className="text-sm text-muted-foreground">
                    Total Contributions
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {user.streak.current}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Current Streak
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {user.streak.longest}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Longest Streak
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">214</div>
                  <div className="text-sm text-muted-foreground">
                    Active Days
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <LineChart className="mr-2 h-5 w-5" /> Activity Feed
              </CardTitle>
              <CardDescription>
                Your complete coding activity history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative pl-6 border-l">
                {[...activities, ...activities].map((activity, index) => (
                  <div key={index} className="mb-8 relative">
                    <div className="absolute w-3 h-3 bg-primary rounded-full -left-[22px] top-1" />
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                      <div className="text-sm font-medium">
                        {activity.action}
                      </div>
                      <div className="text-sm">{activity.problem}</div>
                      <Badge variant="outline" className="w-fit">
                        {activity.platform}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {activity.time}
                    </p>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="mt-4 w-full">
                Load More
              </Button>
            </CardContent>
          </Card>
        </TabsContent> */}
      </Tabs>
    </div>
  );
}