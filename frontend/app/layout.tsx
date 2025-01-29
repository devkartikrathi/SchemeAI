import "./globals.css"
import { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Chatbot from "@/components/Chatbot"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const poppins = Poppins({ weight: ["400", "600", "700"], subsets: ["latin"], variable: "--font-poppins" })

export const metadata: Metadata = {
  title: "Government Scheme Portal",
  description: "Explore government schemes and benefits",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`} suppressHydrationWarning>
      <body className="font-sans">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Chatbot />
      </body>
    </html>
  )
}
