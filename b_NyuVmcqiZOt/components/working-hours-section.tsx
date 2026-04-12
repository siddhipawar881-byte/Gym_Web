"use client"

import { useEffect, useRef, useState } from "react"
import { Clock, Sun, Moon, Sunrise } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const schedule = [
  {
    days: "Monday - Friday",
    hours: "5:00 AM - 11:00 PM",
    highlight: true,
    icon: Sun,
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    days: "Saturday",
    hours: "6:00 AM - 10:00 PM",
    highlight: false,
    icon: Sunrise,
    gradient: "from-orange-500 to-amber-500",
  },
  {
    days: "Sunday",
    hours: "7:00 AM - 9:00 PM",
    highlight: false,
    icon: Moon,
    gradient: "from-purple-500 to-pink-500",
  },
]

export function WorkingHoursSection() {
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
    <section ref={sectionRef} className="relative py-20 lg:py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 to-background" />
      <div className="absolute top-20 right-20 w-48 h-48 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 left-20 w-56 h-56 bg-accent/10 rounded-full blur-3xl animate-float-delay" />
      
      {/* Floating Clock Icon */}
      <div className="absolute top-32 left-20 hidden lg:block animate-float-slow">
        <div className="w-14 h-14 rounded-2xl bg-primary/20 backdrop-blur-sm flex items-center justify-center rotate-12">
          <Clock className="w-7 h-7 text-primary" />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-12 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm text-primary text-sm font-semibold mb-4 border border-primary/20">
            <Clock className="w-4 h-4" />
            Opening Hours
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            <span className="text-balance">
              We&apos;re Open{" "}
              <span className="text-white">
                When You Need Us
              </span>
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Flexible hours to fit your busy schedule. Train early morning or late night.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {schedule.map((item, index) => (
            <Card
              key={item.days}
              className={`group border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-4 cursor-pointer ${
                item.highlight ? "md:scale-105 border-primary/30 z-10" : ""
              } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: `${200 + index * 150}ms` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
              
              {/* Shine effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute inset-0 animate-shimmer" />
              </div>
              
              <CardContent className="relative z-10 p-8 text-center">
                {item.highlight && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-gradient" />
                )}
                
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mx-auto mb-6 transition-all duration-500 shadow-lg ${hoveredIndex === index ? 'scale-110 rotate-12' : ''}`}>
                  <item.icon className="h-10 w-10 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {item.days}
                </h3>
                <p className={`text-2xl font-bold bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`}>
                  {item.hours}
                </p>
                
                {item.highlight && (
                  <span className="inline-block mt-4 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                    Extended Hours
                  </span>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Bottom Note */}
        <p className={`text-center text-muted-foreground text-sm mt-8 transition-all duration-1000 delay-700 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          Holiday hours may vary. Please check our social media for updates.
        </p>
      </div>
    </section>
  )
}
