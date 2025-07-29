import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Apple, Chrome, Phone } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Login = () => {
  return (
    <div className='bg-black h-screen'>
      <div className='h-max w-50 m-2 p-2 border border-black rounded-[25px]'>
        <Link href='/'><img src="taska_logo.png" /></Link>
      </div>

      <div className='flex justify-center items-center'>
        <div className='border border-black m-2 p-2 flex flex-col w-[50%] bg-white h-150 justify-center'>
          <div className='text-center'>
            <span className='font-bold text-[25px] underline'>Sign In</span>
          </div>
          <label>Email</label>
          <Input></Input>
          <label>Password</label>
          <Input type='password'></Input>
          <div className='flex items-center justify-center m-3 p-2'>
            <Button className='w-50 cursor-pointer'>Login</Button><br />
          </div>
          <div className='text-center'>
            <span>OR</span>
          </div>
          <div className='flex m-2 p-2 gap-4 justify-center'>
            <Button className='w-40 cursor-pointer'><Chrome></Chrome>Google</Button>
            <Button className='w-40 cursor-pointer'><Phone></Phone>Phone</Button>
          </div>
          <div className='m-2 p-2 text-center'>
            <span>Are you a new user? <Link href='register'><span className='underline text-gray-500 cursor-pointer'>Create Your Account</span></Link></span>
          </div>
        </div>
        <div>
          <img src="login-bg.jpg" alt="" />
        </div>
      </div>
    </div>
  )
}

export default Login