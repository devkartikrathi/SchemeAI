"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { format } from "date-fns"
import IssueDetailPopup from "@/components/IssueDetailPopup"

// Dummy data based on the provided schema
const dummyIssues = [
  {
    id: 1,
    mobile: "9876543210",
    job: "Software Engineer",
    address: "123 Tech Park, Bangalore",
    dob: "1990-05-15",
    age: "33",
    income: "10+",
    message: "Need information about skill development programs",
    created_at: "2023-07-01T10:30:00Z",
    status: "Pending",
  },
  {
    id: 2,
    mobile: "8765432109",
    job: "Teacher",
    address: "456 Education Street, Mumbai",
    dob: "1985-11-20",
    age: "37",
    income: "5-10",
    message: "Inquiry about education loan forgiveness",
    created_at: "2023-07-02T14:45:00Z",
    status: "Pending",
  },
  {
    id: 3,
    mobile: "7654321098",
    job: "Farmer",
    address: "789 Rural Road, Punjab",
    dob: "1975-03-10",
    age: "48",
    income: "1-2.5",
    message: "Request for information on crop insurance schemes",
    created_at: "2023-07-03T09:15:00Z",
    status: "Resolved",
  },
  {
    id: 4,
    mobile: "6543210987",
    job: "Small Business Owner",
    address: "321 Market Lane, Gujarat",
    dob: "1980-08-25",
    age: "42",
    income: "2.5-5",
    message: "Seeking details about MSME support programs",
    created_at: "2023-07-04T16:20:00Z",
    status: "Rejected",
  },
  {
    id: 5,
    mobile: "5432109876",
    job: "Retired Government Employee",
    address: "654 Pension Colony, Delhi",
    dob: "1960-12-05",
    age: "62",
    income: "2.5-5",
    message: "Query regarding senior citizen benefits",
    created_at: "2023-07-05T11:00:00Z",
    status: "Pending",
  },
]

const AdminIssueList = () => {
  type Issue = typeof dummyIssues[number];
  const [issues, setIssues] = useState(dummyIssues)
  const [filter, setFilter] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const filteredIssues = issues.filter((issue) => {
    const matchesFilter = filter === "All" || issue.status === filter
    const matchesSearch =
      issue.mobile.includes(searchTerm) ||
      issue.job.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.message.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const handleIssueClick = (issue: typeof dummyIssues[number]) => {
    setSelectedIssue(issue);
    setIsPopupOpen(true);
  };

  const handleStatusChange = (id: number, newStatus: string) => {
    setIssues(issues.map((issue) =>
      issue.id === id ? { ...issue, status: newStatus } : issue
    ));
    setIsPopupOpen(false);
  };


  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-primary">Issue Management</h2>
      <div className="mb-4 flex flex-wrap items-center gap-4">
        <div>
          <label htmlFor="filter" className="mr-2 text-gray-700">
            Filter:
          </label>
          <select
            id="filter"
            className="px-2 py-1 border rounded text-gray-700"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Resolved">Resolved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search issues..."
            className="px-2 py-1 border rounded text-gray-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Message
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <AnimatePresence>
              {filteredIssues.map((issue) => (
                <motion.tr
                  key={issue.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleIssueClick(issue)}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {format(new Date(issue.created_at), "dd MMM yyyy")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${issue.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : issue.status === "Resolved"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                    >
                      {issue.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{issue.mobile}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{issue.job}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 truncate max-w-xs">{issue.message}</td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
      {isPopupOpen && selectedIssue && (
        <IssueDetailPopup
          issue={selectedIssue}
          onClose={() => setIsPopupOpen(false)}
          onStatusChange={handleStatusChange}
        />
      )}

    </div>
  )
}

export default AdminIssueList

