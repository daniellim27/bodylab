"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, User, Clock, CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [showNav, setShowNav] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [profilePicture, setProfilePicture] = useState<string | null>(null)
  const [isClient, setIsClient] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const maxScroll = window.innerHeight * 4
    let targetScrollY = 0
    
    switch (sectionId) {
      case 'classes':
        // Classes section is fully visible at 33% scroll progress
        targetScrollY = maxScroll * 0.33
        break
      case 'schedule':
        // Schedule section is fully visible at 66% scroll progress
        targetScrollY = maxScroll * 0.66
        break
      case 'pricing':
        // Pricing section is fully visible at 90% scroll progress
        targetScrollY = maxScroll * 0.9
        break
      default:
        return
    }
    
    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth'
    })
  }

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrollY(currentScrollY)

      const scrollingUp = currentScrollY < lastScrollY
      const inClassesSection = currentScrollY > window.innerHeight * 0.5

      setShowNav(scrollingUp && inClassesSection)
      setLastScrollY(currentScrollY)
    }

    // Handle hash navigation on page load
    const handleHashNavigation = () => {
      const hash = window.location.hash
      if (hash) {
        const sectionId = hash.substring(1) // Remove the # symbol
        setTimeout(() => scrollToSection(sectionId), 100) // Small delay to ensure page is loaded
      }
    }

    // Load profile picture from localStorage
    const loadProfilePicture = () => {
      const savedPicture = localStorage.getItem('profilePicture')
      if (savedPicture) {
        setProfilePicture(savedPicture)
      }
    }

    // Set client flag to prevent hydration mismatch
    setIsClient(true)

    // Listen for storage changes (when profile picture is updated in another tab/page)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'profilePicture') {
        setProfilePicture(e.newValue)
      }
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("storage", handleStorageChange)
    handleHashNavigation() // Check for hash on initial load
    loadProfilePicture() // Load profile picture on initial load
    
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [lastScrollY])

  const maxScroll = typeof window !== "undefined" ? window.innerHeight * 4 : 4000
  const scrollProgress = Math.max(0, Math.min(scrollY / maxScroll, 1))

  // Classes section: starts at 100vh, moves to 0vh in first third, stays at 0vh
  const classesTransform =
    scrollProgress <= 0.33
      ? 100 - (scrollProgress / 0.33) * 100 // 100vh to 0vh
      : 0 // Stay at 0vh

  // Schedule section: starts at 100vh, slides up in second third, stays at 0vh
  const scheduleTransform =
    scrollProgress <= 0.33
      ? 100 // Stay at 100vh
      : scrollProgress <= 0.66
        ? 100 - ((scrollProgress - 0.33) / 0.33) * 100 // 100vh to 0vh
        : 0 // Stay at 0vh

  // Pricing section: starts at 100vh, slides up in final third
  const pricingTransform =
    scrollProgress <= 0.66
      ? 100 // Stay at 100vh
      : scrollProgress <= 0.9
        ? 100 - ((scrollProgress - 0.66) / 0.24) * 100 // 100vh to 0vh
        : 0 // Stay at 0vh

  // Footer section: starts at 100vh, slides up in final 10% of scroll
  const footerTransform =
    scrollProgress <= 0.9
      ? 100 // Stay at 100vh
      : 100 - ((scrollProgress - 0.9) / 0.1) * 100 // 100vh to 0vh

  const classes = [
    {
      name: "class name",
      price: "idr 1234",
      image: "/fitness-workout-gym-equipment.jpg",
    },
    {
      name: "class name",
      price: "idr 1234",
      image: "/yoga-meditation-wellness-studio.jpg",
    },
    {
      name: "class name",
      price: "idr 1234",
      image: "/fitness-workout-gym-equipment.jpg",
    },
    {
      name: "class name",
      price: "idr 1234",
      image: "/yoga-meditation-wellness-studio.jpg",
    },
    {
      name: "class name",
      price: "idr 1234",
      image: "/fitness-workout-gym-equipment.jpg",
    },
    {
      name: "class name",
      price: "idr 1234",
      image: "/yoga-meditation-wellness-studio.jpg",
    },
    {
      name: "class name",
      price: "idr 1234",
      image: "/fitness-workout-gym-equipment.jpg",
    },
    {
      name: "class name",
      price: "idr 1234",
      image: "/yoga-meditation-wellness-studio.jpg",
    },
  ]

  interface ClassSchedule {
    time: string
    class: string
    instructor: string
    spots: number
  }

  const scheduleData: Record<string, ClassSchedule[]> = {
    "2024-01-15": [
      { time: "09:00", class: "Mat Pilates", instructor: "Sarah", spots: 8 },
      { time: "11:00", class: "Pilates Reformer", instructor: "Mike", spots: 4 },
      { time: "17:00", class: "Group Class", instructor: "Emma", spots: 12 },
    ],
    "2024-01-16": [
      { time: "08:00", class: "Private Session", instructor: "Sarah", spots: 1 },
      { time: "10:00", class: "Beginner Class", instructor: "Lisa", spots: 10 },
      { time: "18:00", class: "Mat Pilates", instructor: "Mike", spots: 6 },
    ],
    "2024-01-17": [
      { time: "09:30", class: "Pilates Reformer", instructor: "Emma", spots: 3 },
      { time: "16:00", class: "Group Class", instructor: "Sarah", spots: 15 },
    ],
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.max(1, classes.length - 4))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.max(1, classes.length - 4)) % Math.max(1, classes.length - 4))
  }

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const formatDateKey = (date: Date) => {
    return date.toISOString().split("T")[0]
  }

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth)
    const firstDay = getFirstDayOfMonth(currentMonth)
    const days = []

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-12"></div>)
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
      const dateKey = formatDateKey(date)
      const hasClasses = scheduleData[dateKey]
      const isSelected = selectedDate && formatDateKey(selectedDate) === dateKey

      days.push(
        <button
          key={day}
          onClick={() => setSelectedDate(date)}
          className={`h-12 w-full rounded-lg border transition-colors ${
            isSelected
              ? "bg-gray-800 text-white"
              : hasClasses
                ? "bg-gray-200 hover:bg-gray-300 border-gray-300"
                : "border-gray-200 hover:bg-gray-100"
          }`}
        >
          {day}
        </button>,
      )
    }

    return days
  }

  const getSelectedDateClasses = () => {
    if (!selectedDate) return []
    const dateKey = formatDateKey(selectedDate)
    return scheduleData[dateKey] || []
  }

  return (
    <div className="relative">
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-transform duration-300 translate-y-0"
        style={{ backgroundColor: "#EBE9E4" }}
      >
        <div className="flex justify-center items-center py-4 border-b border-gray-200 relative">
          <div className="flex space-x-8 text-sm font-medium font-shippori-antique">
            <button onClick={() => scrollToSection('pricing')} className="text-gray-800 hover:text-gray-600 transition-colors">
              packages
            </button>
            <button onClick={() => scrollToSection('classes')} className="text-gray-800 hover:text-gray-600 transition-colors">
              classes
            </button>
            <button onClick={() => scrollToSection('schedule')} className="text-gray-800 hover:text-gray-600 transition-colors">
              schedule
            </button>
            <button onClick={() => scrollToSection('schedule')} className="text-gray-800 hover:text-gray-600 transition-colors">
              book now
            </button>
            <a href="/signin" className="text-gray-800 hover:text-gray-600 transition-colors">
              sign in
            </a>
          </div>
          
          {/* Profile Icon */}
          <a href="/profile" className="absolute right-8 p-2 text-gray-800 hover:text-gray-600 transition-colors">
            {isClient && profilePicture ? (
              <img 
                src={profilePicture} 
                alt="Profile" 
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <User size={24} />
            )}
          </a>
        </div>
      </nav>

      <div className="h-screen"></div>

      <main className="min-h-screen fixed top-0 left-0 right-0 z-10" style={{ backgroundColor: "#EBE9E4" }}>
        <nav className="absolute top-0 left-0 right-0 z-10 bg-transparent">
          <div className="flex justify-center items-center py-6 relative">
            <div className="flex space-x-8 text-sm font-medium">
              <button onClick={() => scrollToSection('pricing')} className="text-gray-800 hover:text-gray-600 transition-colors">
                PACKAGES
              </button>
              <button onClick={() => scrollToSection('classes')} className="text-gray-800 hover:text-gray-600 transition-colors">
                CLASSES
              </button>
              <button onClick={() => scrollToSection('schedule')} className="text-gray-800 hover:text-gray-600 transition-colors">
                SCHEDULE
              </button>
              <button onClick={() => scrollToSection('schedule')} className="text-gray-800 hover:text-gray-600 transition-colors">
                BOOK NOW
              </button>
              <a href="/signin" className="text-gray-800 hover:text-gray-600 transition-colors">
                SIGN IN
              </a>
            </div>
            
            {/* Profile Icon */}
            <a href="/profile" className="absolute right-8 p-2 text-gray-800 hover:text-gray-600 transition-colors">
              {isClient && profilePicture ? (
                <img 
                  src={profilePicture} 
                  alt="Profile" 
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <User size={24} />
              )}
            </a>
          </div>
        </nav>

        <div className="absolute left-1/2 transform -translate-x-1/2" style={{ top: "86px" }}>
          <img src="/pics/image-removebg-preview (1).png" alt="Body Lab Logo" className="h-auto max-w-xs" />
        </div>

        <div className="absolute left-0 right-0 flex gap-4 px-4" style={{ top: "240px", bottom: "0" }}>
          <div className="flex-1 bg-gray-300 rounded-lg overflow-hidden shadow-lg">
            <img
              src="/fitness-workout-gym-equipment.jpg"
              alt="Fitness Training"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 bg-gray-300 rounded-lg overflow-hidden shadow-lg">
            <img
              src="/yoga-meditation-wellness-studio.jpg"
              alt="Wellness Studio"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </main>

      <section
        id="classes"
        className="min-h-screen fixed top-0 left-0 right-0 z-20 flex flex-col justify-start pt-32"
        style={{
          backgroundColor: "#EBE9E4",
          transform: `translateY(${classesTransform}vh)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="font-serif text-gray-800 lowercase tracking-widest text-8xl mb-8">our classes</h2>
            <p className="text-lg italic text-gray-800 font-serif">Transform your body, elevate your energy.</p>
          </div>

          <div className="relative">
            <button
              onClick={prevSlide}
              className="absolute left-1 top-1/2 -translate-y-1/2 z-10 w-16 h-16 rounded-full border-2 border-white bg-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
            >
              <ChevronLeft size={24} className="text-white" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-1 top-1/2 -translate-y-1/2 z-10 w-16 h-16 rounded-full border-2 border-white bg-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
            >
              <ChevronRight size={24} className="text-white" />
            </button>

            <div className="overflow-hidden px-2">
              <div
                className="flex transition-transform duration-300 ease-in-out gap-6"
                style={{ transform: `translateX(-${currentSlide * (100 / 4)}%)` }}
              >
                {classes.map((classItem, index) => (
                  <div key={index} className="flex-none w-1/4">
                    <div className="bg-white overflow-hidden border border-gray-800">
                      <div className="aspect-[3/4] bg-gray-200">
                        <img
                          src={classItem.image || "/placeholder.svg"}
                          alt={classItem.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <h3 className="text-sm font-medium text-gray-800 lowercase font-shippori-antique">{classItem.name}</h3>
                      <p className="text-sm text-gray-800 lowercase font-shippori-antique">{classItem.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="schedule"
        className="min-h-screen fixed top-0 left-0 right-0 z-30 flex flex-col justify-center"
        style={{
          backgroundColor: "#EBE9E4",
          transform: `translateY(${scheduleTransform}vh)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        <div className="container mx-auto px-8">
          <div className="text-center mb-20">
            <h2 className="font-serif text-gray-800 lowercase tracking-widest text-8xl mb-8">schedule</h2>
            <p className="text-lg italic text-gray-800 font-serif">Book your perfect class time.</p>
          </div>

          {/* Two Column Layout - Large Cards */}
          <div className="flex gap-10 max-w-7xl mx-auto">
            {/* Left Panel - Large Calendar */}
            <div className="flex-1">
              <div className="bg-white rounded-lg p-8 shadow-lg h-[600px]">
                <div className="flex items-center justify-between mb-6">
                  <button
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <h4 className="text-xl font-medium text-gray-800 font-shippori-antique">
                    {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                  </h4>
                  <button
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-1 mb-3">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                    <div key={day} className="text-center text-sm font-medium text-gray-600 py-3 font-shippori-antique">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>
              </div>
            </div>

            {/* Right Panel - Large Booking Details */}
            <div className="flex-1">
              <div className="bg-white rounded-lg p-8 shadow-lg h-[600px]">
                <h3 className="text-xl font-semibold text-gray-800 mb-6 font-shippori-antique">Booking Details</h3>
                
                {/* Lesson Details */}
                <div className="space-y-4 mb-6">
                  <div className="text-sm text-gray-600 font-shippori-antique">
                    <div className="font-medium text-gray-800 text-base mb-2 font-shippori-antique">Private Yoga Lesson</div>
                    <div className="py-1 font-shippori-antique">11 March 2022, 15:30</div>
                    <div className="py-1 font-shippori-antique">Didžioji gatvė</div>
                    <div className="py-1 font-shippori-antique">30 min</div>
                    <div className="py-1 text-base font-semibold font-shippori-antique">Free</div>
                  </div>
                </div>

                {/* Time Selection */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-gray-800 font-shippori-antique">Time</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {["13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"].map((time) => (
                      <button
                        key={time}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-xs font-medium text-gray-800 hover:bg-blue-50 hover:border-blue-300 transition-colors font-shippori-antique"
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Book Button */}
                <div className="mt-auto">
                  <button className="w-full bg-gray-800 text-white py-4 rounded-lg font-medium hover:bg-gray-700 transition-colors font-shippori-antique text-lg">
                    Request to Book
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="pricing"
        className="min-h-screen fixed top-0 left-0 right-0 z-40 flex flex-col justify-center"
        style={{
          backgroundColor: "#EBE9E4",
          transform: `translateY(${pricingTransform}vh)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        <div className="container mx-auto px-8">
          <div className="text-center mb-20">
            <h2 className="font-serif text-gray-800 lowercase tracking-widest text-8xl mb-8">packages</h2>
            <p className="text-lg italic text-gray-800 font-serif">Choose the perfect plan for your wellness journey.</p>
          </div>

          {/* Pricing Cards */}
          <div className="flex gap-8 max-w-6xl mx-auto">
            {/* Basic Plan */}
            <div className="flex-1">
              <div className="bg-white rounded-lg p-8 shadow-lg h-[500px]">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">Basic</h3>
                <div className="text-4xl font-bold text-gray-800 mb-6">IDR 150k</div>
                <div className="text-sm text-gray-600 font-shippori-antique mb-8">
                  <div className="py-2">• 4 classes per month</div>
                  <div className="py-2">• Mat Pilates only</div>
                  <div className="py-2">• Group sessions</div>
                  <div className="py-2">• Basic equipment</div>
                </div>
                <a href="/signin" className="w-full bg-gray-800 text-white py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors font-shippori-antique block text-center">
                  Choose Plan
                </a>
              </div>
            </div>

            {/* Premium Plan */}
            <div className="flex-1">
              <div className="bg-white rounded-lg p-8 shadow-lg h-[500px] border-2 border-gray-800">
                <div className="text-center mb-4">
                  <span className="bg-gray-800 text-white px-4 py-1 rounded-full text-sm font-shippori-antique">Most Popular</span>
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">Premium</h3>
                <div className="text-4xl font-bold text-gray-800 mb-6">IDR 250k</div>
                <div className="text-sm text-gray-600 font-shippori-antique mb-8">
                  <div className="py-2">• 8 classes per month</div>
                  <div className="py-2">• All class types</div>
                  <div className="py-2">• Reformer access</div>
                  <div className="py-2">• Priority booking</div>
                </div>
                <a href="/signin" className="w-full bg-gray-800 text-white py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors font-shippori-antique block text-center">
                  Choose Plan
                </a>
              </div>
            </div>

            {/* Elite Plan */}
            <div className="flex-1">
              <div className="bg-white rounded-lg p-8 shadow-lg h-[500px]">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">Elite</h3>
                <div className="text-4xl font-bold text-gray-800 mb-6">IDR 400k</div>
                <div className="text-sm text-gray-600 font-shippori-antique mb-8">
                  <div className="py-2">• Unlimited classes</div>
                  <div className="py-2">• Private sessions</div>
                  <div className="py-2">• Personal trainer</div>
                  <div className="py-2">• Nutrition guidance</div>
                </div>
                <a href="/signin" className="w-full bg-gray-800 text-white py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors font-shippori-antique block text-center">
                  Choose Plan
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="footer"
        className="min-h-screen fixed top-0 left-0 right-0 z-50 flex flex-col justify-center"
        style={{
          backgroundColor: "#2C2C2C",
          transform: `translateY(${footerTransform}vh)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        <div className="container mx-auto px-8">
          <div className="flex gap-12 max-w-6xl mx-auto">
            {/* Left Column - Services */}
            <div className="flex-1">
              <h3 className="text-2xl font-serif text-white italic mb-6">Services</h3>
              <div className="space-y-3">
                <a href="#" className="block text-white hover:text-gray-300 transition-colors font-shippori-antique">Mat Pilates</a>
                <a href="#" className="block text-white hover:text-gray-300 transition-colors font-shippori-antique">Reformer Classes</a>
                <a href="#" className="block text-white hover:text-gray-300 transition-colors font-shippori-antique">Private Sessions</a>
                <a href="#" className="block text-white hover:text-gray-300 transition-colors font-shippori-antique">Group Classes</a>
              </div>
            </div>

            {/* Middle Column - Body Lab */}
            <div className="flex-1">
              <h3 className="text-2xl font-serif text-white italic mb-6">Body Lab</h3>
              <div className="space-y-3">
                <a href="#" className="block text-white hover:text-gray-300 transition-colors font-shippori-antique underline">Home</a>
                <a href="#" className="block text-white hover:text-gray-300 transition-colors font-shippori-antique underline">About</a>
                <a href="#" className="block text-white hover:text-gray-300 transition-colors font-shippori-antique underline">Location</a>
                <a href="#" className="block text-white hover:text-gray-300 transition-colors font-shippori-antique underline">Contact</a>
              </div>
            </div>

            {/* Right Column - Newsletter */}
            <div className="flex-1">
              <h3 className="text-2xl font-serif text-white mb-6">10% off? Subscribe!</h3>
              <p className="text-white mb-6 font-shippori-antique">
                Join our mailing list and get 10% off your first class, plus stay updated on new classes, promotions, events and wellness tips.
              </p>
              
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email here"
                  className="w-full bg-transparent border-b border-white text-white placeholder-gray-400 py-2 focus:outline-none focus:border-gray-300 font-shippori-antique"
                />
                
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="newsletter"
                    className="w-4 h-4 text-gray-800 bg-transparent border-white rounded focus:ring-gray-300"
                  />
                  <label htmlFor="newsletter" className="text-white text-sm font-shippori-antique">
                    Yes, I want to be part of this mailing list.
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-screen"></div>
      <div className="h-screen"></div>
      <div className="h-screen"></div>
      <div className="h-screen"></div>
    </div>
  )
}
