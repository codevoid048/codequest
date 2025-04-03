"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Upload, CheckCircle, User, Mail, Hash, BookOpen, Building, Code } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import axios from "axios"
import { useAuth } from "@/context/AuthContext"
import { toast } from "react-hot-toast"

export default function ProfileEditForm() {
    const { user, token, fetchUser } = useAuth()

    // console.log("User from AuthContext:", user)
    // console.log("Token from AuthContext:", token)

    interface ProfileFormData {
        name: string
        username: string
        email: string
        registerNumber: string
        branch: string
        college: string
        image: string
        isAffiliate: boolean
        otherLinks: { platform: string; url: string }[]
    }

    const [formData, setFormData] = useState<ProfileFormData>({
        name: "",
        username: "",
        email: "",
        registerNumber: "",
        branch: "",
        college: "",
        image: "",
        isAffiliate: false,
        otherLinks: [
            { platform: "leetcode", url: "" },
            { platform: "github", url: "" },
            { platform: "codeforces", url: "" },
            { platform: "hackerrank", url: "" }, // Added this to match your UI
        ],
    })

    const [image, setImage] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [buttonText, setButtonText] = useState("Save Registration");


    // Log token whenever it changes (for debugging)
    useEffect(() => {
        console.log("Token in ProfileEditForm:", token)

        // If user data is available, pre-fill the form
        if (user) {
            setFormData((prevData) => ({
                ...prevData,
                name: user.name || "",
                email: user.email || "",
                username: user.username || "",
                registerNumber: user.RegistrationNumber || "",
                branch: user.branch || "",
                college: user.collegeName || "",
                image: user.image || "",
                isAffiliate: user.isAffiliate || false,
                // Handle otherLinks if available
                otherLinks: user.otherLinks || formData.otherLinks,
            }))

            if (user.image) {
                setImage(user.image)
            }
        }
    }, [user, token])

    // Attempt to refresh auth token on component mount
    useEffect(() => {
        fetchUser()
    }, [])

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader()
            reader.onload = (event) => {
                const result = event.target?.result as string
                setImage(result)
                setFormData((prev) => ({ ...prev, image: result }))
            }
            reader.readAsDataURL(e.target.files[0])
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target
        setFormData((prev) => ({ ...prev, [id]: value }))
    }

    const handleAffiliateChange = (checked: boolean) => {
        setFormData((prev) => ({ ...prev, isAffiliate: checked }))
    }

    const handleLinkChange = (platform: string, value: string) => {
        setFormData((prevData: ProfileFormData) => ({
            ...prevData,
            otherLinks: prevData.otherLinks.map((link) => (link.platform === platform ? { ...link, url: value } : link)),
        }))
    }

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    }

    const item = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300 } },
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setButtonText("Saving...");

        // Basic validation
        if (!formData.name || !formData.email) {
            alert("Please fill in required fields (Name and Email)");
            setIsLoading(false);
            return
        }

        // Get token from context or localStorage as fallback
        const currentToken = token || localStorage.getItem("auth_token");
        console.log("Current token in ProfileEditForm:", currentToken);
        console.log("Form data being submitted:", formData);

        if (!currentToken) {
            alert("User is not authenticated. Please log in.");
            setIsLoading(false);
            return
        }

        try {
            const response = await axios.put("http://localhost:5000/api/profile/update", formData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${currentToken}`,
                },
                withCredentials: true,
            })

            if (response.status === 200) {
                toast.success("Profile updated successfully!")
                // Refresh user data after successful update
                await new Promise((resolve) => setTimeout(resolve, 1000));
                // Fetch updated user data
                await fetchUser();
                setButtonText("Saved "); // Show saved state
                setTimeout(() => setButtonText("Save Registration"), 3000); // Reset after 2 sec
                // fetchUser()
            }
        } catch (error: any) {
            console.error("Error updating profile:", error)

            if (error.response) {
                alert(`Error: ${error.response.data.message || "Failed to update profile"}`)
            } else if (error.request) {
                alert("No response from server. Please check your network connection.")
            } else {
                toast.error("Failed to update profile. Please try again.")
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen p-6 flex items-center justify-center bg-background overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-background"></div>

            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-3xl z-10"
            >
                <Card className="border border-border/50 shadow-lg backdrop-blur-sm bg-card/80">
                    <CardContent className="p-0">
                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            <motion.div
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="text-center"
                            >
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                                    Coding Club Registration
                                </h1>
                                <p className="text-muted-foreground mt-2">Join our community of passionate coders</p>
                            </motion.div>

                            <motion.div
                                variants={container}
                                initial="hidden"
                                animate="show"
                                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                            >
                                {/* User Image Upload */}
                                <motion.div variants={item} className="md:col-span-2 flex flex-col items-center justify-center">
                                    <div
                                        className="relative w-32 h-32 rounded-full border-2 border-dashed border-primary/50 flex items-center justify-center overflow-hidden group cursor-pointer hover:border-primary transition-colors duration-300"
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        {image ? (
                                            <img src={image || "/placeholder.svg"} alt="User" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="text-center p-4">
                                                <Upload className="w-10 h-10 mx-auto text-primary group-hover:scale-110 transition-transform duration-300" />
                                                <p className="text-xs mt-2 text-muted-foreground">Upload Photo</p>
                                            </div>
                                        )}
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleImageUpload}
                                            className="hidden"
                                            accept="image/*"
                                        />
                                        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>
                                </motion.div>

                                {/* Personal Information */}
                                <motion.div variants={item} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="flex items-center gap-2">
                                            <User className="w-4 h-4" /> Name
                                        </Label>
                                        <div className="relative">
                                            <Input
                                                id="name"
                                                placeholder="Enter your full name"
                                                className="bg-background/50 border-input focus:border-primary transition-colors duration-300 pl-3"
                                                value={formData.name}
                                                onChange={handleChange}
                                            />
                                            <div className="absolute bottom-0 left-0 w-0 group-focus-within:w-full h-0.5 bg-primary transition-all duration-300"></div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="username" className="flex items-center gap-2">
                                            <User className="w-4 h-4" /> Username
                                        </Label>
                                        <Input
                                            id="username"
                                            placeholder="Choose a username"
                                            className="bg-background/50 border-input focus:border-primary transition-colors duration-300"
                                            value={formData.username}
                                            onChange={handleChange}
                                            disabled={true} // Disable the input field
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="flex items-center gap-2">
                                            <Mail className="w-4 h-4" /> Email
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="Enter your email address"
                                            className="bg-background/50 border-input focus:border-primary transition-colors duration-300"
                                            value={formData.email}
                                            onChange={handleChange}
                                            disabled={true} // Disable the input field
                                        />
                                    </div>
                                </motion.div>

                                <motion.div variants={item} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="registerNumber" className="flex items-center gap-2">
                                            <Hash className="w-4 h-4" /> Register Number
                                        </Label>
                                        <Input
                                            id="registerNumber"
                                            placeholder="Enter your register number"
                                            className="bg-background/50 border-input focus:border-primary transition-colors duration-300"
                                            value={formData.registerNumber}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="branch" className="flex items-center gap-2">
                                            <BookOpen className="w-4 h-4" /> Branch
                                        </Label>
                                        <Input
                                            id="branch"
                                            placeholder="Enter your branch"
                                            className="bg-background/50 border-input focus:border-primary transition-colors duration-300"
                                            value={formData.branch}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="college" className="flex items-center gap-2">
                                            <Building className="w-4 h-4" /> College
                                        </Label>
                                        <Input
                                            id="college"
                                            placeholder="Enter your college name"
                                            className="bg-background/50 border-input focus:border-primary transition-colors duration-300"
                                            value={formData.college}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </motion.div>

                                {/* Coding Profiles */}
                                <motion.div variants={item} className="md:col-span-2">
                                    <div className="bg-secondary/20 rounded-lg p-4 border border-border/50">
                                        <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                                            <Code className="w-5 h-5 text-primary" /> Coding Profiles
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="leetcode">LeetCode</Label>
                                                <Input
                                                    id="leetcode"
                                                    placeholder="Your LeetCode username"
                                                    className="bg-background/50 border-input focus:border-primary transition-colors duration-300"
                                                    value={formData.otherLinks.find((link) => link.platform === "leetcode")?.url || ""}
                                                    onChange={(e) => handleLinkChange("leetcode", e.target.value)}
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="github">GitHub</Label>
                                                <Input
                                                    id="github"
                                                    placeholder="Your GitHub username"
                                                    className="bg-background/50 border-input focus:border-primary transition-colors duration-300"
                                                    value={formData.otherLinks.find((link) => link.platform === "github")?.url || ""}
                                                    onChange={(e) => handleLinkChange("github", e.target.value)}
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="codeforces">Codeforces</Label>
                                                <Input
                                                    id="codeforces"
                                                    placeholder="Your Codeforces username"
                                                    className="bg-background/50 border-input focus:border-primary transition-colors duration-300"
                                                    value={formData.otherLinks.find((link) => link.platform === "codeforces")?.url || ""}
                                                    onChange={(e) => handleLinkChange("codeforces", e.target.value)}
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="hackerrank">HackerRank</Label>
                                                <Input
                                                    id="hackerrank"
                                                    placeholder="Your HackerRank username"
                                                    className="bg-background/50 border-input focus:border-primary transition-colors duration-300"
                                                    value={formData.otherLinks.find((link) => link.platform === "hackerrank")?.url || ""}
                                                    onChange={(e) => handleLinkChange("hackerrank", e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Checkbox and Submit */}
                                <motion.div variants={item} className="md:col-span-2 space-y-6">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="affiliate" checked={formData.isAffiliate} value={formData.isAffiliate ? "true" : "false"} onCheckedChange={handleAffiliateChange} />
                                        <Label
                                            htmlFor="affiliate"
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                        >
                                            Are you an SRKR CODING CLUB Affiliate?
                                        </Label>
                                    </div>

                                    <motion.div className="flex justify-center" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                        <Button
                                            type="submit"
                                            className="w-full md:w-1/2 bg-primary hover:bg-primary/90 text-primary-foreground group relative overflow-hidden"
                                            size="lg"
                                            disabled={isLoading}
                                        >
                                            <span className="relative z-10 flex items-center gap-2">
                                                <CheckCircle className="w-5 h-5 group-hover:animate-pulse" />
                                                {buttonText}
                                            </span>
                                            <span className="absolute inset-0 bg-gradient-to-r from-primary to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                        </Button>
                                    </motion.div>
                                </motion.div>
                            </motion.div>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}

