"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

const slides = [
  {
    id: 1,
    image: "/placeholder.svg?height=600&width=1200",
    title: "Farmer Support Scheme",
    description: "Empowering farmers with financial assistance and resources.",
    cta: "Learn More",
  },
  {
    id: 2,
    image: "/placeholder.svg?height=600&width=1200",
    title: "Youth Skill Development",
    description: "Enhancing skills and employability for the youth.",
    cta: "Explore Programs",
  },
  {
    id: 3,
    image: "/placeholder.svg?height=600&width=1200",
    title: "Senior Citizen Welfare",
    description: "Ensuring a dignified life for our senior citizens.",
    cta: "Check Eligibility",
  },
]

const ImageSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [nextSlide]) // Added nextSlide to dependencies

  return (
    <div className="relative h-[600px] overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image
            src={slides[currentSlide].image || "/placeholder.svg"}
            alt={slides[currentSlide].title}
            fill
            style={{ objectFit: "cover" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/70 to-green-700/50 flex items-center justify-center">
            <div className="text-center text-white max-w-3xl px-4">
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-5xl font-display font-bold mb-4"
              >
                {slides[currentSlide].title}
              </motion.h2>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-xl mb-8"
              >
                {slides[currentSlide].description}
              </motion.p>
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {slides[currentSlide].cta}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full transition-colors"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full transition-colors"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
      <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-8 h-1 rounded-full transition-all ${index === currentSlide ? "bg-white w-12" : "bg-white/50"
              }`}
          />
        ))}
      </div>
    </div>
  )
}

export default ImageSlider

