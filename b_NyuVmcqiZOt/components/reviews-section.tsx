"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight, Star, Quote, Sparkles, MessageSquare } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const reviews = [
  {
    name: "Jennifer Martinez",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    rating: 5,
    text: "PowerFit Gym completely transformed my fitness journey. The trainers are incredibly supportive and the equipment is top-notch. Best decision I ever made!",
    date: "2 weeks ago",
    role: "Member since 2023",
  },
  {
    name: "Michael Thompson",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    rating: 5,
    text: "The atmosphere here is amazing. Everyone is friendly and motivating. I have achieved results I never thought possible. Highly recommend!",
    date: "1 month ago",
    role: "Premium Member",
  },
  {
    name: "Sarah Chen",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    rating: 5,
    text: "Love the variety of classes offered! The yoga sessions are particularly excellent. The staff genuinely cares about each member's progress.",
    date: "3 weeks ago",
    role: "Standard Member",
  },
  {
    name: "David Rodriguez",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    rating: 4,
    text: "Great gym with excellent facilities. The personal training sessions have helped me reach my goals faster than I expected. Worth every penny!",
    date: "1 week ago",
    role: "Member since 2024",
  },
  {
    name: "Emily Johnson",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
    rating: 5,
    text: "PowerFit has the best community I have ever experienced in a gym. The HIIT classes are challenging but so rewarding. Cannot imagine going anywhere else!",
    date: "2 months ago",
    role: "Premium Member",
  },
]

export function ReviewsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [userRating, setUserRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [userReview, setUserReview] = useState("")
  const [isTransitioning, setIsTransitioning] = useState(false)
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

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const nextSlide = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length)
      setIsTransitioning(false)
    }, 300)
  }

  const prevSlide = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
      setIsTransitioning(false)
    }, 300)
  }

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()
    if (userRating > 0 && userReview.trim()) {
      alert("Thank you for your review!")
      setUserRating(0)
      setUserReview("")
    }
  }

  return (
    <section
      ref={sectionRef}
      id="reviews"
      className="relative py-20 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-background to-background" />
      
      {/* Animated Background Elements */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-40 right-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-float-delay" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float-slow" />
      
      {/* Floating Icons */}
      <div className="absolute top-40 right-32 hidden lg:block animate-float">
        <div className="w-12 h-12 rounded-xl bg-primary/20 backdrop-blur-sm flex items-center justify-center rotate-12">
          <MessageSquare className="w-6 h-6 text-primary" />
        </div>
      </div>
      <div className="absolute bottom-32 left-32 hidden lg:block animate-float-slow">
        <div className="w-10 h-10 rounded-xl bg-accent/20 backdrop-blur-sm flex items-center justify-center -rotate-12">
          <Star className="w-5 h-5 text-accent fill-accent" />
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
            <Sparkles className="w-4 h-4" />
            Testimonials
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            <span className="text-balance">
              What Our Members{" "}
              <span className="text-white">
                Say
              </span>
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Real stories from real members who have transformed their lives at PowerFit Gym.
          </p>
        </div>

        {/* Reviews Carousel */}
        <div
          className={`relative max-w-4xl mx-auto mb-16 transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="overflow-hidden rounded-3xl">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {reviews.map((review, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <Card className={`border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden transition-all duration-500 ${isTransitioning ? 'scale-95 opacity-50' : 'scale-100 opacity-100'}`}>
                    {/* Top gradient border */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-gradient" />
                    
                    <CardContent className="p-8 lg:p-12 text-center relative">
                      {/* Quote Icon */}
                      <div className="absolute top-8 left-8 opacity-10">
                        <Quote className="h-20 w-20 text-primary" />
                      </div>
                      
                      {/* Review Text */}
                      <p className="text-lg lg:text-xl text-foreground leading-relaxed mb-8 relative z-10">
                        &ldquo;{review.text}&rdquo;
                      </p>
                      
                      {/* Stars */}
                      <div className="flex justify-center mb-6">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-6 w-6 transition-all duration-300 ${
                              i < review.rating
                                ? "text-yellow-400 fill-yellow-400 scale-100"
                                : "text-gray-300 scale-90"
                            }`}
                            style={{ animationDelay: `${i * 100}ms` }}
                          />
                        ))}
                      </div>
                      
                      {/* Author */}
                      <div className="flex flex-col items-center">
                        <div className="relative mb-3">
                          <img
                            src={review.image}
                            alt={review.name}
                            className="w-16 h-16 rounded-full object-cover border-4 border-primary/20 shadow-lg"
                          />
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                            <Star className="w-3 h-3 text-primary-foreground fill-primary-foreground" />
                          </div>
                        </div>
                        <h4 className="font-bold text-foreground text-lg">{review.name}</h4>
                        <p className="text-sm text-primary font-medium">{review.role}</p>
                        <p className="text-xs text-muted-foreground mt-1">{review.date}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-6 mt-8">
            <button
              onClick={prevSlide}
              className="w-14 h-14 rounded-xl bg-card/80 backdrop-blur-sm border border-border/50 flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary hover:scale-110 transition-all duration-300 shadow-lg group"
              aria-label="Previous review"
            >
              <ChevronLeft className="h-6 w-6 group-hover:-translate-x-1 transition-transform" />
            </button>
            
            <div className="flex gap-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? "bg-gradient-to-r from-primary to-accent w-10" 
                      : "bg-primary/30 w-3 hover:bg-primary/50"
                  }`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>
            
            <button
              onClick={nextSlide}
              className="w-14 h-14 rounded-xl bg-card/80 backdrop-blur-sm border border-border/50 flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary hover:scale-110 transition-all duration-300 shadow-lg group"
              aria-label="Next review"
            >
              <ChevronRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Review Form */}
        <Card
          className={`max-w-2xl mx-auto border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden transition-all duration-1000 delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Top gradient */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-gradient" />
          
          <CardContent className="p-6 lg:p-8">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-foreground mb-2">
                Share Your Experience
              </h3>
              <p className="text-sm text-muted-foreground">
                Your feedback helps us improve and inspires others
              </p>
            </div>
            
            <form onSubmit={handleSubmitReview}>
              {/* Star Rating */}
              <div className="flex justify-center mb-6">
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setUserRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 transition-all hover:scale-125"
                    >
                      <Star
                        className={`h-10 w-10 transition-all duration-200 ${
                          star <= (hoverRating || userRating)
                            ? "text-yellow-400 fill-yellow-400 scale-110"
                            : "text-gray-300 hover:text-yellow-200"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Text Area */}
              <textarea
                value={userReview}
                onChange={(e) => setUserReview(e.target.value)}
                placeholder="Write your review here..."
                className="w-full p-4 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                rows={4}
              />
              
              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full mt-4 font-semibold bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:scale-[1.02]"
                disabled={userRating === 0 || !userReview.trim()}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Submit Review
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
