"use client"
import Sidebar from "@/components/sidebar"
import axios from "axios"
import { Bell, Calendar, Clock, LogOut, Search, User } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

const ProviderDashboard = () => {
  const handleLogOut = () => {
    localStorage.clear()
  }
  const storedData = JSON.parse(localStorage.getItem("Provider"))
  const [appointmentsCount, setAppointmentsCount]= useState()
  const [historyCount, setHistoryCount]= useState()

  useEffect(() => {
    const fetchData= async()=>{
      const res= await axios.get(`http://localhost:8080/countappointments/${storedData._id}`)
      setAppointmentsCount(res.data.message)
    }
    fetchData()

    const fetchHistoryCount= async()=>{
      const res= await axios.get(`http://localhost:8080/counthistory/${storedData._id}`)
      setHistoryCount(res.data.message)
    }
    fetchHistoryCount()
  }, [])

  return (
    <div>
      <div className="flex gap-2">
        <Sidebar></Sidebar>

        <div className="w-screen">
          <div className="w-[98%] m-2 p-2 bg-black h-20 text-white flex justify-between">
            <div></div>
            <div className="flex gap-8 items-center">
              <Search></Search>
              <Bell></Bell>
              <Link href="/">
                <LogOut onClick={handleLogOut}></LogOut>
              </Link>
              <div className="flex flex-col m-2 p-2">
                <span className="font-bold text-[18px]">{storedData.name}</span>
                <span className="text-gray-400">{storedData.role}</span>
              </div>
            </div>
          </div>

          <div className="mx-4 mb-6 mt-6">
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back! Here's your overview</p>
          </div>

          <div className="mx-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-green-600" />
                  </div>
                  <span className="text-lg font-semibold text-gray-800">Appointments</span>
                </div>
              </div>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-gray-900">{appointmentsCount}</span>
                <span className="text-sm text-gray-500 mb-1">scheduled</span>
              </div>
            </div>
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="text-lg font-semibold text-gray-800">Total Services Completed</span>
                </div>
              </div>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-gray-900">{historyCount}</span>
                <span className="text-sm text-gray-500 mb-1">completed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProviderDashboard
