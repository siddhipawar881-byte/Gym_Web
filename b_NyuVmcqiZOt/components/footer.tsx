"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Dumbbell, ArrowUp, Heart } from "lucide-react"

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="url(#instagram-gradient-footer)"
    >
      <defs>
        <linearGradient id="instagram-gradient-footer" x1="0%" y1="100%" x2="100%" y2="0%">
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

const quickLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Membership", href: "#membership" },
  { name: "Trainers", href: "#trainers" },
  { name: "Classes", href: "#classes" },
  { name: "Reviews", href: "#reviews" },
]

const services = [
  "Personal Training",
  "Group Classes",
  "Nutrition Counseling",
  "Fitness Assessment",
  "Recovery Services",
  "Online Coaching",
]

export function Footer() {
  const [isVisible, setIsVisible] = useState(false)
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (footerRef.current) {
      observer.observe(footerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.replace("#", ""))
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer ref={footerRef} className="relative bg-foreground text-background py-16 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-gradient" />
      <div className="absolute top-20 right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & Description */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Link href="/" className="flex items-center gap-2 group mb-6">
              <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-lg shadow-primary/30">
                <Dumbbell className="h-7 w-7 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-background">
                Power<span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Fit</span>
              </span>
            </Link>
            <p className="text-background/70 leading-relaxed mb-6">
              Transform your body, transform your life. Join PowerFit Gym and start your fitness journey today.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-11 h-11 rounded-xl bg-background/10 flex items-center justify-center hover:bg-[#1877F2] hover:scale-110 hover:-translate-y-1 transition-all duration-300 shadow-lg"
                aria-label="Facebook"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-11 h-11 rounded-xl bg-background/10 flex items-center justify-center hover:bg-[#1DA1F2] hover:scale-110 hover:-translate-y-1 transition-all duration-300 shadow-lg"
                aria-label="Twitter"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-11 h-11 rounded-xl flex items-center justify-center hover:scale-110 hover:-translate-y-1 transition-all duration-300 shadow-lg"
                style={{
                  background: "linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)"
                }}
                aria-label="Instagram"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-11 h-11 rounded-xl bg-background/10 flex items-center justify-center hover:bg-[#FF0000] hover:scale-110 hover:-translate-y-1 transition-all duration-300 shadow-lg"
                aria-label="YouTube"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className={`transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h3 className="text-lg font-bold text-background mb-6 flex items-center gap-2">
              <span className="w-8 h-1 bg-gradient-to-r from-primary to-accent rounded-full" />
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-background/70 hover:text-primary hover:translate-x-2 transition-all duration-300 inline-block"
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h3 className="text-lg font-bold text-background mb-6 flex items-center gap-2">
              <span className="w-8 h-1 bg-gradient-to-r from-primary to-accent rounded-full" />
              Our Services
            </h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li 
                  key={service} 
                  className="text-background/70 hover:text-background hover:translate-x-2 transition-all duration-300 cursor-default"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h3 className="text-lg font-bold text-background mb-6 flex items-center gap-2">
              <span className="w-8 h-1 bg-gradient-to-r from-primary to-accent rounded-full" />
              Contact Info
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <svg className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="text-background/70 group-hover:text-background transition-colors">123 Fitness Street<br />New York, NY 10001</span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <svg className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <span className="text-background/70 group-hover:text-background transition-colors">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <svg className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-background/70 group-hover:text-background transition-colors">info@powerfitgym.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`border-t border-background/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-background/50 text-sm flex items-center gap-1">
            &copy; {new Date().getFullYear()} PowerFit Gym. Made with 
            <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
            All rights reserved.
          </p>
          
          {/* Back to Top Button */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-background/70 hover:text-primary transition-all duration-300 group"
          >
            <span className="text-sm">Back to Top</span>
            <div className="w-10 h-10 rounded-xl bg-background/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300">
              <ArrowUp className="w-5 h-5 group-hover:text-primary-foreground" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  )
}
