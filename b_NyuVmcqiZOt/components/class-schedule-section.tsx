"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

const classes = {
  Monday: [
    { name: "Yoga Flow", time: "6:00 AM", duration: "60 min", type: "yoga" },
    { name: "HIIT Blast", time: "8:00 AM", duration: "45 min", type: "hiit" },
    { name: "Strength Training", time: "12:00 PM", duration: "60 min", type: "strength" },
    { name: "Cardio Burn", time: "5:00 PM", duration: "45 min", type: "cardio" },
    { name: "Evening Yoga", time: "7:00 PM", duration: "60 min", type: "yoga" },
  ],
  Tuesday: [
    { name: "Morning Cardio", time: "6:00 AM", duration: "45 min", type: "cardio" },
    { name: "Power Lifting", time: "9:00 AM", duration: "60 min", type: "strength" },
    { name: "HIIT Express", time: "12:30 PM", duration: "30 min", type: "hiit" },
    { name: "Yoga Basics", time: "5:30 PM", duration: "60 min", type: "yoga" },
    { name: "Night HIIT", time: "8:00 PM", duration: "45 min", type: "hiit" },
  ],
  Wednesday: [
    { name: "Sunrise Yoga", time: "5:30 AM", duration: "60 min", type: "yoga" },
    { name: "Cardio Mix", time: "7:30 AM", duration: "45 min", type: "cardio" },
    { name: "Strength Circuit", time: "11:00 AM", duration: "60 min", type: "strength" },
    { name: "HIIT Challenge", time: "4:00 PM", duration: "45 min", type: "hiit" },
    { name: "Relaxation Yoga", time: "6:30 PM", duration: "75 min", type: "yoga" },
  ],
  Thursday: [
    { name: "Early Bird Cardio", time: "6:00 AM", duration: "45 min", type: "cardio" },
    { name: "Core Strength", time: "10:00 AM", duration: "45 min", type: "strength" },
    { name: "Lunch HIIT", time: "12:00 PM", duration: "30 min", type: "hiit" },
    { name: "Vinyasa Flow", time: "5:00 PM", duration: "60 min", type: "yoga" },
    { name: "Evening Pump", time: "7:30 PM", duration: "60 min", type: "strength" },
  ],
  Friday: [
    { name: "Yoga Stretch", time: "6:30 AM", duration: "60 min", type: "yoga" },
    { name: "HIIT Friday", time: "8:30 AM", duration: "45 min", type: "hiit" },
    { name: "Cardio Dance", time: "12:00 PM", duration: "45 min", type: "cardio" },
    { name: "Strength Basics", time: "4:30 PM", duration: "60 min", type: "strength" },
    { name: "Restorative Yoga", time: "6:00 PM", duration: "75 min", type: "yoga" },
  ],
  Saturday: [
    { name: "Weekend Warrior", time: "8:00 AM", duration: "60 min", type: "hiit" },
    { name: "Yoga for All", time: "10:00 AM", duration: "60 min", type: "yoga" },
    { name: "Strength Saturday", time: "12:00 PM", duration: "60 min", type: "strength" },
    { name: "Cardio Party", time: "3:00 PM", duration: "45 min", type: "cardio" },
  ],
  Sunday: [
    { name: "Gentle Yoga", time: "9:00 AM", duration: "75 min", type: "yoga" },
    { name: "Light Cardio", time: "11:00 AM", duration: "30 min", type: "cardio" },
    { name: "Recovery Stretch", time: "4:00 PM", duration: "45 min", type: "yoga" },
  ],
}

const classTypeColors = {
  yoga: { bg: "bg-purple-100", text: "text-purple-700", border: "border-purple-200" },
  cardio: { bg: "bg-blue-100", text: "text-blue-700", border: "border-blue-200" },
  strength: { bg: "bg-orange-100", text: "text-orange-700", border: "border-orange-200" },
  hiit: { bg: "bg-red-100", text: "text-red-700", border: "border-red-200" },
}

const classTypeIcons = {
  yoga: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  cardio: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  strength: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
    </svg>
  ),
  hiit: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
    </svg>
  ),
}

export function ClassScheduleSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedDay, setSelectedDay] = useState("Monday")
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="classes"
      className="py-20 lg:py-32 bg-background"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-12 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            Weekly Timetable
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            <span className="text-balance">
              Class{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Schedule
              </span>
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Find the perfect class that fits your schedule. We offer a variety of sessions throughout the week.
          </p>
        </div>

        <div
          className={`flex flex-wrap justify-center gap-2 mb-8 transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
                selectedDay === day
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "bg-secondary text-secondary-foreground hover:bg-primary/10"
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {Object.entries(classTypeColors).map(([type, colors]) => (
            <div key={type} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${colors.bg}`} />
              <span className="text-sm text-muted-foreground capitalize">{type}</span>
            </div>
          ))}
        </div>

        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 transition-all duration-500 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {classes[selectedDay as keyof typeof classes].map((classItem, index) => {
            const colors = classTypeColors[classItem.type as keyof typeof classTypeColors]
            const icon = classTypeIcons[classItem.type as keyof typeof classTypeIcons]
            
            return (
              <Card
                key={`${classItem.name}-${index}`}
                className={`group border-border/50 bg-card overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${colors.border}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${colors.bg} ${colors.text}`}>
                          {icon}
                          {classItem.type.toUpperCase()}
                        </span>
                      </div>
                      <h3 className="font-bold text-foreground">{classItem.name}</h3>
                      <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {classItem.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          {classItem.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
