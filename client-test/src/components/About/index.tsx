"use client"

import { useState, useEffect } from "react"
import {
    Calendar,
    Trophy,
    Users,
    Code,
    BookOpen,
    Zap,
    ChevronDown,
    ArrowRight,
    Star,
    Award,
    Rocket,
    Heart,
} from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ParticlesBackground } from "@/components/particles-background";


export default function AboutPage() {

    const [activeTab, setActiveTab] = useState("club")
    const [activeFaq, setActiveFaq] = useState<number | null>(null)
    const [isVisible, setIsVisible] = useState<Record<string, boolean>>({
        hero: true,
        codequest: false,
        about: false,
        offers: false,
        events: false,
        team: false,
        faq: false,
        cta: false,
    })

    useEffect(() => {
        const handleScroll = () => {
            const sections = ["hero", "codequest", "about", "offers", "events", "team", "faq", "cta"]

            sections.forEach((section) => {
                const element = document.getElementById(section)
                if (element) {
                    const rect = element.getBoundingClientRect()
                    const isInView = rect.top < window.innerHeight * 0.75 && rect.bottom > 0
                    setIsVisible((prev) => ({ ...prev, [section]: isInView }))
                }
            })
        }

        window.addEventListener("scroll", handleScroll)
        handleScroll() // Check initial visibility

        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const teamMembers = [
        {
            id: 1,
            name: "Tony Stark",
            role: "Founder & President",
            bio: "Visionary leader with a passion for coding education.",
            image: "/placeholder.svg?height=150&width=150",
        },
        {
            id: 2,
            name: "Bruce Banner",
            role: "Vice President",
            bio: "Competitive programming expert and algorithm specialist.",
            image: "/placeholder.svg?height=150&width=150",
        },
        {
            id: 3,
            name: "Happy Hogan",
            role: "Head of Events",
            bio: "Organizes coding workshops and hackathons.",
            image: "/placeholder.svg?height=150&width=150",
        },
        {
            id: 4,
            name: "Peter Parker",
            role: "Technical Lead",
            bio: "Full-stack developer with expertise in web technologies.",
            image: "/placeholder.svg?height=150&width=150",
        },
    ]

    const faqItems = [
        {
            question: "How can I join the SRKRCoding Club?",
            answer: "Simply sign up on our website and attend our weekly coding sessions. New members are always welcome!",
        },
        {
            question: "Is the club open to all skill levels?",
            answer: "Yes! Whether you're a beginner or an expert, we have challenges and learning paths for everyone.",
        },
        {
            question: "What kind of events do you host?",
            answer:
                "We organize coding contests, hackathons, guest lectures, mentorship programs, and our flagship event CodeQuest.",
        },
        {
            question: "How does CodeQuest work?",
            answer:
                "CodeQuest is a timed programming challenge where you solve increasingly complex problems. Your solutions are evaluated in real-time, and you compete for positions on our leaderboard.",
        },
        {
            question: "Are there any membership fees?",
            answer:
                "Basic membership is free for all SRKR students. Premium membership with additional benefits is available for a nominal annual fee.",
        },
        {
            question: "Can I contribute to the platform?",
            answer:
                "We welcome contributions from members who want to help improve our platform, create challenges, or mentor others.",
        },
    ]

    const majorEvents = [
        {
            title: "CodeQuest Championship",
            description:
                "Our annual flagship competitive programming event with industry sponsors, challenging problems, and valuable prizes.",
            date: "November",
            icon: <Trophy className="h-6 w-6" />,
        },
        {
            title: "Hack-A-Thon Weekend",
            description:
                "48-hour hackathon where teams build innovative solutions to real-world problems with mentorship from industry experts.",
            date: "March",
            icon: <Rocket className="h-6 w-6" />,
        },
        {
            title: "Tech Talk Series",
            description:
                "Monthly sessions featuring guest speakers from leading tech companies sharing insights on emerging technologies.",
            date: "Monthly",
            icon: <Users className="h-6 w-6" />,
        },
        {
            title: "Code Sprint",
            description: "Bi-monthly rapid coding challenges designed to improve problem-solving speed and efficiency.problem-solving speed and efficiency.",
            date: "Bi-monthly",
            icon: <Zap className="h-6 w-6" />,
        },
    ]

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    }

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    }

    const itemVariant = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    }

    return (
        <div className="relative w-full min-h-screen">
            {/* Full-screen Particles Background */}
            <ParticlesBackground />
            <div className="relative z-10">
                <div className="container mx-auto py-10 px-4 text-gray-800 overflow-hidden">
                    {/* About CodeQuest Platform */}
                    <motion.section
                        id="codequest"
                        className="mb-20"
                        initial="hidden"
                        animate={isVisible.codequest ? "visible" : "hidden"}
                        variants={fadeIn}
                    >
                        <motion.div
                            className="bg-transparent rounded-3xl p-10"
                            transition={{ duration: 0.3 }}
                        >
                            <motion.h2
                                className="text-3xl font-bold text-center mb-8"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                                    CodeQuest Platform
                                </span>
                            </motion.h2>

                            <div className="max-w-4xl mx-auto text-white dark:text-muted-foreground">
                                <motion.p
                                    className="text-lg mb-6"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    CodeQuest at SRKRCoding Club offers an immersive programming challenge where participants solve
                                    increasingly complex coding problems within a time limit. It features competitive leaderboards, real-time
                                    feedback, and various difficulty levels to accommodate all skill sets.
                                </motion.p>

                                <motion.p
                                    className="text-lg mb-6"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    Winners receive recognition, prizes, and opportunities to connect with industry professionals for
                                    mentorship and career advancement.
                                </motion.p>

                                <motion.div
                                    className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8"
                                    variants={staggerContainer}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    <motion.div
                                        className="flex items-start space-x-4 bg-gray-800 dark:bg-muted/100 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                                        variants={itemVariant}
                                        whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                                    >
                                        <div className="bg-primary/10 p-3 rounded-lg">
                                            <Trophy className="h-8 w-8 text-primary flex-shrink-0" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-xl mb-2 text-primary">Competitive Leaderboards</h3>
                                            <p className="text-muted-foreground">
                                                Track your progress and compete with peers across different skill levels.
                                            </p>
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        className="flex items-start space-x-4 bg-gray-800 dark:bg-muted/100 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                                        variants={itemVariant}
                                        whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                                    >
                                        <div className="bg-primary/10 p-3 rounded-lg">
                                            <Zap className="h-8 w-8 text-primary flex-shrink-0" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-xl mb-2 text-primary">Real-time Feedback</h3>
                                            <p className="text-muted-foreground">
                                                Get immediate results and code analysis to improve your solutions.
                                            </p>
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        className="flex items-start space-x-4 bg-gray-800 dark:bg-muted/100 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                                        variants={itemVariant}
                                        whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                                    >
                                        <div className="bg-primary/10 p-3 rounded-lg">
                                            <Code className="h-8 w-8 text-primary flex-shrink-0" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-xl mb-2 text-primary">Multi-language Support</h3>
                                            <p className="text-muted-foreground">
                                                Solve problems in your preferred programming language with full support.
                                            </p>
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        className="flex items-start space-x-4 bg-gray-800 dark:bg-muted/100 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                                        variants={itemVariant}
                                        whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                                    >
                                        <div className="bg-primary/10 p-3 rounded-lg ">
                                            <Users className="h-8 w-8 text-primary flex-shrink-0" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-xl mb-2 text-primary">Industry Connections</h3>
                                            <p className="text-muted-foreground">Connect with mentors and recruiters from top tech companies.</p>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.section>

                    {/* About SRKR Coding Club */}
                    <motion.section
                        id="about"
                        className="mb-20"
                        initial="hidden"
                        animate={isVisible.about ? "visible" : "hidden"}
                        variants={fadeIn}
                    >
                        <motion.h2 className="text-3xl font-bold text-center mb-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                                About SRKRCoding Club
                            </span>
                        </motion.h2>

                        <Tabs defaultValue="club" value={activeTab} onValueChange={setActiveTab} className="w-full">
                            <div className="flex justify-center mb-8">
                                <TabsList className="grid grid-cols-2 w-full max-w-md">
                                    <TabsTrigger
                                        value="club"
                                        className="data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-300"
                                    >
                                        Our Story
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="achievements"
                                        className="data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-300"
                                    >
                                        Achievements
                                    </TabsTrigger>
                                </TabsList>
                            </div>

                            <TabsContent value="club" className="mt-0">
                                <motion.div
                                    className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <div className="lg:col-span-2">
                                        <motion.p
                                            className="text-lg mb-4 text-muted-foreground"
                                            initial={{ x: -20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: 0.1 }}
                                        >
                                            Founded in 2015, SRKRCoding Club is the premier technical community at SRKR Engineering College,
                                            dedicated to fostering coding excellence and innovation among students.
                                        </motion.p>
                                        <motion.p
                                            className="text-lg mb-4 text-muted-foreground"
                                            initial={{ x: -20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            Our mission is to create a collaborative environment where students can develop their programming
                                            skills, explore new technologies, and prepare for successful careers in the tech industry.
                                        </motion.p>
                                        <motion.p
                                            className="text-lg mb-4 text-muted-foreground"
                                            initial={{ x: -20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: 0.3 }}
                                        >
                                            With over 500 active members, we've become one of the largest and most active coding communities in
                                            the region, with alumni working at leading tech companies worldwide.
                                        </motion.p>
                                    </div>
                                    <motion.div
                                        className="relative"
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: 0.4, duration: 0.5 }}
                                    >
                                        <div className="absolute -inset-0.5 bg-gradient-to-r rounded-2xl blur opacity-80"></div>
                                        <div className="relative bg-gray-900  dark:bg-secondary rounded-2xl p-8 shadow-lg transform transition-transform duration-300 hover:scale-105">
                                            <div className="flex justify-center mb-6">
                                                <div className="relative">
                                                    <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary rounded-full blur-sm"></div>
                                                    <div className="relative bg-white/80 dark:bg-primary-foreground rounded-full p-3">
                                                        <Award className="h-10 w-10 text-primary" />
                                                    </div>
                                                </div>
                                            </div>
                                            <h3 className="text-xl text-muted-foreground font-semibold text-center mb-4">By the Numbers</h3>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="text-center p-3 bg-primary/20 rounded-lg hover:bg-primary/40 transition-all duration-300">
                                                    <div className="text-3xl font-bold text-primary">500+</div>
                                                    <div className="text-sm text-muted-foreground">Active Members</div>
                                                </div>
                                                <div className="text-center p-3 bg-primary/20 rounded-lg hover:bg-primary/40 transition-all duration-300">
                                                    <div className="text-3xl font-bold text-primary">50+</div>
                                                    <div className="text-sm text-muted-foreground">Events Hosted</div>
                                                </div>
                                                <div className="text-center p-3 bg-primary/20 rounded-lg hover:bg-primary/40 transition-all duration-300">
                                                    <div className="text-3xl font-bold text-primary">15+</div>
                                                    <div className="text-sm text-muted-foreground">Industry Partners</div>
                                                </div>
                                                <div className="text-center p-3 bg-primary/20 rounded-lg hover:bg-primary/40 transition-all duration-300">
                                                    <div className="text-3xl font-bold text-primary">8</div>
                                                    <div className="text-sm text-muted-foreground">Years of Excellence</div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            </TabsContent>

                            <TabsContent value="achievements" className="mt-0">
                                <motion.div
                                    className="bg-gradient-to-br p-8 rounded-2xl"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <h3 className="text-xl font-semibold mb-6 text-primary text-center">Club Achievements</h3>
                                    <motion.div
                                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                                        variants={staggerContainer}
                                        initial="hidden"
                                        animate="visible"
                                    >
                                        <motion.div
                                            className="flex items-start space-x-4 p-4  border border-primary/30 rounded-xl hover:bg-gray-700 transition-colors duration-300 bg-card text-card-foreground"
                                            variants={itemVariant}
                                        >
                                            <div className="bg-primary/10 p-2 rounded-full">
                                                <Trophy className="h-6 w-6 text-primary" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-muted-foreground">
                                                    Recognized as the Best Technical Club by SRKR Engineering College for 3 consecutive years
                                                </p>
                                            </div>
                                        </motion.div>

                                        <motion.div
                                            className="flex items-start space-x-4 p-4  border border-primary/30 rounded-xl hover:bg-gray-700 transition-colors duration-300 bg-card text-card-foreground"
                                            variants={itemVariant}
                                        >
                                            <div className="bg-primary/10 p-2 rounded-full">
                                                <Calendar className="h-6 w-6 text-primary" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-muted-foreground">Organized over 50 successful hackathons and coding competitions</p>
                                            </div>
                                        </motion.div>

                                        <motion.div
                                            className="flex items-start space-x-4 p-4  border border-primary/30 rounded-xl hover:bg-gray-700 transition-colors duration-300 bg-card text-card-foreground"
                                            variants={itemVariant}
                                        >
                                            <div className="bg-primary/10 p-2 rounded-full">
                                                <Users className="h-6 w-6 text-primary" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-muted-foreground">Partnered with 15+ tech companies for events and recruitment</p>
                                            </div>
                                        </motion.div>

                                        <motion.div
                                            className="flex items-start space-x-4 p-4 border border-primary/30 rounded-xl hover:bg-gray-700 transition-colors duration-300 bg-card text-card-foreground"
                                            variants={itemVariant}
                                        >
                                            <div className="bg-primary/10 p-2 rounded-full">
                                                <Award className="h-6 w-6 text-primary" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-muted-foreground">Members have won national-level coding competitions</p>
                                            </div>
                                        </motion.div>

                                        <motion.div
                                            className="flex items-start space-x-4 p-4 border border-primary/30 rounded-xl hover:bg-gray-700 transition-colors duration-300 bg-card text-card-foreground"
                                            variants={itemVariant}
                                        >
                                            <div className="bg-primary/10 p-2 rounded-full ">
                                                <Code className="h-6 w-6 text-primary" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-muted-foreground">Developed multiple open-source projects with real-world applications</p>
                                            </div>
                                        </motion.div>

                                        <motion.div
                                            className="flex items-start space-x-4 p-4 border border-primary/30 rounded-xl hover:bg-gray-700 transition-colors  duration-300 bg-card text-card-foreground"
                                            variants={itemVariant}
                                        >
                                            <div className="bg-primary/10 p-2 rounded-full">
                                                <Star className="h-6 w-6 text-primary" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-muted-foreground">Recognized by leading tech companies for talent development</p>
                                            </div>
                                        </motion.div>
                                    </motion.div>
                                </motion.div>
                            </TabsContent>
                        </Tabs>
                    </motion.section>

                    {/* What We Offer */}
                    <motion.section
                        id="offers"
                        className="mb-20"
                        initial="hidden"
                        animate={isVisible.offers ? "visible" : "hidden"}
                        variants={fadeIn}
                    >
                        <motion.h2 className="text-3xl font-bold text-center mb-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                                What We Offer
                            </span>
                        </motion.h2>

                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                            variants={staggerContainer}
                            initial="hidden"
                            animate="visible"
                        >
                            <motion.div
                                className="group relative overflow-hidden rounded-2xl"
                                variants={itemVariant}
                                whileHover={{ y: -5 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-primary opacity-0 group-hover:opacity-90 transition-opacity duration-300 z-10"></div>
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/20 "></div>
                                <div className="relative z-20 p-8 h-full flex flex-col">
                                    {/* Icon + Title Wrapper */}
                                    <div className="flex items-center gap-3">
                                        {/* Icon with Blurred Border */}
                                        <div className="relative">
                                            {/* Blurred Border Effect */}
                                            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary rounded-full blur-sm"></div>

                                            {/* Icon Container */}
                                            <div className="relative bg-white dark:bg-primary-foreground rounded-full p-3 w-14 h-14 flex items-center justify-center shadow-md 
                                            group-hover:bg-foreground/30 group-hover:text-white transition-colors duration-300">
                                                <Code className="h-8 w-8 text-primary group-hover:text-white transition-colors duration-300" />
                                            </div>
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-xl font-semibold text-primary group-hover:text-white transition-colors duration-300">
                                            Daily Coding Challenges
                                        </h3>
                                    </div>

                                    {/* Description (Below) */}
                                    <p className="text-muted-foreground group-hover:text-white/90 transition-colors duration-300 mt-2 opacity-100 group-hover:opacity-100">
                                        Sharpen your skills with daily problems curated for all levels, from beginner to advanced.
                                    </p>

                                </div>

                            </motion.div>

                            <motion.div
                                className="group relative overflow-hidden rounded-2xl"
                                variants={itemVariant}
                                whileHover={{ y: -5 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-primary opacity-0 group-hover:opacity-90 transition-opacity duration-300 z-10"></div>
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/20"></div>
                                <div className="relative z-20 p-8 h-full flex flex-col">
                                    <div className="flex items-center gap-3">
                                        {/* Icon */}
                                        <div className="relative">
                                            {/* Blurred Border Effect */}
                                            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary rounded-full blur-sm"></div>

                                            <div className="relative bg-white dark:bg-primary-foreground rounded-full p-3 w-14 h-14 flex items-center justify-center shadow-md 
                                            group-hover:bg-foreground/30 group-hover:text-white transition-colors duration-300">
                                                <BookOpen className="h-8 w-8 text-primary group-hover:text-white transition-colors duration-300" />
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-semibold text-primary group-hover:text-white transition-colors duration-300 mb-2">
                                            Workshops & Seminars
                                        </h3>
                                    </div>
                                    <p className="text-muted-foreground group-hover:text-white/90 transition-colors duration-300 mt-2 opacity-100 group-hover:opacity-100">
                                        Learn from industry experts through live sessions on cutting-edge technologies and best practices.
                                    </p>

                                </div>
                            </motion.div>

                            <motion.div
                                className="group relative overflow-hidden rounded-2xl"
                                variants={itemVariant}
                                whileHover={{ y: -5 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-primary opacity-0 group-hover:opacity-90 transition-opacity duration-300 z-10"></div>
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/20"></div>
                                <div className="relative z-20 p-8 h-full flex flex-col">
                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            {/* Blurred Border Effect */}
                                            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary rounded-full blur-sm"></div>

                                            <div className="relative bg-white dark:bg-primary-foreground rounded-full p-3 w-14 h-14 flex items-center justify-center shadow-md 
                                            group-hover:bg-foreground/30 group-hover:text-white transition-colors duration-300">
                                                <Trophy className="h-8 w-8 text-primary group-hover:text-white transition-colors duration-300 " />
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-semibold text-primary group-hover:text-white transition-colors duration-300 mb-2">
                                            Hackathons & Competitions
                                        </h3>
                                    </div>
                                    <p className="text-muted-foreground group-hover:text-white/90 transition-colors duration-300 mt-2 opacity-100 group-hover:opacity-100">
                                        Compete, collaborate, and innovate in coding contests with attractive prizes and recognition.
                                    </p>

                                </div>
                            </motion.div>

                            <motion.div
                                className="group relative overflow-hidden rounded-2xl"
                                variants={itemVariant}
                                whileHover={{ y: -5 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-primary opacity-0 group-hover:opacity-90 transition-opacity duration-300 z-10"></div>
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/20"></div>
                                <div className="relative z-20 p-8 h-full flex flex-col">
                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            {/* Blurred Border Effect */}
                                            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary rounded-full blur-sm"></div>

                                            <div className="relative bg-white dark:bg-primary-foreground rounded-full p-3 w-14 h-14 flex items-center justify-center shadow-md 
                                            group-hover:bg-foreground/30 group-hover:text-white transition-colors duration-300">
                                                <Users className="h-8 w-8 text-primary group-hover:text-white transition-colors duration-300" />
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-semibold text-primary group-hover:text-white transition-colors duration-300 mb-2">
                                            Mentorship Program
                                        </h3>
                                    </div>
                                    <p className="text-muted-foreground group-hover:text-white/90 transition-colors duration-300 mt-auto opacity-100 group-hover:opacity-100">
                                        Get personalized guidance from senior members and industry professionals to accelerate your growth.
                                    </p>

                                </div>
                            </motion.div>

                            <motion.div
                                className="group relative overflow-hidden rounded-2xl"
                                variants={itemVariant}
                                whileHover={{ y: -5 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-primary opacity-0 group-hover:opacity-90 transition-opacity duration-300 z-10"></div>
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/20"></div>
                                <div className="relative z-20 p-8 h-full flex flex-col">
                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            {/* Blurred Border Effect */}
                                            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary rounded-full blur-sm"></div>

                                            <div className="relative bg-white dark:bg-primary-foreground rounded-full p-3 w-14 h-14 flex items-center justify-center shadow-md 
                                            group-hover:bg-foreground/30 group-hover:text-white transition-colors duration-300">
                                                <Zap className="h-8 w-8 text-primary group-hover:text-white transition-colors duration-300" />
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-semibold text-primary group-hover:text-white transition-colors duration-300 mb-2">
                                            Project Collaboration
                                        </h3>
                                    </div>
                                    <p className="text-muted-foreground group-hover:text-white/90 transition-colors duration-300 mt-auto opacity-100 group-hover:opacity-100">
                                        Work on real-world projects in teams to build your portfolio and gain practical experience.
                                    </p>

                                </div>
                            </motion.div>

                            <motion.div
                                className="group relative overflow-hidden rounded-2xl"
                                variants={itemVariant}
                                whileHover={{ y: -5 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-primary opacity-0 group-hover:opacity-90 transition-opacity duration-300 z-10"></div>
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/20"></div>
                                <div className="relative z-20 p-8 h-full flex flex-col">
                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            {/* Blurred Border Effect */}
                                            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary rounded-full blur-sm"></div>

                                            <div className="relative bg-white dark:bg-primary-foreground rounded-full p-3 w-14 h-14 flex items-center justify-center shadow-md 
                                            group-hover:bg-foreground/30 group-hover:text-white transition-colors duration-300">
                                                <Calendar className="h-8 w-8 text-primary group-hover:text-white transition-colors duration-300" />
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-semibold text-primary group-hover:text-white transition-colors duration-300 mb-2">
                                            Industry Connect
                                        </h3>
                                    </div>
                                    <p className="text-muted-foreground group-hover:text-white/90 transition-colors duration-300 mt-auto opacity-100 group-hover:opacity-100">
                                        Network with recruiters and professionals from leading tech companies for internship and job
                                        opportunities.
                                    </p>

                                </div>
                            </motion.div>
                        </motion.div>
                    </motion.section>

                    {/* Major Events */}
                    <motion.section
                        id="events"
                        className="mb-20"
                        initial="hidden"
                        animate={isVisible.events ? "visible" : "hidden"}
                        variants={fadeIn}
                    >
                        <motion.h2 className="text-3xl font-bold text-center mb-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                                Major Events
                            </span>
                        </motion.h2>

                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-3 gap-10"
                            variants={staggerContainer}
                            initial="hidden"
                            animate="visible"
                        >
                            {majorEvents.map((event, index) => (
                                <motion.div
                                    key={index}
                                    className="relative overflow-hidden group"
                                    variants={itemVariant}
                                    whileHover={{ y: -5 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/15 rounded-2xl -z-10"></div>
                                    <Card className="border border-primary/10 hover:border-primary/30 transition-all duration-300 group-hover:shadow-lg mb-5 h-50">
                                        <CardContent className="pb-4">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="bg-primary/70 p-3 rounded-full group-hover:bg-primary/20 transition-colors duration-300">
                                                        {event.icon}
                                                    </div>
                                                    <h3 className="text-xl font-semibold text-primary">{event.title}</h3>
                                                </div>
                                                <Badge
                                                    variant="outline"
                                                    className="bg-primary/10 text-primary border-primary/20 px-3 py-1 text-sm font-medium"
                                                >
                                                    {event.date}
                                                </Badge>
                                            </div>
                                            <p className="text-muted-foreground">{event.description}</p>
                                            <div className="mt-4 flex justify-end">
                                            </div>
                                        </CardContent>
                                    </Card>

                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.section>

                    {/* Meet the Team */}
                    <motion.section
                        id="team"
                        className="mb-20 text-center"
                        initial="hidden"
                        animate={isVisible.team ? "visible" : "hidden"}
                        variants={fadeIn}
                    >
                        <motion.h2 className="text-3xl font-bold mb-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                                Meet Our Team
                            </span>
                        </motion.h2>

                        <motion.div
                            className="flex flex-wrap justify-center gap-8"
                            variants={staggerContainer}
                            initial="hidden"
                            animate="visible"
                        >
                            {teamMembers.map((member) => (
                                <motion.div
                                    key={member.id}
                                    className="group"
                                    variants={itemVariant}
                                    whileHover={{ y: -10 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="relative">
                                        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-primary/60 rounded-2xl blur opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                                        <Card className="relative bg-card shadow-lg rounded-2xl p-6 text-center w-64 border-primary/10 group-hover:border-transparent transition-all duration-300">
                                            <div className="flex justify-center mb-4">
                                                <div className="relative">
                                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-primary/60 rounded-full blur opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                                                    <Avatar className="h-24 w-24 border-2 border-primary/20 group-hover:border-primary/50 transition-all duration-300">
                                                        <AvatarImage src={member.image} alt={member.name} />
                                                        <AvatarFallback className="bg-primary/10 text-primary">
                                                            {member.name
                                                                .split(" ")
                                                                .map((n) => n[0])
                                                                .join("")}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                </div>
                                            </div>
                                            <h3 className="text-xl font-semibold text-primary mb-1">{member.name}</h3>
                                            <p className="text-muted-foreground mb-3 text-sm">{member.role}</p>
                                            <p className="text-card-foreground text-sm">{member.bio}</p>
                                            <div className="mt-4 pt-4 border-t border-primary/10 flex justify-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="16"
                                                        height="16"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className="text-primary"
                                                    >
                                                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                                        <rect x="2" y="9" width="4" height="12"></rect>
                                                        <circle cx="4" cy="4" r="2"></circle>
                                                    </svg>
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="16"
                                                        height="16"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className="text-primary"
                                                    >
                                                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                                                    </svg>
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="16"
                                                        height="16"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className="text-primary"
                                                    >
                                                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                                    </svg>
                                                </Button>
                                            </div>
                                        </Card>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.section>

                    {/* FAQ Section */}
                    <motion.section
                        id="faq"
                        className="mb-20"
                        initial="hidden"
                        animate={isVisible.faq ? "visible" : "hidden"}
                        variants={fadeIn}
                    >
                        <motion.h2 className="text-3xl font-bold text-center mb-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/90">
                                Frequently Asked Questions
                            </span>
                        </motion.h2>

                        <motion.div className="max-w-3xl mx-auto" variants={staggerContainer} initial="hidden" animate="visible">
                            {faqItems.map((item, index) => (
                                <motion.div key={index} className="mb-4" variants={itemVariant}>
                                    <div
                                        className={`border border-primary/10 rounded-lg shadow-sm p-4 cursor-pointer bg-card transition-all duration-300 ${activeFaq === index ? "bg-card" : "hover:bg-0"
                                            }`}
                                        onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                                    >
                                        <div className="font-semibold text-lg text-primary  flex justify-between items-center">
                                            {item.question}
                                            <motion.span animate={{ rotate: activeFaq === index ? 180 : 0 }} transition={{ duration: 0.3 }}>
                                                <ChevronDown className="h-5 w-5 text-primary" />
                                            </motion.span>
                                        </div>
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{
                                                height: activeFaq === index ? "auto" : 0,
                                                opacity: activeFaq === index ? 1 : 0,
                                            }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <p className="text-muted-foreground mt-4 ">{item.answer}</p>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.section>
                </div>
            </div>
        </div>

    )
}
