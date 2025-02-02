import AdminIssueList from "@/components/AdminIssueList"

export default function Admin() {
    return (
        <div className="min-h-screen bg-gray-100">
            <div className="py-8">
                <h1 className="text-4xl font-bold text-center text-primary mb-8">Admin Dashboard</h1>
                <AdminIssueList />
            </div>
        </div>
    )
}

