'use client'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import axios from 'axios'
import Link from 'next/link'
import { Router, useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'


const Customer = () => {
  const [getServices, setGetServices] = useState([])
  const userData = JSON.parse(localStorage.getItem('Customer'))

  useEffect(() => {
    const dataFetch = async () => {
      const res = await axios.get('http://localhost:8080/getservices')
      setGetServices(res.data.message)
    }
    dataFetch()
  }, [])

  return (
    <div className='flex flex-col'>
      <Navbar></Navbar>
      <div>
        <div className='flex m-2 p-2 gap-5'>
          <div className='flex m-2 p-2 gap-5'>
            
              {getServices.map((items, index) => (
              <Card key={index} className="w-112 bg-gray-300 transition-transform duration-300 hover:scale-105">
              <CardHeader>
              <CardTitle>{items.title}</CardTitle>
              <CardAction className='font-bold'>Rs. {items.price}/hr</CardAction>
              <CardDescription>{items.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={`customer/bookservices/`}><Button>Book Now</Button></Link>
            </CardContent>
            <CardFooter>
              <p>By: {items.by}</p>
            </CardFooter>
          </Card>
            ))}
          </div>

        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default Customer