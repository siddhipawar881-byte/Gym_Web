"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Mail } from "lucide-react"

const mockUsers = [
  "test@gmail.com",
  "member@example.com",
  "john@powerfit.com",
]

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!email.trim()) {
      setError("Please enter your email address")
      return
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address")
      return
    }

    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1200))

      if (mockUsers.includes(email.toLowerCase())) {
        setSuccess("Password reset link sent to your email")
      } else {
        setError("Email not found")
      }
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <Card className="w-full max-w-md relative z-10 border-border/50 bg-card/80 backdrop-blur-sm">
        <CardHeader className="text-center pb-0">
          <Link href="/login" className="inline-flex items-center justify-center gap-2 mb-6 group">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary transition-transform duration-300 group-hover:scale-110">
              <Mail className="h-6 w-6 text-primary-foreground" />
            </div>
          </Link>
          <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
            Forgot Password
          </h1>
          <p className="text-muted-foreground mt-2">
            Enter your email to receive a password reset link.
          </p>
        </CardHeader>

        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm text-center">
                {error}
              </div>
            )}
            {success && (
              <div className="p-3 rounded-lg bg-primary/10 text-primary text-sm text-center">
                {success}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 border-input focus:ring-2 focus:ring-primary transition-all"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 font-semibold text-base bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30"
              disabled={isLoading}
            >
              {isLoading ? "Sending link..." : "Send Reset Link"}
            </Button>
          </form>

          <div className="mt-6 text-center space-y-4">
            <p className="text-muted-foreground text-sm">
              Remembered your password?{' '}
              <Link href="/login" className="text-primary font-semibold hover:underline">
                Sign In
              </Link>
            </p>
            <Button variant="outline" className="w-full gap-2" onClick={() => router.push("/") }>
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
