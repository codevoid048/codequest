"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
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
} from "lucide-react";

export default function ProfilePage() {
  const user = {
    username: "codemaster42",
    name: "Alex Johnson",
    college: "Stanford University",
    branch: "Computer Science",
    rankPosition: 423,
    location: "San Francisco, CA",
    points: 12450,
    streak: { current: 32 },
    socialLinks: {
      twitter: "https://twitter.com/codemaster42",
      linkedin: "https://linkedin.com/in/alexjohnson",
      github: "https://github.com/codemaster42",
    },
  };

  const problemsSolved = {
    total: 487,
    easy: 204,
    medium: 231,
    hard: 52,
  };

  const platforms = [
    { name: "LeetCode", handle: "codemaster42", solved: 312, color: "#FFA116" },
    {
      name: "GeeksForGeeks",
      handle: "alex_johnson",
      solved: 203,
      color: "#2F8D46",
    },
    { name: "CodeForces", handle: "alexj42", solved: 156, color: "#318CE7" },
    { name: "CodeChef", handle: "alexj42", solved: 89, color: "#745D0B" },
  ];

  const generateContributions = () => {
    const contributions = [];
    const today = new Date();
    for (let i = 0; i < 365; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - (364 - i));
      const count = Math.random() > 0.6 ? Math.floor(Math.random() * 10) : 0;
      contributions.push({
        date: date.toISOString().split("T")[0],
        count,
      });
    }
    return contributions;
  };

  const contributions = generateContributions();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const hoverVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  return (
    <div className="px-4 py-5 space-y-8 min-h-screen">
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-5 gap-8"
        variants={containerVariants}
      >
        {/* Sidebar - Profile Details */}
        <motion.div className="lg:col-span-1" variants={cardVariants}>
          <div className="flex flex-col items-center  rounded-xl border p-3 shadow-lg">
            <Avatar className="w-32 h-32 border-4 border-primary shadow-lg">
              <AvatarImage
                src="/placeholder.svg?height=128&width=128"
                alt={user.name}
              />
              <AvatarFallback className="text-4xl font-bold">
                {user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>

            <div className="mt-4 text-center lg:text-left">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-teal-500 bg-clip-text text-transparent">
                {user.name}
              </h1>
              <p className="text-lg text-muted-foreground">@{user.username}</p>

              <div className="mt-2">
                <p className="text-sm mt-1 flex items-center justify-center lg:justify-start text-muted-foreground">
                  <ChevronUp className="h-4 w-4 text-green-500" />
                  Position #{user.rankPosition}
                </p>
              </div>

              <div className="mt-5 space-y-2">
                <p className="text-sm flex items-center gap-1.5">
                  <School className="h-4 w-4 text-muted-foreground" />{" "}
                  {user.college}
                </p>
                <p className="text-sm flex items-center gap-1.5">
                  <Code2 className="h-4 w-4 text-muted-foreground" />{" "}
                  {user.branch}
                </p>
                <p className="text-sm flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-muted-foreground" />{" "}
                  {user.location}
                </p>
              </div>

              <div className="mt-4 flex gap-3">
                <Button variant="outline" size="icon" asChild>
                  <a
                    href={user.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <a
                    href={user.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <a
                    href={user.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                </Button>
              </div>

              <div className="mt-5">
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-blue-500 to-teal-500"
                >
                  Edit Profile
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Middle Section */}
        <motion.div className="lg:col-span-3" variants={cardVariants}>
          {/* Top Row - Problems Solved, Points, Streak */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div variants={cardVariants}>
              <Card className="shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Code2 className="mr-2 h-5 w-5 text-blue-500" /> Problems
                    Solved
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-teal-500 bg-clip-text text-transparent">
                    {problemsSolved.total}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={cardVariants}>
              <Card className="shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Trophy className="mr-2 h-5 w-5 text-yellow-500" /> Total
                    Points
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                    {user.points}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={cardVariants}>
              <Card className="shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Flame className="mr-2 h-5 w-5 text-red-500" /> Current
                    Streak
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                    {user.streak.current}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Problem Difficulty Breakdown */}
          <Card className="mt-6 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Sparkles className="mr-2 h-5 w-5 text-yellow-500" /> Problem
                Difficulty Breakdown
              </CardTitle>
              <CardDescription>
                Track your progress across difficulty levels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <motion.div
                  variants={cardVariants}
                  whileHover={hoverVariants}
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
                        strokeDasharray={`${
                          (problemsSolved.easy / 300) * 100
                        }, 100`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-2xl font-bold text-green-600">
                        {problemsSolved.easy}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-green-800 mt-2">Easy</div>
                </motion.div>

                <motion.div
                  variants={cardVariants}
                  whileHover={hoverVariants}
                  transition={{ delay: 0.2 }}
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
                        strokeDasharray={`${
                          (problemsSolved.medium / 300) * 100
                        }, 100`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-2xl font-bold text-yellow-600">
                        {problemsSolved.medium}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-yellow-800 mt-2">Medium</div>
                </motion.div>

                <motion.div
                  variants={cardVariants}
                  whileHover={hoverVariants}
                  transition={{ delay: 0.4 }}
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
                        strokeDasharray={`${
                          (problemsSolved.hard / 100) * 100
                        }, 100`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-2xl font-bold text-red-600">
                        {problemsSolved.hard}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-red-800 mt-2">Hard</div>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Right Section - Coding Platforms */}
        <motion.div className="lg:col-span-1" variants={cardVariants}>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Github className="mr-2 h-5 w-5 text-gray-500" /> Coding
                Platforms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {platforms.map((platform) => (
                  <motion.div
                    key={platform.name}
                    whileHover={hoverVariants}
                    className="border-l-4 transition-transform rounded-lg shadow-md"
                    style={{ borderLeftColor: platform.color }}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">{platform.name}</div>
                          <div className="text-sm text-muted-foreground">
                            @{platform.handle}
                          </div>
                        </div>
                        <div className="text-lg font-bold">
                          {platform.solved}
                        </div>
                      </div>
                    </CardContent>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
        {/* Contributions Map */}
        <div className="lg:col-span-5">
          <Card className="mt-6 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-green-500" />{" "}
                Contributions
              </CardTitle>
              <CardDescription>
                Your coding activity over the past year
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-12 gap-1 text-xs text-muted-foreground text-center">
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
                    <div key={month} className="truncate">
                      {month}
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                      (day) => (
                        <div key={day} className="h-4 flex items-center">
                          {day.slice(0, 1)}
                        </div>
                      )
                    )}
                  </div>

                  <div className="grid grid-cols-52 gap-1 flex-1">
                    {contributions.slice(0, 364).map((day, index) => (
                      <motion.div
                        key={index}
                        className={`h-4 w-4 rounded-[2px] ${
                          day.count > 0 ? "bg-green-500" : "bg-gray-300"
                        }`}
                        title={`${day.date}: ${day.count} contributions`}
                        whileHover={{ scale: 1.2 }}
                        transition={{ duration: 0.2 }}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 text-xs text-muted-foreground">
                  <span>Less</span>
                  <div className="h-3 w-3 rounded-sm bg-green-200"></div>
                  <div className="h-3 w-3 rounded-sm bg-green-500"></div>
                  <span>More</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
