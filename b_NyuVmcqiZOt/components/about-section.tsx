"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Dumbbell, Users, Heart, Target, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: Dumbbell,
    title: "Modern Equipment",
    description: "State-of-the-art fitness machines and free weights for every workout style.",
    color: "from-[#3b82f6] to-[#7c3aed]",
  },
  {
    icon: Users,
    title: "Certified Trainers",
    description: "Expert trainers with years of experience to guide your fitness journey.",
    color: "from-[#7c3aed] to-[#ec4899]",
  },
  {
    icon: Heart,
    title: "Friendly Environment",
    description: "A welcoming community that supports and motivates each other.",
    color: "from-[#ec4899] to-[#be123c]",
  },
  {
    icon: Target,
    title: "Personalized Training",
    description: "Custom workout plans tailored to your specific goals and needs.",
    color: "from-[#9333ea] to-[#7c3aed]",
  },
]

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
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
      id="about"
      className="relative py-20 lg:py-32 overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/about-gym.jpg"
          alt="Fitness training"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a]/95 via-[#0f172a]/90 to-[#7c3aed]/10" />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-[#7c3aed] to-[#ec4899] rounded-full blur-3xl opacity-20 animate-float-slow" />
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-bl from-[#ec4899] to-[#7c3aed] rounded-full blur-3xl opacity-20 animate-float" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div
            className={`transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm text-primary text-sm font-semibold mb-4 border border-primary/20">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              About Us
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              <span className="text-balance">
                Welcome to{" "}
                <span className="text-white">
                  PowerFit Gym
                </span>
              </span>
            </h2>
            <div className="space-y-4 text-muted-foreground text-lg leading-relaxed text-justify">
              <p className={`transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                At PowerFit Gym, we believe fitness is more than just exercise — it&apos;s a lifestyle.
                Our mission is to provide a premium fitness experience that empowers you to reach
                your full potential.
              </p>
              <p className={`transition-all duration-700 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                With cutting-edge equipment, expert trainers, and a supportive community, we create
                an environment where transformation happens. Whether you&apos;re a beginner or an
                athlete, we have everything you need to succeed.
              </p>
              <p className={`transition-all duration-700 delay-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                Join us and discover why thousands of members trust PowerFit Gym for their fitness
                journey. Your transformation starts here.
              </p>
            </div>
            
            {/* Learn More Button */}
            <button 
              className={`mt-8 inline-flex items-center gap-2 text-primary font-semibold group transition-all duration-700 delay-800 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              onClick={() => document.getElementById("trainers")?.scrollIntoView({ behavior: "smooth" })}
            >
              Meet Our Trainers
              <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
            </button>
          </div>

          {/* Feature Cards */}
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 gap-4 transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            {features.map((feature, index) => (
              <Card
                key={feature.title}
                className={`group relative border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl cursor-pointer ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${400 + index * 100}ms` }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Gradient Border on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                {/* Animated Shine Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 animate-shimmer" />
                </div>
                
                <CardContent className="relative p-6 z-10">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 transition-all duration-500 ${hoveredIndex === index ? 'scale-110 rotate-6' : ''} shadow-lg`}>
                    <feature.icon className="h-7 w-7 text-white transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                  
                  {/* Arrow indicator */}
                  <div className="mt-4 flex items-center text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
                    <span className="text-sm font-medium">Learn more</span>
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
