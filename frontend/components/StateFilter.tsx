"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronRight } from "lucide-react"

const schemes = [
  {
    "slNo": 1,
    "department": "Food & Supplies Department",
    "schemeName": "AAY Ration Card",
    "annualIncomeCriteria": "Upto 0.50 lack"
  },
  {
    "slNo": 2,
    "department": "Haryana Parivahan department",
    "schemeName": "Happy Card",
    "annualIncomeCriteria": "Upt to 1.00 lack"
  },
  {
    "slNo": 3,
    "department": "Electricity Department",
    "schemeName": "Electricity Subsidy",
    "annualIncomeCriteria": "Upto 1.00 lack"
  },
  {
    "slNo": 4,
    "department": "Panchayat Department",
    "schemeName": "Plot Allotment Scheme",
    "annualIncomeCriteria": "Upto 1.00 lack"
  },
  {
    "slNo": 5,
    "department": "Information, Public Relations and Languages Department",
    "schemeName": "Mukhyamantri Tirth Yatra Yojana",
    "annualIncomeCriteria": "Upto 1.80 lack"
  },
  {
    "slNo": 6,
    "department": "Education Department",
    "schemeName": "Chirau Yojna(Previous section 134 A)",
    "annualIncomeCriteria": "Upto 1.80 lack"
  },
  {
    "slNo": 7,
    "department": "Health Services Department",
    "schemeName": "PMJAY Ayushman Bharat Health Card",
    "annualIncomeCriteria": "Upto 1.80 lack"
  },
  {
    "slNo": 8,
    "department": "Food & Supplies Department",
    "schemeName": "BPL Ration Card",
    "annualIncomeCriteria": "Upto 1.80 lack"
  },
  {
    "slNo": 9,
    "department": "Social Justice & Empowerment",
    "schemeName": "National family benefits scheme for BPL families",
    "annualIncomeCriteria": "Upto 1.80 Lack"
  },
  {
    "slNo": 10,
    "department": "Welfare of SCs & BCs",
    "schemeName": "Dr B.R Ambedkar Awas Navinikaran Yojna",
    "annualIncomeCriteria": "Upto 1.80 lack"
  },
  {
    "slNo": 11,
    "department": "Social Justice & Empowerment",
    "schemeName": "Financial Assistance to Destitute Child",
    "annualIncomeCriteria": "Upto 3.00 lack"
  },
  {
    "slNo": 12,
    "department": "Social Justice & Empowerment",
    "schemeName": "Ladli Yojna",
    "annualIncomeCriteria": "Upto 3.00 lack"
  },
  {
    "slNo": 13,
    "department": "Social Justice & Empowerment",
    "schemeName": "Old Age Pension Scheme",
    "annualIncomeCriteria": "Upto 3.00 lack"
  },
  {
    "slNo": 14,
    "department": "Social Justice & Empowerment",
    "schemeName": "Widow & Destitute Women Pension",
    "annualIncomeCriteria": "Upto 3.00 lack"
  },
  {
    "slNo": 15,
    "department": "Social Justice & Empowerment",
    "schemeName": "Bona Bhata",
    "annualIncomeCriteria": "Upto 3.00 lack"
  },
  {
    "slNo": 16,
    "department": "Social Justice & Empowerment",
    "schemeName": "Financial Assistance to Widower and Unmarried Persons",
    "annualIncomeCriteria": "Upto 3.00 lack"
  },
  {
    "slNo": 17,
    "department": "Social Justice & Empowerment",
    "schemeName": "Disability Pension",
    "annualIncomeCriteria": "Upto 3.00 lack"
  },
  {
    "slNo": 18,
    "department": "Welfare of SCs & BCs",
    "schemeName": "Mukhyamantri Vivah Shagun Yojana",
    "annualIncomeCriteria": "Upto 3.00 lack"
  },
  {
    "slNo": 19,
    "department": "Haryana Parivar Suraksha Nyas",
    "schemeName": "Deen Dayal Upadyay Antodya Parivar Suraksha Yojna",
    "annualIncomeCriteria": "Upto 5 lack"
  }
]

const StateFilter = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments")
  const [visibleSchemes, setVisibleSchemes] = useState(10)

  // Get unique departments from schemes
  const departments = ['All Departments', ...new Set(schemes.map(scheme => scheme.department))]

  const filteredSchemes = selectedDepartment === "All Departments"
    ? schemes
    : schemes.filter(scheme => scheme.department === selectedDepartment)

  const handleLoadMore = () => {
    setVisibleSchemes((prev) => Math.min(prev + 5, filteredSchemes.length))
  }

  return (
    <div className="container mx-auto px-4 py-16 bg-gray-100">
      <h2 className="text-4xl font-display font-bold mb-8 text-center text-primary">Haryana Government Schemes</h2>

      <div className="mb-8">
        <label htmlFor="department-filter" className="block text-lg font-semibold text-primary mb-2">
          Filter by Department:
        </label>
        <select
          id="department-filter"
          className="block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary text-lg"
          value={selectedDepartment}
          onChange={(e) => {
            setSelectedDepartment(e.target.value)
            setVisibleSchemes(10)
          }}
        >
          {departments.map((department) => (
            <option key={department} value={department}>
              {department}
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
          {filteredSchemes.slice(0, visibleSchemes).map((scheme) => (
            <motion.div
              key={scheme.slNo}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              exit={{ opacity: 0, y: -20 }}
              whileHover={{ scale: 1.05 }}
            >
              <Image
                src="/placeholder.svg"
                alt={scheme.schemeName}
                width={300}
                height={200}
                className="w-full h-48 object-cover bg-gray-200"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2 text-primary">{scheme.schemeName}</h3>
                <p className="text-sm text-secondary font-semibold mb-2">
                  Department: {scheme.department}
                </p>
                <p className="text-gray-600 mb-4">
                  Annual Income Criteria: {scheme.annualIncomeCriteria}
                </p>
                <button className="inline-flex items-center text-secondary hover:text-primary transition-colors">
                  View Details <ChevronRight className="ml-1 w-4 h-4" />
                </button>
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
            Load More Schemes
          </motion.button>
        </div>
      )}
    </div>
  )
}

export default StateFilter