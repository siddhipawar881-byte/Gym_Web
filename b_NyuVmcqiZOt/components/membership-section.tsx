"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/components/auth-provider"
import { Check, Sparkles, Crown, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

const plans = [
  {
    name: "Basic Plan",
    price: 1499,
    period: "month",
    description: "Perfect for beginners starting their fitness journey",
    icon: Zap,
    features: [
      "Access to gym equipment",
      "Locker room access",
      "2 group classes per week",
      "Fitness assessment",
      "Mobile app access",
    ],
    highlighted: false,
    gradient: "from-[#3b82f6]/20 to-[#7c3aed]/20",
    iconGradient: "from-[#3b82f6] to-[#7c3aed]",
  },
  {
    name: "Subscription Plan",
    price: 2999,
    period: "month",
    description: "Most popular choice for dedicated fitness enthusiasts",
    icon: Sparkles,
    features: [
      "Everything in Basic",
      "Unlimited group classes",
      "Personal trainer consultation",
      "Nutrition guidance",
      "Sauna & steam room",
      "Guest passes (2/month)",
    ],
    highlighted: true,
    gradient: "from-[#7c3aed]/20 to-[#ec4899]/20",
    iconGradient: "from-[#7c3aed] to-[#ec4899]",
  },
  {
    name: "Premium Plan",
    price: 4999,
    period: "month",
    description: "The ultimate fitness experience with VIP perks",
    icon: Crown,
    features: [
      "Everything in Subscription",
      "Unlimited personal training",
      "Priority class booking",
      "Towel service",
      "Free parking",
      "Exclusive member events",
      "24/7 gym access",
    ],
    highlighted: false,
    gradient: "from-[#ec4899]/20 to-[#be123c]/20",
    iconGradient: "from-[#ec4899] to-[#be123c]",
  },
]

export function MembershipSection() {
  const [isVisible, setIsVisible] = useState(false)
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

  return (
    <section
      ref={sectionRef}
      id="membership"
      className="relative py-20 lg:py-32 overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/membership-bg.jpg"
          alt="Gym equipment"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] via-[#1e1b4b]/50 to-[#0f172a]" />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute top-40 left-10 w-72 h-72 bg-gradient-to-br from-[#7c3aed] to-[#ec4899] rounded-full blur-3xl opacity-20 animate-float" />
      <div className="absolute bottom-40 right-10 w-80 h-80 bg-gradient-to-bl from-[#ec4899] to-[#7c3aed] rounded-full blur-3xl opacity-20 animate-float-delay" />
      
      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-4 h-4 bg-[#7c3aed] rounded-full animate-ping" />
      <div className="absolute bottom-20 left-20 w-3 h-3 bg-[#ec4899] rounded-full animate-ping" style={{ animationDelay: '1s' }} />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm text-primary text-sm font-semibold mb-4 border border-primary/20">
            <Sparkles className="w-4 h-4" />
            Pricing Plans
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            <span className="text-balance">
              Choose Your{" "}
              <span className="text-white">
                Membership
              </span>
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Flexible plans designed to match your fitness goals and budget. All plans include basic amenities.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, index) => (
            <Card
              key={plan.name}
              className={`group relative overflow-hidden border-border/50 transition-all duration-500 hover:-translate-y-4 ${
                plan.highlighted
                  ? "bg-gradient-to-b from-primary/5 via-card to-accent/5 border-primary/30 shadow-2xl shadow-primary/20 md:scale-105 z-10"
                  : "bg-card/80 backdrop-blur-sm hover:shadow-2xl hover:shadow-primary/10"
              } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: `${200 + index * 150}ms` }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Animated Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              {/* Shine Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute inset-0 animate-shimmer" />
              </div>
              
              {/* Top Border Gradient */}
              {plan.highlighted && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-gradient" />
              )}
              
              {/* Popular Badge */}
              {plan.highlighted && (
                <div className="absolute top-4 right-4 z-20">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground text-xs font-semibold animate-pulse-glow">
                    <Sparkles className="w-3 h-3" />
                    Most Popular
                  </span>
                </div>
              )}
              
              <CardHeader className="relative z-10 pb-4 pt-8 text-center">
                {/* Plan Icon - Centered */}
                <div className="flex justify-center mb-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${plan.iconGradient} flex items-center justify-center transition-all duration-500 ${hoveredCard === index ? 'scale-110 rotate-6' : ''} shadow-lg`}>
                    <plan.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {plan.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
              </CardHeader>
              
              <CardContent className="relative z-10 pt-0 text-center">
                {/* Price in INR */}
                <div className="mb-6">
                  <span className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent group-hover:from-primary group-hover:to-accent transition-all duration-500">
                    ₹{plan.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>
                
                {/* Features */}
                <ul className="space-y-3 mb-8 text-left mx-auto max-w-[200px]">
                  {plan.features.map((feature, featureIndex) => (
                    <li 
                      key={feature} 
                      className={`flex items-start gap-3 transition-all duration-300 ${hoveredCard === index ? 'translate-x-1' : ''}`}
                      style={{ transitionDelay: `${featureIndex * 50}ms` }}
                    >
                      <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${plan.iconGradient} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                
                {/* CTA Button */}
                <Link href={isAuthenticated ? "#" : "/login"}>
                  <Button
                    className={`w-full font-semibold transition-all duration-300 hover:scale-[1.02] ${
                      plan.highlighted
                        ? "bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30"
                        : "bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground"
                    }`}
                  >
                    Join Now
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom Note */}
        <p className={`text-center text-muted-foreground text-sm mt-12 transition-all duration-1000 delay-700 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          All plans include a 7-day money-back guarantee. No hidden fees.
        </p>
      </div>
    </section>
  )
}
