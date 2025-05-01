import React, { useState, useEffect } from 'react';
import { Code, Copy, Check, BookOpen } from 'lucide-react';
import axios from 'axios';
// Define the types for our data structures
interface Solution {
    id: string;
    title: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    languages: {
        cpp?: string;
        java?: string;
        python?: string;
    };
    description: string;
    explanation: string;
    approach: string;
    timeComplexity: string;
    spaceComplexity: string;
}

interface ProblemHeaderProps {
    solution: Solution;
}

interface TabNavigationProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

interface SolutionPanelProps {
    solution: Solution;
    preferredLanguage: string;
    setPreferredLanguage: (language: string) => void;
    copied: boolean;
    setCopied: (copied: boolean) => void;
}

interface ExplanationPanelProps {
    solution: Solution;
}

interface CodeQuestSolutionViewerProps {
  problemId: number;
}

// Sample data for testing - in a real app this would come from your API/backend
const sampleSolutions: Solution[] = [
    {
        id: '001',
        title: 'Two Sum',
        difficulty: 'Easy',
        languages: {
            cpp: `vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> numMap;
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        if (numMap.count(complement)) {
            return {numMap[complement], i};
        }
        numMap[nums[i]] = i;
    }
    return {};
}`,
            java: `public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> numMap = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        if (numMap.containsKey(complement)) {
            return new int[] {numMap.get(complement), i};
        }
        numMap.put(nums[i], i);
    }
    return new int[0];
}`,
            python: `def twoSum(nums, target):
    numMap = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in numMap:
            return [numMap[complement], i]
        numMap[num] = i
    return []`
        },
        description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
        explanation: "In this problem, we need to find two numbers in an array that add up to a specific target value. The key insight is that for any number x in the array, we need to find if there's another number (target - x) also in the array. Using a hash map/dictionary makes this search efficient.",
        approach: "We use a hash map to store numbers we've seen so far. For each number, we calculate what complement we need (target - current number) and check if it's already in our map. If it is, we've found our pair! If not, we add the current number to the map and continue the search.",
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)"
    },
    {
        id: '002',
        title: 'Valid Parentheses',
        difficulty: 'Medium',
        languages: {
            cpp: `bool isValid(string s) {
    stack<char> st;
    for (char c : s) {
        if (c == '(' || c == '{' || c == '[') {
            st.push(c);
        } else {
            if (st.empty()) return false;
            if (c == ')' && st.top() != '(') return false;
            if (c == '}' && st.top() != '{') return false;
            if (c == ']' && st.top() != '[') return false;
            st.pop();
        }
    }
    return st.empty();
}`,
            java: `public boolean isValid(String s) {
    Stack<Character> stack = new Stack<>();
    for (char c : s.toCharArray()) {
        if (c == '(' || c == '{' || c == '[') {
            stack.push(c);
        } else {
            if (stack.isEmpty()) return false;
            if (c == ')' && stack.peek() != '(') return false;
            if (c == '}' && stack.peek() != '{') return false;
            if (c == ']' && stack.peek() != '[') return false;
            stack.pop();
        }
    }
    return stack.isEmpty();
}`,
            python: `def isValid(s):
    stack = []
    mapping = {")": "(", "}": "{", "]": "["}
    
    for char in s:
        if char in mapping.values():
            stack.append(char)
        elif char in mapping.keys():
            if not stack or mapping[char] != stack.pop():
                return False
        else:
            return False
            
    return not stack`
        },
        description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
        explanation: "A valid string has balanced and properly nested brackets. This means every opening bracket must have a corresponding closing bracket of the same type, and nested brackets must close in the reverse order they were opened.",
        approach: "We use a stack data structure to keep track of opening brackets. When we encounter an opening bracket, we push it onto the stack. When we see a closing bracket, we check if the top of the stack has the matching opening bracket. If it does, we pop it and continue. Otherwise, the string is invalid. Finally, if the stack is empty after processing the entire string, the string is valid.",
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)"
    }
];

//Components for different sections
const ProblemHeader: React.FC<ProblemHeaderProps> = ({ solution }) => {
    // Getting difficulty style
    const getDifficultyStyle = (difficulty: string) => {
        switch (difficulty) {
            case 'Easy':
                return 'from-green-400 to-green-600 text-white';
            case 'Medium':
                return 'from-yellow-400 to-yellow-600 text-white';
            case 'Hard':
                return 'from-red-400 to-red-600 text-white';
            default:
                return 'from-blue-400 to-blue-600 text-white';
        }
    };

    return (
        <div className="relative p-6 bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-100 dark:to-gray-200 border border-gray-700 dark:border-gray-300 transform transition-all duration-300 hover:shadow-lg rounded-t-xl">
            <div className="flex items-start justify-between">
                <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                        <div className="h-8 w-2 bg-primary rounded-full"></div>
                        <h2 className="text-2xl font-bold text-white dark:text-gray-800">{solution.title}</h2>
                    </div>
                    <p className="text-gray-300 dark:text-gray-700 max-w-3xl">{solution.description}</p>
                </div>
                <span
                    className={`px-4 py-2 rounded-lg font-medium bg-gradient-to-r ${getDifficultyStyle(solution.difficulty)} shadow-lg transform transition hover:scale-105`}
                >
                    {solution.difficulty}
                </span>
            </div>
        </div>
    );
};

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, setActiveTab }) => {
    return (
        <div className="flex space-x-1 px-6 pt-4 pb-0 bg-gray-800 dark:bg-gray-100 border-x border-t border-gray-700 dark:border-gray-300 rounded-t-xl mt-4">
            <button
                className={`flex items-center gap-2 px-6 py-3 font-medium rounded-t-lg text-sm tracking-wide transition-all duration-300 ease-in-out ${
                    activeTab === 'solution'
                        ? 'bg-primary text-white shadow-md scale-105'
                        : 'text-gray-400 dark:text-gray-600 hover:text-white dark:hover:text-gray-800 hover:bg-gray-700/60 dark:hover:bg-gray-200'
                }`}
                onClick={() => setActiveTab('solution')}
            >
                <Code size={18} />
                <span>Solution</span>
            </button>

            <button
                className={`flex items-center gap-2 px-6 py-3 font-medium rounded-t-lg text-sm tracking-wide transition-all duration-300 ease-in-out ${
                    activeTab === 'explanation'
                        ? 'bg-primary text-white shadow-md scale-105'
                        : 'text-gray-400 dark:text-gray-600 hover:text-white dark:hover:text-gray-800 hover:bg-gray-700/60 dark:hover:bg-gray-200'
                }`}
                onClick={() => setActiveTab('explanation')}
            >
                <BookOpen size={18} />
                <span>Explanation</span>
            </button>
        </div>
    );
};

const SolutionPanel: React.FC<SolutionPanelProps> = ({ solution, preferredLanguage, setPreferredLanguage, copied, setCopied }) => {
    // Function to copy code to clipboard
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    
    // Function to get syntax highlighting classes based on the language
    const getCodeHighlightClass = (code: string, language: string) => {
        if (!code) return '';

        // Split code into lines for styling
        const lines = code.split('\n');

        return lines.map((line, index) => {
            const lineNumber = index + 1;
            const isEven = lineNumber % 2 === 0;

            // Apply language-specific syntax highlighting
            let highlightedLine = line;

            // Basic syntax highlighting rules
            if (language === 'python') {
                highlightedLine = line
                    .replace(/(def |return|if|else|for|in|enumerate)/g, '<span class="text-yellow-400">$1</span>')
                    .replace(/(\(|\)|\[|\]|\{|\}|:)/g, '<span class="text-purple-400">$1</span>')
                    .replace(/(None|True|False)/g, '<span class="text-blue-400">$1</span>');
            } else if (language === 'java') {
                highlightedLine = line
                    .replace(/(public|private|class|static|void|int|boolean|new|return|if|else|for)/g, '<span class="text-yellow-400">$1</span>')
                    .replace(/(\(|\)|\[|\]|\{|\}|;)/g, '<span class="text-purple-400">$1</span>')
                    .replace(/(null|true|false)/g, '<span class="text-blue-400">$1</span>');
            } else if (language === 'cpp') {
                highlightedLine = line
                    .replace(/(vector|string|int|bool|void|return|if|else|for)/g, '<span class="text-yellow-400">$1</span>')
                    .replace(/(\(|\)|\[|\]|\{|\}|;|&|::|->)/g, '<span class="text-purple-400">$1</span>')
                    .replace(/(nullptr|true|false)/g, '<span class="text-blue-400">$1</span>');
            }

            return (
                `<div class="${isEven ? 'bg-gray-800 dark:bg-gray-100' : 'bg-gray-900 dark:bg-white'} pl-2 flex">
          <span class="text-gray-500 w-8 text-right pr-3 select-none">${lineNumber}</span>
          <span class="pl-2">${highlightedLine}</span>
        </div>`
            );
        }).join('');
    };

    return (
        <div className="p-6 bg-gray-900 dark:bg-white border border-gray-700 dark:border-gray-300 rounded-b-xl">
            <div className="flex flex-wrap md:flex-nowrap justify-between items-center gap-3 mb-5">
                <div className="flex flex-wrap gap-2">
                    {['cpp', 'java', 'python'].map(lang => (
                        <button
                            key={lang}
                            className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ease-in-out text-sm tracking-wide ${
                                preferredLanguage === lang
                                    ? 'bg-primary text-white shadow-md scale-105'
                                    : 'bg-gray-700 dark:bg-gray-200 text-gray-300 dark:text-gray-700 hover:bg-gray-600 dark:hover:bg-gray-300 hover:text-white dark:hover:text-gray-900 hover:scale-105'
                            }`}
                            onClick={() => setPreferredLanguage(lang)}
                        >
                            {lang === 'cpp' ? 'C++' : lang.charAt(0).toUpperCase() + lang.slice(1)}
                        </button>
                    ))}
                </div>

                <button
                    className={`flex items-center gap-2 px-5 py-2 rounded-2xl font-semibold text-sm tracking-wide transition-all duration-300 ease-in-out transform shadow-md border focus:outline-none ${
                        copied
                            ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white border-none scale-105'
                            : 'bg-gray-800 dark:bg-gray-100 text-gray-200 dark:text-gray-700 border border-gray-600 dark:border-gray-300 hover:bg-gray-700 dark:hover:bg-gray-200 hover:shadow-lg hover:scale-105'
                    }`}
                    onClick={() =>
                        solution.languages[preferredLanguage as keyof typeof solution.languages] &&
                        copyToClipboard(solution.languages[preferredLanguage as keyof typeof solution.languages] || '')
                    }
                >
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                    <span>{copied ? 'Copied!' : 'Copy Code'}</span>
                </button>
            </div>

            <div className="rounded-lg overflow-hidden shadow-xl border border-gray-700 dark:border-gray-300">
                <div className="bg-gray-800 dark:bg-gray-200 py-2 px-4 flex items-center space-x-2 border-b border-gray-700 dark:border-gray-300">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="ml-2 text-sm text-gray-400 dark:text-gray-600">{
                        preferredLanguage === 'cpp' ? 'solution.cpp' :
                            preferredLanguage === 'java' ? 'Solution.java' : 'solution.py'
                    }</span>
                </div>
                <div className="bg-gray-900 dark:bg-white rounded-b-md overflow-x-auto">
                    <div
                        className="font-mono text-sm text-green-400 dark:text-green-600 p-1"
                        dangerouslySetInnerHTML={{
                            __html: solution.languages[preferredLanguage as keyof typeof solution.languages]
                                ? getCodeHighlightClass(solution.languages[preferredLanguage as keyof typeof solution.languages] || '', preferredLanguage)
                                : '<div class="p-4 text-red-400 dark:text-red-500">Solution not available in this language</div>'
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

const ExplanationPanel: React.FC<ExplanationPanelProps> = ({ solution }) => {
    return (
        <div className="p-6 bg-gray-900 dark:bg-white border border-gray-700 dark:border-gray-300 rounded-b-xl">
            <div className="bg-gray-800 dark:bg-gray-100 rounded-lg p-6 text-gray-300 dark:text-gray-700 border border-gray-700 dark:border-gray-300">
                <h3 className="text-xl font-medium text-blue-400 dark:text-blue-600 mb-4 flex items-center">
                    <BookOpen size={20} className="mr-2 text-blue-400 dark:text-blue-600" />
                    Problem Explanation
                </h3>
                <div className="mb-6">
                    <p>{solution.explanation}</p>
                </div>
            </div>
        </div>
    );
};

// Define the theme context and provider for light/dark mode
type ThemeContextType = {
    darkMode: boolean;
    toggleDarkMode: () => void;
};

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [darkMode, setDarkMode] = useState<boolean>(false);
    
    useEffect(() => {
        // Check system preference for dark mode
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setDarkMode(true);
            document.documentElement.classList.add('dark');
        }
    }, []);
    
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        if (!darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };
    
    return (
        <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Custom hook to use the theme context
const useTheme = (): ThemeContextType => {
    const context = React.useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

const CodeQuestSolutionViewer: React.FC<CodeQuestSolutionViewerProps> = ({ problemId }) => {
    // State for the app
    const [preferredLanguage, setPreferredLanguage] = useState<string>('python');
    const [solutions, setSolutions] = useState<Solution[]>([]);
    const [selectedSolution, setSelectedSolution] = useState<Solution | null>(null);
    const [copied, setCopied] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<string>('solution');
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        const fetchSolutions = async () => {
            try {
                setIsLoading(true);
                // For testing, use sample data if API is not ready
                const sampleSolution = sampleSolutions[0]; // Using the first sample solution
                setSolutions([sampleSolution]);
                setSelectedSolution(sampleSolution);
                
                // Uncomment this when API is ready
                // const response = await axios.get(`http://localhost:5000/api/challenges/solution/${problemId}`);
                // if (response.data && response.data.solution) {
                //     const solutionData = response.data.solution;
                //     const formattedSolution: Solution = {
                //         id: solutionData._id,
                //         title: solutionData.title,
                //         difficulty: solutionData.difficulty,
                //         languages: {
                //             cpp: solutionData.cppSolution || '',
                //             java: solutionData.javaSolution || '',
                //             python: solutionData.pythonSolution || ''
                //         },
                //         description: solutionData.description,
                //         explanation: solutionData.explanation,
                //         approach: solutionData.approach,
                //         timeComplexity: solutionData.timeComplexity,
                //         spaceComplexity: solutionData.spaceComplexity
                //     };
                //     setSolutions([formattedSolution]);
                //     setSelectedSolution(formattedSolution);
                // }
            } catch (error) {
                console.error('Error fetching solutions:', error);
            } finally {
                setIsLoading(false);
            }
        };
        
        if (problemId) {
            fetchSolutions();
        }
    }, [problemId]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!selectedSolution) {
        return (
            <div className="p-10 text-center text-gray-400 dark:text-gray-600 bg-gray-800 dark:bg-white rounded-xl border border-gray-700 dark:border-gray-300">
                <p>No solution available for this problem yet.</p>
            </div>
        );
    }

    return (
        <ThemeProvider>
            <AppContent 
                preferredLanguage={preferredLanguage}
                setPreferredLanguage={setPreferredLanguage}
                solutions={solutions}
                selectedSolution={selectedSolution}
                copied={copied}
                setCopied={setCopied}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />
        </ThemeProvider>
    );
};

// Separate component for the main content to use the theme context
const AppContent: React.FC<{
    preferredLanguage: string;
    setPreferredLanguage: (lang: string) => void;
    solutions: Solution[];
    selectedSolution: Solution | null;
    copied: boolean;
    setCopied: (copied: boolean) => void;
    activeTab: string;
    setActiveTab: (tab: string) => void;
}> = ({ 
    preferredLanguage, 
    setPreferredLanguage, 
    solutions, 
    selectedSolution, 
    copied, 
    setCopied, 
    activeTab, 
    setActiveTab 
}) => {
    const { darkMode, toggleDarkMode } = useTheme();
    
    return (
        <div className={`min-h-screen ${darkMode ? 'bg-gradient from-gray-100 to-white' : 'bg-gradient-to-br from-gray-900 to-gray-800' } py-8 px-4 transition-colors duration-300`}>
            <div className="max-w-6xl mx-auto">
                
                
                {selectedSolution ? (
                    <>
                        {/* Top Section: Problem Header */}
                        <div className="mb-4">
                            <ProblemHeader solution={selectedSolution} />
                        </div>
                        
                        {/* Bottom Section: Tabs and Content */}
                        <div>
                            {/* Tab Navigation at start of the div */}
                            <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
                            
                            {/* Content Panel */}
                            {activeTab === 'solution' ? (
                                <SolutionPanel 
                                    solution={selectedSolution} 
                                    preferredLanguage={preferredLanguage}
                                    setPreferredLanguage={setPreferredLanguage}
                                    copied={copied}
                                    setCopied={setCopied}
                                />
                            ) : (
                                <ExplanationPanel solution={selectedSolution} />
                            )}
                        </div>
                    </>
                ) : (
                    <div className="p-10 text-center text-gray-400 dark:text-gray-600 bg-gray-800 dark:bg-white rounded-xl border border-gray-700 dark:border-gray-300">
                        <p>No solution selected. Please choose a problem from the list.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CodeQuestSolutionViewer;