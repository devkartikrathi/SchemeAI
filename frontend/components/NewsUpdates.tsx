"use client"
import { Card, CardContent } from "@/components/ui/card"

const newsItems = [
  { title: "New Farmer Support Scheme Launched", date: "2023-05-15" },
  { title: "Youth Skill Development Program Expanded", date: "2023-05-10" },
  { title: "Senior Citizen Healthcare Benefits Increased", date: "2023-05-05" },
  { title: "Online Application System Upgraded", date: "2023-04-30" },
]

const NewsUpdates = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-display font-bold text-center mb-12 text-primary">Latest News & Updates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {newsItems.map((item, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300 hover:scale-105">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-primary">{item.title}</h3>
                <p className="text-gray-600">{item.date}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default NewsUpdates

