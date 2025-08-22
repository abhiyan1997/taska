"use client"
import Sidebar from "@/components/sidebar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import axios from "axios"
import { Check, Calendar, Clock, MapPin, Phone, User, DollarSign, IndianRupee } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"

const Appointments = () => {
  const localData = JSON.parse(localStorage.getItem("Provider"))
  const providerId = localData._id
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:8080/getappointments/${providerId}`)
      setData(res.data.message)
    }
    fetchData()
  }, [])

  const handleCheck = async (id) => {
    const res = await axios.post("http://localhost:8080/completeappointments", { id })
    toast(res.data.message)
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-6">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Appointments</h1>
              <p className="text-gray-600">Manage and track your scheduled appointments</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="px-4 py-2">
                <Calendar className="w-4 h-4 mr-2" />
                {data.length} Total Appointments
              </Badge>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="w-[60px] font-semibold text-gray-700">SN</TableHead>
                  <TableHead className="font-semibold text-gray-700">Service</TableHead>
                  <TableHead className="font-semibold text-gray-700">Date & Time</TableHead>
                  <TableHead className="font-semibold text-gray-700">Customer</TableHead>
                  <TableHead className="font-semibold text-gray-700">Contact</TableHead>
                  <TableHead className="font-semibold text-gray-700">Location</TableHead>
                  <TableHead className="font-semibold text-gray-700">Amount</TableHead>
                  <TableHead className="text-center font-semibold text-gray-700">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item, index) => (
                  <TableRow key={index} className="hover:bg-gray-50 transition-colors">
                    <TableCell className="font-medium text-gray-900">{index + 1}</TableCell>
                    <TableCell>
                      <div className="font-medium text-gray-900">{item.service}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span className="font-medium">{item.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span>{item.timing}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <span className="font-medium text-gray-900">{item.customername}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-700">{item.phonenumber}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-700">{item.location}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-green-600">रु {item.price}/hr</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        onClick={() => handleCheck(item._id)}
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        <Check className="w-4 h-4 mr-2" />
                        Complete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {data.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments yet</h3>
              <p className="text-gray-600">Your scheduled appointments will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Appointments
