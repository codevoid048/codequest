import React from 'react';
import { Button } from "@/components/ui/button";
import { Eye, Code, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
interface ProblemStatusProps {
  problem: {
    id: string;
    status: string;
    createdAt: Date;
    title?: string;
    description?: string;
    problemUrl?: string;
  };
}

const SolutionStatus: React.FC<ProblemStatusProps> = ({ problem }) => {
  // Function to check if solution button should be displayed
  const canShowSolutionButton = () => {
    const createdDate = new Date(problem.createdAt);
    const nextDay = new Date(createdDate);
    nextDay.setDate(createdDate.getDate() + 1);
    nextDay.setHours(0, 0, 0, 0);
    
    const now = new Date();
    return now >= nextDay;
  };

  const handleViewSolution = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/challenges/solution/${problem.id}`);
  };

  const isChallengeSolved = (challengeId: string) => {
    if (!user?.solveChallenges) return false;
    
    // Check if the challenge ID exists in any difficulty array
    return (
      user.solveChallenges.easy.some(item => item.challenge === challengeId) ||
      user.solveChallenges.medium.some(item => item.challenge === challengeId) ||
      user.solveChallenges.hard.some(item => item.challenge === challengeId)
    );
  };

  const navigate = useNavigate();
  const { user } = useAuth();

  const isSolved = isChallengeSolved(problem.id) ? "Solved" : "Not Solved";

  return (
    <div className="flex flex-col gap-2 self-start sm:self-center min-w-[100px]">
      {isSolved === "Solved" ? (
        <>
          {problem.status = "Solved"}
          <Button
            size="sm"
            className="text-xs py-1 px-2 w-full bg-green-600 hover:bg-green-700 text-white border-0 transition-colors duration-200"
            onClick={(e) => {
              e.stopPropagation();
              window.open(problem.problemUrl, '_blank');
            }}
          >
            <CheckCircle className="h-3 w-3 mr-1" /> Solved
          </Button>
        </>
      ) : (
        <Button
          size="sm"
          variant="outline"
          className="text-xs py-1 px-2 w-full border-primary hover:bg-primary/10 hover:text-primary transition-colors duration-200 text-foreground"
          onClick={(e) => {
            e.stopPropagation();
            window.open(problem.problemUrl, '_blank');
          }}
        >
          <Code className="h-3 w-3 mr-1" /> Solve Now
        </Button>
      )}

      {canShowSolutionButton() && (
        <Button
          size="sm"
          variant="outline"
          className="text-xs py-1 px-2 w-full border-blue-500 hover:bg-blue-500/10 hover:text-blue-500 transition-colors duration-200 text-foreground"
          onClick={handleViewSolution}
        >
          <Eye className="h-3 w-3 mr-1" /> View Solution
        </Button>
      )}
    </div>
  );
};

export default SolutionStatus;