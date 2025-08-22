"use client"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"

const Customer = () => {
  const [getServices, setGetServices] = useState([])
  const userData = JSON.parse(localStorage.getItem("Customer"))

  useEffect(() => {
    const dataFetch = async () => {
      const res = await axios.get("http://localhost:8080/getservices")
      setGetServices(res.data.message)
    }
    dataFetch()
  }, [])

  return (
    <div className="flex flex-col">
      <Navbar></Navbar>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {getServices.slice(0,10).map((items, index) => (
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
      </div>
      <Footer></Footer>
    </div>
  )
}

export default Customer
