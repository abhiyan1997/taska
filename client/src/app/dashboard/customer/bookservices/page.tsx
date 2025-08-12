    'use client'
    import Footer from '@/components/footer'
    import Navbar from '@/components/navbar'
    import React, { useEffect, useState } from 'react'
    import { format } from "date-fns"
    import { Calendar as CalendarIcon } from "lucide-react"
    import { Button } from "@/components/ui/button"
    import { Calendar } from "@/components/ui/calendar"
    import {
        Popover,
        PopoverContent,
        PopoverTrigger,
    } from "@/components/ui/popover"
    import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
    import { Formik, Form, Field } from 'formik'
    import * as Yup from 'yup'
    import axios from 'axios'
    import { Input } from '@/components/ui/input'
    import { useRouter } from 'next/router'

    const BookingSchema = Yup.object().shape({
        date: Yup.date().required('Date is required'),
        timing: Yup.string().required('Timing is required'),
    })

    const BookServices = () => {
        return (
            <div className='flex flex-col gap-2'>
                <Navbar />
                <Formik
                    initialValues={{
                        date: '',
                        timing: '',
                    }}
                    validationSchema={BookingSchema}
                    onSubmit={(values) => {
                        console.log('Form data:', values)
                        alert('Booking Submitted!')
                    }}
                >
                    {({ values, errors, touched, setFieldValue }) => (
                        <Form>
                            <div className='flex justify-center'>
                                <div className='bg-gray-200 w-162 h-auto m-2 p-4 flex flex-col items-center text-center'>
                                    <h1 className='text-center font-bold text-[30px]'>Book a service</h1>    
                                    <div className='flex flex-col gap-1 m-2 p-2'>
                                        <label>Select a date</label>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    data-empty={!values.date}
                                                    className="data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal"
                                                >
                                                    <CalendarIcon />
                                                    {values.date ? format(new Date(values.date), "PPP") : <span>Pick a date</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar
                                                    mode="single"
                                                    selected={values.date ? new Date(values.date) : undefined}
                                                    onSelect={(d) => setFieldValue('date', d)}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        {errors.date && touched.date && <div className="text-red-500 text-sm">{errors.date}</div>}
                                    </div>

                                    <div className='flex flex-col gap-1 m-2 p-2'>
                                        <label>Select a Timing</label>
                                        <Select onValueChange={(val) => setFieldValue('timing', val)}>
                                            <SelectTrigger className="w-[280px] bg-white">
                                                <SelectValue placeholder="Select a timing" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Timing</SelectLabel>
                                                    <SelectItem value="9AM - 10AM">9AM - 10AM</SelectItem>
                                                    <SelectItem value="10AM - 11AM">10AM - 11AM</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        {errors.timing && touched.timing && <div className="text-red-500 text-sm">{errors.timing}</div>}
                                    </div>

                                    <div className='flex flex-col gap-1 m-2 p-2'>
                                        <label>Service</label>
                                        <Input className='text-[20px] w-[280px] bg-white' readOnly></Input>
                                    </div>

                                    <div className='flex flex-col gap-1 m-2 p-2'>
                                        <label>Price</label>
                                        <Input className='text-[20px] w-[280px] bg-white' readOnly></Input>
                                    </div>

                                    <div className='flex flex-col gap-1 m-2 p-2'>
                                        <label>By</label>
                                        <Input className='text-[20px] w-[280px] bg-white' readOnly></Input>
                                    </div>

                                    <div className='m-2 p-2'>
                                        <Button type="submit">Book Now</Button>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>

                <Footer />
            </div>
        )
    }

    export default BookServices
