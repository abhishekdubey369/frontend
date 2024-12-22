'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MessageCircle, Send, X } from 'lucide-react'
import axios from 'axios'

interface Message {
  text: string
  isUser: boolean
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')

  const logs = async () => {
    try {
      // Fetch logs using axios
      const resLog = await axios.get('/api/log_handler');
  
      // Extract data from the response
      const logdata = resLog.data;
  
      // Map the log data to extract only the 'main' property
      const log = logdata.map((log: any) => log.weather.main);
  
      // Return the extracted logs as an array
      return JSON.stringify(log);
    } catch (error) {
      console.error('Error fetching logs:', error);
      return ""; // Return an empty array in case of an error
    }
  };
  

  const handleSend = async () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, isUser: true }])
      setInput('')
      
      const logdata = await logs();
      console.log(logdata);
      const res = await axios.post('/api/genAI/nlp_query', { weather_logs: input + logdata });
      const data = await res.data;
      if (data.success) {
        setMessages(prev => [...prev, { text: JSON.stringify(data.message.response.insights ||data.message.response[0] || data.message.response.errors), isUser: false }])
      } else {
        setMessages(prev => [...prev, { text: "hello, Please select different model and discuss on topic thing", isUser: false }])
      }
    }
  }

  return (
    <>
      <Button
        className="fixed bottom-4 right-4 rounded-full w-12 h-12 p-0 bg-sky-400"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MessageCircle />
      </Button>
      {isOpen && (
        <Card className="fixed bottom-20 right-4 w-80 h-96 flex flex-col rounded-lg-overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between bg-sky-400 rounded-t-lg h-4">
            <CardTitle>ChatBot</CardTitle>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4 bg-red-300" />
            </Button>
          </CardHeader>
          <CardContent className="flex-grow overflow-auto">
            {messages.map((message, index) => (
              <div key={index} className={`mb-2 ${message.isUser ? 'text-right' : 'text-left'}`}>
                <span className={`inline-block p-2 rounded-lg ${message.isUser ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
                  {message.text}
                </span>
              </div>
            ))}
          </CardContent>
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type a message..."
              />
              <Button onClick={handleSend}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  )
}

