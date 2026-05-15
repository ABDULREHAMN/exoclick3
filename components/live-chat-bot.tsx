"use client"

import { useState } from "react"
import { MessageCircle, X, Send, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface ChatMessage {
  text: string
  sender: "user" | "bot" | "support"
  time?: string
}

const supportConversation: ChatMessage[] = [
  {
    text: "Hello Publisher, we noticed unusual traffic pauses and repeated interruptions during verification checks. Can you explain the source of your traffic and testing activity?",
    sender: "support",
    time: "11:04 AM",
  },
  {
    text: "I tested multiple traffic methods and production campaigns. Some campaigns were paused and restarted during trial optimization. I also tested different production strategies and payout methods.",
    sender: "user",
    time: "11:06 AM",
  },
  {
    text: "Did you use trial traffic sources or temporary testing campaigns during the payout period?",
    sender: "support",
    time: "11:08 AM",
  },
  {
    text: "Yes, several trial campaigns were used for optimization. Real traffic methods were also tested and production campaigns were scaled after successful trials.",
    sender: "user",
    time: "11:09 AM",
  },
  {
    text: "Our system detected repeated stop/start behavior in traffic flow. Because of this, your withdrawal entered manual review status.",
    sender: "support",
    time: "11:11 AM",
  },
  {
    text: "The campaigns were paused only for optimization and testing. No invalid automation or fake traffic was intentionally used.",
    sender: "user",
    time: "11:13 AM",
  },
  {
    text: "Thank you for clarification. Your withdrawal of $24185.54 was temporarily placed on hold for verification review.",
    sender: "support",
    time: "11:15 AM",
  },
  {
    text: "Can you explain why the withdrawal was held and how long review takes?",
    sender: "user",
    time: "11:17 AM",
  },
  {
    text: "The payout was automatically flagged because traffic consistency repeatedly changed during the review period. The withdrawal remains safe and under manual verification.",
    sender: "support",
    time: "11:18 AM",
  },
  {
    text: "Estimated review time is 8–10 business days. Once verification is completed, the payout status will update automatically.",
    sender: "support",
    time: "11:20 AM",
  },
]

export default function LiveChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>(supportConversation)
  const [input, setInput] = useState("")

  const handleSend = () => {
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

          {/* Withdrawal Hold Notice */}
          <div className="px-4 py-3 bg-amber-50 border-b border-amber-200 flex gap-2">
            <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold text-amber-900">Withdrawal Under Review</p>
              <p className="text-amber-800 text-xs mt-1">Amount: $24,185.54 | Status: On Hold</p>
            </div>
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
              placeholder="Type a message..."
              className="flex-1 text-sm"
            />
            <Button onClick={handleSend} size="icon" className="bg-blue-600 hover:bg-blue-700">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      )}
    </>
  )
}
