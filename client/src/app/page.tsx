// Can be inspired from https://dribbble.com/shots/20553452-Tasker-on-demand-service-platform-landing-page
'use client'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const Main = () => {
  
  return (
    <div className='flex flex-col'>
     <Navbar></Navbar>

     <div className='w-screen border border-black h-130 flex'>
      <div className='w-[50%] h-[100%] flex justify-center bg-gray-200'>
        <img src="/person_landing.png" alt="Person From Taska" className='h-[100%]' />
      </div>
      <div className='flex flex-col h-[100%] w-[50%] bg-black text-white p-2'>
        <span className='text-gray-400 tracking-[3px] text-[25px] m-2'>Taska</span>
        <span className='font-bold text-[35px] m-2'>Trusted Home Services, Right Around You</span>
        <span className='text-gray-400 text-[18px] m-2'>Skilled, Verified Service Providers — Ready to Help at Your Doorstep, Anywhere in Nepal.</span>    
        <div className='bg-gray-200 text-black m-5 p-3 w-80 text-center rounded-[15px] transform -translate-x-1/2 -translate-y-1/2 left-[70%] top-1/2 absolute flex items-center'>
          <Input className='border border-black m-2 p-2 w-70' placeholder='I need help with....'></Input>
          <Button><Search></Search></Button>
        </div>
      </div>
     </div>

     <div className='m-3 p-3'>
      <span className='text-[20px] font-bold'>Browse By Category</span>
      <div className='flex gap-2'>
        <div className='text-center'>
        <img src="https://s3.ap-south-1.amazonaws.com/cdn.sajilosewa.com/uploads/category_banner/67c7ef23d2b68b95a89b5418.webp" className='w-50' />
        <span >Plumber</span>
        </div>
        <div className='text-center'>
        <img src="https://s3.ap-south-1.amazonaws.com/cdn.sajilosewa.com/uploads/category_banner/67c7ef23d2b68b95a89b5418.webp" className='w-50' />
        <span>Electrician</span>
        </div>
        <div className='text-center'>
        <img src="https://s3.ap-south-1.amazonaws.com/cdn.sajilosewa.com/uploads/category_banner/67c7ef35d2b68b95a89b541e.webp" className='w-50' />
        <span>Barber</span>
        </div>
        <div className='text-center'>
        <img src="https://s3.ap-south-1.amazonaws.com/cdn.sajilosewa.com/uploads/category_banner/67c7ef23d2b68b95a89b5418.webp" className='w-50' />
        <span>Technical</span>
        </div>
      </div>
<br />
      <div className='m-2 p-2'>
        <h1 className='text-[40px] text-center font-bold'>Why Taska?</h1>
        <div className='flex items-center justify-between m-7 p-7'>
          <div>
            <div className='flex m-3 p-3 gap-3'>
              <img src="https://res.cloudinary.com/urbanclap/image/upload/q_40,f_auto/categories/category_v2/category_29614d40.png" className='h-18'/>
              <div>
                <span className='font-bold text-[18px] '>Transparent pricing</span><br />
                <span className='text-gray-500'>See fixed prices before you book. No hidden charges.</span>
              </div>
            </div>
            <div className='flex m-3 p-3 gap-3'>
              <img src="https://res.cloudinary.com/urbanclap/image/upload/q_40,f_auto/categories/category_v2/category_2cc7d0d0.png" className='h-18'/>
              <div>
                <span className='font-bold text-[18px] '>Experts only</span><br />
                <span className='text-gray-500'>Our professionals are well trained and have on-job expertise..</span>
              </div>
            </div>
            <div className='flex m-3 p-3 gap-3'>
              <img src="https://res.cloudinary.com/urbanclap/image/upload/q_40,f_auto/categories/category_v2/category_2caafa00.png" className='h-18'/>
              <div>
                <span className='font-bold text-[18px] '>Fully equipped</span><br />
                <span className='text-gray-500'>We bring everything needed to get the job done well.</span>
              </div>
            </div>
          </div>
          <div className='m-5 p-5 bg-blue-100'>
            <img src="https://res.cloudinary.com/urbanclap/image/upload/q_20,f_auto/categories/category_v2/category_cb4d9130.png" className='p-2 m-2 h-40'/>
            <h1 className='text-[25px] font-bold'>100% Quality Assured</h1>
            <span className='text-gray-500'>If you don't love our service, we will make it right.</span>
          </div>
        </div>
      </div>
     </div>

      <Footer></Footer>
    </div>
  )
}

export default Main