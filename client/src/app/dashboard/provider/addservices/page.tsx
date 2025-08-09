'use client'
import Sidebar from '@/components/sidebar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'

const ServiceSchema = Yup.object().shape({
  title: Yup.string().min(2, 'Too Short!').required('Required'),
  description: Yup.string().min(10, 'Too Short!').required('Required'),
  price: Yup.number().typeError('Must be a number').positive('Must be positive').required('Required'),
  image: Yup.mixed().required('Required')
})

const Addservices = () => {
  return (
    <div>
      <div className='flex gap-5'>
        <Sidebar />
        <div className='m-2 p-2'>
          <h1 className='font-bold text-[30px] m-2 p-2'>Add a service</h1>
        </div>

        <Formik
          initialValues={{
            title: '',
            description: '',
            price: '',
            // image: null
          }}
          validationSchema={ServiceSchema}
          onSubmit={(values) => {
            console.log(values)
          }}
        >
          {({ errors, touched, setFieldValue }) => (
            <Form className='bg-gray-200 w-[50%] h-max absolute transform -translate-x-1/2 -translate-1/2 left-1/2 top-1/2 m-2 p-2 flex flex-col'>
              <div className='m-2 p-2'>
                <span>Title</span>
                <Field
                  name="title"
                  as={Input}
                  className='border-black'
                  placeholder='eg. Plumber'
                />
                {errors.title && touched.title && (
                  <div className="text-red-500 text-sm">{errors.title}</div>
                )}
              </div>

              <div className='m-2 p-2'>
                <span>Description</span>
                <Field
                  name="description"
                  as={Textarea}
                  className='border-black'
                  placeholder='Write short description about your work...'
                />
                {errors.description && touched.description && (
                  <div className="text-red-500 text-sm">{errors.description}</div>
                )}
              </div>

              <div className='m-2 p-2'>
                <span>Price</span>
                <Field
                  name="price"
                  as={Input}
                  className='border-black'
                  placeholder='/hr'
                />
                {errors.price && touched.price && (
                  <div className="text-red-500 text-sm">{errors.price}</div>
                )}
              </div>

              <div className='m-2 p-2'>
                <span>Image</span>
                <Input
                  type='file'
                  className='border-black cursor-pointer w-max'
                  onChange={(event) => {
                    setFieldValue("image", event.currentTarget.files[0])
                  }}
                />
                {errors.image && touched.image && (
                  <div className="text-red-500 text-sm">{errors.image}</div>
                )}
              </div>

              {/* Submit Button */}
              <div className='m-2 p-2'>
                <Button type="submit">Add service</Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default Addservices
