import ImageSlider from "@/components/ImageSlider"
import VerticalTabs from "@/components/VerticalTabs"
import DepartmentFilter from "@/components/Departmentfilter"
import QuickLinks from "@/components/QuickLinks"
import NewsUpdates from "@/components/NewsUpdates"

export default function Home() {
  return (
    <div className="bg-gray-100">
      <ImageSlider />
      <QuickLinks />
      <VerticalTabs />
      <DepartmentFilter />
      <NewsUpdates />
    </div>
  )
}

