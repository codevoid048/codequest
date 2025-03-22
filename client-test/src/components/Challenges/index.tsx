import React, { useState } from 'react';
import { Calendar, Filter, CheckCircle, Clock } from 'lucide-react';

// Define types
interface Problem {
  id: number;
  date: string;
  title: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  platform: string;
  status: 'Solved' | 'Unsolved';
  description: string;
}

type TabType = 'all' | 'solved' | 'unsolved';

const Potd: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  
  // Mock data - would be fetched from API
  const problems: Problem[] = [
    {
      id: 1,
      date: '2025-03-17',
      title: 'Two Sum',
      category: 'Arrays',
      difficulty: 'Easy',
      platform: 'LeetCode',
      status: 'Solved',
      description: `
Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

Example:
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

Constraints:
- 2 <= nums.length <= 10^4
- -10^9 <= nums[i] <= 10^9
- -10^9 <= target <= 10^9
- Only one valid answer exists.
      `
    },
    {
      id: 2,
      date: '2025-03-16',
      title: 'Valid Parentheses',
      category: 'Stacks',
      difficulty: 'Medium',
      platform: 'LeetCode',
      status: 'Unsolved',
      description: `
Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

Example:
Input: s = "()[]{}"
Output: true
      `
    },
    {
      id: 3,
      date: '2025-03-15',
      title: 'Longest Substring Without Repeating Characters',
      category: 'Strings',
      difficulty: 'Hard',
      platform: 'GFG',
      status: 'Solved',
      description: `
Given a string s, find the length of the longest substring without repeating characters.

Example:
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.
      `
    }
  ];

  const filteredProblems = activeTab === 'all' 
    ? problems 
    : problems.filter(p => p.status.toLowerCase() === activeTab);

  const difficultyColor = (difficulty: Problem['difficulty']): string => {
    switch(difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleProblemClick = (problem: Problem): void => {
    setSelectedProblem(problem);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left side - Problem listing */}
        <div className="w-full md:w-1/3">
          <div className="bg-muted shadow rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-white-900">Problems</h1>
              <button className="p-2 text-gray-400 hover:text-gray-500">
                <Filter className="h-5 w-5" />
              </button>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <nav className="flex space-x-8" aria-label="Tabs">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`${
                    activeTab === 'all'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-white-500 hover:text-blue-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  All Problems
                </button>
                <button
                  onClick={() => setActiveTab('solved')}
                  className={`${
                    activeTab === 'solved'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-white-500 hover:text-blue-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  Solved
                </button>
                <button
                  onClick={() => setActiveTab('unsolved')}
                  className={`${
                    activeTab === 'unsolved'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-white-500 hover:text-blue-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  Unsolved
                </button>
              </nav>
            </div>

            {/* Problem list */}
            <div className="space-y-4">
              {filteredProblems.map((problem) => (
                <div 
                  key={problem.id}
                  onClick={() => handleProblemClick(problem)}
                  className={`border rounded-lg p-4 cursor-pointer hover:border-indigo-500 transition-colors duration-150 ${selectedProblem?.id === problem.id ? 'border-indigo-500 bg-muted' : 'border-gray-200'}`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-white-900">{problem.title}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${difficultyColor(problem.difficulty)}`}>
                          {problem.difficulty}
                        </span>
                        <span className="text-xs text-gray-500">{problem.category}</span>
                        <span className="text-xs text-gray-500">{problem.platform}</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {problem.status === 'Solved' ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <Clock className="h-5 w-5 text-yellow-500" />
                      )}
                    </div>
                  </div>
                  <div className="mt-2 flex items-center text-xs text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{problem.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right side - Problem detail */}
        <div className="w-full md:w-2/3">
          <div className="bg-muted shadow rounded-lg p-6 h-full">
            {selectedProblem ? (
              <div>
                <div className="border-b border-gray-200 pb-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-bold text-white-900">{selectedProblem.title}</h2>
                      <div className="flex items-center space-x-3 mt-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${difficultyColor(selectedProblem.difficulty)}`}>
                          {selectedProblem.difficulty}
                        </span>
                        <span className="text-sm text-gray-500">{selectedProblem.category}</span>
                        <span className="text-sm text-gray-500">{selectedProblem.platform}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Solve Problem
                      </button>
                    </div>
                  </div>
                </div>

                <div className="py-6">
                  <div className="prose max-w-none">
                    <pre className="whitespace-pre-wrap font-sans text-white-800">{selectedProblem.description}</pre>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-white-900">Examples</h3>
                  <div className="mt-4 bg-gray-50 rounded-md p-4">
                    <div className="font-mono text-sm">
                      {/* Example would be formatted properly in a real app */}
                      <p className="text-gray-950 mb-2">Input: nums = [2,7,11,15], target = 9</p>
                      <p className="text-gray-950 mb-2">Output: [0,1]</p>
                      <p className="text-gray-950">Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-medium text-white-900">Community Solutions</h3>
                  <div className="mt-4 border border-gray-200 rounded-md p-4">
                    <p className="text-white-600 text-center">Sign in to view community solutions</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full py-20">
                <img 
                  src="/api/placeholder/200/200"
                  alt="Select a problem"
                  className="w-32 h-32 text-gray-400"
                />
                <h3 className="mt-6 text-lg font-medium text-gray-900">Select a problem</h3>
                <p className="mt-2 text-sm text-gray-500 max-w-md text-center">
                  Choose a problem from the list to view its details, submit a solution, and track your progress.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Potd;