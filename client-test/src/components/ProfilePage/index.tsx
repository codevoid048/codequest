"use client";

import { useState } from "react";
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

  // State for year filter
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Function to get the number of days in a month
  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Generate contributions for a specific year
  const generateContributions = (year) => {
    const contributions = [];
    const startDate = new Date(year, 0, 1); // January 1st of the selected year
    const endDate = new Date(year, 11, 31); // December 31st of the selected year

    for (
      let date = new Date(startDate);
      date <= endDate;
      date.setDate(date.getDate() + 1)
    ) {
      const count = Math.random() > 0.6 ? Math.floor(Math.random() * 10) : 0;
      contributions.push({
        date: new Date(date).toISOString().split("T")[0],
        count,
      });
    }
    return contributions;
  };

  const contributions = generateContributions(selectedYear);

  // Group contributions by month
  const contributionsByMonth = Array.from({ length: 12 }, (_, month) => {
    const daysInMonth = getDaysInMonth(month, selectedYear);
    return contributions
      .filter((contrib) => {
        const contribDate = new Date(contrib.date);
        return (
          contribDate.getMonth() === month &&
          contribDate.getFullYear() === selectedYear
        );
      })
      .slice(0, daysInMonth); // Ensure we only take the correct number of days
  });

  // Year options for the filter (current year and previous 2 years)
  const yearOptions = [
    new Date().getFullYear(),
    new Date().getFullYear() - 1,
    new Date().getFullYear() - 2,
  ];

  // Function to determine color based on contribution count
  const getColor = (count) => {
    if (count === 0) return "bg-gray-300";
    if (count <= 3) return "bg-green-200";
    if (count <= 6) return "bg-green-400";
    return "bg-green-500";
  };

  // Function to check if a day is part of a streak
  const isPartOfStreak = (monthIndex, dayIndex, monthContribs) => {
    const currentDate = new Date(selectedYear, monthIndex, dayIndex + 1);
    const currentContrib = monthContribs.find(
      (c) => c.date === currentDate.toISOString().split("T")[0]
    );
    const currentCount = currentContrib ? currentContrib.count : 0;

    if (currentCount === 0) return false;

    // Check previous day
    const prevDate = new Date(currentDate);
    prevDate.setDate(prevDate.getDate() - 1);
    const prevContrib = contributions.find(
      (c) => c.date === prevDate.toISOString().split("T")[0]
    );
    const prevCount = prevContrib ? prevContrib.count : 0;

    // Check next day
    const nextDate = new Date(currentDate);
    nextDate.setDate(nextDate.getDate() + 1);
    const nextContrib = contributions.find(
      (c) => c.date === nextDate.toISOString().split("T")[0]
    );
    const nextCount = nextContrib ? nextContrib.count : 0;

    // Part of a streak if either the previous or next day has contributions
    return prevCount > 0 || nextCount > 0;
  };

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
          <div className="flex flex-col items-center rounded-xl border p-3 shadow-lg">
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
                        strokeDasharray={`${(problemsSolved.easy / 300) * 100}, 100`}
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
                        strokeDasharray={`${(problemsSolved.medium / 300) * 100}, 100`}
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
                        strokeDasharray={`${(problemsSolved.hard / 100) * 100}, 100`}
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
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-green-500" /> Contributions
                </CardTitle>
                {/* Year Filter */}
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                  className="border rounded-md p-1 text-sm"
                >
                  {yearOptions.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
              <CardDescription>
                Your coding activity for {selectedYear}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                {/* Month Labels */}
                <div className="flex gap-2 text-xs text-muted-foreground text-center">
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

                {/* Contributions Grid */}
                <div className="flex gap-2">
                  {contributionsByMonth.map((monthContribs, monthIndex) => {
                    const daysInMonth = getDaysInMonth(monthIndex, selectedYear);
                    const totalContributions = monthContribs.reduce(
                      (sum, contrib) => sum + (contrib ? contrib.count : 0),
                      0
                    );

                    return (
                      <div key={monthIndex} className="flex-1">
                        <div
                          className={`grid gap-1`}
                          style={{
                            gridTemplateColumns: `repeat(${Math.ceil(daysInMonth / 7)}, 1fr)`,
                            gridTemplateRows: "repeat(7, 1fr)",
                          }}
                        >
                          {Array.from({ length: daysInMonth }).map((_, dayIndex) => {
                            const date = new Date(selectedYear, monthIndex, dayIndex + 1);
                            const contrib = monthContribs.find(
                              (c) => c.date === date.toISOString().split("T")[0]
                            );
                            const count = contrib ? contrib.count : 0;
                            const isToday =
                              date.toISOString().split("T")[0] === "2025-03-27"; // Highlight March 27, 2025
                            const inStreak = isPartOfStreak(monthIndex, dayIndex, monthContribs);

                            return (
                              <motion.div
                                key={dayIndex}
                                className={`h-4 w-4 rounded-[2px] ${getColor(count)} ${
                                  isToday ? "border-2 border-black" : ""
                                } ${inStreak && count > 0 ? "[0_0_5px_2px_rgba(0,255,0,0.5)]" : ""}`}
                                title={
                                  isToday
                                    ? `0 submission on ${date.toLocaleString("en-US", {
                                        weekday: "long",
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                      })}`
                                    : `${date.toISOString().split("T")[0]}: ${count} contributions`
                                }
                                whileHover={{ scale: 1.2 }}
                                transition={{ duration: 0.2 }}
                              />
                            );
                          })}
                        </div>
                        {/* Monthly Summary */}
                        <div className="text-xs text-muted-foreground text-center mt-1">
                          {totalContributions} contributions
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Legend */}
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
    </div>
  );
}