"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from 'react-hot-toast';
import { ExternalLink, X } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useAuth } from "@/context/AuthContext"

interface PlatformVerificationProps {
  platformType: string
  isLinked: boolean
  username?: string
  stats?: {
    solved?: number
    rank?: number | string
    rating?: number
  }
  onVerify: (platform: string, username: string) => Promise<boolean>
}

export function PlatformVerification({ platformType, isLinked, username, stats, onVerify }: PlatformVerificationProps) {
  const [isLinking, setIsLinking] = useState(false)
  const [inputUsername, setInputUsername] = useState("")
  const { verificationString, setVerificationString } = useAuth()
  const [isVerifying, setIsVerifying] = useState(false)
  const [timeLeft, setTimeLeft] = useState(120)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const platformLinks = {
    leetcode: "https://leetcode.com/profile/",
    codechef: `https://www.codechef.com/users/${inputUsername}/edit`,
    codeforces: "https://codeforces.com/settings/social",
    gfg: "https://www.geeksforgeeks.org/edit-profile/",
  }

  const platformNames = {
    leetcode: "LeetCode",
    codechef: "CodeChef",
    codeforces: "CodeForces",
    gfg: "GeeksForGeeks",
  }

  const platformColors = {
    leetcode: "#FFA116",
    codechef: "#745D0B",
    codeforces: "#318CE7",
    gfg: "#2F8D46",
  }

  useEffect(() => {
    if (isVerifying) {
      // Start the timer
      setTimeLeft(120)
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleCancel()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isVerifying])

  const handleLinkClick = () => {
    const randomString = Array.from({ length: 8 }, () => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join('');
    setVerificationString(randomString)
    //console.log("Generated Random String:", verificationString, randomString);
    setIsLinking(true)
  }

  const handleVerifyClick = () => {
    if (!inputUsername.trim()) {
      toast.error("Username required")
      return
    }
    setIsVerifying(true)
  }

  const handleCancel = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    setIsVerifying(false)
    setIsLinking(false)
    setInputUsername("")
    setVerificationString("") // Reset the verification string
  }

  const handleConfirmVerification = async () => {
    try {
      const success = await onVerify(platformType, inputUsername)
      if (success) {
        toast.success(`Your ${platformNames[platformType as keyof typeof platformNames]} account for ${inputUsername} has been linked.`)

        handleCancel()
        // Update the UI to reflect the linked status
        
        setIsLinking(false);
        setIsVerifying(false);
      } else {
        toast.error("Verification failed, try again")
      }
    } catch (error) {
      toast.error("Verification failed, try again")
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const platformLink = platformLinks[platformType as keyof typeof platformLinks]
  const platformName = platformNames[platformType as keyof typeof platformNames]
  const platformColor = platformColors[platformType as keyof typeof platformColors]

  if (isLinked && username) {
    return (
      <Card className="border-l-4 rounded-lg shadow-sm p-3" style={{ borderLeftColor: platformColor }}>
        <div className="flex justify-between items-center">
          <div>
            <div className="font-medium">{platformName}</div>
            <div className="text-sm text-muted-foreground">@{username}</div>
          </div>
          <div className="text-lg font-bold" style={{ color: platformColor }}>
            {stats?.rating || 0}
          </div>
        </div>
      </Card>
    )
  }

  return (
    <>
      <Card className="border-l-4 rounded-lg shadow-sm p-3" style={{ borderLeftColor: platformColor }}>
        <div className="flex justify-between items-center">
          <div>
            <div className="font-medium">{platformName}</div>
            <div className="text-sm text-muted-foreground">Not linked</div>
          </div>
          <Button variant="outline" size="sm" onClick={handleLinkClick} className="text-sm">
            Link
          </Button>
        </div>
      </Card>

      <Dialog open={isLinking && !isVerifying} onOpenChange={(open) => !open && handleCancel()}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Link {platformName} Account</DialogTitle>
            <DialogDescription>Enter your {platformName} username to verify your account</DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2 py-4">
            <div className="grid flex-1 gap-2">
              <Input
                value={inputUsername}
                onChange={(e) => setInputUsername(e.target.value)}
                placeholder={`Enter your ${platformName} username`}
              />
            </div>
            <Button type="submit" onClick={handleVerifyClick}>
              Verify
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isVerifying} onOpenChange={(open) => !open && handleCancel()}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Verify {platformName} Account</DialogTitle>
            <DialogDescription>Follow these steps to verify your account</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Instructions:</p>
              <p className="text-sm text-muted-foreground">
                Click the link below to visit your {platformName} profile. Temporarily update your Name / First Name / Your name field to the given random string for verification.
              </p>
            </div>

            <div className="flex items-center justify-between">
              <a
                href={`${platformLink}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-primary flex items-center"
              >
                Open {platformName} Profile <ExternalLink className="ml-1 h-3 w-3" />
              </a>
              <div className="text-sm font-medium text-amber-600">Time left: {formatTime(timeLeft)}</div>
            </div>

            <div className="bg-muted p-3 rounded-md">
              {/* <p className="text-sm font-medium">Verification Code:</p> */}
              <p className="text-lg font-mono font-bold tracking-wider">{verificationString}</p>
            </div>
          </div>
          <DialogFooter className="sm:justify-between">
            <Button variant="outline" onClick={handleCancel}>
              <X className="mr-2 h-4 w-4" /> Cancel
            </Button>
            <Button onClick={handleConfirmVerification}>Verify</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

