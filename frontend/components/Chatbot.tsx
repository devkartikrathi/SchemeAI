"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, Send, X } from "lucide-react"

type Message = {
  text: string
  isBot: boolean
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isThinking, setIsThinking] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const toggleChat = () => setIsOpen(!isOpen)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      setMessages([...messages, { text: input, isBot: false }])
      setInput("")
      setIsThinking(true)
      // Simulate bot response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { text: "Thank you for your message. How can I assist you today?", isBot: true },
        ])
        setIsThinking(false)
      }, 2000)
    }
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messagesEndRef]) //Fixed useEffect dependency

  return (
    <>
      <button
        onClick={toggleChat}
        className="fixed bottom-4 right-4 z-50 p-4 bg-chatbot-primary text-white rounded-full shadow-lg hover:bg-opacity-90 transition-all duration-300 md:bottom-8 md:right-8"
      >
        <MessageCircle size={24} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 right-0 w-full h-full md:w-96 md:h-[600px] md:bottom-4 md:right-4 bg-chatbot-secondary rounded-t-lg md:rounded-lg shadow-xl z-50 flex flex-col"
          >
            <div className="bg-chatbot-primary text-white p-4 rounded-t-lg flex justify-between items-center">
              <h3 className="font-semibold">GovSchemes Assistant</h3>
              <button onClick={toggleChat} className="text-white hover:text-gray-200">
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}>
                  <div
                    className={`max-w-[75%] p-3 rounded-lg ${message.isBot ? "bg-chatbot-botMessage text-chatbot-botMessageText" : "bg-chatbot-accent text-white"}`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              {isThinking && (
                <div className="flex justify-start">
                  <div className="bg-chatbot-botMessage text-chatbot-botMessageText p-3 rounded-lg">
                    <div className="flex space-x-2">
                      <div
                        className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
              <div className="flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-chatbot-primary"
                />
                <button
                  type="submit"
                  className="bg-chatbot-primary text-white p-2 rounded-r-lg hover:bg-opacity-90 transition-colors duration-300"
                >
                  <Send size={20} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Chatbot

