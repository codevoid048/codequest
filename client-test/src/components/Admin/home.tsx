import React, { useState, useEffect, FC } from 'react';
import { Code, Users, Award, BarChart } from 'lucide-react';
import { Button } from '../ui/button';

// Define interfaces for type safety
interface FeatureItem {
  text: string;
  icon: React.ReactNode;
}

const AdminHome: FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  
  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Define features with proper typing
  const features: FeatureItem[] = [
    { text: "View and manage user profiles", icon: <Users className="text-primary" /> },
    { text: "Create engaging coding challenges", icon: <Code className="text-primary" /> },
    { text: "Track completion metrics and awards", icon: <Award className="text-primary" /> },
    { text: "Analyze platform engagement statistics", icon: <BarChart className="text-primary" /> }
  ];

  return (
    <div className="h-screen bg-background text-foreground font-sans flex flex-col overflow-hidden">
      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center relative">
        <div className="max-w-3xl w-full mx-auto text-center px-4">
          {/* Logo */}
          <div className="mb-4 inline-block">
            <div className="relative">
              <div className="bg-primary rounded-full w-14 h-14 flex items-center justify-center relative">
                <Code className="text-primary-foreground w-8 h-8" />
              </div>
            </div>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            CodeQuest Admin
          </h1>
          
          {/* Welcome Message */}
          <p className="text-lg md:text-xl text-foreground mb-6">
            Welcome to your administrative portal
          </p>
          
          {/* Paragraph */}
          <p className="text-muted-foreground max-w-xl mx-auto mb-6 text-sm">
            Manage users, create coding challenges, track completions, 
            and analyze engagement metrics. All tools to inspire the next 
            generation of coders at your fingertips.
          </p>
          
          {/* Features list */}
          <div className="text-left max-w-md mx-auto mb-6 grid grid-cols-2 gap-4">
            {features.map((item: FeatureItem, index: number) => (
              <div key={index} className="flex items-center">
                <div className="mr-2 bg-secondary/30 p-1 rounded-full">
                  {React.cloneElement(item.icon as React.ReactElement, { size: 16 })}
                </div>
                <p className="text-sm">{item.text}</p>
              </div>
            ))}
          </div>
          
          {/* CTA Button */}
          <Button className='text-foreground cursor-pointer'>
            Enter Dashboard
          </Button>
          
          {/* Attribution */}
          <div className="mt-6">
            <p className="text-xs text-muted-foreground">
              - by SRKR Coding Club
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminHome;
