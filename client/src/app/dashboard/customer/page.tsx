"use client"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import axios from "axios"
import { Bot, Cross, Delete, Minus, X } from "lucide-react"
import Link from "next/link"
import { parse } from "path"
import { useEffect, useState } from "react"

const Customer = () => {
  const [getServices, setGetServices] = useState([])
  const userData = JSON.parse(localStorage.getItem("Customer"))
  const [aiRes, setAiRes] = useState({})
  const [aiOutput, setAiOutput] = useState([])


  useEffect(() => {
    const dataFetch = async () => {
      const res = await axios.get("http://localhost:8080/getservices")
      setGetServices(res.data.message)
    }
    dataFetch()
  }, [])

  const [bot, setBot] = useState(false)
  const [inputValue, setInputValue] = useState("")

  const handleAI = async () => {
    const { data } = await axios.post('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent', {
      "contents": [
        {
          "parts": [
            {
              "text": `You are Taska AI, a service intent parser.\nAlways output ONLY raw valid JSON. Never wrap JSON with markdown, triple backticks, or explanations.\nFields: {intent, entities, apiCall, followUpQuestion}.\nAvailable intents: SearchService(service), BookService(service,date,time), CancelService(service), GetHistory(userId), GeneralFAQ(question).\napiCall must be axios format.\nIf required info missing, add followUpQuestion and leave apiCall empty.\nAlways resolve relative dates like "tomorrow", "day after tomorrow", "after a week" into ISO date format (YYYY-MM-DD).\nExamples:\nUser: "Find me a plumber near me"\n{"intent":"SearchService","entities":{"service":"Plumber"},"apiCall":"axios.get('http://localhost:8080/searchservices?query=Plumber')"}\nUser: "Book an electrician"\n{"intent":"BookService","entities":{"service":"Electrician"},"apiCall":"","followUpQuestion":"What date and time would you like to book the Electrician?"}\nUser: "Cancel my booking"\n{"intent":"CancelService","entities":{},"apiCall":"","followUpQuestion":"Which service booking would you like to cancel?"}\nUser: "${inputValue}"\n`
            }
          ]
        }
      ]
    },
      {
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": "AIzaSyDZKo5PTdwEiTKBuboGdUxL0YVRWJhd-hM"
        }
      }
    )
    const rawText = data.candidates[0].content.parts[0].text
    const cleanText = rawText.replace(/```json|```/g, "").trim()
    const parsed = JSON.parse(cleanText)
    setAiRes(parsed)
  }

  const handleAIRes = async () => {
    if (aiRes.intent === 'SearchService') {
      const res = await axios.get(`http://localhost:8080/searchservices?query=${aiRes.entities.service}`)
      setAiOutput(res.data.message)
    }
  }

  useEffect(() => {
    handleAIRes()
  }, [aiRes])

  const suggestionChips = [
    "Find me a plumber near me",
    "List available electrician services",
  ]

  const handleChipClick = (suggestion: string) => {
    setInputValue(suggestion)
  }

  return (
    <div className="flex flex-col">
      <Navbar></Navbar>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {getServices.slice(0, 10).map((items, index) => (
              <Card
                key={index}
                className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] rounded-xl overflow-hidden flex flex-col h-full"
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl font-semibold text-gray-800 mb-2">{items.title}</CardTitle>
                  <CardAction className="text-2xl font-bold text-emerald-600 mb-3">
                    रु{items.price}
                    <span className="text-sm font-normal text-gray-500">/hr</span>
                  </CardAction>
                  <CardDescription className="text-gray-600 leading-relaxed flex-grow">
                    {items.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0 mt-auto">
                  <Link href={`customer/bookservices/${items._id}`}>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors duration-200">
                      Book Now
                    </Button>
                  </Link>
                </CardContent>
                <CardFooter className="pt-3 border-t border-gray-100 mt-auto">
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">Service by:</span> <span className="text-gray-700">{items.by}</span>
                  </p>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
        <div className='absolute bottom-4 right-4 p-2 fixed z-50'>
          {bot === true && (
            <div className="w-96 bg-white h-[500px] m-3 p-3 flex flex-col rounded-xl shadow-lg">
              <div className="flex justify-between items-center">
                <h1 className="text-lg font-semibold mb-2">Welcome to Taska AI</h1>
                <span
                  onClick={() => setBot(false)}
                  className="m-3 p-1 border border-black rounded-[25px] hover:bg-red-500 hover:text-white transition duration-200 cursor-pointer"
                >
                  <X size={20} />
                </span>
              </div>

              {/* Messages area */}
              <div className="flex-1 overflow-y-auto mb-2 text-sm text-gray-700">
                {aiOutput.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-sm transition-shadow duration-200"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-gray-900 text-sm leading-tight flex-1 mr-2">{item.title}</h3>
                      <span className="text-blue-600 font-semibold text-sm whitespace-nowrap">रु {item.price}</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <span className="bg-gray-100 px-2 py-1 rounded-full">by {item.by}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mb-3">
                <p className="text-xs text-gray-500 mb-2">Quick suggestions:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestionChips.map((chip, index) => (
                    <button
                      key={index}
                      onClick={() => handleChipClick(chip)}
                      className="px-3 py-1 text-xs bg-blue-50 text-blue-600 rounded-full border border-blue-200 hover:bg-blue-100 hover:border-blue-300 transition-all duration-200 hover:shadow-sm"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input area */}
              <div className="flex items-center border-t pt-2">
                <input
                  type="text"
                  placeholder="Type your prompt..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="flex-1 border rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button className="ml-2 bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 text-sm" onClick={handleAI}>
                  Send
                </button>
              </div>
            </div>
          )}
          {bot === false && (<div className='bg-white w-max border border-black rounded-[35px] hover:bg-black hover:text-white transition duration-200' onClick={() => setBot(true)}>
            <Bot size={45} className="m-2 p-1"></Bot>
          </div>)}
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default Customer
