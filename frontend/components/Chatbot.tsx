"use client";
import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, X, ExternalLink } from "lucide-react";

type Message = {
  text: string;
  isBot: boolean;
  isTyping?: boolean;
  hasAction?: boolean;
};

const WELCOME_MESSAGES = [
  "Welcome to GovSchemes! I'm here to help you navigate government schemes and benefits.",
  "To provide you with personalized assistance, could you please share your UniqueId number? If you prefer not to, just let me know.",
];

const UniqueId_REQUEST_LINK = "https://resident.uidai.gov.in/en/web/resident/get-UniqueId";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [UniqueIdId, setUniqueIdId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => {
    if (!isOpen) {
      setMessages([
        { text: WELCOME_MESSAGES[0], isBot: true },
        { text: WELCOME_MESSAGES[1], isBot: true },
      ]);
    }
    setIsOpen(!isOpen);
  };

  const validateUniqueId = (UniqueId: string) => {
    const trimmedUniqueId = UniqueId.trim();
    return /^\d{12}$/.test(trimmedUniqueId) ? trimmedUniqueId : null;
  };

  const addUniqueIdRequestMessage = () => {
    addBotMessage(
      "If you don't have an UniqueId number, you can raise request by visiting the link below.",
      true
    );
  };

  const handleUniqueIdSubmission = (text: string) => {
    const possibleUniqueId = text.toLowerCase().replace(/[^0-9]/g, "");
    const validUniqueId = validateUniqueId(possibleUniqueId);

    if (validUniqueId) {
      setUniqueIdId(validUniqueId);
      addBotMessage(`Thank you! I've registered your UniqueId number ${validUniqueId.replace(/(\d{4})/g, "$1 ").trim()}. How can I assist you today?`);
    } else if (text.toLowerCase().includes("skip") || text.toLowerCase().includes("continue") || text.toLowerCase().includes("no")) {
      setUniqueIdId("anonymous");
      addBotMessage("No problem! I'll continue without UniqueId. How can I assist you today?");
      addUniqueIdRequestMessage();
    } else {
      addBotMessage("I couldn't validate that UniqueId number. Please provide a valid 12-digit UniqueId number, or type 'skip' to continue without one.");
      addUniqueIdRequestMessage();
    }
  };

  const addBotMessage = (text: string, hasAction: boolean = false) => {
    setMessages(prev => [...prev, { text, isBot: true, hasAction }]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { text: userMessage, isBot: false }]);

    if (!UniqueIdId) {
      handleUniqueIdSubmission(userMessage);
      return;
    }

    setIsThinking(true);

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_CHAT_API || "https://schemeai.onrender.com/start-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          unique_id: UniqueIdId === "anonymous" ? "6798fcac6dc00c08c0710c8d" : UniqueIdId,
          message: userMessage,
        }),
      });

      if (!response.ok) throw new Error("Failed to fetch response");

      const data = await response.json();
      addBotMessage(data.response.response || "I couldn't understand your request.");
    } catch (error) {
      console.error("Error:", error);
      addBotMessage("Sorry, something went wrong.");
    } finally {
      setIsThinking(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <button
        onClick={toggleChat}
        className="fixed bottom-4 right-4 z-50 p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 md:bottom-8 md:right-8"
      >
        <MessageCircle size={24} />
      </button>

      {isOpen && (
        <div className="fixed bottom-0 right-0 w-full h-[600px] md:w-96 md:h-[600px] md:bottom-4 md:right-4 bg-white rounded-t-lg md:rounded-lg shadow-xl z-50 flex flex-col animate-slide-up">
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">GovSchemes Assistant</h3>
            <button onClick={toggleChat} className="text-white hover:text-gray-200">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isBot ? "justify-start" : "justify-end"} animate-fade-in`}
              >
                <div
                  className={`max-w-[75%] p-3 rounded-lg ${message.isBot
                    ? "bg-gray-100 text-gray-800"
                    : "bg-blue-600 text-white"
                    }`}
                >
                  {message.text}
                  {message.hasAction && (
                    <a
                      href={UniqueId_REQUEST_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center mt-2 text-blue-600 hover:text-blue-700"
                    >
                      Apply for UniqueId <ExternalLink size={16} className="ml-1" />
                    </a>
                  )}
                </div>
              </div>
            ))}
            {isThinking && (
              <div className="flex justify-start animate-fade-in">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
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
                placeholder={!UniqueIdId ? "Enter your UniqueId number or type 'skip'..." : "Type your message..."}
                className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white p-2 rounded-r-lg hover:bg-blue-700 transition-colors duration-300"
              >
                <Send size={20} />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot;