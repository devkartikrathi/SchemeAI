"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronRight } from "lucide-react"

const categories = [
  {
    name: "Farmers",
    schemes: [
      {
        title: "Crop Insurance",
        description: "Protect your crops against natural calamities.",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        title: "Soil Health Card",
        description: "Get detailed report of your soil nutrients.",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        title: "PM-KISAN",
        description: "Direct income support for farmers.",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        title: "Kisan Credit Card",
        description: "Easy credit access for farmers.",
        image: "/placeholder.svg?height=200&width=300",
      },
    ],
  },
  {
    name: "Youth",
    schemes: [
      {
        title: "Skill Development",
        description: "Free training programs for various skills.",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        title: "Education Loans",
        description: "Low-interest loans for higher education.",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        title: "Startup India",
        description: "Support for young entrepreneurs.",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        title: "Digital Literacy",
        description: "Programs to enhance digital skills.",
        image: "/placeholder.svg?height=200&width=300",
      },
    ],
  },
  {
    name: "Senior Citizens",
    schemes: [
      {
        title: "Pension Scheme",
        description: "Monthly pension for senior citizens.",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        title: "Healthcare Benefits",
        description: "Free health check-ups and treatments.",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        title: "Senior Citizen Savings Scheme",
        description: "High-interest savings for seniors.",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        title: "Vayoshreshtha Samman",
        description: "National awards for senior citizens.",
        image: "/placeholder.svg?height=200&width=300",
      },
    ],
  },
  {
    name: "Women",
    schemes: [
      {
        title: "Beti Bachao Beti Padhao",
        description: "Empowering the girl child through education.",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        title: "Women Entrepreneurship",
        description: "Financial support for women-led businesses.",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        title: "STEM for Girls",
        description: "Encouraging girls in science and technology.",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        title: "Maternity Benefits",
        description: "Support for expectant and new mothers.",
        image: "/placeholder.svg?height=200&width=300",
      },
    ],
  },
]

const VerticalTabs = () => {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div className="container mx-auto px-4 py-16 bg-gray-100">
      <h2 className="text-4xl font-display font-bold mb-12 text-center text-primary">Scheme Categories</h2>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/4 mb-8 md:mb-0">
          {categories.map((category, index) => (
            <motion.button
              key={index}
              className={`w-full text-left px-6 py-4 mb-2 rounded-l-lg font-semibold relative overflow-hidden ${
                activeTab === index ? "bg-secondary text-white" : "bg-white text-primary hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.name}
              {activeTab === index && (
                <motion.div
                  className="absolute right-0 top-0 bottom-0 w-1 bg-accent"
                  initial={{ height: 0 }}
                  animate={{ height: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          ))}
        </div>
        <div className="md:w-3/4 bg-white rounded-r-lg shadow-lg p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-3xl font-bold mb-6 text-primary">{categories[activeTab].name}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {categories[activeTab].schemes.map((scheme, index) => (
                  <motion.div
                    key={index}
                    className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Image
                      src={scheme.image || "/placeholder.svg"}
                      alt={scheme.title}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <h4 className="text-xl font-semibold mb-2 text-primary">{scheme.title}</h4>
                      <p className="text-gray-600 mb-4">{scheme.description}</p>
                      <a
                        href="#"
                        className="inline-flex items-center text-secondary hover:text-primary transition-colors"
                      >
                        Learn more <ChevronRight className="ml-1 w-4 h-4" />
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default VerticalTabs

