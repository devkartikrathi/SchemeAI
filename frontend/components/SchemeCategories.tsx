"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

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
    name: "Old Age",
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
    ],
  },
  {
    name: "Girls",
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
    ],
  },
]

const SchemeCategories = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0].name)
  const [visibleSchemes, setVisibleSchemes] = useState(2)

  const loadMore = () => {
    setVisibleSchemes((prev) =>
      Math.min(prev + 2, categories.find((cat) => cat.name === activeCategory)?.schemes.length || 0),
    )
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-4xl font-display font-bold mb-8 text-center text-primary-800">Scheme Categories</h2>
      <div className="flex flex-wrap justify-center mb-8">
        {categories.map((category) => (
          <motion.button
            key={category.name}
            className={`mr-4 mb-4 px-6 py-2 rounded-full text-lg font-semibold transition-colors ${
              activeCategory === category.name
                ? "bg-primary-500 text-white"
                : "bg-primary-100 text-primary-800 hover:bg-primary-200"
            }`}
            onClick={() => {
              setActiveCategory(category.name)
              setVisibleSchemes(2)
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category.name}
          </motion.button>
        ))}
      </div>
      <motion.div
        key={activeCategory}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {categories
          .find((category) => category.name === activeCategory)
          ?.schemes.slice(0, visibleSchemes)
          .map((scheme, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Image
                src={scheme.image || "/placeholder.svg"}
                alt={scheme.title}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-display font-semibold mb-2 text-primary-800">{scheme.title}</h3>
                <p className="text-gray-600 mb-4">{scheme.description}</p>
                <a href="#" className="text-primary-600 hover:text-primary-800 font-semibold transition-colors">
                  Learn More &rarr;
                </a>
              </div>
            </motion.div>
          ))}
      </motion.div>
      {visibleSchemes < (categories.find((cat) => cat.name === activeCategory)?.schemes.length || 0) && (
        <div className="text-center mt-8">
          <motion.button
            onClick={loadMore}
            className="bg-secondary-500 text-white px-6 py-2 rounded-full text-lg font-semibold hover:bg-secondary-600 transition-colors"
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

export default SchemeCategories

