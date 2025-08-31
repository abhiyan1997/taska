"use client"
import axios from "axios"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, User } from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/navbar"

const Search = () => {
  const search = useSearchParams()
  const searchedTerm = search.get("query")
  const [data, setData] = useState([])
  const [page,setPage]= useState(1)
  const [dataCount, setDataCount]= useState(0)

  useEffect(() => {
    const dataFetch = async () => {
      const res = await axios.get(`http://localhost:8080/searchservices?query=${searchedTerm}&page=${page}`)
      setData(res.data.message)
      setDataCount(res.data.count)
    }
    dataFetch()
  }, [searchedTerm, page])


  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar fixed at top */}
      <div className="sticky top-0 z-50 bg-white shadow">
        <Navbar />
      </div>

      {/* Header section */}
      <div className="bg-gradient-to-r from-black via-gray-900 to-black text-white py-8 px-6 shadow-md">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl font-bold tracking-tight">Search Results</h1>
          <p className="text-gray-300 mt-2 text-lg">
            {data.length} results for <span className="font-semibold">"{searchedTerm}"</span>
          </p>
        </div>
      </div>

      {/* Results section */}
      <div className="flex-1 max-w-7xl mx-auto px-6 py-10">
        {data.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">No results found</h2>
            <p className="text-gray-500">Try adjusting your search terms</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {data.map((item, idx) => (
              <Card
                key={idx}
                className="hover:shadow-2xl hover:scale-[1.02] transition-all duration-200 border border-gray-200 rounded-2xl bg-white"
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold line-clamp-2 text-gray-900">
                    {item.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="py-2">
                  <p className="text-gray-600 text-sm line-clamp-3 mb-3">
                    {item.description || "Professional service with quality guarantee"}
                  </p>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span>{item.location || "Available in your area"}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <User className="w-4 h-4 text-gray-500" />
                      <span>
                        Service by <b>{item.by || "Professional"}</b>
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    <Badge variant="secondary" className="text-xs px-2 py-1 rounded-md">
                      {item.category || "Home Service"}
                    </Badge>
                    <Badge variant="outline" className="text-xs px-2 py-1 rounded-md">
                      Verified
                    </Badge>
                  </div>
                </CardContent>

                <CardFooter className="pt-3">
                  <div className="w-full">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-2xl font-bold text-gray-900">रु {item.price}</span>
                        <span className="text-sm text-gray-500 ml-1">/hr</span>
                      </div>
                    </div>
                    <Link href={`/dashboard/customer/bookservices/${item._id}`}>
                      <Button className="w-full bg-black hover:bg-gray-800 text-white rounded-xl">
                        Book Now
                      </Button>
                    </Link>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
        <div className="flex gap-2 items-center justify-center m-2 p-2">
          <Button onClick={()=>{if (page>1){setPage(page-1)}}} disabled={page===1}>Prev</Button>
          <span>{page}</span>
          <Button onClick={()=>{if(page < Math.ceil(dataCount/10)) {setPage(page+1)}}}>Next</Button>
        </div>
    </div>
  )
}

export default Search
