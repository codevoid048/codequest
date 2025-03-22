import { useState } from "react"

import { motion } from "framer-motion"
import { ArrowRight, CheckCircle, Clock, Code2, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom"

export function DailyChallengeCard() {
    const [isHovered, setIsHovered] = useState(false)

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
            <Card className="overflow-hidden border-2 transition-all duration-300 hover:border-primary/50 hover:shadow-lg">
                <CardHeader className="bg-muted/50 pb-4">
                    <div className="flex items-center justify-between">
                        <Badge variant="outline" className="bg-primary/10 text-primary">
                            <Clock className="mr-1 h-3 w-3" /> Daily Challenge
                        </Badge>
                        <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500">
                            <Zap className="mr-1 h-3 w-3" /> Medium
                        </Badge>
                    </div>
                    <CardTitle className="text-2xl mt-2">Array Manipulation: Two Sum</CardTitle>
                    <CardDescription>March 17, 2025</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="space-y-4">
                        <p>
                            Given an array of integers <code className="bg-muted px-1 py-0.5 rounded">nums</code> and an integer{" "}
                            <code className="bg-muted px-1 py-0.5 rounded">target</code>, return the indices of the two numbers such
                            that they add up to <code className="bg-muted px-1 py-0.5 rounded">target</code>.
                        </p>
                        <p>
                            You may assume that each input would have exactly one solution, and you may not use the same element
                            twice.
                        </p>

                        <div className="bg-muted p-4 rounded-md">
                            <p className="font-medium mb-2">Example:</p>
                            <p className="font-mono text-sm">
                                Input: nums = [2, 7, 11, 15], target = 9<br />
                                Output: [0, 1]
                                <br />
                                Explanation: Because nums[0] + nums[1] == 9, we return [0, 1]
                            </p>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center">
                                <Code2 className="mr-1 h-4 w-4" />
                                <span>JavaScript, Python, Java</span>
                            </div>
                            <div className="flex items-center">
                                <CheckCircle className="mr-1 h-4 w-4" />
                                <span>2,145 submissions</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="bg-muted/30 flex justify-between items-center">
                    <div>
                        <p className="text-sm text-muted-foreground">Solve this challenge to earn 50 points</p>
                    </div>
                    <Button asChild className="group">
                        <Link to="/challenges/two-sum">
                            Solve Challenge
                            <motion.div animate={{ x: isHovered ? 4 : 0 }} transition={{ duration: 0.2 }}>
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </motion.div>
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    )
}

