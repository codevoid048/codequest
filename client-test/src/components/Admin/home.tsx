import React, { useState, useEffect, FC } from 'react';
import { Code, Users, Award, BarChart } from 'lucide-react';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

interface FeatureItem {
  text: string;
  icon: React.ReactNode;
}

const AdminHome: FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const features: FeatureItem[] = [
    { text: "Manage Users", icon: <Users className="text-indigo-600" /> },
    { text: "Create Challenges", icon: <Code className="text-emerald-600" /> },
    { text: "Track Awards", icon: <Award className="text-yellow-500" /> },
    { text: "View Analytics", icon: <BarChart className="text-pink-500" /> }
  ];

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background">
        <Loader2 className="animate-spin h-10 w-10 text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
      <main className="flex-grow flex flex-col items-center justify-center p-6">
        <div className="max-w-4xl w-full text-center">
          {/* Logo */} 
          <div className="mb-6">
            <div className="bg-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto shadow-lg">
              <Code className="text-primary-foreground w-8 h-8" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            CodeQuest Admin Portal
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
            Effortlessly manage users, build coding challenges, and track performance metrics — all in one place.
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto mb-10">
            {features.map((item, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-muted rounded-xl shadow-sm hover:shadow-md transition-all border border-border">
                <div className="p-2 bg-background rounded-full shadow">
                  {React.cloneElement(item.icon as React.ReactElement, { size: 24 })}
                </div>
                <div className="text-left">
                  <h4 className="text-md font-medium">{item.text}</h4>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <Button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-2 text-lg rounded-xl shadow hover:shadow-md transition"
          >
            Enter Dashboard
          </Button>

          {/* Footer Attribution */}
          <div className="mt-6">
            <p className="text-xs text-muted-foreground">
              — by SRKR Coding Club
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminHome;
