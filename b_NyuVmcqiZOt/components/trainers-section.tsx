"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useAuth } from "@/components/auth-provider"
import { ChevronLeft, ChevronRight, Users, Award, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="url(#instagram-gradient-trainer)"
    >
      <defs>
        <linearGradient id="instagram-gradient-trainer" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFDC80" />
          <stop offset="25%" stopColor="#FCAF45" />
          <stop offset="50%" stopColor="#F77737" />
          <stop offset="75%" stopColor="#F56040" />
          <stop offset="87.5%" stopColor="#FD1D1D" />
          <stop offset="100%" stopColor="#E1306C" />
        </linearGradient>
      </defs>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  )
}

const trainers = [
  {
    name: "Sarah Johnson",
    specialization: "Yoga",
    experience: "8 years",
    bio: "Certified yoga instructor passionate about mindfulness and flexibility training.",
    image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&h=500&fit=crop",
    instagram: "@sarahyoga",
    color: "from-emerald-500 to-teal-600",
  },
  {
    name: "Mike Chen",
    specialization: "Cardio",
    experience: "6 years",
    bio: "High-energy cardio specialist helping members achieve their endurance goals.",
    image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=400&h=500&fit=crop",
    instagram: "@mikefitness",
    color: "from-orange-500 to-red-600",
  },
  {
    name: "Emma Williams",
    specialization: "Strength Training",
    experience: "10 years",
    bio: "Strength coach dedicated to building power and proper form in every workout.",
    image: "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?w=400&h=500&fit=crop",
    instagram: "@emmastrong",
    color: "from-blue-500 to-indigo-600",
  },
  {
    name: "James Rodriguez",
    specialization: "Weightlifting",
    experience: "12 years",
    bio: "Olympic weightlifting coach with a track record of producing champions.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=500&fit=crop",
    instagram: "@jameslifts",
    color: "from-purple-500 to-pink-600",
  },
]

export function TrainersSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const { isAuthenticated } = useAuth()

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

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % trainers.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + trainers.length) % trainers.length)
  }

  return (
    <section
      ref={sectionRef}
      id="trainers"
      className="relative py-20 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />
      
      {/* Animated Background Elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-40 left-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-float-delay" />
      
      {/* Floating Icons */}
      <div className="absolute top-32 left-20 hidden lg:block animate-float-slow">
        <div className="w-14 h-14 rounded-2xl bg-primary/20 backdrop-blur-sm flex items-center justify-center rotate-12">
          <Users className="w-7 h-7 text-primary" />
        </div>
      </div>
      <div className="absolute bottom-32 right-32 hidden lg:block animate-float">
        <div className="w-12 h-12 rounded-2xl bg-accent/20 backdrop-blur-sm flex items-center justify-center -rotate-12">
          <Award className="w-6 h-6 text-accent" />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm text-primary text-sm font-semibold mb-4 border border-primary/20">
            <Users className="w-4 h-4" />
            Expert Team
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            <span className="text-balance">
              Meet Our{" "}
              <span className="text-white">
                Trainers
              </span>
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Our certified professionals are dedicated to helping you achieve your fitness goals.
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-6">
          {trainers.map((trainer, index) => (
            <Card
              key={trainer.name}
              className={`group border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-4 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={trainer.image}
                  alt={trainer.name}
                  className={`w-full h-full object-cover transition-all duration-700 ${hoveredCard === index ? 'scale-110 brightness-75' : 'scale-100'}`}
                />
                
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${trainer.color} opacity-0 group-hover:opacity-60 transition-opacity duration-500`} />
                
                {/* Specialization Badge */}
                <div className={`absolute bottom-4 left-4 right-4 transition-all duration-500 ${hoveredCard === index ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                  <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm text-sm font-semibold text-foreground`}>
                    <Award className="w-4 h-4" />
                    {trainer.specialization}
                  </span>
                </div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                  {trainer.name}
                </h3>
                <p className={`text-sm font-semibold bg-gradient-to-r ${trainer.color} bg-clip-text text-transparent`}>
                  {trainer.experience} experience
                </p>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2 group-hover:line-clamp-none transition-all">
                  {trainer.bio}
                </p>
                
                {/* Action Buttons */}
                <div className="flex gap-2 mt-4">
                  <Link href={isAuthenticated ? "/book-session" : "/login"} className="flex-1">
                    <Button 
                      size="sm" 
                      className={`w-full font-semibold bg-gradient-to-r ${trainer.color} hover:opacity-90 shadow-lg transition-all duration-300 hover:scale-[1.02]`}
                    >
                      <Calendar className="w-4 h-4 mr-1" />
                      Book Session
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mobile Slider */}
        <div className="lg:hidden relative">
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {trainers.map((trainer) => (
                <div key={trainer.name} className="w-full flex-shrink-0 px-2">
                  <Card className="border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden">
                    <div className="relative h-72 overflow-hidden">
                      <img
                        src={trainer.image}
                        alt={trainer.name}
                        className="w-full h-full object-cover"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent`} />
                      <div className="absolute bottom-4 left-4">
                        <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${trainer.color} text-white text-xs font-semibold`}>
                          {trainer.specialization}
                        </span>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-bold text-foreground">{trainer.name}</h3>
                      <p className={`text-sm font-semibold bg-gradient-to-r ${trainer.color} bg-clip-text text-transparent`}>
                        {trainer.experience} experience
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">{trainer.bio}</p>
                      <div className="flex gap-2 mt-4">
                        <Link href={isAuthenticated ? "/book-session" : "/login"} className="flex-1">
                          <Button size="sm" className={`w-full font-semibold bg-gradient-to-r ${trainer.color}`}>
                            <Calendar className="w-4 h-4 mr-1" />
                            Book Session
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-xl bg-card/80 backdrop-blur-sm border border-border/50 flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 shadow-lg"
              aria-label="Previous trainer"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <div className="flex gap-2">
              {trainers.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "bg-gradient-to-r from-primary to-accent w-8" : "bg-primary/30 w-3"
                  }`}
                  aria-label={`Go to trainer ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-xl bg-card/80 backdrop-blur-sm border border-border/50 flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 shadow-lg"
              aria-label="Next trainer"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
