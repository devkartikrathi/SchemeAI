"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const issues = [
  {
    id: 1,
    type: "Missing Aadhaar",
    description: "Unable to locate Aadhaar card in the system",
    date: "2023-05-01",
    status: "Pending",
  },
  {
    id: 2,
    type: "Incorrect Information",
    description: "Date of birth mismatch in Aadhaar card",
    date: "2023-05-02",
    status: "Resolved",
  },
  {
    id: 3,
    type: "Address Update",
    description: "Request to update address in Aadhaar",
    date: "2023-05-03",
    status: "Pending",
  },
  {
    id: 4,
    type: "Biometric Failure",
    description: "Unable to capture fingerprints",
    date: "2023-05-04",
    status: "Pending",
  },
  {
    id: 5,
    type: "Missing Aadhaar",
    description: "Aadhaar not linked to mobile number",
    date: "2023-05-05",
    status: "Resolved",
  },
  // Add more dummy issues here
]

const AdminIssueList = () => {
  const [filter, setFilter] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const issuesPerPage = 5

  const filteredIssues = issues.filter((issue) => {
    const matchesFilter = filter === "All" || issue.status === filter
    const matchesSearch =
      issue.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const indexOfLastIssue = currentPage * issuesPerPage
  const indexOfFirstIssue = indexOfLastIssue - issuesPerPage
  const currentIssues = filteredIssues.slice(indexOfFirstIssue, indexOfLastIssue)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Issue Management</h2>
      <div className="mb-4 flex flex-wrap items-center">
        <div className="mr-4 mb-2">
          <label htmlFor="filter" className="mr-2">
            Filter:
          </label>
          <select
            id="filter"
            className="px-2 py-1 border rounded"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>
        <div className="mb-2">
          <input
            type="text"
            placeholder="Search issues..."
            className="px-2 py-1 border rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <AnimatePresence>
        {currentIssues.map((issue) => (
          <motion.div
            key={issue.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white shadow-md rounded-lg p-6 mb-4"
          >
            <h3 className="text-xl font-semibold mb-2">{issue.type}</h3>
            <p className="text-gray-600 mb-2">{issue.description}</p>
            <p className="text-sm text-gray-500">Date: {issue.date}</p>
            <p className={`text-sm ${issue.status === "Pending" ? "text-yellow-600" : "text-green-600"}`}>
              Status: {issue.status}
            </p>
          </motion.div>
        ))}
      </AnimatePresence>
      <div className="mt-4 flex justify-center">
        {Array.from({ length: Math.ceil(filteredIssues.length / issuesPerPage) }, (_, i) => (
          <button
            key={i}
            onClick={() => paginate(i + 1)}
            className={`mx-1 px-3 py-1 rounded ${currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  )
}

export default AdminIssueList

