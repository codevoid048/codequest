import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, Calendar, Code2, Github, ExternalLink } from "lucide-react";

export default function ProfilePage() {
  const user = {
    username: "codemaster42",
    name: "Alex Johnson",
    college: "Stanford University",
    branch: "Computer Science",
    rank: "Advanced",
    joinDate: "March 2023",
    bio: "Full-stack developer passionate about algorithms and competitive programming.",
    points: 12450,
    streak: { current: 32, longest: 58 },
    potdSolved: 87,
  };

  const problemsSolved = { total: 487, easy: 204, medium: 231, hard: 52 };
  const platforms = [
    { name: "LeetCode", handle: "codemaster42", solved: 312, color: "#FFA116" },
    { name: "CodeForces", handle: "alexj42", solved: 156, color: "#318CE7" },
    { name: "HackerRank", handle: "alex.johnson", solved: 118, color: "#00AB5E" },
  ];

  const badges = [
    { name: "30-Day Streak", icon: "🔥" },
    { name: "100 Problems Solved", icon: "🏆" },
    { name: "Algorithm Master", icon: "🧠" },
  ];

  const generateContributions = () => {
    const contributions = [];
    const today = new Date("2025-03-25"); // Fixed to match your current date
    for (let i = 0; i < 182; i++) { // Reduced to 6 months for compactness
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const count = Math.random() > 0.6 ? Math.floor(Math.random() * 10) : 0;
      contributions.push({
        date: date.toISOString().split("T")[0],
        count,
        colorClass: count === 0 ? "bg-gray-200" : `bg-emerald-${Math.min(count * 100, 500)}`,
      });
    }
    return contributions.reverse();
  };

  const contributions = generateContributions();
  const contributionsByWeek = [];
  for (let i = 0; i < contributions.length; i += 7) {
    contributionsByWeek.push(contributions.slice(i, i + 7));
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <Avatar className="w-24 h-24 border-4 border-primary">
          <AvatarImage src="/placeholder.svg?height=96&width=96" alt={user.name} />
          <AvatarFallback className="text-3xl">{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-grow">
          <h1 className="text-3xl font-bold text-foreground">{user.name}</h1>
          <p className="text-lg text-muted-foreground">@{user.username}</p>
          <p className="text-sm text-muted-foreground mt-1">{user.college} • {user.branch}</p>
          <p className="text-sm mt-2">{user.bio}</p>
          <div className="flex gap-2 mt-4">
            <Badge variant="secondary"><Award className="w-4 h-4 mr-1" /> {user.rank}</Badge>
            <Badge variant="outline">Joined {user.joinDate}</Badge>
          </div>
        </div>
        <div className="flex gap-2">
          <Button size="sm">Edit Profile</Button>
          <Button size="sm" variant="outline">Share</Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stats Card */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-lg flex items-center"><Code2 className="w-5 h-5 mr-2" /> Stats</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{problemsSolved.total}</p>
              <p className="text-xs text-muted-foreground">Problems Solved</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{user.points}</p>
              <p className="text-xs text-muted-foreground">Points</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{user.streak.current}</p>
              <p className="text-xs text-muted-foreground">Current Streak</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{user.potdSolved}</p>
              <p className="text-xs text-muted-foreground">POTD Solved</p>
            </div>
          </CardContent>
        </Card>

        {/* Contributions Card */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center"><Calendar className="w-5 h-5 mr-2" /> Contributions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1">
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
            <div className="flex justify-end mt-2 text-xs text-muted-foreground">
              <span>Less</span>
              <div className="h-3 w-3 mx-1 rounded-sm bg-gray-200"></div>
              <div className="h-3 w-3 mx-1 rounded-sm bg-emerald-100"></div>
              <div className="h-3 w-3 mx-1 rounded-sm bg-emerald-300"></div>
              <div className="h-3 w-3 mx-1 rounded-sm bg-emerald-500"></div>
              <span>More</span>
            </div>
          </CardContent>
        </Card>

        {/* Platforms Card */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-lg flex items-center"><Github className="w-5 h-5 mr-2" /> Platforms</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {platforms.map((platform) => (
              <div key={platform.name} className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: platform.color }} />
                <div>
                  <p className="font-medium">{platform.name}</p>
                  <p className="text-xs text-muted-foreground">@{platform.handle} • {platform.solved} solved</p>
                </div>
              </div>
            ))}
            <Button variant="outline" size="sm" className="w-full mt-2">
              View All <ExternalLink className="ml-2 w-4 h-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Badges Card */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-lg flex items-center"><Award className="w-5 h-5 mr-2" /> Badges</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {badges.map((badge) => (
              <Badge key={badge.name} variant="secondary" className="mr-2 py-1 px-2">
                {badge.icon} {badge.name}
              </Badge>
            ))}
          </CardContent>
        </Card>

        {/* Challenges in Progress */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-lg flex items-center"><Code2 className="w-5 h-5 mr-2" /> In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">Binary Tree Traversal</p>
            <p className="text-xs text-muted-foreground">LeetCode • 70% complete</p>
            <Button variant="link" size="sm" className="mt-2 p-0">Continue →</Button>
          </CardContent>
        </Card>
      </div>

      {/* Optional Tabs for Expansion */}
      <Tabs defaultValue="overview" className="mt-8">
        <TabsList className="grid w-full grid-cols-2 max-w-xs">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="problems">Problems</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Problem Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p>Easy: {problemsSolved.easy} ({Math.round((problemsSolved.easy / problemsSolved.total) * 100)}%)</p>
                <p>Medium: {problemsSolved.medium} ({Math.round((problemsSolved.medium / problemsSolved.total) * 100)}%)</p>
                <p>Hard: {problemsSolved.hard} ({Math.round((problemsSolved.hard / problemsSolved.total) * 100)}%)</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="problems">
          <Card>
            <CardHeader>
              <CardTitle>Recent Problems</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}