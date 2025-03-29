import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Eye } from "lucide-react";

interface ProblemStatusProps {
  problem: {
    id: number;  // Changed from string to match your challenge interface
    status: "Solved" | "Unsolved";
    createdAt: Date;
  };
  markSolved: (id: number) => void;
  viewSolution: (id: number) => void;
}

const ProblemStatus: React.FC<ProblemStatusProps> = ({ 
  problem, 
  markSolved, 
  viewSolution 
}) => {
  // Function to check if solution button should be displayed
  const canShowSolutionButton = () => {
    if (problem.status !== "Solved") return false;
    
    const createdDate = new Date(problem.createdAt);
    const nextDay = new Date(createdDate);
    nextDay.setDate(createdDate.getDate() + 1);
    nextDay.setHours(0, 0, 0, 0); // Set to start of next day
    
    const now = new Date();
    return now >= nextDay;
  };

  return (
    <div className="flex flex-col gap-2 self-start sm:self-center min-w-[100px]">
      {problem.status === "Solved" ? (
        <div className="flex flex-col gap-2">
          <Badge
            variant="outline"
            className="bg-emerald-900/5 dark:bg-emerald-100 text-emerald-400 dark:text-emerald-800 text-xs py-1 px-2 w-full text-center flex items-center justify-center border-emerald-200 dark:border-emerald-800"
          >
            <CheckCircle className="h-3 w-3 mr-1" /> Solved
          </Badge>

          {canShowSolutionButton() && (
            <Button
              size="sm"
              variant="outline"
              className="text-xs py-1 px-2 w-full border-blue-500 hover:bg-blue-500/10 hover:text-blue-500 transition-colors duration-200 text-foreground"
              onClick={(e) => {
                e.stopPropagation();
                viewSolution(problem.id);
              }}
            >
              <Eye className="h-3 w-3 mr-1" /> View Solution
            </Button>
          )}
        </div>
      ) : (
        <Button
          size="sm"
          variant="outline"
          className="text-xs py-1 px-2 w-full border-primary hover:bg-primary/10 hover:text-primary transition-colors duration-200 text-foreground"
          onClick={(e) => {
            e.stopPropagation();
            markSolved(problem.id);
          }}
        >
          Mark Solved
        </Button>
      )}
    </div>
  );
};

export default ProblemStatus;