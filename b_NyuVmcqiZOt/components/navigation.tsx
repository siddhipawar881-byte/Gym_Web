"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/components/auth-provider"
import { Menu, X, Dumbbell, User, LogOut, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Membership", href: "#membership" },
  { name: "Trainers", href: "#trainers" },
  { name: "Classes Schedule", href: "#classes" },
  { name: "Reviews", href: "#reviews" },
  { name: "Contact", href: "#contact" },
  { name: "Terms", href: "/terms-services" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [isLoaded, setIsLoaded] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()

  useEffect(() => {
    setIsLoaded(true)
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      
      const sections = navItems.map(item => item.href.replace("#", ""))
      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.replace("#", ""))
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsOpen(false)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-lg border-b border-border/50"
          : "bg-gradient-to-b from-background/80 to-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-20">
          {/* Logo */}
          <Link 
            href="/" 
            className={`flex items-center gap-2 group transition-all duration-500 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
          >
            <div className="relative flex items-center justify-center transition-all duration-300 group-hover:scale-105">
              <Image
                src="/images/logo2.png"
                alt="Website Logo"
                width={50}
                height={50}
                className="h-10 w-auto sm:h-12 lg:h-14 object-contain"
                priority
              />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">
              Power<span className="bg-gradient-to-r from-[#7c3aed] via-[#9333ea] to-[#ec4899] bg-clip-text text-transparent">Fit</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className={`hidden lg:flex lg:items-center lg:gap-1 transition-all duration-500 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            {navItems.map((item, index) => (
              item.href.startsWith("#") ? (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`relative px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-lg group`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className={`relative z-10 transition-colors duration-300 ${
                    activeSection === item.href.replace("#", "")
                      ? "text-primary"
                      : "text-foreground/80 group-hover:text-primary"
                  }`}>
                    {item.name}
                  </span>

                  <span className={`absolute inset-0 rounded-lg transition-all duration-300 ${
                    activeSection === item.href.replace("#", "")
                      ? "bg-primary/10"
                      : "bg-transparent group-hover:bg-primary/5"
                  }`} />

                  <span
                    className={`absolute bottom-0 left-1/2 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 -translate-x-1/2 rounded-full ${
                      activeSection === item.href.replace("#", "")
                        ? "w-3/4 opacity-100"
                        : "w-0 opacity-0 group-hover:w-1/2 group-hover:opacity-50"
                    }`}
                  />
                </button>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-lg group`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="relative z-10 transition-colors duration-300 text-foreground/80 group-hover:text-primary">
                    {item.name}
                  </span>
                  <span className="absolute inset-0 rounded-lg transition-all duration-300 bg-transparent group-hover:bg-primary/5" />
                </Link>
              )
            ))}
          </div>

          {/* Auth Buttons */}
          <div className={`hidden lg:flex lg:items-center lg:gap-3 transition-all duration-500 delay-200 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2 border-primary/30 hover:border-primary hover:bg-primary/5 transition-all duration-300">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <User className="h-3 w-3 text-primary-foreground" />
                    </div>
                    {user?.name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="animate-scale-in">
                  <DropdownMenuItem onClick={logout} className="gap-2 cursor-pointer hover:bg-destructive/10 hover:text-destructive transition-colors">
                    <LogOut className="h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" className="font-semibold hover:bg-primary/10 hover:text-primary transition-all duration-300">
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="font-semibold bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:scale-105 group">
                    <Sparkles className="w-4 h-4 mr-1 transition-transform group-hover:rotate-12" />
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-xl hover:bg-primary/10 transition-all duration-300 group"
          >
            <div className="relative w-6 h-6">
              <span className={`absolute inset-0 transition-all duration-300 ${isOpen ? 'rotate-180 scale-100' : 'rotate-0 scale-0'}`}>
                <X className="h-6 w-6 text-foreground" />
              </span>
              <span className={`absolute inset-0 transition-all duration-300 ${isOpen ? 'rotate-180 scale-0' : 'rotate-0 scale-100'}`}>
                <Menu className="h-6 w-6 text-foreground" />
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-500 ease-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-background/95 backdrop-blur-md border-b border-border/50 px-4 py-4 space-y-2">
          {navItems.map((item, index) => (
            item.href.startsWith("#") ? (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`block w-full text-left px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeSection === item.href.replace("#", "")
                    ? "bg-gradient-to-r from-primary/10 to-accent/10 text-primary"
                    : "text-foreground hover:bg-primary/5 hover:translate-x-2"
                }`}
                style={{ 
                  transitionDelay: isOpen ? `${index * 50}ms` : '0ms',
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? 'translateX(0)' : 'translateX(-20px)'
                }}
              >
                {item.name}
              </button>
            ) : (
              <Link
                key={item.name}
                href={item.href}
                className={`block w-full text-left px-4 py-3 rounded-xl font-semibold transition-all duration-300 text-foreground hover:bg-primary/5 hover:translate-x-2`}
                style={{ 
                  transitionDelay: isOpen ? `${index * 50}ms` : '0ms',
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? 'translateX(0)' : 'translateX(-20px)'
                }}
              >
                {item.name}
              </Link>
            )
          ))}
          <div className="pt-4 border-t border-border/50 space-y-2">
            {isAuthenticated ? (
              <Button 
                onClick={logout} 
                variant="outline" 
                className="w-full gap-2 border-destructive/30 hover:bg-destructive/10 hover:text-destructive hover:border-destructive transition-all"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            ) : (
              <>
                <Link href="/login" className="block">
                  <Button variant="outline" className="w-full font-semibold border-primary/30 hover:border-primary hover:bg-primary/5">
                    Login
                  </Button>
                </Link>
                <Link href="/signup" className="block">
                  <Button className="w-full font-semibold bg-gradient-to-r from-primary to-accent shadow-lg shadow-primary/25">
                    <Sparkles className="w-4 h-4 mr-1" />
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
