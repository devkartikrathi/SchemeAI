"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronRight } from "lucide-react"

const states = [
  "All States",
  "Andhra Pradesh",
  "Gujarat",
  "Karnataka",
  "Maharashtra",
  "Tamil Nadu",
  "Uttar Pradesh",
  "West Bengal",
  "Rajasthan",
  "Madhya Pradesh",
  "Bihar",
  "Telangana",
  "Odisha",
  "Kerala",
  "Assam",
]

const schemes = [
  {
    title: "Crop Insurance Scheme",
    state: "Gujarat",
    description: "Protect your crops against natural calamities.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    title: "Skill Development Program",
    state: "Maharashtra",
    description: "Enhance your skills for better job opportunities.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    title: "Rural Housing Scheme",
    state: "Karnataka",
    description: "Affordable housing for rural families.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    title: "Solar Power Subsidy",
    state: "Tamil Nadu",
    description: "Promote clean energy usage in households.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    title: "Women Entrepreneurship Program",
    state: "Uttar Pradesh",
    description: "Support for women-led businesses.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    title: "Digital Literacy Initiative",
    state: "West Bengal",
    description: "Bridging the digital divide in rural areas.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    title: "Organic Farming Support",
    state: "Rajasthan",
    description: "Promoting organic farming practices.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    title: "Clean Water Project",
    state: "Madhya Pradesh",
    description: "Ensuring access to clean drinking water.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    title: "Rural Education Scholarship",
    state: "Bihar",
    description: "Supporting education in rural areas.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    title: "Tech Startup Incubation",
    state: "Telangana",
    description: "Fostering innovation and entrepreneurship.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    title: "Coastal Area Development",
    state: "Odisha",
    description: "Sustainable development of coastal regions.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    title: "Ayurveda Research Grant",
    state: "Kerala",
    description: "Promoting research in traditional medicine.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    title: "Tea Plantation Workers Welfare",
    state: "Assam",
    description: "Improving lives of tea plantation workers.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    title: "Handloom Weavers Support",
    state: "Andhra Pradesh",
    description: "Preserving traditional handloom industry.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    title: "Tribal Development Project",
    state: "Gujarat",
    description: "Empowering tribal communities.",
    image: "/placeholder.svg?height=200&width=300",
  },
]

const StateFilter = () => {
  const [selectedState, setSelectedState] = useState("All States")
  const [visibleSchemes, setVisibleSchemes] = useState(10)

  const filteredSchemes =
    selectedState === "All States" ? schemes : schemes.filter((scheme) => scheme.state === selectedState)

  const handleLoadMore = () => {
    setVisibleSchemes((prev) => Math.min(prev + 5, filteredSchemes.length))
  }

  return (
    <div className="container mx-auto px-4 py-16 bg-gray-100">
      <h2 className="text-4xl font-display font-bold mb-8 text-center text-primary">State-Wise Schemes</h2>
      <div className="mb-8">
        <label htmlFor="state-filter" className="block text-lg font-semibold text-primary mb-2">
          Select State:
        </label>
        <select
          id="state-filter"
          className="block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary text-lg"
          value={selectedState}
          onChange={(e) => {
            setSelectedState(e.target.value)
            setVisibleSchemes(10)
          }}
        >
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        <AnimatePresence>
          {filteredSchemes.slice(0, visibleSchemes).map((scheme, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              exit={{ opacity: 0, y: -20 }}
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
                <h3 className="text-2xl font-semibold mb-2 text-primary">{scheme.title}</h3>
                <p className="text-gray-600 mb-4">{scheme.description}</p>
                <p className="text-sm text-secondary font-semibold mb-4">State: {scheme.state}</p>
                <a href="#" className="inline-flex items-center text-secondary hover:text-primary transition-colors">
                  Learn more <ChevronRight className="ml-1 w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      {visibleSchemes < filteredSchemes.length && (
        <div className="text-center mt-8">
          <motion.button
            onClick={handleLoadMore}
            className="bg-secondary text-white px-6 py-2 rounded-full text-lg font-semibold hover:bg-primary transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Load More
          </motion.button>
        </div>
      )}
    </div>
  )
}

export default StateFilter

