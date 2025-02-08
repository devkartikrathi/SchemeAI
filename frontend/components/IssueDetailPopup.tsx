import { motion } from "framer-motion";
import { format } from "date-fns";
import { X } from "lucide-react";

interface Issue {
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
}

interface IssueDetailPopupProps {
    issue: Issue;
    onClose: () => void;
    onStatusChange: (_id: string, newStatus: string) => void;
}

const IssueDetailPopup: React.FC<IssueDetailPopupProps> = ({ issue, onClose, onStatusChange }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700" onClick={onClose}>
                    <X size={24} />
                </button>
                <h2 className="text-2xl font-bold mb-4 text-primary">Issue Details</h2>
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Mobile</p>
                        <p className="text-lg">{issue.mobile}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Job</p>
                        <p className="text-lg">{issue.job}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Date of Birth</p>
                        <p className="text-lg">{format(new Date(issue.dob), "dd MMM yyyy")}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Age</p>
                        <p className="text-lg">{issue.age}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Income Range</p>
                        <p className="text-lg">₹{issue.annual_income} lakh</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Created At</p>
                        <p className="text-lg">{format(new Date(issue.created_at), "dd MMM yyyy HH:mm")}</p>
                    </div>
                </div>
                <div className="mb-6">
                    <p className="text-sm font-medium text-gray-500">Address</p>
                    <p className="text-lg">{issue.address}</p>
                </div>
                <div className="mb-6">
                    <p className="text-sm font-medium text-gray-500">Message</p>
                    <p className="text-lg">{issue.message}</p>
                </div>
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Current Status</p>
                        <p
                            className={`text-lg font-semibold ${issue.status === "Pending"
                                ? "text-yellow-600"
                                : issue.status === "Resolved"
                                    ? "text-green-600"
                                    : "text-red-600"
                                }`}
                        >
                            {issue.status}
                        </p>
                    </div>
                    <div className="space-x-2">
                        <button
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                            onClick={() => onStatusChange(issue._id, "Resolved")}
                        >
                            Resolve
                        </button>
                        <button
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                            onClick={() => onStatusChange(issue._id, "Rejected")}
                        >
                            Reject
                        </button>
                        <button
                            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
                            onClick={() => onStatusChange(issue._id, "Pending")}
                        >
                            Mark as Pending
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default IssueDetailPopup;
