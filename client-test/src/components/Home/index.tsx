import { Link } from "react-router-dom"
import { ArrowRight, Code, Trophy, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DailyChallengeCard } from "@/components/daily-challenge-card"
import { HeroSection } from "@/components/hero-section"
import { FeatureCard } from "@/components/feature-card"

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            <HeroSection />

            <section className="container py-12 space-y-6 md:py-16 lg:py-24">
                <div className="text-center space-y-4">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How CodeQuest Works</h2>
                    <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                        Join thousands of students improving their coding skills with daily challenges
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <FeatureCard
                        icon={<Code className="h-10 w-10 text-primary" />}
                        title="Daily Challenges"
                        description="New coding problems every day across different difficulty levels and programming concepts"
                    />
                    <FeatureCard
                        icon={<Users className="h-10 w-10 text-primary" />}
                        title="Community Learning"
                        description="Share solutions, discuss approaches, and learn from peers in a collaborative environment"
                    />
                    <FeatureCard
                        icon={<Trophy className="h-10 w-10 text-primary" />}
                        title="Track Progress"
                        description="Earn points, unlock achievements, and climb the leaderboard as you solve more challenges"
                    />
                </div>
            </section>

            <section className="bg-muted py-12 md:py-16 lg:py-24">
                <div className="container space-y-8">
                    <div className="text-center space-y-4">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Today's Challenge</h2>
                        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                            Solve today's problem and start your coding streak
                        </p>
                    </div>

                    <DailyChallengeCard />

                    <div className="flex justify-center">
                        <Button asChild size="lg" className="group">
                            <Link to="/challenges">
                                View All Challenges
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            <section className="container py-12 space-y-8 md:py-16 lg:py-24">
                <div className="text-center space-y-4">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Join Our Community</h2>
                    <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                        Connect with other coders, share your solutions, and learn together
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <Card>
                        <CardHeader>
                            <CardTitle>10,000+</CardTitle>
                            <CardDescription>Active Users</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Join a thriving community of coders from around the world.</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>500+</CardTitle>
                            <CardDescription>Challenges</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                                Access our growing library of coding challenges across all difficulty levels.
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>24/7</CardTitle>
                            <CardDescription>Support</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Get help from our community and mentors whenever you need it.</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="flex justify-center pt-8">
                    <Button asChild size="lg" variant="secondary" className="group">
                        <Link to="/register">
                            Start Coding Today
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </Button>
                </div>
            </section>
        </div>
    )
}

