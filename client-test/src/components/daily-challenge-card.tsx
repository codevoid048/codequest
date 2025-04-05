import { useState, useEffect, JSX } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Clock, Award, Flame } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom"
import axios from "axios"

// Define types for the API response
interface ChallengeApiResponse {
    challenges: ApiChallenge[];
}

interface ApiChallenge {
    _id: string;
    title: string;
    difficulty: "Easy" | "Medium" | "Hard";
    createdAt: string;
    category: string[];
    description: string;
    problemLink: string;
    platform: string;
}

// Define types for our component state
interface DailyChallenge {
    id: string;
    title: string;
    difficulty: "Easy" | "Medium" | "Hard";
    date: string;
    categories: string[];
    description: string;
    problemUrl: string;
    platform: string;
}

interface CountdownState {
    hours: string;
    minutes: string;
    seconds: string;
}

export function DailyChallengeCard(): JSX.Element {
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [dailyChallenge, setDailyChallenge] = useState<DailyChallenge | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [countdown, setCountdown] = useState<CountdownState>({
        hours: "00",
        minutes: "00",
        seconds: "00"
    });

    useEffect(() => {
        const fetchDailyChallenge = async (): Promise<void> => {
            try {
                const res = await axios.get<ChallengeApiResponse>('http://localhost:5000/api/challenges');
                if (res.data && Array.isArray(res.data.challenges)) {
                    // Find today's challenge
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);

                    const todayChallenge = res.data.challenges.find((challenge) => {
                        const challengeDate = new Date(challenge.createdAt);
                        challengeDate.setHours(0, 0, 0, 0);
                        return challengeDate.getTime() === today.getTime();
                    });

                    // If no challenge for today, use the most recent one
                    const challenge = todayChallenge || res.data.challenges[0];

                    if (challenge) {
                        setDailyChallenge({
                            id: challenge._id,
                            title: challenge.title,
                            difficulty: challenge.difficulty,
                            date: new Date(challenge.createdAt).toLocaleDateString("en-US", {
                                month: "long",
                                day: "numeric",
                                year: "numeric"
                            }),
                            categories: challenge.category,
                            description: challenge.description,
                            problemUrl: challenge.problemLink,
                            platform: challenge.platform
                        });
                    }
                }
                setIsLoading(false);
            } catch (error) {
                console.error("Failed to fetch daily challenge", error);
                setIsLoading(false);
            }
        };

        fetchDailyChallenge();
    }, []);

    useEffect(() => {
        const updateCountdown = (): void => {
            const now = new Date();
            const midnight = new Date(now);
            midnight.setHours(24, 0, 0, 0);
            const timeDiff = midnight.getTime() - now.getTime();
            const hours = Math.floor(timeDiff / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
            setCountdown({
                hours: hours.toString().padStart(2, "0"),
                minutes: minutes.toString().padStart(2, "0"),
                seconds: seconds.toString().padStart(2, "0")
            });
        };

        updateCountdown();
        const timer = setInterval(updateCountdown, 1000);
        return () => clearInterval(timer);
    }, []);

    const getDifficultyIcon = (difficulty: "Easy" | "Medium" | "Hard" | undefined): JSX.Element | null => {
        if (!difficulty) return null;

        const icons = {
            "Easy": <Award className="mr-1 h-4 w-4 text-emerald-500" />,
            "Medium": <Flame className="mr-1 h-4 w-4 text-amber-500" />,
            "Hard": <Award className="mr-1 h-4 w-4 text-rose-500" />
        };

        return icons[difficulty];
    };

    const getDifficultyClass = (difficulty: "Easy" | "Medium" | "Hard" | undefined): string => {
        if (!difficulty) return "";

        const classes = {
            "Easy": "bg-emerald-500/10 text-emerald-500",
            "Medium": "bg-amber-500/10 text-amber-500",
            "Hard": "bg-rose-500/10 text-rose-500"
        };

        return classes[difficulty];
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="max-w-3xl mx-auto"
        >
            <Card className="overflow-hidden border-2 transition-all duration-300 hover:border-primary/50 hover:shadow-lg w-full content-center">
                {isLoading ? (
                    <div className="flex justify-center items-center p-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                    </div>
                ) : dailyChallenge ? (
                    <>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <Badge variant="outline" className="bg-primary/10 text-primary flex items-center">
                                    <Clock className="mr-1 h-4 w-4" />
                                    <span>Daily Challenge</span>
                                    <span className="ml-2 bg-card text-foreground px-1 py-0.5 rounded text-xs">
                                        {countdown.hours}:{countdown.minutes}:{countdown.seconds}
                                    </span>
                                    
                                {dailyChallenge.platform && (
                                    <Badge variant="outline" className="text-xs bg-secondary/50">
                                        {dailyChallenge.platform}
                                    </Badge>
                                )}
                                </Badge>
                                <Badge variant="outline" className={`flex items-center ${getDifficultyClass(dailyChallenge.difficulty)}`}>
                                    {getDifficultyIcon(dailyChallenge.difficulty)}
                                    <span>{dailyChallenge.difficulty}</span>
                                </Badge>
                            </div>
                            <CardTitle className="text-2xl mt-2">{dailyChallenge.title}</CardTitle>
                            <CardDescription>{dailyChallenge.date}</CardDescription>
                        </CardHeader>
                        <CardContent className="pb-0">
                            <p className="text-sm text-muted-foreground line-clamp-2">{dailyChallenge.description}</p>
                            <div className="flex flex-wrap gap-2 mt-3">
                                {dailyChallenge.categories && dailyChallenge.categories.map((category) => (
                                    <Badge key={category} variant="secondary" className="text-xs">
                                        {category}
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between items-center mt-4">
                            <div>
                                <p className="text-sm text-muted-foreground">Solve this challenge to earn points</p>
                            </div>
                            <Button asChild className="group">
                                <Link to={`/challenges/${dailyChallenge.id}`}>
                                    Solve Challenge
                                    <motion.div animate={{ x: isHovered ? 4 : 0 }} transition={{ duration: 0.2 }}>
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </motion.div>
                                </Link>
                            </Button>
                        </CardFooter>
                    </>
                ) : (
                    <CardContent className="p-6 text-center">
                        <p className="text-muted-foreground">No daily challenge available</p>
                    </CardContent>
                )}
            </Card>
        </motion.div>
    );
}

export default DailyChallengeCard;