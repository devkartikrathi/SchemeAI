"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import IssueDetailPopup from "@/components/IssueDetailPopup";
import Spinner from "@/components/Spinner";

const AdminIssueList = () => {
  type Issue = {
    _id: string;
    mobile: string;
    job: string;
    address: string;
    dob: string;
    age: string;
    annual_income: string;
    message: string;
    created_at: string;
    status: string;
  };

  const [issues, setIssues] = useState<Issue[]>([]);
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/complaints/");
      const data = await response.json();
      setIssues(data);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleIssueClick = (issue: Issue) => {
    setSelectedIssue(issue);
    setIsPopupOpen(true);
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await fetch(`/api/complaint/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      fetchComplaints();
    } catch (error) {
      console.error("Error updating status:", error);
    }
    setIsPopupOpen(false);
  };

  const filteredIssues = issues.filter((issue) => {
    const matchesFilter = filter === "All" || issue.status === filter;
    const matchesSearch =
      issue.mobile.includes(searchTerm) ||
      issue.job.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.message.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

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
            <option value="pending">Pending</option>
            <option value="resolved">Resolved</option>
            <option value="rejected">Rejected</option>
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
            {isLoading ? (
              <tr>
                <td colSpan={5} className="text-center">
                  <Spinner />
                </td>
              </tr>
            ) : (
              <AnimatePresence>
                {filteredIssues.map((issue) => (
                  <motion.tr
                    key={issue._id}
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
                      ${issue.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : issue.status === "resolved"
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
            )}
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
  );
};

export default AdminIssueList;
