'use client'
import Sidebar from '@/components/sidebar'
import { Bell, Calendar, LogOut, Search, User } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const ProviderDashboard = () => {
    const handleLogOut= ()=>{
        localStorage.clear()
    }
    const storedData= JSON.parse(localStorage.getItem('Provider'))
  return (
    <div>
        <div className='flex gap-2'>
        <Sidebar></Sidebar>

        <div className='w-screen'>
            <div className='w-[98%] m-2 p-2 bg-black h-20 text-white flex justify-between'>
                <div></div>
                <div className='flex gap-8 items-center'>
                    <Search></Search>
                    <Bell></Bell>
                    <Link href='/'><LogOut onClick={handleLogOut}></LogOut></Link>
                    <div className='flex flex-col m-2 p-2'>
                        <span className='font-bold text-[18px]'>{storedData.name}</span>
                        <span className='text-gray-400'>{storedData.role}</span>
                    </div>
                </div>
            </div>
            
            <div className='m-2 p-2'>
            <span className='m-2 p-2 text-[30px] font-bold'>Dashboard</span>
            </div>

            <div className='m-2 p-2 flex gap-2'>
                <div className='w-60 border border-black m-2 p-2 h-25 flex flex-col gap-2 rounded-[20px]'>
                    <div className='flex gap-2'>
                    <User></User>
                    <span className='text-[20px]'>Clients</span>
                    </div>
                    <div>
                    <span className='text-[30px] m-2 p-2 font-bold'>
                        --
                    </span>
                    </div>
                </div>

                <div className='w-60 border border-black m-2 p-2 h-25 flex flex-col gap-2 rounded-[20px]'>
                    <div className='flex gap-2'>
                    <Calendar></Calendar>
                    <span className='text-[20px]'>Appointments</span>
                    </div>
                    <div>
                    <span className='text-[30px] m-2 p-2 font-bold'>
                        --
                    </span>
                    </div>
                </div>
            </div>
        </div>

        </div>
    </div>
  )
}

export default ProviderDashboard