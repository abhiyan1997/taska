import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Chrome, Phone } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Register = () => {
  return (
    <div className='bg-black h-screen'>
      <div className='h-max w-50 m-2 p-2 border border-black rounded-[25px]'>
        <Link href='/'><img src="taska_logo.png" /></Link>
      </div>

      <div className='flex justify-center items-center'>
        <div className='border border-black m-2 p-2 flex flex-col w-[50%] bg-white h-150 justify-center'>
          <div className='text-center'>
            <span className='font-bold text-[25px] underline'>Register</span>
          </div>
          <label>Name</label>
          <Input></Input>
          <label>Email</label>
          <Input></Input>
          <label>Password</label>
          <Input type='password'></Input>
          <label>Where are you located?</label>
          <select className='border border-black p-2 m-2 rounded-[20px]' disabled>
           <option>Kathmandu</option>
          </select>
          <label>Who are you?</label>
          <select className='border border-black p-2 m-2 rounded-[20px]'>
            <option>---Select---</option>
            <option>Customer</option>
            <option>Service Provider</option>
          </select>
          <div className='flex items-center justify-center m-3 p-2'>
            <Button className='w-50 cursor-pointer'>Register</Button><br />
          </div>
          <div className='text-center'>
            <span>OR</span>
          </div>
          <div className='flex m-2 p-2 gap-4 justify-center'>
            <Button className='w-40 cursor-pointer'><Chrome></Chrome>Google</Button>
            <Button className='w-40 cursor-pointer'><Phone></Phone>Phone</Button>
          </div>
        </div>
        <div>
          <img src="https://urbanclap-prod.s3-ap-southeast-1.amazonaws.com/categories/category_v2/partner_hero_india_cover.png" alt="" />
        </div>
      </div>
    </div>
  )
}

export default Register