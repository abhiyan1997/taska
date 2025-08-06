'use client'
import React from 'react'
import Link from 'next/link'
import { Chrome, Phone } from 'lucide-react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import axios from 'axios'

const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
  location: Yup.string().oneOf(['Kathmandu'], 'Select a valid location').required('Location is required'),
  role: Yup.string().oneOf(['Customer', 'Service Provider'], 'Select a valid role').required('Role is required')

})

const Register = () => {
  return (
    <div className='bg-black h-screen'>
      <div className='h-max w-50 m-2 p-2 border border-black rounded-[25px]'>
        <Link href='/'><img src="taska_logo.png" /></Link>
      </div>

      <div className='flex justify-center items-center'>
        <div className='border border-black m-2 p-2 flex flex-col w-[50%] bg-white h-155 justify-center'>
          <div className='text-center mt-5'>
            <span className='font-bold text-[25px] underline'>Register</span>
          </div>

          <Formik
            initialValues={{ name: '', email: '', password: '', location: '', role: '' }}
            validationSchema={RegisterSchema}
            onSubmit={async (values) => {
              axios.post("http://localhost:8080/register", values)
            }}
          >
            {({ errors, touched }) => (
              <Form className='flex flex-col gap-2'>

                <label htmlFor='name'>Name</label>
                <Field name='name' as={Input} />
                {errors.name && touched.name && <div className='text-red-500 text-sm'>{errors.name}</div>}

                <label htmlFor='email'>Email</label>
                <Field name='email' as={Input} type='email' />
                {errors.email && touched.email && <div className='text-red-500 text-sm'>{errors.email}</div>}

                <label htmlFor='password'>Password</label>
                <Field name='password' as={Input} type='password' />
                {errors.password && touched.password && <div className='text-red-500 text-sm'>{errors.password}</div>}

                <label htmlFor='location'>Where are you located?</label>
                <Field
                  name='location'
                  as='select'
                  className='border border-black p-2 m-2 rounded-[20px]'
                >
                  <option value=''>---Select---</option>
                  <option value='Kathmandu'>Kathmandu</option>
                </Field>
                {errors.location && touched.location && (
                  <div className='text-red-500 text-sm'>{errors.location}</div>
                )}


                <label htmlFor='role'>Who are you?</label>
                <Field name='role' as='select' className='border border-black p-2 m-2 rounded-[20px]'>
                  <option value=''>---Select---</option>
                  <option value='Customer'>Customer</option>
                  <option value='Service Provider'>Service Provider</option>
                </Field>
                {errors.role && touched.role && <div className='text-red-500 text-sm'>{errors.role}</div>}

                <div className='flex items-center justify-center m-3 p-2'>
                  <Button className='w-50 cursor-pointer' type='submit'>Register</Button>
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
        </div>

        <div>
          <img src="https://urbanclap-prod.s3-ap-southeast-1.amazonaws.com/categories/category_v2/partner_hero_india_cover.png" alt="" />
        </div>
      </div>
    </div>
  )
}

export default Register
