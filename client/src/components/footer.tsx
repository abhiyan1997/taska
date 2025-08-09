import { Copyright, Facebook, Instagram, TwitterIcon } from 'lucide-react'
import React from 'react'

const Footer = () => {
  return (
    <div className='bg-black text-white'>
        <div className='text-center m-2 p-2 flex flex-col'>
            <span className='text-[30px] font-bold m-2'>Get more done on the go</span>
            <span className='text-gray-200'>Need something done fast? Download the Taska app to book your service, message them quickly <br /> and even send photos with ease – make it happen now!</span>
        </div>

        <div className='flex justify-between m-2 p-2 items-center'>
            <div className='w-50 m-3 p-3'>
                <img src="/taska_logo.png" alt="" />
            </div>
            <div className='m-2 p-2 text-[20px] flex gap-10'>
                <span className='cursor-pointer'>About</span>
                <span className='cursor-pointer'>Features</span>
                <span className='cursor-pointer'>Works</span>
                <span className='cursor-pointer'>Help</span>
            </div>
            <div className='m-2 p-2 flex gap-3'>
                <Facebook></Facebook>
                <TwitterIcon></TwitterIcon>
                <Instagram></Instagram>
            </div>
        </div>
        <div className='flex items-center justify-center'>
        <hr className='border border-white w-[95%]'/>
        </div>
        <div className='flex justify-between m-3 p-3'>
            <div className='flex gap-2'>
                <Copyright></Copyright> 
                <span>Copyright 2025, All Right Reserved</span>
            </div>
            <div className='flex gap-3'>
                <span className='cursor-pointer'>Privacy Policy</span>
                <span className='cursor-pointer'>Terms & Conditions</span>
            </div>
        </div>
    </div>
  )
}

export default Footer