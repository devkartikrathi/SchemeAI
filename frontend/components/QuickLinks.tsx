"use client"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, Search, Download, HelpCircle } from "lucide-react"

const quickLinks = [
  { icon: FileText, title: "Apply for Scheme", description: "Submit your application online" },
  { icon: Search, title: "Check Status", description: "Track your application progress" },
  { icon: Download, title: "Download Forms", description: "Get necessary documents" },
  { icon: HelpCircle, title: "Help & Support", description: "Get assistance with your queries" },
]

const QuickLinks = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-display font-bold text-center mb-12 text-primary">Quick Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {quickLinks.map((link, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300 hover:scale-105">
              <CardContent className="flex flex-col items-center text-center p-6">
                <link.icon className="w-12 h-12 text-secondary mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-primary">{link.title}</h3>
                <p className="text-gray-600">{link.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default QuickLinks

