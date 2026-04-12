"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Dumbbell, Flame, Zap } from "lucide-react"

// Count-up animation hook
function useCountUp(end: number, duration: number = 2000, startCounting: boolean = false) {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    if (!startCounting) return
    
    let startTime: number | null = null
    let animationFrame: number
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * end))
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }
    
    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration, startCounting])
  
  return count
}

// Stat Card Component with count-up animation
function StatCard({ value, label, suffix = "", delay, isVisible }: { 
  value: number | string
  label: string
  suffix?: string
  delay: number
  isVisible: boolean
}) {
  const [startCounting, setStartCounting] = useState(false)
  const numericValue = typeof value === 'number' ? value : parseInt(value) || 0
  const count = useCountUp(numericValue, 2000, startCounting)
  const isNumeric = typeof value === 'number' || !isNaN(parseInt(value))
  
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setStartCounting(true), delay)
      return () => clearTimeout(timer)
    }
  }, [isVisible, delay])
  
  return (
    <div 
      className={`text-center p-5 rounded-2xl bg-card/40 backdrop-blur-md border border-border/50 
        hover:bg-card/60 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10
        transition-all duration-500 hover:scale-110 hover:-translate-y-2 cursor-default group
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
        {isNumeric ? count : value}{suffix}
      </div>
      <div className="text-sm text-muted-foreground mt-1 font-medium group-hover:text-foreground transition-colors">
        {label}
      </div>
    </div>
  )
}

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [statsVisible, setStatsVisible] = useState(false)
  const statsRef = useRef<HTMLDivElement>(null)
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    setIsVisible(true)
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true)
        }
      },
      { threshold: 0.5 }
    )

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const stats = [
    { value: 500, label: "Members", suffix: "+" },
    { value: 20, label: "Trainers", suffix: "+" },
    { value: 50, label: "Classes", suffix: "+" },
    { value: "24/7", label: "Access", suffix: "" },
  ]

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-gym.jpg"
          alt="Modern gym interior"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/80 to-primary/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Animated Background Elements */}
      <div 
        className="absolute top-20 left-10 w-72 h-72 bg-primary/30 rounded-full blur-3xl animate-float"
        style={{ transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)` }}
      />
      <div 
        className="absolute bottom-20 right-10 w-96 h-96 bg-accent/30 rounded-full blur-3xl animate-float-delay"
        style={{ transform: `translate(${mousePosition.x * -0.5}px, ${mousePosition.y * -0.5}px)` }}
      />
      <div 
        className="absolute top-1/2 left-1/4 w-48 h-48 bg-primary/20 rounded-full blur-2xl animate-float-slow"
      />
      
      {/* Floating Icons */}
      <div className="absolute top-32 right-20 hidden lg:block animate-float">
        <div className="w-16 h-16 rounded-2xl bg-primary/20 backdrop-blur-sm flex items-center justify-center rotate-12 hover-glow transition-all">
          <Dumbbell className="w-8 h-8 text-primary" />
        </div>
      </div>
      <div className="absolute bottom-40 left-20 hidden lg:block animate-float-delay">
        <div className="w-14 h-14 rounded-2xl bg-accent/20 backdrop-blur-sm flex items-center justify-center -rotate-12 hover-glow transition-all">
          <Flame className="w-7 h-7 text-accent" />
        </div>
      </div>
      <div className="absolute top-1/2 right-32 hidden lg:block animate-float-slow">
        <div className="w-12 h-12 rounded-2xl bg-primary/20 backdrop-blur-sm flex items-center justify-center rotate-6 hover-glow transition-all">
          <Zap className="w-6 h-6 text-primary" />
        </div>
      </div>

      {/* Decorative Grid Pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center">
          {/* Badge */}
          <div
            className={`transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 backdrop-blur-sm text-primary text-sm font-semibold mb-6 border border-primary/20 hover:bg-primary/20 transition-colors cursor-default">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Welcome to PowerFit Gym
            </span>
          </div>

          {/* Main Heading */}
          <h1
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ fontFamily: "var(--font-heading)" }}
          >
            <span className="text-balance">
              Transform Your Body.
              <br />
              <span className="text-white">
                Transform Your Life.
              </span>
            </span>
          </h1>

          {/* Description */}
          <p
            className={`mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty transition-all duration-1000 delay-400 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Join the ultimate fitness experience with state-of-the-art equipment,
            certified trainers, and a community that pushes you to be your best.
          </p>

          {/* CTA Buttons */}
          <div
            className={`mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 delay-600 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <Link href={isAuthenticated ? "#membership" : "/login"}>
              <Button
                size="lg"
                className="text-lg px-8 py-6 font-semibold bg-primary hover:bg-primary/90 shadow-xl shadow-primary/25 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/40 hover:scale-105 hover:-translate-y-1 group animate-pulse-glow"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-2" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 font-semibold border-2 border-primary/30 hover:border-primary hover:bg-primary/10 transition-all duration-300 hover:scale-105 hover:-translate-y-1 group backdrop-blur-sm"
              onClick={() => {
                document.getElementById("membership")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              <Play className="mr-2 h-5 w-5 text-primary transition-all group-hover:scale-125 group-hover:text-accent" />
              View Membership Plans
            </Button>
          </div>

          {/* Stats with Count-up Animation */}
          <div
            ref={statsRef}
            className={`mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto transition-all duration-1000 delay-800 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {stats.map((stat, index) => (
              <StatCard
                key={stat.label}
                value={stat.value}
                label={stat.label}
                suffix={stat.suffix}
                delay={index * 150}
                isVisible={statsVisible}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs text-muted-foreground font-medium">Scroll Down</span>
          <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center hover:border-primary transition-colors">
            <div className="w-1.5 h-3 bg-primary rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  )
}
