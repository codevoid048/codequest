import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const difficultyOptions = ["Easy", "Medium", "Hard"];
const categoryOptions = [
  "Arrays",
  "Strings",
  "Linked Lists",
  "Trees",
  "Graphs",
  "Dynamic Programming",
  "Sorting",
  "Searching",
  "Recursion",
  "Backtracking",
  "Greedy",
  "Math",
  "Bit Manipulation",
];
const platformOptions = ["LeetCode", "GeeksforGeeks", "CodeChef", "Codeforces"];

export default function Admin() {
  const currentDate = new Date();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: [] as string[],
    difficulty: "Easy",
    points: 100,
    problemLink: "",
    createdAt: currentDate,
    platform: "" as string,
  });
  const [newCategory, setNewCategory] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDifficultyChange = (value: string) => {
    setFormData((prev) => ({ ...prev, difficulty: value }));
  };

  const handlePlatformChange = (value: string) => {
    setFormData((prev) => ({ ...prev, platform: value }));
  };

  const addCategory = (category: string) => {
    if (!formData.category.includes(category)) {
      setFormData((prev) => ({
        ...prev,
        category: [...prev.category, category],
      }));
    }
    setShowCategories(false);
  };

  const addCustomCategory = () => {
    if (newCategory && !formData.category.includes(newCategory)) {
      setFormData((prev) => ({
        ...prev,
        category: [...prev.category, newCategory],
      }));
      setNewCategory("");
    }
  };

  const removeCategory = (category: string) => {
    setFormData((prev) => ({
      ...prev,
      category: prev.category.filter((c) => c !== category),
    }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    if (!isNaN(date.getTime())) {
      setFormData((prev) => ({ ...prev, createdAt: date }));
    }
  };

  const formatDateForInput = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const response = await axios.post(
        "http://localhost:5000/admin/add-challenge",
        {
          title: formData.title,
          description: formData.description,
          category: formData.category,
          difficulty: formData.difficulty,
          points: formData.points,
          problemLink: formData.problemLink,
          createdAt: formData.createdAt.toISOString(),
          platform: formData.platform,
        },
        {
            headers: { "Content-Type": "application/json" },
        }
    );
    console.log("Registration successful:", response.data);
    // navigate("/");
      alert(
        `Challenge created! Successfully created "${
          formData.title
        }" on ${formData.createdAt.toLocaleDateString()} from ${
          formData.platform
        }`
      );

      // setFormData({
      //   title: "",
      //   description: "",
      //   category: [],
      //   difficulty: "Easy",
      //   points: 100,
      //   problemLink: "",
      //   createdAt: new Date(),
      //   platform: "",
      // });
    } catch (error) {
      alert("Error: Failed to create challenge. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <Card className="overflow-hidden border-none bg-card shadow-xl">
        <CardContent className="p-0">
          <form onSubmit={handleSubmit} className="space-y-6 p-6">
            <motion.div variants={itemVariants} className="space-y-2">
              <Label
                htmlFor="title"
                className="text-lg font-medium text-foreground"
              >
                Challenge Title
              </Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Enter a descriptive title"
                className="border-gray-600 bg-card text-foreground placeholder:text-muted-foreground focus:border-ring focus:ring-ring"
              />
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2">
              <Label
                htmlFor="description"
                className="text-lg font-medium text-foreground"
              >
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                placeholder="Provide a detailed description of the challenge"
                className="min-h-[120px] border-gray-600 bg-card text-foreground placeholder:text-muted-foreground focus:border-ring focus:ring-ring"
              />
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2">
              <Label className="text-lg font-medium text-foreground">
                Categories
              </Label>
              <div className="flex flex-wrap gap-2">
                {formData.category.map((cat) => (
                  <motion.div
                    key={cat}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground"
                  >
                    {cat}
                    <button
                      type="button"
                      onClick={() => removeCategory(cat)}
                      className="ml-1 rounded-full p-1 text-primary hover:bg-secondary hover:text-primary-foreground"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </motion.div>
                ))}
              </div>

              <div className="relative mt-2">
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowCategories(!showCategories)}
                    className="flex w-full items-center justify-between border-gray-600 bg-card text-foreground hover:bg-muted hover:text-foreground"
                  >
                    Select Categories
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        showCategories ? "rotate-180" : ""
                      }`}
                    />
                  </Button>
                </div>

                {showCategories && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-600 bg-popover p-2 shadow-lg"
                  >
                    <div className="grid grid-cols-2 gap-1">
                      {categoryOptions.map((category) => (
                        <Button
                          key={category}
                          type="button"
                          variant="ghost"
                          onClick={() => addCategory(category)}
                          className={`justify-start text-left text-sm ${
                            formData.category.includes(category)
                              ? "bg-muted text-foreground"
                              : "text-muted-foreground hover:bg-muted"
                          }`}
                        >
                          {category}
                        </Button>
                      ))}
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <Input
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        placeholder="Add custom category"
                        className="h-8 border-gray-600 text-sm bg-card text-foreground"
                      />
                      <Button
                        type="button"
                        size="sm"
                        onClick={addCustomCategory}
                        disabled={!newCategory}
                        className="h-8 bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2">
              <Label className="text-lg font-medium text-foreground">
                Difficulty
              </Label>
              <RadioGroup
                value={formData.difficulty}
                onValueChange={handleDifficultyChange}
                className="flex gap-4"
              >
                {difficultyOptions.map((difficulty) => (
                  <div key={difficulty} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={difficulty}
                      id={`difficulty-${difficulty.toLowerCase()}`}
                      className={`border-2 ${
                        difficulty === "Easy"
                          ? "border-[var(--chart-2)] text-[var(--chart-2)]"
                          : difficulty === "Medium"
                          ? "border-[var(--chart-1)] text-[var(--chart-1)]"
                          : "border-destructive text-destructive"
                      }`}
                    />
                    <Label
                      htmlFor={`difficulty-${difficulty.toLowerCase()}`}
                      className={`font-medium ${
                        difficulty === "Easy"
                          ? "text-[var(--chart-2)]"
                          : difficulty === "Medium"
                          ? "text-[var(--chart-1)]"
                          : "text-destructive"
                      }`}
                    >
                      {difficulty}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2">
              <Label
                htmlFor="points"
                className="text-lg font-medium text-foreground"
              >
                Points
              </Label>
              <Input
                id="points"
                name="points"
                type="number"
                min="1"
                value={formData.points}
                onChange={handleChange}
                required
                className="border-gray-600 bg-card text-foreground placeholder:text-muted-foreground focus:border-ring focus:ring-ring"
              />
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2">
              <Label
                htmlFor="createdAt"
                className="text-lg font-medium text-foreground"
              >
                Creation Date
              </Label>
              <div className="relative">
                <Input
                  id="createdAt"
                  name="createdAt"
                  type="date"
                  value={formatDateForInput(formData.createdAt)}
                  onChange={handleDateChange}
                  min={formatDateForInput(new Date())}
                  required
                  className="border-gray-600 bg-card text-foreground focus:border-ring focus:ring-ring"
                />
                <div className="mt-1 text-sm text-muted-foreground">
                  Selected: {formData.createdAt.toLocaleDateString()}
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2">
              <Label
                htmlFor="platform"
                className="text-lg font-medium text-foreground"
              >
                Platform
              </Label>
              <Select
                onValueChange={handlePlatformChange}
                value={formData.platform}
                required
              >
                <SelectTrigger className="border-gray-600 bg-card text-foreground focus:border-ring focus:ring-ring">
                  <SelectValue placeholder="Select a platform" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-gray-600">
                  {platformOptions.map((platform) => (
                    <SelectItem
                      key={platform}
                      value={platform}
                      className="text-foreground hover:bg-muted"
                    >
                      {platform}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2">
              <Label
                htmlFor="problemLink"
                className="text-lg font-medium text-foreground"
              >
                Problem Link
              </Label>
              <Input
                id="problemLink"
                name="problemLink"
                type="url"
                value={formData.problemLink}
                onChange={handleChange}
                required
                placeholder="https://example.com/problem"
                className="border-gray-600 bg-card text-foreground placeholder:text-muted-foreground focus:border-ring focus:ring-ring"
              />
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="pt-4"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground text-lg font-semibold transition-all duration-300 hover:bg-primary/90 hover:shadow-lg disabled:opacity-70"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent"></div>
                    <span></span>
                    <Button type="submit" className="w-full"><span>Creating Challenge...</span></Button>
                  </div>
                ) : (
                  "Create Challenge"
                )}
              </Button>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}