
import { Calendar, Clock, IndianRupee, MessageCircle, Notebook, Plus, Settings, User } from 'lucide-react'
import Link from 'next/link'
import React from 'react'



const Sidebar = () => {
  return (
    <div>
        <div className='bg-black w-72 h-screen text-white flex flex-col gap-2'>
        <div className='m-2 p-2 flex items-center justify-center w-[100%]'>
        <Link href='/dashboard/provider'><img src="/taska_logo.png" className='w-52' /></Link>
        </div>
         <Link href='/dashboard/provider/addservices'><div className='flex gap-2 m-3 p-2'>
        <Plus></Plus>
        <span>Add Services</span>
        </div></Link>
       <Link href='/dashboard/provider/appointments'><div className='flex gap-2 m-3 p-2'>
        <Calendar></Calendar>
        <span>Appointments</span>
        </div></Link> 
        <Link href='/dashboard/provider/history'><div className='flex gap-3 m-3 p-2'>
        <Clock></Clock>
        <span>History</span>
        </div></Link>
        <div className='flex gap-2 m-3 p-2'>
        <MessageCircle></MessageCircle>
        <span>Message</span>
        </div>
        <div className='flex gap-2 m-3 p-2'>
       <Notebook></Notebook>
        <span>Reviews</span>
        </div>
        <div className='flex gap-2 m-3 p-2'>
        <Settings></Settings>
        <span>Settings</span>
        </div>
        </div>
    </div>
  )
}

export default Sidebar