import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className='bg-black w-screen h-20 flex justify-between'>
      <div className='w-50 m-3 p-3'>
      <img src="/taska_logo.png" alt="Taska Logo"/>
      </div>
      <div className='flex m-2 p-2 text-white'>
      <span className='font-bold underline m-2 p-2 cursor-pointer'><Link href='register'>Register as Professional</Link></span>
     <span className='font-bold m-2 p-2 cursor-pointer'> <Link href='login'>Login / Signup</Link></span>
      <span className='font-bold m-2 p-2 cursor-pointer'>Help</span>
      </div>
     </div>
  )
}

export default Navbar