'use client'
import { DollarSign, LogOut, Search, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter} from 'next/navigation'
import React, { useState } from 'react'
import { Input } from './ui/input'
import axios from 'axios'


const Navbar = () => {
  const router = useRouter()
  const [search, setSearch]= useState("")

  const handleSearch = ()=>{
    router.push(`/dashboard/customer/search?query=${search}`)
  }

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

      {pathname==='/dashboard/customer'  && (
        <div className='flex justify-center items-center gap-5'>
          <form onSubmit={handleSearch} className='flex justify-center items-center'>
          <Input placeholder='Search For Any Service You Need' className='w-100 p-3' onChange={(e)=>setSearch(e.target.value)} value={search}></Input>
          <Search className='absolute right-30 p-[1px]' onClick={handleSearch}></Search>
          </form>
         <Link href='customer/profile'><span><User></User></span></Link> 
         <Link href='/'> <span onClick={handleLogout}><LogOut></LogOut></span></Link>
        </div>
      )
      }
     

      </div>
     </div>
  )
}

export default Navbar