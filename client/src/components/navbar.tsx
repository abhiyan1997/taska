'use client'
import { DollarSign, LogOut, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Router, useRouter } from 'next/router'
import React from 'react'
import { Input } from './ui/input'

const Navbar = () => {

   const handleLogout= ()=>{
    localStorage.clear()
  }

  const pathname = usePathname()

  return (
    <div className='bg-black w-screen h-20 flex justify-between'>
      <div className='w-50 m-3 p-3'>
      <Link href='/'><img src="/taska_logo.png" alt="Taska Logo"/></Link>
      </div>
      <div className='flex m-2 p-2 text-white'>
     {pathname === '/' && (
      <div className='flex'>
      <span className='font-bold underline m-2 p-2 cursor-pointer'><Link href='register'>Register as Professional</Link></span>
      <span className='font-bold m-2 p-2 cursor-pointer'> <Link href='login'>Login / Signup</Link></span>
      <span className='font-bold m-2 p-2 cursor-pointer'>Help</span>
      </div>
      )}

      {pathname==='/dashboard/customer' && (
        <div className='flex justify-center items-center gap-5'>
          <Input placeholder='Search For Anything' className='w-90'></Input>
          <span><User></User></span>
         <Link href='/'> <span onClick={handleLogout}><LogOut></LogOut></span></Link>
        </div>
      )
      }
     

      </div>
     </div>
  )
}

export default Navbar