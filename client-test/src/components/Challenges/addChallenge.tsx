import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X, Code, Clock, Database, TagIcon } from "lucide-react";
import { toast } from "react-hot-toast";
import axios from 'axios';

interface Category {
  id: string;
  name: string;
}

const AddChallenge: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [problemLink, setProblemLink] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [timeComplexity, setTimeComplexity] = useState('');
  const [spaceComplexity, setSpaceComplexity] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.some(cat => cat.name.toLowerCase() === newCategory.toLowerCase())) {
      setCategories([...categories, { id: Date.now().toString(), name: newCategory.trim() }]);
      setNewCategory('');
    }
  };

  const handleRemoveCategory = (id: string) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post('http://localhost:5000/api/challenges', {
        title,
        description,
        difficulty,
        problemLink,
        category: categories.map(cat => cat.name),
        timeComplexity,
        spaceComplexity
      });

      if (response.status === 201) {
        toast.success("Challenge added successfully!");
        // Reset form
        setTitle('');
        setDescription('');
        setDifficulty('');
        setProblemLink('');
        setCategories([]);
        setTimeComplexity('');
        setSpaceComplexity('');
      }
    } catch (error) {
      console.error('Error adding challenge:', error);
      toast.error("Failed to add challenge. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card className="border-0 shadow-lg bg-gradient-to-br from-card/95 to-card/90">
        <CardHeader className="pb-3 border-b border-border/30">
          <CardTitle className="text-2xl font-bold flex items-center gap-3">
            <span className="text-primary">
              <div className="size-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Code className="h-5 w-5" />
              </div>
            </span>
            <span className="bg-gradient-to-r from-primary/90 to-blue-500 bg-clip-text text-transparent">
              Add New Challenge
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter challenge title"
                  className="w-full"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="difficulty" className="text-sm font-medium">Difficulty</Label>
                <Select value={difficulty} onValueChange={setDifficulty}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter challenge description"
                className="min-h-[150px]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="problemLink" className="text-sm font-medium">Problem Link</Label>
              <Input
                id="problemLink"
                type="url"
                value={problemLink}
                onChange={(e) => setProblemLink(e.target.value)}
                placeholder="Enter problem URL"
                className="w-full"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="timeComplexity" className="text-sm font-medium flex items-center gap-2">
                  <Clock className="h-4 w-4 text-amber-500" />
                  Time Complexity
                </Label>
                <Input
                  id="timeComplexity"
                  value={timeComplexity}
                  onChange={(e) => setTimeComplexity(e.target.value)}
                  placeholder="e.g., O(n), O(n log n)"
                  className="w-full"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="spaceComplexity" className="text-sm font-medium flex items-center gap-2">
                  <Database className="h-4 w-4 text-blue-500" />
                  Space Complexity
                </Label>
                <Input
                  id="spaceComplexity"
                  value={spaceComplexity}
                  onChange={(e) => setSpaceComplexity(e.target.value)}
                  placeholder="e.g., O(1), O(n)"
                  className="w-full"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-2">
                <TagIcon className="h-4 w-4 text-emerald-500" />
                Categories
              </Label>
              <div className="flex gap-2">
                <Input
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Add a category"
                  className="flex-1"
                />
                <Button
                  type="button"
                  onClick={handleAddCategory}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {categories.map((category) => (
                  <span
                    key={category.id}
                    className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs px-3 py-1.5 rounded-full border border-emerald-500/20 flex items-center gap-1"
                  >
                    <span className="size-2 bg-emerald-500 rounded-full"></span>
                    <span>{category.name}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveCategory(category.id)}
                      className="ml-1 hover:text-red-500 transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                className="bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90 transition-all duration-300 shadow-md hover:shadow-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Adding...' : 'Add Challenge'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddChallenge; 