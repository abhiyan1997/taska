'use client'
import React from 'react'
import Link from 'next/link'
import { Chrome, Phone } from 'lucide-react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
})


const Login = () => {
  const router= useRouter()
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

          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={async (values) => {
              try {
                const res = await axios.post('http://localhost:8080/login', values)
                toast(res.data.message)
                if(res.data.isLoggedIn && res.data.user.role === 'Service Provider'){
                  localStorage.setItem('Provider', JSON.stringify(res.data.user))
                  router.push('/dashboard/provider')
                }
                else if(res.data.isLoggedIn && res.data.user.role === 'Customer'){
                  localStorage.setItem('Customer', JSON.stringify(res.data.user))
                  router.push('/dashboard/customer')
                }
              } 
              catch (err) {
               toast(err.response.data.message)
              }
            }}
          >
            {({ errors, touched }) => (
              <Form className='flex flex-col gap-2'>

                <label htmlFor='email'>Email</label>
                <Field name='email' as={Input} type='email' />
                {errors.email && touched.email && (
                  <div className='text-red-500 text-sm'>{errors.email}</div>
                )}

                <label htmlFor='password'>Password</label>
                <Field name='password' as={Input} type='password' />
                {errors.password && touched.password && (
                  <div className='text-red-500 text-sm'>{errors.password}</div>
                )}

                <div className='flex items-center justify-center m-3 p-2'>
                  <Button className='w-50 cursor-pointer' type='submit'>Login</Button>
                </div>
              </Form>
            )}
          </Formik>

          <div className='text-center'>
            <span>OR</span>
          </div>

          <div className='flex m-2 p-2 gap-4 justify-center'>
            <Button className='w-40 cursor-pointer'><Chrome />Google</Button>
            <Button className='w-40 cursor-pointer'><Phone />Phone</Button>
          </div>
          <div className='m-2 p-2 text-center'>
            <span>Are you a new user? <Link href='register'><span className='underline text-gray-500 cursor-pointer'>Create Your Account</span></Link></span>
          </div>
        </div>

        <div>
          <img src="login-bg.jpg" alt="login" />
        </div>
      </div>
    </div>
  )
}

export default Login
