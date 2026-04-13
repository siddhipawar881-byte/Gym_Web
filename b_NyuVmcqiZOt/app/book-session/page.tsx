"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Dumbbell, ArrowLeft, Calendar, Clock, User, CheckCircle } from "lucide-react"

const trainers = [
  { id: "1", name: "Priya Sharma", specialization: "Yoga" },
  { id: "2", name: "Rajesh Kumar", specialization: "Cardio" },
  { id: "3", name: "Anjali Patel", specialization: "Strength Training" },
  { id: "4", name: "Arjun Singh", specialization: "Weightlifting" },
]

const timeSlots = [
  "6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM",
  "6:00 PM", "7:00 PM", "8:00 PM"
]

export default function BookSessionPage() {
  const [selectedTrainer, setSelectedTrainer] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [notes, setNotes] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isBooked, setIsBooked] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const router = useRouter()
  const { isAuthenticated, user } = useAuth()

  useEffect(() => {
    setIsVisible(true)
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsBooked(true)
    setIsLoading(false)
  }

  const getTomorrowDate = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().split("T")[0]
  }

  if (!isAuthenticated) {
    return null
  }

  if (isBooked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 p-4">
        <Card className="w-full max-w-md border-border/50 bg-card/80 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Session Booked!
            </h2>
            <p className="text-muted-foreground mb-6">
              Your training session has been successfully scheduled. We&apos;ll send you a confirmation email shortly.
            </p>
            <div className="bg-secondary/50 rounded-lg p-4 mb-6 text-left">
              <p className="text-sm text-muted-foreground">Trainer</p>
              <p className="font-semibold text-foreground">
                {trainers.find(t => t.id === selectedTrainer)?.name}
              </p>
              <p className="text-sm text-muted-foreground mt-3">Date & Time</p>
              <p className="font-semibold text-foreground">
                {new Date(selectedDate).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })} at {selectedTime}
              </p>
            </div>
            <Link href="/">
              <Button className="w-full">Back to Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 p-4 py-12">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <Card
        className={`w-full max-w-lg relative z-10 border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <CardHeader className="text-center pb-0">
          <Link href="/" className="inline-flex items-center justify-center gap-2 mb-6 group">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary transition-transform duration-300 group-hover:scale-110">
              <Dumbbell className="h-7 w-7 text-primary-foreground" />
            </div>
          </Link>
          <h1
            className="text-2xl font-bold text-foreground"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Book a Training Session
          </h1>
          <p className="text-muted-foreground mt-2">
            Welcome back, {user?.name}! Schedule your next workout.
          </p>
        </CardHeader>

        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                Select Trainer
              </label>
              <div className="grid grid-cols-2 gap-3">
                {trainers.map((trainer) => (
                  <button
                    key={trainer.id}
                    type="button"
                    onClick={() => setSelectedTrainer(trainer.id)}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      selectedTrainer === trainer.id
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <p className="font-semibold text-sm text-foreground">{trainer.name}</p>
                    <p className="text-xs text-muted-foreground">{trainer.specialization}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="date" className="text-sm font-medium text-foreground flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                Select Date
              </label>
              <Input
                id="date"
                type="date"
                min={getTomorrowDate()}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="h-12 border-input focus:ring-2 focus:ring-primary transition-all"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                Select Time
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setSelectedTime(time)}
                    className={`px-2 py-2 rounded-lg border text-sm font-medium transition-all ${
                      selectedTime === time
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border hover:border-primary/50 text-foreground"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="notes" className="text-sm font-medium text-foreground">
                Additional Notes (Optional)
              </label>
              <textarea
                id="notes"
                placeholder="Any specific goals or concerns..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                rows={3}
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 font-semibold text-base bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30"
              disabled={isLoading || !selectedTrainer || !selectedDate || !selectedTime}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Booking...
                </span>
              ) : (
                "Book Session"
              )}
            </Button>
          </form>

          <div className="mt-6">
            <Link href="/">
              <Button variant="outline" className="w-full gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
