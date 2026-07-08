"use client"

import { useState } from "react"
import { MessageCircle, X, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface ChatMessage {
  text: string
  sender: "user" | "bot" | "support"
  time?: string
}

// Maintenance mode flag - set to true to enable maintenance mode
const MAINTENANCE_MODE = true

const MAINTENANCE_MESSAGE = "Live Chat is temporarily unavailable due to scheduled maintenance. Our team is currently working to improve the system. Please try again after 24 hours. We apologize for the inconvenience and appreciate your patience."

const maintenanceConversation: ChatMessage[] = [
  {
    text: MAINTENANCE_MESSAGE,
    sender: "support",
    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  },
]

const supportConversation: ChatMessage[] = [
  {
    text: "Thank you for contacting us. Our support team has received your request. A member of our team will get back to you shortly. Please keep this chat open for further updates.",
    sender: "support",
    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  },
]

export default function LiveChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>(MAINTENANCE_MODE ? maintenanceConversation : supportConversation)
  const [input, setInput] = useState("")

  const handleSend = () => {
    // Block message sending if maintenance mode is active
    if (MAINTENANCE_MODE) {
      return
    }

    if (!input.trim()) return

    setMessages([...messages, { text: input, sender: "user", time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }])
    setInput("")

    // Support bot response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          text: "Thank you for your message. Your inquiry has been logged. A support agent will respond as soon as possible.",
          sender: "support",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ])
    }, 1000)
  }

  return (
    <>
      {/* Chat Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700"
        size="icon"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-96 max-h-[600px] flex flex-col shadow-xl border border-gray-200">
          {/* Header */}
          <div className="p-4 border-b bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-t-lg">
            <h3 className="font-semibold flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Live Support Chat
            </h3>
            <p className="text-xs text-blue-100">Nilan Cookery India Support</p>
          </div>



          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-white">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className="max-w-[85%]">
                  <div
                    className={`rounded-lg px-4 py-2 text-sm ${
                      msg.sender === "user"
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-gray-200 text-gray-900 rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                  {msg.time && (
                    <p className={`text-xs text-gray-500 mt-1 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                      {msg.time}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t bg-gray-50 flex gap-2 rounded-b-lg">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder={MAINTENANCE_MODE ? "Chat unavailable during maintenance" : "Type a message..."}
              disabled={MAINTENANCE_MODE}
              className="flex-1 text-sm"
            />
            <Button 
              onClick={handleSend} 
              size="icon" 
              className="bg-blue-600 hover:bg-blue-700"
              disabled={MAINTENANCE_MODE}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      )}
    </>
  )
}
